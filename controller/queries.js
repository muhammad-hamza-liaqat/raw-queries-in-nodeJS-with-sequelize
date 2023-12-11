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
const ProductLine = require("../models/productLineModel");
require("../models/association");

sequelize.options.logging = console.log;

// query 1
const functionOne = async (req, res) => {
  try {
    const result = await products.findAll({
      attributes: ["productName", "productLine"],
    });
    res.sendApiResponse(result, 200);
  } catch (err) {
    console.log("error occured", err.message);
  }
};
// query 2
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
    res.sendApiResponse(result, 200);
  } catch (err) {
    console.log("error occured:", err.message);
  }
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
// query 13
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
// query 14
const function14 = async (req, res) => {
  const result = await products.findAll({
    attributes: ["productName", "productLine"],
    include: [{ model: ProductLine, attributes: [] }],
    right: true,
    on: {
      productLine: sequelize.col("productLine"),
    },
  });
  res.sendApiResponse(result, 200);
};
// query 15
const funtion15 = async (req, res) => {
  const result = await customers.findAll({
    // attributes: ["customerName"],
    attributes: [
      "customerName",
      [sequelize.fn("SUM", sequelize.col("amount")), "total_payment"],
    ],

    include: [
      {
        model: payments,
        attributes: [
          [sequelize.fn("SUM", sequelize.col("amount")), "totalAmount"],
          // "amount",
          "paymentDate",
          "checkNumber",
        ],
      },
    ],
    group: ["customers.customerName"],
  });
  res.sendApiResponse(result, 200);
};
// query 16
const function16 = async (req, res) => {
  try {
    const result = await offices.findAll({
      attributes: [
        [
          sequelize.fn("COUNT", sequelize.col("employees.employeeNumber")),
          "numberOfEmployee",
        ],
        "city",
      ],
      include: [
        {
          model: employees,
          attributes: [],
          required: false, // Use LEFT JOIN by setting required to false
        },
      ],
      group: ["offices.officeCode"],
    });

    res.sendApiResponse(result, 200);
  } catch (error) {
    res.sendApiError(error, 200);
  }
};
// query 17
const function17 = async (req, res) => {
  const result = await productLines.findAll({
    attributes: [
      "productLine",
      [sequelize.fn("SUM", sequelize.col("amount")), "Total_SUM"],
    ],
    include: [
      {
        model: products,
        attributes: [],
        include: [
          {
            model: orderDetails,
            attributes: [],
            include: [
              {
                model: orders,
                attributes: [],
                include: [
                  {
                    model: customers,
                    attributes: [],
                    include: [
                      {
                        model: payments,
                        attributes: [],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    group: ["productLine"],
    raw: true,
  });
  res.sendApiResponse(result, 200);
};
// query 18
const function18 = async (req, res) => {
  try {
    const result = await payments.findAll({
      attributes: [
        "customerNumber",
        [sequelize.fn("SUM", sequelize.col("amount")), "total_amount"],
      ],
      include: [
        {
          model: customers,
          attributes: [],
          required: true,
        },
      ],
      group: ["customerNumber"],
    });
    for (const paymentTotal of result) {
      const customerNumber = paymentTotal.getDataValue("customerNumber");
      const totalAmount = paymentTotal.getDataValue("total_amount");
      const customer = await customers.findByPk(customerNumber);
      if (customer) {
        let updatedCreditLimit;
        if (totalAmount > 1000) {
          updatedCreditLimit = Math.round(customer.creditLimit * 1.1);
        } else {
          updatedCreditLimit = Math.min(customer.creditLimit, 50000);
        }
        await customer.update({ creditLimit: updatedCreditLimit });
      }
    }
    res.sendApiResponse(result, 200);
  } catch (error) {
    res.sendApiError(error, 400);
  }
};
// query 19

const function19 = async (req, res) => {
  try {
    const query = `
      SELECT
        productLine,
        buyPrice AS previousPrice,
        CASE
          WHEN productLine = 'Motorcycles' THEN ROUND(buyPrice * 0.85)

          WHEN productLine = 'Ships' THEN ROUND(buyPrice * 0.80)
          ELSE buyPrice
        END AS updatedPrice
      FROM products
      WHERE productLine IN ('Motorcycles', 'Ships');
    `;

    const [result] = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
    });

    // Assuming you want to send a response back
    res.sendApiResponse(result, 200);
  } catch (error) {
    console.error("Error during update:", error);
    res.sendApiError(error, 400);
  }
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
  function14,
  funtion15,
  function16,
  function17,
  function18,
  function19,
};
