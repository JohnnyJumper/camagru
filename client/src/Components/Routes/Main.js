import React, { Component } from 'react'
import axios from 'axios';
import checkStatus from '../../helpers';


export default class Main extends Component {

	async componentDidMount() {
		const response = await axios('http://localhost:6357/auth/checkAuth');
		const {data: {success}} = await response;
		const options = {success, history: this.props.history};
		checkStatus(options);		

	}

	render() {
		return (
		  <div>
			  This is main app
		  </div>
		)
	}
}
