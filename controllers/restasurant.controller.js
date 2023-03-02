const Restaurant = require('../models/restaurants.model');
const Review = require('../models/reviews.model');
const catchAsync = require('../utils/catchAsync');

exports.getRestaurants = catchAsync(async (req, res, next) => {
  const restaurants = await Restaurant.findAll({
    where: {
      status: 'active',
    },
    include: [
      {
        model: Review,
        where: { status: 'active' },
      },
    ],
  });

  res.status(200).json({
    status: 'sucsses',
    message: 'Found all Restaurants',
    restaurants,
  });
});

exports.getRestaurantById = catchAsync(async (req, res, next) => {
  const { restaurant } = req;

  res.status(200).json({
    status: 'sucsses',
    message: 'The Resturant has been found ',
    restaurant,
  });
});

exports.createRestaurant = catchAsync(async (req, res, next) => {
  const { name, address, rating } = req.body;

  const newRestaurant = await Restaurant.create({
    name: name.toLowerCase(),
    address: address.toLowerCase(),
    rating,
  });

  res.status(200).json({
    status: 'sucsses',
    message: 'The Restaurant has been created',
    newRestaurant,
  });
});

exports.createReviewRestaurant = catchAsync(async (req, res, next) => {
  const { comment, rating } = req.body;
  const { restaurant, sessionUser } = req;

  const newReview = await Review.create({
    restautantId: restaurant.id,
    rating,
    userId: sessionUser.id,
    comment,
  });

  res.status(200).json({
    status: 'sucsses',
    message: 'review has been created ',
    newReview: {
      id: newReview.id,
      restaurantId: newReview.restaurantId,
      userId: newReview.userId,
      status: newReview.status,
      rating: newReview.rating,
      comment: newReview.comment,
    },
  });
});

exports.updateRestaurant = catchAsync(async (req, res, next) => {
  const { name, address } = req.body;
  const { restaurant } = req;

  const updateRestaurant = await restaurant.update({
    name: name.toLowerCase(),
    address: address.toLowerCase(),
  });

  res.status(201).json({
    status: 'sucsses',
    message: 'Updated restaurant',
    updateRestaurant,
  });
});

exports.updateReviewRestaurant = catchAsync(async (req, res, next) => {
  const { comment, rating } = req.body;
  const { restaurant, sessionUser, review } = req;

  const updateReview = await review.update({
    rating,
    comment: comment.toLowerCase(),
    restaurantId: restaurant.id,
    userId: sessionUser.id,
  });

  res.status(200).json({
    status: 'sucsses',
    message: 'review has been update ',
    updateReview: {
      id: updateReview.id,
      userId: updateReview.userId,
      restaurantId: updateReview.restaurantId,
      comment: updateReview.comment,
      rating: updateReview.rating,
      status: updateReview.status,
    },
  });
});

exports.deleteRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;
  await restaurant.update({
    status: 'disable',
  });

  res.status(200).json({
    status: 'sucsses',
    message: 'The restaurant has been deleted',
  });
});

exports.deleteReviewRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant, sessionUser, review } = req;
  await review.update({
    restaurantId: restaurant.id,
    userId: sessionUser.id,
    status: 'disable',
  });

  res.status(200).json({
    status: 'sucsses',
    message: 'Review has been deleted',
  });
});
