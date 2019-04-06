import React from 'react'

import Login from './Login';
import {Route, Switch} from 'react-router-dom';
import Registration from './Registration';


const NotFound = props => <h1>404, something went wrong</h1>


export default function Routes() {
	return (
		<React.Fragment>
			<Switch>
				<Route exact path="/" component={Login}/>
				<Route exact path="/registration" component={Registration} />
				<Route component ={NotFound} />
			</Switch>
		</React.Fragment>
	);
}