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
};
const functionThree = async (req, res) => {
  const result = await payments.findAll({
    attributes: [
      [sequelize.fn("SUM", sequelize.col("amount")), "total_payment"],
      "customerNumber",
    ],
    include: [
      {
        model: customers,
        attributes: ["customerName"],
      },
    ],
    group: ["payments.customerNumber"],
  });

  res.send(result);
};

const functionFour = async (req, res) => {
    const result = await products.findAll({
        attributes: [
          'productName',
          [sequelize.fn('COUNT', sequelize.col('orderdetails.quantityOrdered')), 'number_of_orders']
        ],
        include: [
          {
            model: orderDetails,
            attributes: [],
            required: false,
          }
        ],
        group: ['products.productCode', 'products.productName'],
        order: [[sequelize.literal('number_of_orders'), 'DESC']]
    })
    res.send(result)
    
};

const functionSix = async (req, res) => {
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
};

const functionFive = async (req, res) => {
    try {
      const result = await employees.findAll({
        attributes: [
          [sequelize.fn('DISTINCT', sequelize.col('firstName')), 'firstName']
        ],
        include: [
          {
            model: customers,
            attributes: [],
            required: false,
            where: {
              salesRepEmployeeNumber: null
            }
          }
        ],
        raw: true, 
        nest: true 
      });
  
      res.send(result);
    } catch (error) {
      console.error('Error executing Sequelize query:', error);
      res.status(500).send('Internal Server Error');
    }
  };
  const functionSeven = async (req, res) => {

      const result = await customers.findAll({
        attributes: [
          'city',
          [sequelize.fn('AVG', sequelize.col('payments.amount')), 'average_salary']
        ],
        include: [
          {
            model: payments,
            attributes: []
          }
        ],
        group: ['city'],
        having: sequelize.literal('average_salary > 1000')
      });
  
      res.send(result);
  };

  const functionEight = async (req, res) => {

      const result = await products.findAll({
        attributes: [
          'productName',
          [sequelize.fn('SUM', sequelize.col('orderdetails.quantityOrdered')), 'ordered']
        ],
        include: [
          {
            model: orderDetails,
            attributes: []
          }
        ],
        group: ['products.productCode', 'products.productName']
      });
  
      res.send(result);
  };
  
  
  
  

module.exports = {
  functionOne,
  functionTwo,
  functionThree,
  functionFour,
  functionSix,
  functionFive,
  functionSeven,
  functionEight
};
