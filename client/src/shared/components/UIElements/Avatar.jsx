import React from 'react';

import './Avatar.css';

const Avatar = (props) => {
	return (
		<div
			className={`avatar ${props.small ? 'avatar--small' : ''} ${
				props.medium ? 'avatar--medium' : ''
			} ${props.large ? 'avatar--large' : ''}`}
			style={props.style}
		>
			<img
				src={props.image}
				alt={props.alt}
				style={{
					width: props.width,
					height: props.height,
					border: props.border,
				}}
			/>
		</div>
	);
};

export default Avatar;
