const Meal = require('../models/meals.model');
const Restaurant = require('../models/restaurants.model');
const catchAsync = require('../utils/catchAsync');

exports.createMeal = catchAsync(async (req, res, next) => {
  const { name, price } = req.body;
  const { restaurant } = req;

  const newMeal = await Meal.create({
    name: name.toLowerCase(),
    price,
    restaurant: restaurant.id,
  });

  res.status(201).json({
    status: 'success',
    message: 'The meal was created',
    newMeal,
  });
});

exports.findMeals = catchAsync(async (req, res, next) => {
  const meals = await Meal.findAll({
    where: {
      status: 'active',
    },
    include: [
      {
        model: Restaurant,
      },
    ],
  });

  res.status(200).json({
    status: 'success',
    message: 'The meals found',
    meals,
  });
});

exports.findMeal = catchAsync(async (req, res, next) => {
  const { meal } = req;

  res.status(200).json({
    status: 'success',
    message: 'The meal found',
    meal,
  });
});

exports.updateMeal = catchAsync(async (req, res, next) => {
  const { meal } = req;
  const { name, price } = req.body;

  const updatedMeal = await meal.update({
    name: name.toLowerCase(),
    price,
  });

  res.status(200).json({
    status: 'success',
    message: 'Then meal has been updated',
    updatedMeal,
  });
});

exports.deleteMeal = catchAsync(async (req, res, next) => {
  const { meal } = req;

  await meal.update({ status: 'deseable' });

  res.status(200).json({
    status: 'sucsses',
    message: 'The Meal Delete',
  });
});
