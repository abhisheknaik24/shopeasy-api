import Product from '../models/products.js';

const getProduct = async (req, res) => {
  if (req.method === 'GET') {
    const { id } = req.params;
    if (id) {
      let product = await Product.findOne({ _id: id, isActive: true });
      res.status(200).json({
        success: true,
        message: 'Product fetched successfully!',
        data: { product: product },
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

const getProducts = async (req, res) => {
  if (req.method === 'GET') {
    const { skip, limit } = req.query;
    let products = await Product.find({ isActive: true })
      .skip(skip)
      .limit(limit);
    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
      data: { products: products },
    });
  } else {
    res.status(400).json({
      success: false,
      message: 'Request method is not allowed!',
    });
  }
};

const addProduct = async (req, res) => {
  if (req.method === 'POST') {
    console.log(req.body);
    const { title, desc, price, discount, offers, policies, specs, features } =
      req.body;
    if ((req.file, title, desc, price, specs)) {
      let p = new Product({
        image: req.file.originalname,
        title: title,
        desc: desc,
        price: price,
        discount: discount,
        offers: offers ? offers : [],
        policies: policies ? policies : [],
        specs: specs,
        features: features ? features : [],
      });
      await p.save();
      res.status(200).json({
        success: true,
        message: 'Product added successfully!',
        data: { product: p },
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

const updateProduct = async (req, res) => {
  if (req.method === 'PUT') {
    const {
      id,
      title,
      desc,
      price,
      discount,
      offers,
      policies,
      specs,
      features,
    } = req.body;
    if ((id, req.file, image, title, desc, price, specs)) {
      let p = await Product.updateOne(
        { _id: id },
        {
          image: req.file.originalname,
          title: title,
          desc: desc,
          price: price,
          discount: discount,
          offers: offers ? offers : [],
          policies: policies ? policies : [],
          specs: specs,
          features: features ? features : [],
        }
      );
      res.status(200).json({
        success: true,
        message: 'Product updated successfully!',
        data: { product: p },
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

const deleteProduct = async (req, res) => {
  if (req.method === 'DELETE') {
    const { id } = req.params;
    if (id) {
      await Product.deleteOne({ _id: id });
      let products = await Product.find({ isActive: true });
      res.status(200).json({
        success: true,
        message: 'Product deleted successfully!',
        data: { products: products },
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

export default {
  getProduct,
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
};
