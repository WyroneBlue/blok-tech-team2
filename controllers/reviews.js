const { User, Restaurant, Review } = require('../models');
let session;

const index = (req, res) => {

	session = req.session;

	const promises = [
		Restaurant.findOne({slug: req.params.slug}).lean(), 
		Review.find({ restaurant_slug: req.params.slug}).populate("user").sort({ created: -1 }).lean()
	];
	
	Promise.all(promises)
		.then(result => {
			const [restaurant, reviews] = result;

			const page = {
				title: `${restaurant.name} reviews`
			};

			res.status(200).render('restaurants/reviews/index', { 
				page: page,
				authUser: session.authUser,
				restaurant: restaurant,
				reviews: reviews,
			});
		});
};

const form = (req, res) => {
	Promise.all([Restaurant.findOne({slug: req.params.slug}).lean()])
		.then(result => {
			const [restaurant] = result;

			const page = {
				title: `Rate ${restaurant.name}`
			};

			res.status(200).render('restaurants/reviews/new', { 
				page: page,
				restaurant: restaurant,
			});
		});
};

const save = (req, res) => {

	session = req.session;
	
	Promise.all([User.findOne({username: session.authUser.username}).lean()])
		.then(result => {
			const [user] = result;

			const input = req.body;
			const form = {
				restaurant_slug: req.params.slug,
				user_id: user._id,
				rating: input.rating,
				remark: input.remark,
				anon: input.anon === 'on' ? true : false,
				user: user
			};

			const review = new Review(form);
		
			review.save((err) => {
				if (err) return handleError(err);
				res.redirect(`/restaurants/${form.restaurant_slug}/reviews`);
			});
		});
};

const show = (req, res) => {

	const promises = [
		Restaurant.findOne({slug: req.params.slug}).lean(),
		Review.findOne({_id: req.params.id}).lean(),
	];

	Promise.all(promises)
		.then(result => {
			const [restaurant, review] = result;

			const page = {
				title: `Rate ${restaurant.name}`
			};

			res.status(200).render('restaurants/reviews/edit', { 
				page: page,
				restaurant: restaurant,
				review: review,
			});
		});
};

const edit = async(req, res) => {

	const input = req.body;
	
	await Review.findByIdAndUpdate(req.params.id, {
		rating: input.rating,
		anon: input.anon === 'on' ? true : false,
		remark: input.remark,
	});

	res.redirect(`/restaurants/${req.params.slug}/reviews`);
};

module.exports = {
	index: index,
	form: form,
	save: save,
	show: show,
	edit: edit,
};