import { h, Component } from 'preact';
import Loading from './loading';

export default class ImageV extends Component {
    constructor(props, context) {
        super(props, context);
        
        let done = false;
        let img = new Image();
        img.onload = _ => {
            done = true;
            this.forceUpdate();
        }
        img.src = this.props.src;

        this.render = (props) => {

            const { src, width, height } = props;

            if (done)
                return (
                    <img src={ src } class={ props.class } ></img>
                );
            else 
                return (
                    <Loading width={width} height={height} />
                );
        }
    }
}