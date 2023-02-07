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
    let products = await Product.find({ isActive: true });
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
    const { title, desc, price, discount, offers, policies, specs, features } =
      req.body;
    if ((title, desc, price, specs)) {
      let p = new Product({
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

const addProducts = async (req, res) => {
  if (req.method === 'POST') {
    if (req.body) {
      for (let i of req.body) {
        if ((i.title, i.desc, i.price, i.specs)) {
          let p = new Product({
            title: i.title,
            desc: i.desc,
            price: i.price,
            discount: i.discount,
            offers: i.offers ? i.offers : [],
            policies: i.policies ? i.policies : [],
            specs: i.specs,
            features: i.features ? i.features : [],
          });
          await p.save();
        }
      }
      let products = await Product.find({ isActive: true });
      res.status(200).json({
        success: true,
        message: 'Products added successfully!',
        data: { products: products },
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
    if ((id, title, desc, price, specs)) {
      let p = await Product.updateOne(
        { _id: id },
        {
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
  addProducts,
  updateProduct,
  deleteProduct,
};
