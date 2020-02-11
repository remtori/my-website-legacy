type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

declare var process: { env: { NODE_ENV: 'production' | 'development'; } }
declare var PRERENDER: boolean;
declare var __CONTENT_ROOT_DIR__: string;
declare var module: { exports: any; }
declare var require: any;
declare var __non_webpack_require__: any;

declare interface Blog
{
	id: string;
	content: string;
	title: string;
	description: string;
	author: string;
	tags: string;
	previewImg?: {
		url: string;
		width: number;
		height: number;
	};
	created: string;
	modified: string;
	isFullPage?: boolean;
}

declare interface User
{
	displayName: string;
	isStaff: boolean;
	isAdmin: boolean;
	photoURL: string;
	uid: string;
	email: string;
	credential: { accessToken: string } | null;
}
