import { h } from "preact";
import loadingUrl from "../assets/images/loading.svg";

const Loading = ({width = 64, height = 64}) => (
    <img 
        src={loadingUrl}
        style="display: block;margin-left:auto;margin-right:auto;"
        width={width} height={height}
    ></img>
);

export default Loading;