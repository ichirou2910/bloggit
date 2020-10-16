import React, { useState, useEffect, createRef } from 'react';
import { Link } from 'react-router-dom';
import { useHttpClient } from '../../shared/hooks/http-hook';

import Avatar from '../../shared/components/UIElements/Avatar';
import Card from '../../shared/components/UIElements/Card';
import './CommentItem.css';

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

const CommentItem = (props) => {
	const [avatar, setAvatar] = useState();

	const { isLoading, error, sendRequest } = useHttpClient();

	const activeCmt = createRef(null);

	useEffect(() => {
		if (activeCmt.current) {
			scrollToRef(activeCmt);
		}
	}, [activeCmt]);

	useEffect(() => {
		const fetchAvt = async () => {
			try {
				const avt = await sendRequest(
					`${process.env.REACT_APP_API_URL}/user/avatar/${props.user}`
				);
				setAvatar(avt);
			} catch (err) {
				console.log(err);
			}
		};
		fetchAvt();
	}, [sendRequest, props.user]);

	return (
		<>
			<li className="comment-item" ref={activeCmt}>
				{error && <p>{error}</p>}
				{!isLoading && avatar && (
					<>
						<Card
							className={`comment-item__card ${
								props.active && 'card--active'
							} card--lighter`}
						>
							<Link to={`/user/${props.user}`}>
								<Avatar
									small
									image={`${process.env.REACT_APP_HOST_URL}/${avatar}`}
									alt={`${props.user}'s avatar`}
								/>
							</Link>
							<div className="comment-item__info">
								<p className="comment-item__user">
									<strong>{props.user}</strong>
								</p>
								<p className="comment-item__content">{props.content}</p>
								<p className="comment-item__time">
									<em>{props.time}</em>
								</p>
							</div>
						</Card>
					</>
				)}
			</li>
		</>
	);
};

export default CommentItem;
