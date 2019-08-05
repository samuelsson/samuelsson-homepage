---
title: 'Conditions in CSS with the :not pseudo class'
date: '2019-08-05'
categories: ['code']
tags: ['css', 'quick tip']
thumbnail: '../thumbnails/css.png'
---
When writing CSS we sometimes want some more logic to our styling. For example a navigation with multiple `<li>` elements in a horizontal layout probably needs some space between the elements. A `padding-right` could do it but we don't want to apply it to the last element because that will mess up our layout.

Usually something like this is written:

```css
li {
  padding-right: 10px;
}

li:last-child {
  padding-right: 0;
}
```

That will of course be sufficient but we could make this look much better with the `:not` CSS pseudo class. It will match all elements except those we choose not to.

The above example re-written with `:not` will look like this:

```css
li:not(:last-child) {
  padding-right: 10px;
}
```

It will match all `li` elements but not the `:last-child`.

We can also chain multiple `:not` like this example where we want to style all links except those with certain classes.

```css
a:not(.ignored):not(.skipped) {
  text-decoration: none;
}
```

There is currently an experimental feature where all selectors could be comma separated in one single `:not(.ignored, .skipped)` but browser support is very low so multiple `:not` is currently the preferred way to do it.
