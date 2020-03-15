# REMTORI's website

This repo is my multiple attempt at making a personal website

Current master is `@preact-v3`

## Specifications

- Cool Landing Page
- A functional Blog, with comments and stuff
- A project tabs where i show stuff i make
- Search Function
- A Gallery Collection
- `Service Worker` to make PWA
- Fancy loading animation with blank template, like `Facebook`, `Reddit` (named Skeleton animation)

## Services Setup

### Netlify

- Incremental build, only rebuild when there is a `package.version` change

- Rebuild is triggered when there is a commit on `master` branch

### CMS Pipeline

#### User Experiment:

Edit -> Save & Commit (via a nice UI) -> ## Magic ## -> Live

You can read more detail at the blog post [Blog: Pipeline](https://remtori.netlify.com/blogs/pipeline)

## History

Time line: @vanilla > @preact > @preact-v2 > @react > @preact-v3

- At first i tried vanilla, but its only get so far

- Next is `preact`, because at the time i think `react` is really bloated for my site, i thinks most of these project i gave up when its come to `redux` intergation

- Then i tried again with preact and this time with some `typescript` and `rxjs`

- And then one more time with a full fledged `react` and `boostrap4`

- `@preact-v3` is the most recent, most serious attempt at "completing" this project
