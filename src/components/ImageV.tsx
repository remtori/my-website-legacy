import { h, Component } from 'preact';
import LoadingAnimation from './LoadingAnimation';

export default class ImageV
    extends Component<
        {
            src: string,
            width: number;
            height: number;
            class?: string;
        },
        {
            done: boolean;
        }
    >
{

    state = { done: false };

    componentWillMount() {

        const img = new Image();
        img.onload = _ => {
            this.setState({ done: true });
        };

        img.src = this.props.src;
    }

    render() {
        const { src, width, height, class: className } = this.props;

        if (this.state.done)
        {
            return (
                <img src={src} class={className} />
            );
        }

        return (
            <LoadingAnimation width={width} height={height} />
        );
    }
}