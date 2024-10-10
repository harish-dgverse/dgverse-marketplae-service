const multer = require('multer');
const { PERMITTED_FILE_TYPES } = require('../constants').miscConstants;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '_' + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (PERMITTED_FILE_TYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage,
  fileFilter,
});

module.exports = {
  upload,
};
