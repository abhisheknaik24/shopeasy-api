import Order from '../models/orders.js';

const getOrder = async (req, res) => {
  if (req.method === 'GET') {
    const { id } = req.params;
    if (id) {
      let order = await Order.findOne({ _id: id, isActive: true });
      res.status(200).json({
        success: true,
        message: 'Order fetched successfully!',
        data: { order: order },
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Request params is missing!',
      });
    }
  } else {
    res.status(400).json({
      success: false,
      message: 'Request method is not allowed!',
    });
  }
};

const getOrders = async (req, res) => {
  if (req.method === 'GET') {
    const { skip, limit } = req.query;
    let orders = await Order.find({ isActive: true }).skip(skip).limit(limit);
    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully!',
      data: { orders: orders },
    });
  } else {
    res.status(400).json({
      success: false,
      message: 'Request method is not allowed!',
    });
  }
};

const addOrder = async (req, res) => {
  if (req.method === 'POST') {
    const { user, product, quantity, grandTotal } = req.body;
    if ((user, product, quantity, grandTotal)) {
      let o = new Order({
        user: user,
        product: product,
        quantity: quantity,
        grandTotal: grandTotal,
      });
      await o.save();
      res.status(200).json({
        success: true,
        message: 'Order added successfully!',
        data: { order: o },
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Request body is missing!',
      });
    }
  } else {
    res.status(400).json({
      success: false,
      message: 'Request method is not allowed!',
    });
  }
};

export default {
  getOrder,
  getOrders,
  addOrder,
};
