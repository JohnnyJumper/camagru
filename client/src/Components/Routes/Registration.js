import React from 'react'
import {Grid, Typography, Button, TextField} from '@material-ui/core';
import axios from 'axios';

const styles= {
	Grid: {
		marginTop: 20
	},
}

export default class Registration extends React.Component {

	constructor() {
		super();
		this.state = {
			email: '',
			password: '',
			repassword: '',
		}
	}

	handleChange = e => this.setState({[e.target.name]: e.target.value});

	handleSubmit = async (e) => {
		e.preventDefault();
		console.log(`ready to submit ${this.state.email} and ${this.state.password}`);
		const {email, password} = this.state;
		const response = await axios.post('http://localhost:6357/auth/reg', {email, password});
		console.log('response = ', response);
		
		
		
		return this.props.history.push('/');
	}

	render() {
		return (
				<Grid container alignItems="center" direction="column" style={styles.Grid}>
					<Grid item>
						<Typography variant="headline" >
							Registration
						</Typography>
					</Grid>
					<Grid item>
						<TextField
							id="standard-textarea"
							label="Email"
							placeholder="email"
							name="email"
							value={this.state.email}
							onChange={this.handleChange}
							style={styles.textField}
							margin="normal"
						/>
					</Grid>
					<Grid item>
						<TextField
							error = {this.state.password !== this.state.repassword && this.state.repassword!==''}
							id="standard-password-input"
							label="Password"
							placeholder="password"
							style={styles.textField}
							type="password"
							name="password"
							value={this.state.password}
							onChange={this.handleChange}
							autoComplete="current-password"
							margin="normal"
						/>
					</Grid>
					<Grid item>
						<TextField
							error = {this.state.password !== this.state.repassword}
							label="Repeat-password"
							placeholder="password"
							style={styles.textField}
							name="repassword"
							value={this.state.repassword}
							onChange={this.handleChange}
							type="password"
							autoComplete="current-password"
							margin="normal"
						/>
					</Grid>
					<Grid item>
						<Button color="primary" onClick={this.handleSubmit}>
							Registrate
						</Button>
					</Grid>
				</Grid>
			)
		}
}
