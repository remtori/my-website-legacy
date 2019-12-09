export interface RootState {
    contents: ContentsState;
    firestore: FireStoreState;
    user: User;
    users: UsersState;
}

export interface ContentsState {        
    pending: boolean;
    models: {
        [key: string]: {
            parentRef: string;
            assets: {
                [path: string]: string;
            };
            contentURI: string;
            pending: boolean;
        };
    }
};

export interface DocsState {
    pending: boolean;
    models: {
        [key: string]: Blog | Project;
    }
};

export interface FireStoreState {
    [type: string]: DocsState;
};

export interface UsersState {
    [uid: string]: User;
};