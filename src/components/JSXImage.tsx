import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { NotFound, LoadingDot } from './placeholders';

export type JSXImageProps = {
	src: string,
	width?: number | undefined,
	height?: number | undefined
} & h.JSX.HTMLAttributes<HTMLImageElement>;

export default function JSXImage({ src, width, height, ...props }: JSXImageProps) {

	if (PRERENDER) {
		return <LoadingDot width={width} height={height} class={props.class} />;
	}

	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);

	useEffect(() => {
		setIsLoading(true);

		const img = new Image();
		img.onload = () => {
			setIsLoading(false);
		};
		img.onerror = () => {
			setIsLoading(false);
			setIsError(true);
		};
		img.src = src;

		return () => {
			img.onload = null;
			img.onerror = null;
			img.src = '';
		};
	}, [src]);

	if (isLoading) {
		return <LoadingDot width={width} height={height} class={props.class} />;
	} else if (isError) {
		return <NotFound width={width} height={height} class={props.class} />;
	} else {
		return <img {...props} src={src} />;
	}
}
