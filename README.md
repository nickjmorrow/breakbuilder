# Breakbuilder: Planning out Vacations

The demo can be found [here](http://breakbuilder.netlify.com).

## At a Glance

This is a web application for planning out vacation. Click on a date to mark it as vacation, click again to mark it as a holiday, and click again to revert it back to empty.

View long weekends easily and see how much vacation you're taking across the seasons.

## What Is It For

I try to maximize how many long weekends I can get over having long vacations. It's fun to see just how much "extra" vacation you're getting, and I wanted an easy way to visualize it.

## Technical Stack: React, Redux

- The **front-end** is built using React with heavy reliance on a [personal component library](https://github.com/nickjmorrow/react-component-library).
- For **state management**, I'm using Redux. I enjoy the "loud" nature where all changes to state are explicitly defined.

## What could be added to it

- We could add a backend to enable users to save their vacation plans. This is already partially fleshed out, but completing it is not personally prioritized due to the low value-add.

## What are the expectations of it

I fully intend for this to just be a hobby project that I check up on now and then.

## How to run it

For the front-end:

```
npm run start
```

For the back-end:

```
npm run build:watch
```
