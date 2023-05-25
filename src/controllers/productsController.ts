import { Request, Response } from 'express';
import Product, { IProduct } from '../models/products';

const getProduct = async (req: Request, res: Response): Promise<void> => {
  if (req.method === 'GET') {
    const { id } = req.params;

    if (id) {
      try {
        let product = (await Product.findOne({
          _id: id,
          isActive: true,
        })) as IProduct;

        res.status(200).json({
          success: true,
          message: 'Product fetched successfully!',
          data: { product: product },
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

const getProducts = async (req: Request, res: Response): Promise<void> => {
  if (req.method === 'GET') {
    const { skip, limit } = req.query;

    try {
      const products: IProduct[] = await Product.find({ isActive: true })
        .skip(Number(skip))
        .limit(Number(limit));

      res.status(200).json({
        success: true,
        message: 'Products fetched successfully!',
        data: { products: products },
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

const filterProducts = async (req: Request, res: Response): Promise<void> => {
  if (req.method === 'POST') {
    const { skip, limit } = req.query;

    const { minPrice, maxPrice } = req.body;

    if (minPrice && maxPrice) {
      try {
        let products: IProduct[] = await Product.find({
          price: { $lte: maxPrice },
          isActive: true,
        })
          .skip(Number(skip))
          .limit(Number(limit));

        res.status(200).json({
          success: true,
          message: 'Products fetched successfully!',
          data: { products: products },
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

const addProduct = async (req: Request, res: Response): Promise<void> => {
  if (req.method === 'POST') {
    const { category, name, description, price } = req.body;

    if (req.file && category && name && description && price) {
      try {
        const product: IProduct = new Product({
          category: category,
          image: req.file.originalname,
          name: name,
          description: description,
          price: price,
        });

        await product.save();

        res.status(200).json({
          success: true,
          message: 'Product added successfully!',
          data: { product: product },
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

const updateProduct = async (req: Request, res: Response) => {
  if (req.method === 'PUT') {
    const { id, category, name, description, price } = req.body;

    if (id && req.file && category && name && description && price) {
      try {
        let product = (await Product.updateOne(
          { _id: id },
          {
            category: category,
            image: req.file.originalname,
            name: name,
            description: description,
            price: price,
          }
        )) as unknown as IProduct;

        res.status(200).json({
          success: true,
          message: 'Product updated successfully!',
          data: { product: product },
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

const deleteProduct = async (req: Request, res: Response) => {
  if (req.method === 'DELETE') {
    const { id } = req.params;

    if (id) {
      try {
        await Product.deleteOne({ _id: id });

        let products: IProduct[] = await Product.find({ isActive: true });

        res.status(200).json({
          success: true,
          message: 'Product deleted successfully!',
          data: { products: products },
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

export default {
  getProduct,
  getProducts,
  filterProducts,
  addProduct,
  updateProduct,
  deleteProduct,
};
