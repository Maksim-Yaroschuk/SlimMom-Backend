const Joi = require('joi');
const { NotFound } = require('http-errors');
const { User } = require("../../models");

const updateById = async (req, res) => {
    const { id } = req.params; 
    const {currentWeight, height, age, desiredWeight, bloodType, dailyRate, notAllowedProductsAll} = req.body;
    const result = await User.findByIdAndUpdate(id, {infouser: {currentWeight, height, age, desiredWeight, bloodType, dailyRate, notAllowedProductsAll}}, {new: true});
    if(!result) {
      throw new NotFound("Not found");
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result
      }
    }); 
}

  module.exports = updateById;




//   const getDailyRateController = async (req, res) => {
//     const dailyRate = await calculateDailyRate(req.body);
//     const { notAllowedProducts, notAllowedProductsAll } = await notAllowedProductsObj(req.body.bloodType);
//     return res.status(200).json({ 
//         status: "success",
//         code: 201,
//         data: {
//             user: {
//                 email: result.email,
//                 name: result.name,
//                 currentWeight: ,
//                 height: ,
//                 age: ,
//                 desiredWeight: , 
//                 bloodType: ,
//                 dailyRate: ,
//                 notAllowedProducts: ,
//                 notAllowedProductsAll: ,
//             },
//         }
//     });
// };