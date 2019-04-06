import React, { Component } from 'react';
import {Header, Footer} from './Components/Layouts';
import {BrowserRouter as Router} from 'react-router-dom';
import Routes from './Components/Routes';

class App extends Component {
	render() {
		return (
			<div className="app">
				<Router>
					<Header />
						<Routes />
					<Footer />
				</Router>
			</div>
		);
	}
}

export default App;
