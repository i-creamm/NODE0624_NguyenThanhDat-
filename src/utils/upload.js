const path = require("path");
var randomstring = require("randomstring");
const multer = require("multer");

let uploadFile = (
  nameController,
  field,
  folderDes = __pathImage,
  fileNameLength = 10,
  fileSizeMb = 1,
  fileExtension = "jpeg|jpg|png|gif"
) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      return cb(null, folderDes + "/" + nameController); // Set the destination folder for uploaded files
    },
    filename: (req, file, cb) => {
      return cb(
        null,
        randomstring.generate(fileNameLength) + path.extname(file.originalname)
      ); // Use a unique filename
    },
  });

  const upload = multer({
    storage: storage,
    limits: {
      fileSize: fileSizeMb * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
      const filetypes = new RegExp(fileExtension);
      const extname = filetypes.test(
        path.extname(file.originalname).toLowerCase()
      );
      const mimetype = filetypes.test(file.mimetype);

      if (mimetype && extname) {
        return cb(null, true);
      } else {
        return cb("Sai định dạng ảnh");
      }
    },
  }).single(field);

  return upload;
};

let uploadArray = (
  nameController,
  field,
  maxArray,
  folderDes = __pathImage,
  fileNameLength = 10,
  fileSizeMb = 1,
  fileExtension = "jpeg|jpg|png|gif"
) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      return cb(null, folderDes + "/" + nameController); // Set the destination folder for uploaded files
    },
    filename: (req, file, cb) => {
      return cb(
        null,
        randomstring.generate(fileNameLength) + path.extname(file.originalname)
      ); // Use a unique filename
    },
  });

  const upload = multer({
    storage: storage,
    limits: {
      fileSize: fileSizeMb * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
      const filetypes = new RegExp(fileExtension);
      const extname = filetypes.test(
        path.extname(file.originalname).toLowerCase()
      );
      const mimetype = filetypes.test(file.mimetype);

      if (mimetype && extname) {
        return cb(null, true);
      } else {
        return cb("Sai định dạng ảnh");
      }
    },
  }).array(field,maxArray);

  return upload;
};


module.exports = {
  upload: uploadFile,
  uploadArrayImage: uploadArray
};
