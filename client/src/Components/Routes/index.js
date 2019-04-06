import React from 'react'

import Login from './Login';
import {Route, Switch} from 'react-router-dom';
import Registration from './Registration';
import Main from './Main';


const NotFound = props => <h1>404, something went wrong</h1>

const CheckAuth = ({auth, authentificate, PassC, FailC, ...rest}) => {
	if (auth)
		return <Route {...rest} render={props => <PassC {...props}/> }/>;
	return <Route {...rest} render={props => <FailC {...props} authentificate={authentificate}/> } />;
}

export default function Routes({auth, authentificate}) {
	return (
		<React.Fragment>
			<Switch>
				<CheckAuth auth={auth} PassC={Main} FailC={Login} path="/" authentificate={authentificate}/>
				<Route exact path="/registration" component={Registration} />
				<Route component ={NotFound} />
			</Switch>
		</React.Fragment>
	);
}