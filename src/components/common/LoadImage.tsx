import React, { useState, useEffect } from 'react';

interface LoadImageProps extends React.HTMLAttributes<HTMLImageElement> {
    url: string;
    width: number;
    height: number;
}

export default function LoadImage({ url, width, height, ...props }: LoadImageProps) {

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const img = new Image();
        img.onload = () => {
            setLoaded(true);
        };
        img.src = url;
    }, [ url ]);

    if (loaded) {
        return <img src={url} {...props} />
    }

    return (
        <svg
            width="300" height="300"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect
                x="2" y="2"
                width={width - 4} height={height - 4}
                style={{ fill: '#DEDEDE', stroke: '#555555', strokeWidth: 2 }}
            />
            <text
                x="50%"
                y="50%"
                fontSize="18"
                textAnchor="middle"
                alignmentBaseline="middle"
                fontFamily="monospace, sans-serif"
                fill="#555555"
            >
                Loading...
            </text>
        </svg>
    );
}