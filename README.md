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

## Static page generator with Netlify, Firebase and Heroku (All free tier)

- Deploy / Update Content pipeline:

	- Commit changes to Github / Firebase

	- Netlify incremental build start via Heroku

	- Netlify: Copy prebuilt contents from caches (cache is on Netlify)

	- Netlify: Fetch data from Firebase and generate static html

- To rebuild everything go to Netlify and choose clear cache

- UX, for Staff:

	- User login with Firebase Auth with correct permission can Create / Edit a contents

	- The content will be saved to firebase. The static html page is staled.

	- There is a button that will trigger a rebuild and everything will be up to date.

- UX, for User:

	- The user who visiting a staled content will get a re-render after the page loading data from firebase.

	- In short, firebase is the only source of truth. Stale or non-stale content are all validate against firebase and re-render if needed.

## Services Setup

### Firebase

- Firestore indexes and rules. read/write: service account only

- Storage rules. read: everyone / write: service account only

- Firestore separate collection for content that need update

### Netlify

- Incremental build with data from Firebase

- Trigger rebuild via callback URL from Heroku

### Heroku

- Verify via access token from Firebase Auth

- Github Service Account for committing to repo

- Netlify rebuild URL
