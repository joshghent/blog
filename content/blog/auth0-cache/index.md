---
title: "Cache Auth0 M2M Tokens"
date: "2022-01-11"
description: How to cache Auth0 M2M Tokens to extend your free plan
tags: ["auth0", "dynamodb", "nodejs", "lambda", "free plan", "aws", "typescript"]
---

[Auth0](https://auth0.com) is an easy to integrate service that handles all your applications authentication needs. But, if you've worked with it before, you'll know it's downfalls. 

One of them Machine-to-Machine (M2M) tokens; used to authenticate between your services. 

But the limits are restrictive for serverless infrastructures. In the free plan you only get 1000 per month. And even on a paid plan, it would be expensive to get the number of tokens you might need in a given month.

The solution is to **cache Machine-to-Machine tokens** so we don't need to request new ones until they expire. 

In traditional infrastructure, this would be trivial. Save the token globally somewhere and done.

Serverless architectures are a tricky because there is no persistence between instances.



Here's how to handle caching Auth0 Tokens for AWS Lambda Microservices. But, the same principles apply for other cloud providers.



### Create the DynamoDB Table

(or equivalent serverless DB table in other cloud providers)

Set your own name for the table, and set the partition key to `token` as a *String*



![Screenshot 2022-01-11 at 15.44.50](/Users/joshghent/Projects/blog/content/assets/images/dynamodb-creation.png)



Add the name of the table as an environment variable `CACHE_TOKEN_DB`



### Retrieve and store tokens

First let's add a method to store new M2M

```ts
// ===
// cacheToken.ts
// ===
import AWS from 'aws-sdk';

const storeNewToken = async (token: string) => {
  const docClient = new AWS.DynamoDB.DocumentClient();
  const response = await docClient.put({ TableName: `${process.env.TOKEN_CACHE_DB}`, Item: { token } }).promise();
  return response;
};
```



The code is simple enough and fairly self explanatory.

So, let's move on and add method that we can use in our Lambda Handler to retrieve a new M2M token.

There are two paths for this method

1. There is a existing unexpired token in DynamoDB, so we use that.
2. There is no token or only expired ones, so we generate a new one, store it in DynamoDB and use that.



We will design this system to only store one token at a time. This means we do not have to worry about old tokens and filtering them out on each initialization.



So let's write our method!

```ts
// ===
// cacheToken.ts
// ===
import request from 'request-promise';

export const getAuthToken = async (): Promise<string> => {
  const token = await getExistingToken();
  if (token !== '' && hasTokenExpired(token) === false) {
    return token;
  }

  const params = {
    method: 'POST',
    url: `https://${process.env.AUTH0_NAME}.auth0.com/oauth/token`,
    headers: { 'content-type': 'application/json' },
    body: `{"client_id":"${process.env.AUTH0_CLIENT_ID}","client_secret":"${process.env.AUTH0_CLIENT_SECRET}","audience":"${process.env.AUTH0_AUDIENCE}","grant_type":"client_credentials"}`,
  };

  const result = JSON.parse(await request(params));
  if (!result["access_token"]) { throw new Error("No Access Token returned"); }

  await deletePreviousTokens(token);
  await storeNewToken(result['access_token']);

  return result["access_token"];
};
```

Let's break this down a little

1. We first get the **existing token in DynamoDB**. It returns the token or an empty string.
2. If it returns a token, we check it's not expired and then return that token.
3. If it is expired, or there is no token, we go ahead an **generate one from Auth0**.
4. We then **delete the old token in DynamoDB, and store the new one**.



Potentially, with this flow (and the fact that DynamoDB is non-locking), could mean that multiple instances of your service save a token at the same time. But, this will be minor compared to how much you're able to save by caching in the first place.



Let's now create the methods we referenced in the `getAuthToken` function that help us interact with the tokens storage and validation

```ts
// ===
// cacheToken.ts
// ===
import jwt_decode from 'jwt-decode';

const deletePreviousTokens = async (token: string) => {
  const docClient = new AWS.DynamoDB.DocumentClient();
  const tokenRecords = await getAllTokens();

  // Clear down the table
  if (tokenRecords.Items) {
    tokenRecords.Items.forEach(async (row) => {
      const token = row.token;
      await docClient.delete({ TableName: `${process.env.TOKEN_CACHE_DB}`, Key: { "token": token } }).promise();
    });
  }
};

const hasTokenExpired = (token: string) => {
  const decoded = jwt_decode(token) as { exp: number; iat: number; };
  if (decoded) {
    return decoded.exp < (new Date().getTime() / 1000);
  }

  return false;
};

const getAllTokens = async () => {
  const docClient = new AWS.DynamoDB.DocumentClient();
  const response = await docClient.scan({
    TableName: `${process.env.TOKEN_CACHE_DB}`
  }).promise();

  return response;
};

const getExistingToken = async () => {
  const response = await getAllTokens();

  if (response.Items && response.Items.length > 0) {
    return response.Items[0]['token'];
  }

  return '';
};
```



Again, let's break this down

- In `deletePreviousTokens` we grab all existing tokens and delete them one by one. This is to avoid concurrency issues where another instance has written a new token which we do not want to delete.
- In `hasTokenExpired` we do a basic JWT validation to make sure that it is not expired. This could be improved by not using the token if it's only got 1ms left but has worked so far for me.
- In `getExistingToken` we get all rows in the table and return the first token or an empty string if none is found.



### Usage in the handler

Now all that's left to do is to add it to your Lambda functions handler method.

```ts
export const handler = async (event: any, context: any) => {
	const token = await getAuthToken();
  
  // Do something with the token
  await sendResultsToService(token, event.Results);
}
```



Hopefully you found this interesting and saved some money on your Auth0 Bill!