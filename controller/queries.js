const products = require("../models/productModel");
const productLines = require("../models/productLineModel");
const payments = require("../models/paymentModel");
const orders = require("../models/orderModel");
const offices = require("../models/officeModel");
const employees = require("../models/employeeModel");
const customers = require("../models/customerModel");
const orderDetails = require("../models/orderDetailsModel");
const { Sequelize } = require("sequelize");
const sequelize = require("../database/connection");
require("../models/association");
const functionOne = async (req, res) => {
  // List the product names and their corresponding product lines for all products.
  const result = await products.findAll({
    attributes: ["productName", "productLine"],
  });
  res.send(result);
};

const functionTwo = async (req, res) => {
  try {
    const result = await customers.findAll({
      attributes: [
        "customerNumber",
        "customerName",
        [
          sequelize.fn("COUNT", sequelize.col("orders.orderNumber")),
          "total_orders",
        ],
      ],
      include: [
        {
          model: orders,
          attributes: [],
        },
      ],
      group: ["customers.customerNumber"],
      order: [[sequelize.literal("total_orders"), "DESC"]],
    });

    res.send(result);
  } catch (error) {
    console.error("Error executing Sequelize query:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { functionOne, functionTwo };
