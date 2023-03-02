const Meal = require('../models/meals.model');
const Order = require('../models/orders.model');
const Restaurant = require('../models/restaurants.model');
const Review = require('../models/reviews.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.validRestaurantById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const restaurant = await Restaurant.findOne({
    where: {
      status: 'active',
      id,
    },
    include: [
      {
        model: Review,
        where: {
          status: 'active',
        },
      },
    ],
  });

  if (!restaurant) {
    return next(new AppError('Restaurant not found', 400));
  }

  req.restaurant = restaurant;
  next();
});

exports.validReviewById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const review = await Review.findOne({
    where: {
      id,
      status: 'active',
    },
  });

  if (!review) {
    return next(new AppError('Review not found', 400));
  }

  req.review = review;
  next();
});

exports.validOrderById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const order = await Order.findOne({
    where: {
      id,
      status: 'active',
    },
  });

  if (!order) {
    return next(new AppError('Order not found', 400));
  }

  req.order = order;
  next();
});

exports.validMealById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const meal = await Meal.findOne({
    where: {
      id,
      status: 'active',
    },
    include: [
      {
        model: Restaurant,
      },
    ],
  });

  if (!meal) {
    return next(new AppError('Review not found', 400));
  }

  req.meal = meal;
  next();
});

exports.validUserOrderId = catchAsync(async (req, res, next) => {
  const { sessionUser, order } = req;

  if (sessionUser.id !== order.userId) {
    return next(
      new AppError('You do not have permission to execute this action', 404)
    );
  }
  next();
});
