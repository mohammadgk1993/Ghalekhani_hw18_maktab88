const { Student } = require("./models/student");
const { Invoice } = require("./models/invoice");
const { Food } = require("./models/food");
const { FoodInvoice } = require("./models/foodInvoice");

const loadRelationship = async () => {
  await Student.hasMany(Invoice);
  await Invoice.belongsTo(Student);
  
  await Food.belongsToMany(Invoice, { through: FoodInvoice });
  await Invoice.belongsToMany(Food, { through: FoodInvoice });
};

module.exports = { loadRelationship };