import React, { useState } from 'react';

import './Tab.css';

const TabItem = (props) => {
	return <div {...props} />;
};

const Tabs = (props) => {
	const [bindIndex, setBindIndex] = useState(props.defaultIndex);
	const changeTab = (newIndex) => {
		if (typeof props.onTabClick === 'function') props.onTabClick(newIndex);
		setBindIndex(newIndex);
	};
	const items = props.children.filter((item) => item.type.name === 'TabItem');

	return (
		<>
			<div className="tab-menu">
				{items.map(({ props: { index, label } }) => (
					<button
						type="button"
						key={index}
						onClick={() => changeTab(index)}
						className={bindIndex === index ? 'focus' : ''}
					>
						<p className="tab-menu__label">{label}</p>
					</button>
				))}
			</div>
			<div className="tab-view">
				{items.map(({ props }) => (
					<div
						{...props}
						className="tab-view_item"
						key={props.index}
						style={{ display: bindIndex === props.index ? 'block' : 'none' }}
					/>
				))}
			</div>
		</>
	);
};

export { TabItem, Tabs };
