const db = require('../helpers/db');
const Comment = db.Comment;

const create = async (req, res, next) => {
	const comment = new Comment({
		user: req.body.user,
		blog_id: req.body.blog_id,
		content: req.body.content,
		date: Date.parse(req.body.date),
		displayDate: req.body.displayDate,
	});

	try {
		await comment.save();
	} catch (err) {
		res.status(500).json({ message: 'Comment creating failed' });
		return next(error);
	}

	res.status(201).json(comment);
};

const getByBlog = async (req, res, next) => {
	let comments;
	try {
		comments = await Comment.find({ blog_id: req.params.blog_id });
	} catch (err) {
		res.status(500).json({ message: 'Fetch failed' });
		return next(error);
	}

	if (!comments) {
		res.status(404).json({ message: 'No comment found' });
		return next(error);
	}

	res.json(comments);
};

exports.create = create;
exports.getByBlog = getByBlog;
