
declare interface Blog {
    key: string;
    timeAdded: number;
    title: string;
    previewImg: {
        url: string;
        width: number;
        height: number;
    };
    description: string;
    contentUrl: string;
    author: string;
    tags: string[];
}

declare interface Project extends Blog {
}