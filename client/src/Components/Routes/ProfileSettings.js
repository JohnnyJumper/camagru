import React, { Component } from 'react'
import axios from 'axios';


import {Paper, Grid, TextField, Button} from '@material-ui/core';

const styles = {
	Grid: {
		marginTop: 20
	}
}

export default class ProfileSettings extends Component {

	constructor(props) {
		super(props);

		this.state = {
			nickname: '',
			email: '',
			password: ''
		}
	}

	handleChange = (e) => this.setState({[e.target.name]: e.target.value});

	handleEdit = async () => {
		const {nickname, email, password} = this.state;
		const response = await axios.post("http://localhost:6357/api/editProfile", {nickname, email, password});
		if (email !== '')
			return this.props.history.push('/');
		window.location.reload();
		console.log(response);
	}

	render() {
		return (
			<Paper>
				<Grid container alignItems="center" direction="column" style={styles.Grid}>
					<Grid item>
						<TextField
						id="standard-textarea"
						label="nickname"
						placeholder="nickname"
						style={styles.textField}
						margin="normal"
						value={this.state.nickname}
						name="nickname"
						onChange={this.handleChange}
						/>
					</Grid>	
					<Grid item>
						<TextField
						id="standard-textarea"
						label="email"
						placeholder="email"
						style={styles.textField}
						margin="normal"
						value={this.state.email}
						name="email"
						onChange={this.handleChange}
						/>
					</Grid>
					<Grid item>
				<TextField
					id="standard-password-input"
					label="Password"
					placeholder="password"
					style={styles.textField}
					type="password"
		  			autoComplete="current-password"
					margin="normal"
					name="password"
					value={this.state.password}
					onChange={this.handleChange}
				/>
			</Grid>
					<Grid item>
						<Button color="primary" onClick={this.handleEdit} size="large">
							Edit
						</Button>
					</Grid>
				</Grid>
			</Paper>
		)
	}
}
