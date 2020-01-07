declare type DBCollections = 'blogs' | 'projects';

declare interface IDocument
{
	type: DBCollections;
	author: string;
	contentUrl: string;
	description: string;
	key: string;
	public: boolean;
	previewImg: {
		url: string;
		width: number;
		height: number;
	};
	tags: string[];
	timeAdded: number;
	title: string;
}

// tslint:disable-next-line: interface-name
declare interface Blog extends IDocument
{
	type: 'blogs';
}

// tslint:disable-next-line: interface-name
declare interface Project extends IDocument
{
	type: 'projects';
}
