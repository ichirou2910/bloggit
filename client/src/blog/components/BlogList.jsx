import React from 'react';

import BlogItem from './BlogItem';

import './BlogList.css';

const BlogList = (props) => {
	return (
		<div className="blog-list">
			<div className="blog-list__header">
				<h2>Latest Blogs</h2>
			</div>
			{!props.blogs || props.blogs.length === 0 ? (
				<p className="blog-list__empty">No blog written yet</p>
			) : (
				<ul className="blog-list__content">
					{props.blogs.map((blog, index) => (
						<BlogItem
							key={index}
							id={blog._id}
							user={blog.user}
							title={blog.title}
							cover={blog.cover}
							content={blog.content}
							date={blog.displayDate}
						/>
					))}
				</ul>
			)}
		</div>
	);
};

export default BlogList;
