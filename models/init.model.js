const Meal = require('./meals.model');
const Order = require('./orders.model');
const Restaurant = require('./restaurants.model');
const Review = require('./reviews.model');
const User = require('./user.model');

const initModel = () => {
  Restaurant.hasMany(Review);
  Review.belongsTo(Restaurant);

  Restaurant.hasMany(Meal);
  Meal.belongsTo(Restaurant);

  Meal.hasOne(Order);
  Order.belongsTo(Meal);

  User.hasMany(Review);
  Review.belongsTo(User);

  User.hasMany(Order);
  Order.belongsTo(User);
};

module.exports = initModel;
