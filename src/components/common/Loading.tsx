import React from 'react';
import loadingSVG from '../../assets/images/loading.svg';

export default function Loading({width = 64, height = 64, ...props}) {
    return (
        <div className="text-center">
            <img src={loadingSVG} width={width} height={height} {...props} />
        </div>
    );
}