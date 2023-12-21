---
layout: layouts/post.njk
title: Deeply Remove a Key from an Object
date: 2022-06-14
description: How to remove a specific key from an object, even in nested structures
tags: ["nodejs", "code", "lodash"]
---

Recently I had the problem of removing a specific key from an object. Normally I would use `omit` from the Lodash or Ramda library. But, there was a catch - I also needed to remove the key from nested structures within the object.

Here is a code snippet of how I solved it in NodeJS with Lodash.

I'm sure you can make this VanillaJS but `transform` is a handy function to use.

```javascript
import { transform } from 'lodash';

const isObject(value) {
    const type = typeof value
    return type === 'function' || type === 'object' && !Array.isArray(value) && !!value
}

// Deeply remove keys from an object
// @param - obj: Object - the object to remove the key from
// @params - keysToOmit: Array/String - string or array of strings of keys to remove
const deepOmit = (obj, keysToOmit) => {
  const keysToOmitIndex = Array.isArray(keysToOmit) ? keysToOmit : [keysToOmit]);

  function omitFromObject(o: any) { // the inner function which will be called recursivley
    return transform(o, (result, value, key) => { // transform to a new object
      if (keysToOmitIndex.indexOf(key) !== -1) { // if the key is in the index skip it
        return;
      }

      result[key] = isObject(value) ? omitFromObject(value) : value; // if the key is an object run it through the inner function - omitFromObject
    })
  }

  return omitFromObject(obj); // return the inner function result
}
```

### Usage

You can use the function like this

```javascript
const obj = {
  _id: 1,
  name: "Josh Ghent",
  title: "Software Engineer",
  metadata: { _id: 2, company: "Turbo Technologies" },
};

const result = deepOmit(obj, ["_id", "name"]);
// =>
// {
//   title: 'Software Engineer',
//   metadata: { company: 'Turbo Technologies' }
// }
```
