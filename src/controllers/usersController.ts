import { Request, Response } from 'express';
import User, { IUser } from '../models/users';
import Address, { IAddress } from '../models/addresses';

const getUser = async (req: Request, res: Response): Promise<void> => {
  if (req.method === 'GET') {
    const { email } = req.params;

    if (email) {
      try {
        let user = (await User.findOne({
          email: email,
          isActive: true,
        })) as IUser;

        res.status(200).json({
          success: true,
          message: 'User fetched successfully!',
          data: { user: user },
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

const getUsers = async (req: Request, res: Response): Promise<void> => {
  if (req.method === 'GET') {
    const { skip, limit } = req.query;

    try {
      let users: IUser[] = await User.find({ isActive: true })
        .skip(Number(skip))
        .limit(Number(limit));

      res.status(200).json({
        success: true,
        message: 'Users fetched successfully!',
        data: { users: users },
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
      message: 'Request method is not allowed!',
    });
  }
};

const addAddress = async (req: Request, res: Response): Promise<void> => {
  if (req.method === 'POST') {
    const { email, address } = req.body;

    if (email && address) {
      try {
        const user = (await User.findOne({
          email: email,
          isActive: true,
        })) as IUser;

        const addressData: IAddress = new Address({
          user: user._id,
          address: address,
        });

        await addressData.save();

        const addresses: IAddress[] = await Address.find({ user: user._id });

        if (addresses.length === 1) {
          await Address.updateOne({ user: user._id }, { isActive: true });
        }

        res.status(200).json({
          success: true,
          message: 'Address added successfully!',
          data: { addresses: addresses },
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

const updateAddress = async (req: Request, res: Response): Promise<void> => {
  if (req.method === 'PUT') {
    const { email, addressId } = req.body;

    if (email && addressId) {
      try {
        let user = (await User.findOne({
          email: email,
          isActive: true,
        })) as IUser;

        const addresses: IAddress[] = await Address.find({ user: user._id });

        const updatedAddresses = addresses.map((address) => ({
          ...address.toObject(),
          isActive: address._id.toString() === addressId,
        }));

        await Address.updateMany({ user: user._id }, updatedAddresses);

        res.status(200).json({
          success: true,
          message: 'Address updated successfully!',
          data: { addresses: updatedAddresses },
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
  getUser,
  getUsers,
  addAddress,
  updateAddress,
};
