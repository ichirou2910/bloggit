import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';

import Avatar from '../UIElements/Avatar';
import Button from '../FormElements/Button';

import './Navigation.css';

const Navigation = () => {
	const auth = useContext(AuthContext);

	return (
		<div className="navigation">
			{auth.isLoggedIn && (
				<div className="navigation__user">
					<Link to={`/user/${auth.loginInfo.name}`}>
						<Avatar
							image={`${process.env.REACT_APP_HOST_URL}/${auth.loginInfo.avatar}`}
							height="3rem"
							width="3rem"
							border="0.25rem solid var(--light-secondary-color)"
						/>
					</Link>
				</div>
			)}
			{!auth.isLoggedIn && <Button to="/auth">JOIN!</Button>}
			{auth.isLoggedIn && (
				<Button danger onClick={auth.logout}>
					LOGOUT
				</Button>
			)}
		</div>
	);
};

export default Navigation;
