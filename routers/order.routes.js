const { Router } = require('express');
const {
  createOrder,
  updateOrder,
  deleteOrder,
  findAllOrder,
} = require('../controllers/order.controller');
const { protect } = require('../middlewares/auth.middleware');
const {
  validUserOrderId,
  validOrderById,
} = require('../middlewares/restaurant.middleware');

const router = Router();

router.use(protect);

router.get('/me', findAllOrder);

router.post('/', createOrder);

router.patch('/:id', validOrderById, validUserOrderId, updateOrder);

router.delete('/:id', validOrderById, validUserOrderId, deleteOrder);

module.exports = {
  ordersRouter: router,
};
