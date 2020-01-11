declare type DBCollections = 'blogs';

declare interface IDocument
{
	type: DBCollections;
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
	timeAdded: number;
	title: string;
}

// tslint:disable-next-line: interface-name
declare interface Blog extends IDocument
{
	type: 'blogs';
}
