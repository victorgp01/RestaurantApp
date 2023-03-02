const Meal = require('../models/meals.model');
const Order = require('../models/orders.model');
const Restaurant = require('../models/restaurants.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.createOrder = catchAsync(async (req, res, next) => {
  const { quantity, mealId } = req.body;
  const { sessionUser } = req;

  const meal = await Meal.findOne({
    where: {
      id: mealId,
      status: 'active',
    },
  });

  if (!meal) {
    return next(new AppError('Order not fount', 400));
  }

  const totalPrice = meal.price * quantity;

  const newOrder = await Order.create({
    quantity,
    mealId: meal.id,
    totalPrice,
    userId: sessionUser.id,
  });

  res.status(201).json({
    status: 'success',
    message: 'The order was create',
    newOrder: {
      id: newOrder.id,
      mealId: newOrder.mealId,
      totalPrice: newOrder.totalPrice,
      quantity: newOrder.quantity,
      userId: newOrder.userId,
      status: newOrder.status,
    },
  });
});

exports.findAllOrder = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  const orders = await Order.findAll({
    where: {
      userId: sessionUser.id,
      status: 'active',
    },
    include: [
      {
        model: Meal,
        include: [
          {
            model: Restaurant,
          },
        ],
      },
    ],
  });

  res.status(200).json({
    status: 'success',
    message: 'The orders found',
    orders,
  });
});

exports.updateOrder = catchAsync(async (req, res, next) => {
  const { orders } = req;

  const updatedOrders = await orders.update({
    status: 'completed',
  });
  res.status(200).json({
    status: 'success',
    message: 'The order has been completed',
    updatedOrders,
  });
});

exports.deleteOrder = catchAsync(async (req, res, next) => {
  const { orders } = req;

  await orders.update({ status: 'cancelled' });

  res.status(200).json({
    status: 'success',
    message: 'The order has been cancelled',
  });
});
