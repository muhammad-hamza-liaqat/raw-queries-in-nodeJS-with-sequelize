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
productLine.hasMany(product, { foreignKey: 'productLine', targetKey: 'productLine' });
product.belongsTo(productLine, { foreignKey: 'productLine', targetKey: 'productLine' });

// product and order Details 
product.hasMany(orderDetail, { foreignKey: 'productCode', targetKey: 'productCode' });
orderDetail.belongsTo(product, { foreignKey: 'productCode', targetKey: 'productCode' });

// order and order details 
order.hasMany(orderDetail, { foreignKey: 'orderNumber', targetKey: 'orderNumber' });
orderDetail.belongsTo(order, { foreignKey: 'orderNumber', targetKey: 'orderNumber' });

// customer and employee
employee.hasMany(Customer, { foreignKey: 'salesRepEmployeeNumber' });
Customer.belongsTo(employee, { foreignKey: 'salesRepEmployeeNumber'});

// employee and office 
office.hasMany(employee, { foreignKey: 'officeCode', targetKey: 'officeCode' });
employee.belongsTo(office, { foreignKey: 'officeCode', targetKey: 'officeCode' });

// customer and payment
Customer.hasMany(Payment, { foreignKey: 'customerNumber' });
Payment.belongsTo(Customer, { foreignKey: 'customerNumber', targetKey: 'customerNumber' });


// order and customer
Customer.hasMany(order, { foreignKey: 'customerNumber', targetKey: 'customerNumber' });
order.belongsTo(Customer, { foreignKey: 'customerNumber', targetKey: 'customerNumber' });