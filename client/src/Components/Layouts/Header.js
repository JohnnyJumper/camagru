import React from 'react'
import {AppBar, Toolbar, IconButton, Typography, Button} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import {Link} from 'react-router-dom';

const styles = {
	Menu: {
		marginLeft: -12,
		marginRight: 20
	},
	Name: {
		flexGrow: 1
	},
	Container: {
		flexGrow: 1
	},
	Links: {
		color: "inherit",
		textDecoration: "none"
	}
}

export default function Header({auth}) {
	return (
		<div style={styles.Container}>
			<AppBar position="static">
				<Toolbar>
					<IconButton  color="inherit" aria-label="Menu" style={styles.Menu}>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" color="inherit"  style={styles.Name}>
						Camagaru
					</Typography>
						<Button color="inherit" component={Link} to="/">		
								Login
						</Button>
						<Button color="inherit" component={Link} to="/registration">		
								Registration
						</Button>
				</Toolbar>
			</AppBar>
		</div>
	)
}
