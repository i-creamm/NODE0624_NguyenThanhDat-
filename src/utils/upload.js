const path = require('path')
var randomstring = require("randomstring");
const multer = require('multer');

let uploadFile = (field ,folderDes = 'src/uploads', fileNameLength = 10, fileSizeMb = 2, fileExtension = 'jpeg|jpg|png|gif') => {
    const storage = multer.diskStorage({
        destination:  (req, file, cb) => {
            return cb(null, folderDes); // Set the destination folder for uploaded files
        },
        filename:  (req, file, cb) => {
            return cb(null, randomstring.generate(fileNameLength) + path.extname(file.originalname)); // Use a unique filename
        }
    });
    
    const upload = multer({ 
        storage: storage,
        limits : {
            fileSize: fileSizeMb * 1024 * 1024
        },
        fileFilter: (req, file, cb) => {
            const filetypes = new RegExp(fileExtension)
            const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
            const mimetype = filetypes.test(file.mimetype)
    
            if(mimetype && extname){
                return cb(null, true)
            } else {
                return cb(new Error('Sai định dạng ảnh'))
            }
        }
     }).single(field);

     return upload
}

module.exports = {
    upload: uploadFile
}