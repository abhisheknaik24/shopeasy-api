import nodemailer, { Transporter } from 'nodemailer';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import User, { IUser } from '../models/users';
import Otp, { IOtp } from '../models/otps';

const signIn = async (req: Request, res: Response): Promise<void> => {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    if (email && password) {
      try {
        const userExists = await User.exists({ email: email, isActive: true });

        if (userExists) {
          const user = (await User.findOne({ email: email })) as IUser;
          const match = await bcrypt.compare(password, user.password!);

          if (match) {
            const token = jwt.sign(
              { email: user.email },
              process.env.JWT_SECRET as string,
              {
                expiresIn: '1h',
              }
            );

            res.status(200).json({
              success: true,
              message: 'User sign in successfully!',
              data: { token: token },
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

interface MailOptions {
  from: string;
  to: string;
  subject: string;
  html: string;
}

const sendValidateEmailCode = async (
  email: string,
  otp: number
): Promise<boolean> => {
  try {
    if (email && otp) {
      const transporter: Transporter<any> = nodemailer.createTransport({
        host: process.env.EMAIL_SMTP_HOST as string,
        port: (Number(process.env.EMAIL_SMTP_PORT) as number) || 456,
        secure: process.env.EMAIL_SECURE === ('true' as string),
        auth: {
          user: process.env.EMAIL_AUTH_USER as string,
          pass: process.env.EMAIL_AUTH_PASS as string,
        },
      });

      const mailOptions: MailOptions = {
        from: process.env.EMAIL_AUTH_USER as string,
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
                                        <p>OTP : ${otp}</p>
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

      const result = await transporter.sendMail(mailOptions);

      return result.accepted.length > 0;
    }

    return false;
  } catch (error: any) {
    return false;
  }
};

const signUp = async (req: Request, res: Response): Promise<void> => {
  if (req.method === 'POST') {
    const { firstName, lastName, email, password } = req.body;

    if (firstName && lastName && email && password) {
      try {
        const userExists = await User.exists({ email: email, isActive: true });

        if (!userExists) {
          const salt = await bcrypt.genSalt(10);
          const hashPassword = await bcrypt.hash(password, salt);

          const user: IUser = new User({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashPassword,
          });

          await user.save();

          const code: number = Math.floor(100000 + Math.random() * 900000);

          await sendValidateEmailCode(email, code);

          const otp: IOtp = new Otp({
            user: user._id,
            otp: code,
          });

          await otp.save();

          res.status(200).json({
            success: true,
            message: 'OTP sent successfully!',
          });
        } else {
          res.status(400).json({
            success: false,
            message: 'User already sign up!',
          });
        }
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

const validateEmail = async (req: Request, res: Response): Promise<void> => {
  if (req.method === 'POST') {
    const { email, otp } = req.body;

    if (email && otp) {
      try {
        const user = (await User.findOne({ email: email })) as IUser;

        const otpData = await Otp.findOne({ user: user._id }).sort({
          createdAt: 'desc',
        });

        if (Number(otp) === Number(otpData?.otp)) {
          const token = jwt.sign(
            { email: user.email },
            process.env.JWT_SECRET as string,
            {
              expiresIn: '1h',
            }
          );

          res.status(200).json({
            success: true,
            message: 'User sign in successfully!',
            data: { token: token },
          });
        } else {
          res.status(400).json({
            success: false,
            message: 'Wrong otp!',
          });
        }
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
  signIn,
  signUp,
  validateEmail,
};
