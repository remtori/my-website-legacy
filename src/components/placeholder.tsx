import { h } from 'preact';
import SVG from './SVG';
import loadingCircle from '~/assets/images/loading.svg';
import notfound from '~/assets/images/notfound.svg';

export interface PHProps
{
	width?: number;
	height?: number;
}

export const LoadingCircle = ({ width = 128, height = 128 }: PHProps) =>
	<SVG src={loadingCircle} style={{ width, height, margin: 'auto' }} />;

export const NotFound = ({ width = 512, height = 512 }: PHProps) =>
	<SVG src={notfound} style={{ width, height, margin: 'auto' }} />;
