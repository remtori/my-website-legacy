import { Component } from 'preact';
import { route } from 'preact-router';

export default class Redirect extends Component<{to: string}>
{
	componentWillMount()
	{
		console.log(this.props);
		route(this.props.to, true);
	}

	render()
	{
		return null;
  	}
}
