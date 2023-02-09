import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, '/uploads/images');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname);
  },
});

const upload = multer({ storage: storage });

export default upload;
