---
title: 'Update state with useReducer synchronously'
date: '2020-01-24'
categories: ['code']
tags: ['react', 'quick tip']
thumbnail: '../thumbnails/react.png'
---

Hooks in Reacts are wonderful to work with and managing local state is one of the most common ones. For more complex states the `useState()` hook could be changed to a `useReducer()` instead. A problem we might encounter is that state isn't updated synchronously after we've updated it.

Let's say we have this simplified `useReducer` just updating either first name or last name in a state object.

```typescript
const initialValue = {
  firstName: 'Bobby',
  lastName: 'Andersson',
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'firstName':
      return { ...state, firstName: action.payload };
    case 'lastName':
      return { ...state, lastName: action.payload };
    default:
      return state;
  }
};

const [state, dispatch] = useReducer(reducer, initialValue);
```

So every time we call the dispatch function with a type of either `firstName` or `lastName` the `state` object get's updated.

So if we would do the following the the output in the console would be `Erik`, right?

```typescript
dispatch({ type: 'firstName', payload: 'Erik' });
console.log(state.firstName);
```

Wrong! It would still be `Bobby` output on `state.firstName` even though we changed first name to Erik at the previous line. How strange 🤔

The reason is that this is an asynchronous function that is returning a new state instead of mutating the existing one. So when we are logging to console, which is a side effect, the new state actually hasn't been updated yet. If we do another dispatch with a new name it will output `Erik` that time, it will always be one behind.

A simple solution to this is using `useEffect` for whenever `state` is updated and put our logic in that function instead.

```typescript
dispatch({ type: 'firstName', payload: 'Erik' });

useEffect(() => {
  console.log(state.firstName);
}, [state]);
```

This way we will always get the correct state logged to our console.
