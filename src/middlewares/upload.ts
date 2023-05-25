import multer from 'multer';
import fs from 'fs';

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    let dir: string = './public/images';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    callback(null, dir);
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

export default upload;
