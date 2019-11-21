---
title: 'Partial types in TypeScript'
date: '2019-11-21'
categories: ['code']
tags: ['typescript', 'quick tip']
thumbnail: '../thumbnails/typescript.png'
---

TypeScript is great for many reasons and when getting past the first few steps it really makes developing a joy. With that said there may come a time when objects keep growing in size and maybe not all properties will exist all the time.

Say we have a user interface that looks like this:

```typescript
interface User {
  firstName: string;
  lastName: string;
  dateCreated: Date;
}
```

All users have a first and last name but also a date when it was created. The date should always exist on the user object so it's not optional (by putting a question mark after the property name like `dateCreated?:`).

We then have a simple function that creates a new user by posting to our API. The user doesn't have a `dateCreated` yet because it will be set when saved to the database.

```typescript
const createUser = (user: User): void => {
  // Here we call our API
};

const newUser = {
  firstName: 'Erik',
  lastName: 'Samuelsson',
};

createUser(newUser);
```

Unfortunately we will get an error when invoking `createUser` telling us that `newUser` parameter is missing `dateCreated`. But as we said we don't know when it will actually be created and we can't just set it ourselves in the payload. Oh no, this really sucks hard time... or does it?

`Partial` to the rescue 💪🏻

If we change our `createUser` function to this instead we can send a partial part of the user object.

```typescript
const createUser = (user: Partial<User>): void => {
  // Here we call our API
}
```

This will tell our function that it's okay to not have every property on the argument, the user object. This way we don't have to modify the actual interface just for this occurrence and we still know that `dateCreated` should exist on the user.
