import { h } from 'preact';
import loadingAnimationUrl from '../assets/images/loading.svg';

const Loading = ({width = 64, height = 64}) => (
    <img
        src={loadingAnimationUrl}
        style="display: block;margin-left:auto;margin-right:auto;"
        width={width}
        height={height}
    />
);

export default Loading;
