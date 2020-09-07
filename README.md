# breakbuilder

CircleCI
[![nickjmorrow](https://circleci.com/gh/nickjmorrow/breakbuilder.svg?style=svg)](https://circleci.com/gh/nickjmorrow/breakbuilder)

Quickly iterate on vacation plans and view summary statistics.

The demo can be found [here](https://breakbuilder.netlify.app).

## At a Glance

I wasn't pumped about the "I want to schedule my vacation and see how evenly-spread it is throughout the year" experience on apps like Outlook and Google Calendar. It needed to be lighter weight, and I wanted to better visualize how much "connected" vacation I'm getting (e.g. weekends that are connected to a Monday / Friday that is also off). This app is meant to meet that very specific, probably unrelatable use case.

## How to Run

It's solely a React app. To start the webpack development server, run the following:

```bash
npm run dev
```

To run tests:

```bash
npm test
```

To run other CI preflight checks (linting, formatting):

```bash
npm run ci:preflight
```

## Purpose / Future

This app is going to just stay as a side project. With this, I wanted to focus more on making it look good, and I hope I've succeeded. It's hard to think of project ideas that are (1) somewhat useful and (2) easy to make look nice, and I think this one strikes a balance.

Feel free to clone it and consider the following features:

-   better visualizations for seeing how vacation is scheduled throughout the year
-   automatically suggesting how to schedule additional vacation to maximize "spread" of vacation throughout year
-   be able to categorize by color and notate different vacation segments so you can keep track of why you scheduled a particular vacation

## Technical Stack

-   The **frontend** uses React.js and TypeScript. I work mainly with React and enjoy thinking in components. TypeScript for static type-checking and making it easier to scale code without needing to remember what props go to which component.
-   For **stage management**, I'm using Redux. Arguably overkill for a project this small, but I love how predictable and debug-friendly it is. Always a joy to work with, and I particularly like how well Redux, React-Redux, and Reselect go together when using the `useTypedSelector` of `react-redux` with various selectors from `reselect`. Just really readable and sensible.
-   The **deployment tool** is CircleCI. This was my second project using CircleCI and it was far easier to get running. It builds, lints, and tests code, and if all that passes, deploys to Netlify. Netlify already offers a very developer friendly "deploy all commits to X branch" functionality, but I like having various quality-check gates in the deploy pipeline.

## Callouts

-   Happy with the developer experience of loading and saving Redux state to `localStorage`. It was straightfoward to setup and non-magical.
-   I agonized over the data structure for storing "calendar dates", and particularly different kinds of calendar dates (selected, empty, vacation, holiday). Should they be in separate lists, each a key-value on an object? Should I use a selector to transform that into a map for O(1) lookup? In the end, I opted for one array, of all dates, each date is tagged with a string literal, so I use a [tagged union type](https://mariusschulz.com/articles/tagged-union-types-in-typescript) to distinguish between them. This makes it harder to represent invalid states (e.g. a date is both a holiday date type AND a connected date type) and enforces that each date have one type.

## Tracking

The Trello board for this project can be found [here](https://trello.com/b/SQVE5IEn/breakbuilder).
