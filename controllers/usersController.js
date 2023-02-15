import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';
import User from '../models/users.js';

const getUser = async (req, res) => {
  if (req.method === 'GET') {
    const { email } = req.params;
    if (email) {
      let user = await User.findOne({ email: email, isActive: true });
      res.status(200).json({
        success: true,
        message: 'User fetched successfully!',
        data: { user: user },
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

const getUsers = async (req, res) => {
  if (req.method === 'GET') {
    const { skip, limit } = req.query;
    let users = await User.find({ isActive: true }).skip(skip).limit(limit);
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: { users: users },
    });
  } else {
    res.status(400).json({
      success: false,
      message: 'Request method is not allowed!',
    });
  }
};

const sendValidateEmailCode = async (email, code) => {
  try {
    if ((email, code)) {
      const transporter = await nodemailer.createTransport({
        host: process.env.EMAIL_SMTP_HOST,
        port: process.env.EMAIL_SMTP_PORT,
        secure: process.env.EMAIL_SECURE,
        auth: {
          user: process.env.EMAIL_AUTH_USER,
          pass: process.env.EMAIL_AUTH_PASS,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_AUTH_USER,
        to: email,
        subject: 'OTP code for shopeasy login',
        html: `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>OTP code for shopeasy login</title>
        </head>
        <body style="margin: 0px; background: #f8f8f8">
            <div width="100%"
                style="background: #f8f8f8; padding: 0px 0px; font-family: arial; line-height: 28px; height: 100%; width: 100%; color: #514d6a;">
                <div style="max-width: 700px; padding: 50px 0; margin: 0px auto; font-size: 14px;">
                    <div style="padding: 40px; background: #fff">
                        <table border="0" cellpadding="0" cellspacing="0" style="width: 100%">
                            <tbody>
                                <tr>
                                    <td>
                                        <b>Hi,</b>
                                        <p>Code : ${code}</p>
                                        <p style="margin: 0; padding: 0;"><b>Thanks & Regards,</b></p>
                                        <p style="margin: 0; padding: 0;"><b>Shopeasy Team</b></p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </body>
        </html>`,
      };

      await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return false;
        } else {
          return true;
        }
      });
    }
  } catch (error) {
    return false;
  }
};

const validateEmail = async (req, res) => {
  if (req.method === 'POST') {
    const { email } = req.body;
    if (email) {
      let code = Math.floor(100000 + Math.random() * 900000);
      await sendValidateEmailCode(email, code);
      res.status(200).json({
        success: true,
        message: 'Code fetched successfully!',
        data: { code: code },
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

const signIn = async (req, res) => {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    if ((email, password)) {
      let user = await User.exists({ email: email, isActive: true });
      if (user) {
        let u = await User.findOne({ email: email });
        let match = await bcrypt.compare(password, u.password);
        if (match) {
          res.status(200).json({
            success: true,
            message: 'User sign in successfully!',
            data: { user: u },
          });
        } else {
          res.status(400).json({
            success: false,
            message: 'Wrong password!',
          });
        }
      } else {
        res.status(400).json({
          success: false,
          message: 'User not sign up!',
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

const signUp = async (req, res) => {
  if (req.method === 'POST') {
    const { firstName, lastName, email, password } = req.body;
    if ((firstName, lastName, email, password)) {
      let user = await User.exists({ email: email, isActive: true });
      if (!user) {
        let salt = await bcrypt.genSalt(10);
        let hashPassword = await bcrypt.hash(password, salt);
        let u = new User({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: hashPassword,
        });
        await u.save();
        res.status(200).json({
          success: true,
          message: 'User sign up successfully!',
          data: { user: u },
        });
      } else {
        res.status(400).json({
          success: false,
          message: 'User already sign up!',
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

const addAddress = async (req, res) => {
  if (req.method === 'POST') {
    const { email, address } = req.body;
    if ((email, address)) {
      let user = await User.exists({ email: email, isActive: true });
      if (user) {
        let u = await User.findOne({ email: email, isActive: true });
        if (u.addresses.length <= 0) {
          await User.updateOne(
            { email: email },
            { $push: { addresses: { address: address, isSelected: true } } }
          );
        } else {
          await User.updateOne(
            { email: email },
            { $push: { addresses: { address: address } } }
          );
        }
        u = await User.findOne({ email: email, isActive: true });
        res.status(200).json({
          success: true,
          message: 'Address added successfully!',
          data: { user: u },
        });
      } else {
        res.status(400).json({
          success: false,
          message: 'User not sign up!',
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

const updateAddress = async (req, res) => {
  if (req.method === 'PUT') {
    const { email, id } = req.body;
    if ((email, id)) {
      let user = await User.exists({ email: email, isActive: true });
      if (user) {
        let u = await User.findOne({ email: email, isActive: true });
        u.addresses.filter((address) => {
          if (address._id.toString() === id) {
            return (address.isSelected = true);
          } else {
            return (address.isSelected = false);
          }
        });
        await u.save();
        u = await User.findOne({ email: email, isActive: true });
        res.status(200).json({
          success: true,
          message: 'Address added successfully!',
          data: { user: u },
        });
      } else {
        res.status(400).json({
          success: false,
          message: 'User not sign up!',
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
  validateEmail,
  signIn,
  signUp,
  addAddress,
  updateAddress,
};
