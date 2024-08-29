const multer = require("multer");
const path = require("path");
const fs = require("fs");
var randomstring = require("randomstring");

let uploadFile = (
  nameController,
  field,
  folderDes = __pathImage,
  fileNameLength = 10,
  fileSizeMb = 5,
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

// let uploadFiles = (
//   nameController,
//   fields,
//   folderDes = __pathImage,
//   fileNameLength = 10,
//   fileSizeMb = 1,
//   fileExtension = "jpeg|jpg|png|gif"
// ) => {
//   const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       console.log(folderDes + "/" + nameController)
//       cb(null, folderDes + "/" + nameController); // Thiết lập thư mục lưu trữ file
//     },
//     filename: (req, file, cb) => {
//       cb(null, randomstring.generate(fileNameLength) + path.extname(file.originalname)); // Tạo tên file độc nhất
//     },
//   });

//   const upload = multer({
//     storage: storage,
//     limits: {
//       fileSize: fileSizeMb * 1024 * 1024,
//     },
//     fileFilter: (req, file, cb) => {
//       const filetypes = new RegExp(fileExtension);
//       const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//       const mimetype = filetypes.test(file.mimetype);

//       if (mimetype && extname) {
//         cb(null, true);
//       } else {
//         cb("Sai định dạng ảnh");
//       }
//     },
//   }).fields(fields);

//   return upload;
// };

const uploadFiles = (
  nameController,
  fields,
  folderDes = __pathImage,
  fileNameLength = 10,
  fileSizeMb = 1,
  fileExtension = "jpeg|jpg|png|gif"
) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const destinationPath = path.join(folderDes, nameController);
      console.log("Destination Path:", destinationPath); // Kiểm tra đường dẫn thư mục
      if (!fs.existsSync(destinationPath)) {
        fs.mkdirSync(destinationPath, { recursive: true }); // Tạo thư mục nếu không tồn tại
      }
      cb(null, destinationPath); // Thiết lập thư mục lưu trữ file
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = randomstring.generate(fileNameLength);
      const extname = path.extname(file.originalname).toLowerCase();
      cb(null, `${uniqueSuffix}${extname}`); // Tạo tên file độc nhất
    },
  });

  const upload = multer({
    storage: storage,
    limits: {
      fileSize: fileSizeMb * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
      const filetypes = new RegExp(fileExtension);
      const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = filetypes.test(file.mimetype);

      if (mimetype && extname) {
        cb(null, true);
      } else {
        cb(new Error("Sai định dạng ảnh")); // Thay đổi từ chuỗi sang Error
      }
    },
  }).fields(fields);

  return upload;
};

module.exports = {
  upload: uploadFiles,
  uploadImage: uploadFile
};
