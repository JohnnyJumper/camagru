import React, { Component } from 'react'
import axios from 'axios';

import { Paper } from '@material-ui/core';

import "../../styles/Picture.css";
export default class Picture extends Component {

	constructor(props) {
		super(props);

		this.state = {
			image: {}
		}
	}

	async componentDidMount() {
		const {id} = this.props.match.params;
		const response = await axios(`http://localhost:6357/api/picture/${id}`);
		console.log('response = ', response);
		if (response.data.success) {
			this.setState({image: {...response.data.data}});
		}
	}


	render() {
		return (
			<React.Fragment>
				<Paper className="picture">
					<img src={this.state.image.imagePath} alt="img" />
				</Paper>
				<Paper className="picture">
					Comment section
				</Paper>
			</React.Fragment>
		)
  	}
}
