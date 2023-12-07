const Customer = require("./customerModel");
const Payment = require("./paymentModel");
const productLine = require("./productLineModel");
const product = require("./productModel");
const customer = require("./employeeModel");
const employee = require("./employeeModel");
const office = require("./officeModel");
const order = require("./orderModel");
const orderDetail = require("./orderDetailsModel");

// product and productLine 
productLine.hasMany(product, { foreignKey: 'productLine' });
product.belongsTo(productLine, { foreignKey: 'productLine' });

// product and order Details 
product.hasMany(orderDetail, { foreignKey: 'productCode'});
orderDetail.belongsTo(product, { foreignKey: 'productCode' });

// order and order details 
order.hasMany(orderDetail, { foreignKey: 'orderNumber' });
orderDetail.belongsTo(order, { foreignKey: 'orderNumber' });

// customer and employee
employee.hasMany(Customer, { foreignKey: 'salesRepEmployeeNumber' });
Customer.belongsTo(employee, { foreignKey: 'salesRepEmployeeNumber'});

// employee and office 
office.hasMany(employee, { foreignKey: 'officeCode' });
employee.belongsTo(office, { foreignKey: 'officeCode' });

// customer and payment
Customer.hasMany(Payment, { foreignKey: 'customerNumber' });
Payment.belongsTo(Customer, { foreignKey: 'customerNumber' });


// order and customer
Customer.hasMany(order, { foreignKey: 'customerNumber' });
order.belongsTo(Customer, { foreignKey: 'customerNumber' });


// const Customer = require("./customerModel");
// const Payment = require("./paymentModel");
// const ProductLine = require("./productLineModel");
// const Product = require("./productModel");
// const Employee = require("./employeeModel");
// const Office = require("./officeModel");
// const Order = require("./orderModel");
// const OrderDetail = require("./orderDetailsModel");

// ProductLine.hasMany(Product, { foreignKey: 'productLine' });
// Product.belongsTo(ProductLine, { foreignKey: 'productLine' });

// Product.hasMany(OrderDetail, { foreignKey: 'productCode' });
// OrderDetail.belongsTo(Product, { foreignKey: 'productCode' });

// Order.hasMany(OrderDetail, { foreignKey: 'orderNumber' });
// OrderDetail.belongsTo(Order, { foreignKey: 'orderNumber' });

// Employee.hasMany(Customer, { foreignKey: 'salesRepEmployeeNumber' });
// Customer.belongsTo(Employee, { foreignKey: 'salesRepEmployeeNumber' });

// Office.hasMany(Employee, { foreignKey: 'officeCode' });
// Employee.belongsTo(Office, { foreignKey: 'officeCode' });

// Customer.hasMany(Payment, { foreignKey: 'customerNumber' });
// Payment.belongsTo(Customer, { foreignKey: 'customerNumber' });

// Customer.hasMany(Order, { foreignKey: 'customerNumber' });
// Order.belongsTo(Customer, { foreignKey: 'customerNumber' });
