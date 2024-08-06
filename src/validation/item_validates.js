const { checkSchema } = require("express-validator");
// const updateItem = require("../utils/upload");
// const uploadImage = updateItem.upload("image");


const ItemValidate = async (req) => {
  await checkSchema({
    name: {
      isLength: {
        options: { min: 3, max: 100 },
        errorMessage: "Độ dài tên phải từ 3 đến 100 ký tự.",
      },
    },
    ordering: {
      isInt: {
        options: { gt: 0, lt: 100 },
        errorMessage: "Giới hạn số lượng từ 1 đến 100.",
      },
    },
    status: {
      isIn: {
        options: [["active", "inactive"]],
        errorMessage: "Trạng thái phải là 'active' hoặc 'inactive'.",
      },
    },
    // image: {
    //   custom: {
    //     options: (value, { req }) => {
    //       return new Promise((resolve, reject) => {
    //         uploadImage(req, null, (err) => {
    //           err ? reject(err.errorMessage = "Hình đưa vào phải thuộc định dạng (jpeg | jpg | png | gif) và không để trống") : resolve(true)
    //           // if (err) {
    //           //   reject(err.errorMessage = "Hình đưa vào phải thuộc định dạng (jpeg | jpg | png | gif) và không để trống");
    //           // } else {
    //           //   resolve(true);
    //           // }
    //         });
    //       });
    //     },
    //   },
    // },
  }).run(req);
};

module.exports = {
  ItemValidate,
};
