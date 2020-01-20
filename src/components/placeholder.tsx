import { h } from 'preact';

export interface PHProps {
	width?: number;
	height?: number;
	[key: string]: any;
}

/* tslint:disable */
const loadingCircleContent = {
	__html: `
	<circle cx="50" cy="50" fill="none" stroke="#93dbe9" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138" transform="rotate(304.177 50 50)">
		<animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1" />
	</circle>`
};
export const LoadingCircle = ({ width = 128, height = 128, ...props }: PHProps) => (
	<svg
		{...props}
		width={`${width}px`}
		height={`${height}px`}
		xmlns="http://www.w3.org/2000/svg"
		style="margin: auto; display: block; shape-rendering: auto;"
		viewBox="0 0 100 100"
		preserveAspectRatio="xMidYMid"
		dangerouslySetInnerHTML={loadingCircleContent}
	/>
);

const loadingDotContent = {
	__html: `
	<g transform="translate(20 50)">
		<circle cx="0" cy="0" r="6" fill="#ffffff" transform="scale(0.947827 0.947827)">
			<animateTransform attributeName="transform" type="scale" begin="-0.375s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite"></animateTransform>
		</circle>
	</g>
	<g transform="translate(40 50)">
		<circle cx="0" cy="0" r="6" fill="#f5fdff" transform="scale(0.954687 0.954687)">
			<animateTransform attributeName="transform" type="scale" begin="-0.25s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite"></animateTransform>
		</circle>
	</g>
	<g transform="translate(60 50)">
		<circle cx="0" cy="0" r="6" fill="#e7f6ff" transform="scale(0.682151 0.682151)">
			<animateTransform attributeName="transform" type="scale" begin="-0.125s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite"></animateTransform>
		</circle>
	</g>
	<g transform="translate(80 50)">
		<circle cx="0" cy="0" r="6" fill="#dbecff" transform="scale(0.330866 0.330866)">
			<animateTransform attributeName="transform" type="scale" begin="0s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite"></animateTransform>
		</circle>
	</g>`
};
export const LoadingDot = ({ width = 128, height = 128, ...props}: PHProps) => (
	<svg
		{...props}
		width={`${width}px`}
		height={`${height}px`}
		xmlns="http://www.w3.org/2000/svg"
		style="margin: auto; display: block;"
		viewBox="0 0 100 100"
		preserveAspectRatio="xMidYMid"
		dangerouslySetInnerHTML={loadingDotContent}
	/>
);

const notfoundContent = {
	__html: `
	<defs>
		<path d="M0 0L200 0L200 200L0 200L0 0Z"/>
		<path d="M50 126.52L50 26.52L150 26.52L150 126.52L50 126.52ZM62.5 114.02L81.25 95.27L93.75 101.52L112.5 76.52L137.5 109.85L137.5 39.02L62.5 39.02L62.5 114.02ZM85.27 53.12L85.71 53.16L86.15 53.23L86.58 53.3L87 53.4L87.42 53.51L87.83 53.64L88.24 53.78L88.63 53.94L89.02 54.12L89.4 54.3L89.77 54.51L90.14 54.72L90.49 54.95L90.83 55.19L91.17 55.45L91.49 55.72L91.81 56L92.11 56.29L92.4 56.59L92.68 56.9L92.95 57.23L93.2 57.56L93.44 57.9L93.67 58.26L93.89 58.62L94.09 58.99L94.28 59.37L94.45 59.76L94.61 60.16L94.75 60.56L94.88 60.97L94.99 61.39L95.09 61.82L95.17 62.25L95.23 62.68L95.28 63.12L95.3 63.57L95.31 64.02L95.3 64.47L95.28 64.92L95.23 65.36L95.17 65.79L95.09 66.22L94.99 66.65L94.88 67.07L94.75 67.48L94.61 67.88L94.45 68.28L94.28 68.67L94.09 69.05L93.89 69.42L93.67 69.78L93.44 70.14L93.2 70.48L92.95 70.81L92.68 71.14L92.4 71.45L92.11 71.75L91.81 72.05L91.49 72.32L91.17 72.59L90.83 72.85L90.49 73.09L90.14 73.32L89.77 73.53L89.4 73.74L89.02 73.92L88.63 74.1L88.24 74.26L87.83 74.4L87.42 74.53L87 74.64L86.58 74.74L86.15 74.81L85.71 74.88L85.27 74.92L84.83 74.95L84.38 74.96L83.92 74.95L83.48 74.92L83.04 74.88L82.6 74.81L82.17 74.74L81.75 74.64L81.33 74.53L80.92 74.4L80.51 74.26L80.12 74.1L79.73 73.92L79.35 73.74L78.98 73.53L78.61 73.32L78.26 73.09L77.92 72.85L77.58 72.59L77.26 72.32L76.94 72.05L76.64 71.75L76.35 71.45L76.07 71.14L75.8 70.81L75.55 70.48L75.31 70.14L75.08 69.78L74.86 69.42L74.66 69.05L74.47 68.67L74.3 68.28L74.14 67.88L74 67.48L73.87 67.07L73.76 66.65L73.66 66.22L73.58 65.79L73.52 65.36L73.47 64.92L73.45 64.47L73.44 64.02L73.45 63.57L73.47 63.12L73.52 62.68L73.58 62.25L73.66 61.82L73.76 61.39L73.87 60.97L74 60.56L74.14 60.16L74.3 59.76L74.47 59.37L74.66 58.99L74.86 58.62L75.08 58.26L75.31 57.9L75.55 57.56L75.8 57.23L76.07 56.9L76.35 56.59L76.64 56.29L76.94 56L77.26 55.72L77.58 55.45L77.92 55.19L78.26 54.95L78.61 54.72L78.98 54.51L79.35 54.3L79.73 54.12L80.12 53.94L80.51 53.78L80.92 53.64L81.33 53.51L81.75 53.4L82.17 53.3L82.6 53.23L83.04 53.16L83.48 53.12L83.92 53.09L84.38 53.08L84.83 53.09L85.27 53.12Z" />
		<text x="30" y="160.37" font-size="20" alignment-baseline="before-edge" transform="matrix(1 0 0 1 2.7780792682926574 -10.66422442880554)" style="line-height:100%" dominant-baseline="text-before-edge">
			<tspan x="30" dy="0em" alignment-baseline="before-edge" dominant-baseline="text-before-edge" text-anchor="start">image not found</tspan>
		</text>
	</defs>
	<g>
		<g>
			<g>
				<use opacity="1" fill="#b7bdbf" fill-opacity="1"/>
			</g>
			<g>
				<use opacity="1" fill="#6e6f6f" fill-opacity="1"/>
			</g>
			<g>
				<use opacity="1" fill="#585e5f" fill-opacity="1"/>
			</g>
		</g>
	</g>`
};
export const NotFound = ({ width = 512, height = 512, ...props }: PHProps) => (
	<svg
		{...props}
		width={`${width}px`}
		height={`${height}px`}
		version="1.1"
		xmlns="http://www.w3.org/2000/svg"
		preserveAspectRatio="xMidYMid meet"
		viewBox="0 0 200 200"
		dangerouslySetInnerHTML={notfoundContent}
	/>
);
