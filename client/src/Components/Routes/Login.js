import React, { Component } from 'react'
import {Typography, Grid, TextField, Button} from '@material-ui/core';
import axios from 'axios';


const styles= {
	Grid: {
		marginTop: 20
	},
	textField: {
		width: 200
	}
}

export default class Login extends Component {

	constructor() {
		super();

		this.state = {
			login: '',
			password: ''
		}
	}

	handleChange = (e) => this.setState({[e.target.name]: e.target.value});
	
	handleLogin = async (e) => {
		e.preventDefault();
		const {login, password} = this.state;
		const response = await axios.post("http://localhost:6357/auth/login", {email:login, password});
		const {data: {accessToken, success}} = await response;
		if (success) {
			localStorage.setItem('camagru-access', accessToken);
			this.props.authentificate(true);
			this.props.history.push('/main');
		}
	}

	render() {
		return (
		<Grid container alignItems="center" direction="column" style={styles.Grid}>
			<Grid item>
				<Typography variant="headline" >
					Welcome!
				</Typography>
			</Grid>
			<Grid item>
				<TextField
					id="standard-textarea"
					label="Login"
					placeholder="email"
					style={styles.textField}
					margin="normal"
					value={this.state.login}
					name="login"
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
				<Button color="primary" onClick={this.handleLogin}>
					Login
				</Button>
			</Grid>
		</Grid>
	)
  }
}
