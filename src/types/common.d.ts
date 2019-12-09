
declare interface User {
    displayName: string;
    isStaff: boolean;
    isAdmin: boolean;
    photoURL: string;
    uid: string;
    email: string;
    emailVerified: boolean;
}

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
    contentStoragePath: string;
    author: string;
    tags: string[];
}

declare interface Project extends Blog {
}