import React, { Suspense } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch,
} from 'react-router-dom';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';

import MainNavigation from './shared/components/Navigation/MainNavigation';
import MainPage from './shared/pages/MainPage';
import NewBlog from './blog/pages/NewBlog';
import EditBlog from './blog/pages/EditBlog';
import LoadingSpinner from './shared/components/UIElements/LoadingSpinner';

import './App.css';

const Auth = React.lazy(() => import('./user/pages/Auth'));
const UserPage = React.lazy(() => import('./user/pages/UserPage'));
const EditUser = React.lazy(() => import('./user/pages/EditUser'));
const BlogPage = React.lazy(() => import('./blog/pages/BlogPage'));

const App = () => {
	const { token, login, logout, loginInfo, setInfo } = useAuth();

	let routes;

	if (token) {
		routes = (
			<Switch>
				<Route path="/" exact>
					<MainPage />
				</Route>
				<Route path="/user/:userName/edit">
					<EditUser />
				</Route>
				<Route path="/user/:userName">
					<UserPage />
				</Route>
				<Route path="/blog/create" exact>
					<NewBlog />
				</Route>
				<Route path="/blog/:blogId/edit" exact>
					<EditBlog />
				</Route>
				<Route path="/blog/:blogId">
					<BlogPage />
				</Route>
				<Redirect to="/" />
			</Switch>
		);
	} else {
		routes = (
			<Switch>
				<Route path="/" exact>
					<MainPage />
				</Route>
				<Route path="/user/:userName">
					<UserPage />
				</Route>
				<Route path="/blog/:blogId">
					<BlogPage />
				</Route>
				<Route path="/auth">
					<Auth />
				</Route>
				<Redirect to="/auth" />
			</Switch>
		);
	}

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn: !!token,
				token: token,
				loginInfo: loginInfo,
				login: login,
				logout: logout,
				setInfo: setInfo,
			}}
		>
			<Router>
				<MainNavigation />
				<main>
					<Suspense
						fallback={
							<div>
								<LoadingSpinner />
							</div>
						}
					>
						{routes}
					</Suspense>
				</main>
			</Router>
		</AuthContext.Provider>
	);
};

export default App;
