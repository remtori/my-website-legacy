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

## Static page generator with Firebase

Using Firebase Hosting REST API

### Idea

- Update content dynamically with API

- Keep sha256 hash of all the files (both static and dynamic) on a firestore collection

### On build - Static files

- Use a `Nodejs` program to only upload/modify/delete these files and keep everything else untouch

	- /assets
	- /favicon.ico
	- /index.html
	- /report.html
	- /robots.txt
	- /manifest.json

### When update content - Dynamic files

- Login as admin

- Update the content

- Render these changes to static files ??? how to render on brower client side

- Gzip these files and calculate its hashes

- Write all the file hashes to a Firestore collection

- Send gzip-ed files to firebase functions via REST api

- In the Firebase Functions:

	- Using Firebase Hosting REST API create a new release

	- Query Firestore for the file structure and hashes

	- Listen and forward all the files send via Client to the Hosting API

	- Forward the Finalized and Release request from Client to Hosting API

	- Requirement: Auth-Admin