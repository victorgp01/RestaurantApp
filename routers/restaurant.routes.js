const { Router } = require('express');
const { check } = require('express-validator');
const {
  getRestaurants,
  getRestaurantById,
  createRestaurant,
  createReviewRestaurant,
  updateRestaurant,
  updateReviewRestaurant,
  deleteRestaurant,
  deleteReviewRestaurant,
} = require('../controllers/restasurant.controller');
const {
  protect,
  restrictTo,
  protectAccountOwner,
} = require('../middlewares/auth.middleware');
const {
  validRestaurantById,
  validReviewById,
} = require('../middlewares/restaurant.middleware');
const { validateFields } = require('../middlewares/validateField.middleware');

const router = Router();

router.get('/', getRestaurants);

router.get('/:id', validRestaurantById, getRestaurantById);

router.post(
  '/',
  [
    check('name', 'The name Restaurant is require').not().isEmpty(),
    check('address', 'The address Restaurant is require').not().isEmpty(),
    check('rating', 'The rating Restaurant is require').not().isEmpty(),
    validateFields,
    protect,
    restrictTo('admin'),
  ],
  createRestaurant
);

router.use(protect);

router.post(
  '/reviews/:id',
  validRestaurantById,
  restrictTo('client'),
  createReviewRestaurant
);

router.patch(
  '/:id',
  [
    check('name', 'The name Restaurant is require').not().isEmpty(),
    check('address', 'The address Restaurant is require').not().isEmpty(),
    validateFields,
    validRestaurantById,
    restrictTo('admin'),
  ],
  updateRestaurant
);
router.patch(
  '/reviews/:restaurantid/:id',
  [
    check('comment', 'The comment is require').not().isEmpty(),
    check('rating', 'The rating Restaurant is require').not().isEmpty(),
    validateFields,
    validReviewById,
    validRestaurantById,
    restrictTo('client'),
    protectAccountOwner,
  ],
  updateReviewRestaurant
);

router.delete(
  '/:id',
  validRestaurantById,
  restrictTo('admin'),
  deleteRestaurant
);
router.delete(
  '/reviews/:restaurantid/:id',
  validRestaurantById,
  validReviewById,
  protectAccountOwner,
  restrictTo('client'),
  deleteReviewRestaurant
);

module.exports = {
  restaurantsRouter: router,
};
