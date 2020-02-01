# REMTORI's website

This repo is my multiple attempt at making a personal website

Current master is `@preact-v3`

## Specifications

- Cool Landing Page
- A functional Blog, with comments and stuff
- A project tabs where i show stuff i make for the web.
- Search Function
- A Gallery Collection
- `Service Worker` to make PWA
- Fancy loading animation with blank template, like `Facebook`, `Reddit` (named Skeleton animation)

## Services Setup

### Netlify

- Incremental build with data from Firebase

- Trigger rebuild via callback URL from Functions

### CMS Pipeline

#### User Experiment:

Edit -> Save & Commit (via a nice UI) -> ## Magic ## -> Live

#### Travis CI:

	- On `my-website-content` Commit -> Generate files:

		- re-render.json: paths to content file to re-render

		- blog-indexes.json: list of all blog with some description

	- If re-render.json is not empty then trigger Netlify build.

#### Netlify:

Check package.json for current version:

	- If the previous build is out-of-date: Clear cache and rebuild everything

	- Else: read site-content/re-render.json and build/rebuild necessary files

_Note:_ Netlify only build static html for English language

## Routes

Key - value pair

If Value is String:

- Url path -> File path

- Search in `Selected Language` folder or fallback to `English`

- Prioritize `.html` extension over `.md`

If Value is Component:

- Dynamic load and pass through
