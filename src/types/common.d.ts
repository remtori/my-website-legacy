declare type EncodedString = string;
declare type SpaceSeperatedString = string;

declare interface Blog {
    key: string;
    timeAdded: number;
    title: string;
    previewImg: {
        url: string;
        width: number;
        height: number,
    },
    description: string,
    content: EncodedString,
    author: string,
    tags: SpaceSeperatedString
}