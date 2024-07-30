const {checkSchema} = require('express-validator')

const ItemValidate = async (req) =>{
    await checkSchema({
        name: {
            isLength: {
                options: { min: 3, max: 100 },
                errorMessage: "Độ dài tên phải từ 3 đến 100 ký tự."
            },
            notEmpty: {
                errorMessage: "Tên không được để trống."
            }
        },
        ordering: {
            isInt: {
                options: { gt: 0, lt: 100 },
                errorMessage: "Giới hạn số lượng từ 1 đến 100."
            }
        },
        status: {
            isIn: {
                options: [['active', 'inactive']],
                errorMessage: "Trạng thái phải là 'active' hoặc 'inactive'."
            }
        }
    }).run(req);
        

}

module.exports = {
    ItemValidate
  };