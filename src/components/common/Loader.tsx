import React, { useState, useEffect } from 'react';

import Loading from './Loading';

interface LoaderProps<T> {
    loadData: () => Promise<T>,
    render: (data: T) => JSX.Element,
}

export default function Loader<T>({ loadData, render }: LoaderProps<T>) {

    const [ isLoaded, setIsLoaded ] = useState(false);
    const [ data, setData ] = useState();

    useEffect(() => {
        let unloaded = false;
        setIsLoaded(false);
        loadData().then(result => {
            if (!unloaded) {
                setData(result);
                setIsLoaded(true);
            }
        });

        return () => { 
            unloaded = true;
        };
    }, [ loadData ]);

    if (isLoaded) {
        return render(data);
    }

    return <Loading />;
}