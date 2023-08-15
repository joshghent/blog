```
title: TIL - How to send an SQS message from a Lambda inside a VPC
date: 2023-08-15
tags: ["til"]
```

Sending a message to SQS from a Lambda inside a VPC should be trivial. Unfortunately, this is AWS so they like to make it as complex as possible.

Here is the process to follow if you're stuck:

## Setup
1. The lambda function was in a subnet on the VPC
2. Create a new VPC endpoint with a Full Access policy in that same VPC and subnet as the lambda. You will need to create the VPC endpoint first, then click on it, then select the "Policy" tab, then edit the policy.
3. Create a security group with HTTPS -> 0.0.0.0/0 Inbound and All traffic outbound.
4. Attach this security group to the VPC endpoint.

## Sample Lambda Function code
```ts
import { SendMessageBatchCommand, SQSClient } from '@aws-sdk/client-sqs'
import chunk from 'lodash/chunk'
import { logger } from './logger'

const BATCH_SIZE = 10

const sqsClient = new SQSClient({
  region: AWS_REGION,
  endpoint: SQS_VPC_ENDPOINT || null
})


export const addToQueue = async (
  messages: Array<{ type: string; data: Record<string, string> }>
): Promise<void> => {
  logger.debug(
    `Sending ${messages.length} emails. Data: ${JSON.stringify(messages)}`
  )
  const batches = chunk(messages, BATCH_SIZE)

  logger.debug(`Sending email to ${QUEUE_URL}`)

  await Promise.all(
    batches.map(async (batch) => {
      const command = new SendMessageBatchCommand({
        QueueUrl: QUEUE_URL,
        Entries: batch.map((message, index) => ({
          Id: String(index),
          MessageBody: JSON.stringify(message)
        }))
      })

      try {
        await sqsClient.send(command)
        logger.debug(`Sent SQS email(s) to queue`)
      } catch (err) {
        logger.error(`Error when queueing email: ${JSON.stringify(err)}`)
      }
    })
  )
}
```

Adapted from the answer here: [https://github.com/aws/aws-sdk-js/issues/3203#issuecomment-786372586](https://github.com/aws/aws-sdk-js/issues/3203#issuecomment-786372586)
