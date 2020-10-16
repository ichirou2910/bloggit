import React from 'react';

import ActivityItem from './ActivityItem';

import './ActivityList.css';

const ActivityList = (props) => {
	return (
		<div className="activity-list">
			<div className="activity-list__header">
				<h2>Activities</h2>
			</div>
			{!props.activities || props.activities.length === 0 ? (
				<p className="activity-list__empty">No activity so far</p>
			) : (
				<ul className="activity-list__content">
					{props.activities.map((item, index) => {
						return (
							<ActivityItem
								key={index}
								user={item.user}
								blogId={item.blogId}
								action={item.type === 'comment' ? 'commented on' : 'posted'}
								actionId={item.actionId || null}
								title={item.title}
							/>
						);
					})}
				</ul>
			)}
		</div>
	);
};

export default ActivityList;
