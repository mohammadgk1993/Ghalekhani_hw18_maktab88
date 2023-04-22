const { Student } = require("./models/student");
const { Food } = require("./models/food");
const { Invoice } = require("./models/invoice");
const { FoodInvoice } = require("./models/foodInvoice");
const { loadRelationship } = require("./relationships");

const loadDatabase = async () => {
  await loadRelationship();

  await Student.sync({ alter: process.env.MODE === "development" });
  await Invoice.sync({ alter: process.env.MODE === "development" });
  await Food.sync({ alter: process.env.MODE === "development" });
  await FoodInvoice.sync({ alter: process.env.MODE === "development" });
};

loadDatabase().catch((e) => {
  console.log(e);
  process.exit(1);
});
