import { Request, Response } from 'express';
import User, { IUser } from '../models/users';
import Order, { IOrder } from '../models/orders';
import OrderItem, { IOrderItem } from '../models/orderItems';

const getOrders = async (req: Request, res: Response): Promise<void> => {
  if (req.method === 'GET') {
    const { email } = req.params;

    if (email) {
      try {
        let user = (await User.findOne({
          email: email,
          isActive: true,
        })) as IUser;

        let orders: IOrder[] = await Order.find({
          user: user._id,
          isActive: true,
        }).populate('orders');

        res.status(200).json({
          success: true,
          message: 'Orders fetched successfully!',
          data: { orders: orders },
        });
      } catch (error: any) {
        res.status(400).json({
          success: false,
          message: String(error),
        });
      }
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

const addOrder = async (req: Request, res: Response): Promise<void> => {
  if (req.method === 'POST') {
    const { email, products, grandTotal, paymentOption, isPayment } = req.body;

    if (email && products && grandTotal && paymentOption && isPayment) {
      try {
        let user = (await User.findOne({
          email: email,
          isActive: true,
        })) as IUser;

        let orders = [];

        for (let product of products) {
          const orderItem: IOrderItem = new OrderItem({
            product: product._id,
            quantity: product.quantity,
          });

          await orderItem.save();

          orders.push(orderItem);
        }

        const order: IOrder = new Order({
          user: user._id,
          orders: orders,
          grandTotal: grandTotal,
          paymentOption: paymentOption,
          isPayment: isPayment,
        });

        await order.save();

        res.status(200).json({
          success: true,
          message: 'Order added successfully!',
          data: { order: order },
        });
      } catch (error: any) {
        res.status(400).json({
          success: false,
          message: String(error),
        });
      }
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
  getOrders,
  addOrder,
};
