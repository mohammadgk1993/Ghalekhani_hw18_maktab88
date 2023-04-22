const { DataTypes } = require("sequelize");
const { connection } = require("../connection");
const { Invoice } = require("./invoice");
const { Food } = require("./food");

const FoodInvoice = connection.sequelize.define(
  "FoodInvoice",
  {
    InvoiceId: {
      type: DataTypes.INTEGER,
      references: {
        model: Invoice,
        key: "id",
      },
    },
    FoodId: {
      type: DataTypes.INTEGER,
      references: {
        model: Food,
        key: "id",
      },
    },
  },
  {
    tableName: "FoodInvoice",
  }
);

module.exports = { FoodInvoice };
