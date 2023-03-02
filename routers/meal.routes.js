const { Router } = require('express');
const {
  createMeal,
  findMeals,
  findMeal,
  updateMeal,
  deleteMeal,
} = require('../controllers/meal.controller');
const { restrictTo, protect } = require('../middlewares/auth.middleware');
const {
  validRestaurantById,
  validMealById,
} = require('../middlewares/restaurant.middleware');

const router = Router();

router.get('/', findMeals);

router.get('/:id', validMealById, findMeal);

router.use(protect);

router.post('/:id', validRestaurantById, restrictTo('admin'), createMeal);

router.patch('/:id', validMealById, restrictTo('admin'), updateMeal);

router.delete('/:id', validMealById, restrictTo('admin'), deleteMeal);

module.exports = {
  mealsRouter: router,
};
