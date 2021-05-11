import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Details from './components/Details';
import CvList from './components/CvList';
import { PrivateRoute } from './components/PrivateRoute';
import SignUp from './components/Signup';


function App() {

	return (
		<Router>
			<div className="App">
				<Switch>
					<PrivateRoute exact path="/" component={Home} />
					<Route path="/login" component={Login} />
					<Route path="/signup" component={SignUp} />
					<PrivateRoute path="/cvs" component={CvList} />
					<PrivateRoute path="/details" component={Details} />
					<Redirect from="*" to="/" />
				</Switch>
			</div>
		</Router>
	);
}

export default App;
