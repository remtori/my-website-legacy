declare interface Blog
{
	author: string;
	description: string;
	key: string;
	public: boolean;
	previewImg: {
		url: string;
		width: number;
		height: number;
	};
	tags: string[];
	title: string;
	timestamp: string;
}

declare interface User
{
	displayName: string;
	isStaff: boolean;
	isAdmin: boolean;
	photoURL: string;
	uid: string;
	email: string;
}
