import React, { Component } from 'react'
import {Typography, Grid, TextField, Button} from '@material-ui/core';

const styles= {
	Grid: {
		marginTop: 20
	},
	textField: {
		width: 200
	}
}

export default class Login extends Component {
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
				/>
			</Grid>
			<Grid item>
				<Button color="primary">
					Login
				</Button>
			</Grid>
		</Grid>
	)
  }
}
