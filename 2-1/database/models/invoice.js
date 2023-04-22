const { DataTypes } = require("sequelize");
const { connection } = require("../connection");

const Invoice = connection.sequelize.define(
  "Invoice",
  {
    transactionCode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    // reserveDate: {
    //   type: DataTypes.DATE,
    //   allowNull: false,
    // },
  },
  {
    tableName: "Invoices",
    timestamps: true,
  }
);

module.exports = { Invoice };
