import React, { useState, useEffect, useContext } from 'react';
import { Helmet } from 'react-helmet';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';

import ContentFeeds from '../../blog/components/ContentFeeds';
import Cover from '../../shared/components/UIElements/Cover';
import Bloggit from '../../shared/components/UIElements/Bloggit';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import './MainPage.css';

const MainPage = () => {
	const [blogList, setBlogList] = useState();
	const [actList, setActList] = useState();

	const auth = useContext(AuthContext);

	const { isLoading, error, sendRequest } = useHttpClient();

	useEffect(() => {
		const fetchInfo = async () => {
			try {
				const blogData = await sendRequest(
					`${process.env.REACT_APP_API_URL}/blog/`
				);
				setBlogList(blogData);
			} catch (err) {
				console.log(err);
			}

			try {
				const actData = await sendRequest(
					`${process.env.REACT_APP_API_URL}/activity/`
				);

				setActList(actData);
			} catch (err) {
				console.log(err);
			}
		};
		fetchInfo();
	}, [sendRequest]);

	return (
		<>
			<Helmet>
				<title>{'Bloggit - Main Page'}</title>
			</Helmet>
			<div className="main-page">
				{isLoading && <LoadingSpinner asOverlay />}
				{error && <p>{error}</p>}
				{auth.isLoggedIn && <Bloggit />}
				{!isLoading && (
					<>
						<Cover
							banner
							image={`${process.env.REACT_APP_HOST_URL}/uploads/images/landing-wallpaper.png`}
							alt="Main Page Cover"
						/>
						<ContentFeeds blogs={blogList} activities={actList} />
					</>
				)}
			</div>
		</>
	);
};

export default MainPage;
