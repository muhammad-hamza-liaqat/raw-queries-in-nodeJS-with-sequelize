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
const sendResFormat = require("../middleware/responseAPI");
require("../models/association");

// query 1
const functionOne = async (req, res) => {
  const result = await products.findAll({
    attributes: ["productName", "productLine"],
  });
  res.sendApiResponse(result, 200);
};
// query 2
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
  res.sendApiResponse(result, 200);
};
// query 3
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

  res.sendApiResponse(result, 200);
};
// query 4

const functionFour = async (req, res) => {
  const result = await products.findAll({
    attributes: [
      "productName",
      [
        sequelize.fn("COUNT", sequelize.col("orderdetails.quantityOrdered")),
        "number_of_orders",
      ],
    ],
    include: [
      {
        model: orderDetails,
        attributes: [],
        required: false,
      },
    ],
    group: ["products.productCode", "products.productName"],
    order: [[sequelize.literal("number_of_orders"), "DESC"]],
  });
  res.sendApiResponse(result, 200);
};

// query 5
const functionFive = async (req, res) => {
  const result = await employees.findAll({
    attributes: ["firstName"],
    include: [
      {
        model: customers,
        attributes: [],
        required: false, // LEFT JOIN
      },
    ],
    where: {
      employeeNumber: sequelize.literal(
        "customers.salesRepEmployeeNumber IS null"
      ),
    },
  });
  res.sendApiResponse(result, 200);
};

// query 6
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
  res.sendApiResponse(result, 200);
};
// query 7
const functionSeven = async (req, res) => {
  const result = await customers.findAll({
    attributes: [
      "city",
      [sequelize.fn("AVG", sequelize.col("payments.amount")), "average_salary"],
    ],
    include: [
      {
        model: payments,
        attributes: [],
      },
    ],
    group: ["city"],
    having: sequelize.literal("average_salary > 1000"),
  });

  res.sendApiResponse(result, 200);
};
// query 8
const functionEight = async (req, res) => {
  const result = await products.findAll({
    attributes: [
      "productName",
      [
        sequelize.fn("SUM", sequelize.col("orderdetails.quantityOrdered")),
        "ordered",
      ],
    ],
    include: [
      {
        model: orderDetails,
        attributes: [],
      },
    ],
    group: ["products.productCode", "products.productName"],
  });

  res.sendApiResponse(result, 200);
};
// qury 9

const functionNine = async (req, res) => {
  try {
    const result = await employees.findAll({
      attributes: ["firstName"],
      include: [
        {
          model: customers,
          attributes: [],
          required: false,
        },
        {
          model: offices,
          attributes: [],
          //required: true,
          where: {
            country: "USA",
          },
        },
      ],
      where: {
        employeeNumber: sequelize.literal(
          "customers.salesRepEmployeeNumber is null"
        ),
      },
    });
    console.table(result);
    res.sendApiResponse(result, 200);
  } catch (error) {
    res.sendApiError(error, 400);
  }
};

// query 10
const function10 = async (req, res) => {
  const result = await sequelize.query(
    "SELECT products.productName, COUNT(orderdetails.orderNumber) AS numberOfOrders " +
      "FROM orderdetails " +
      "JOIN products ON orderdetails.productCode = products.productCode " +
      "JOIN orders ON orderdetails.orderNumber = orders.orderNumber " +
      "JOIN customers ON customers.customerNumber = orders.customerNumber " +
      'WHERE customers.country = "USA" ' +
      "GROUP BY products.productName " +
      "ORDER BY COUNT(orderdetails.orderNumber) DESC",
    {
      type: sequelize.QueryTypes.SELECT,
    }
  );

  res.sendApiResponse(result, 200);
};
// query 11
const functionEleven = async (req, res) => {
  const result = await products.findAll({
    attributes: [
      "productLine",
      [
        sequelize.fn("SUM", sequelize.col("orderdetails.priceEach")),
        "totalPrice",
      ],
    ],
    include: [
      {
        model: orderDetails,
        attributes: [],
        required: false, // RIGHT JOIN behavior
      },
    ],
    group: ["products.productLine"],
  });

  res.sendApiResponse(result, 200);
};
// query 12

const function12 = async (req, res) => {
  const result = await customers.findAll({
    attributes: [
      "customerName",
      [sequelize.col("orders.orderNumber"), "orderNumber"],
      [sequelize.col("payments.amount"), "PaymentAmount"],
    ],
    include: [
      {
        model: orders,
        attributes: [],
      },
      {
        model: payments,
        attributes: [],
      },
    ],
    having: sequelize.literal("orderNumber IS NOT NULL"),
    order: [["orderNumber", "ASC"]],
  });
  // console.table(result)
  res.sendApiResponse(result, 200);
};

const function13 = async (req, res) => {
  const result = await customers.findAll({
    attributes: [
      [sequelize.col("SalesRep.firstName"), "firstName"],
      "customerName",
    ],
    include: [
      {
        model: employees,
        attributes: [],
        as: "SalesRep",
      },
    ],
    right: true,
    on: {
      salesRepEmployeeNumber: sequelize.col("SalesRep.employeeNumber"),
    },
  });

  res.sendApiResponse(result, 200);
};

module.exports = {
  functionOne,
  functionTwo,
  functionThree,
  functionFour,
  functionSix,
  functionFive,
  functionSeven,
  functionEight,
  functionEleven,
  function13,
  function10,
  functionNine,
  function12,
};
