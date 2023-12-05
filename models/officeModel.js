const { DataTypes } = require('sequelize');
const sequelize = require("../database/connection"); 

const offices = sequelize.define('Office', {
    officeCode: {
      type: DataTypes.NUMBER,
      primaryKey:true,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    addressLine1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    addressLine2: {
      type: DataTypes.STRING,
      allowNull: false,
    },
      state: {
      type: DataTypes.STRING,
      allowNull: true,
  },
  country: {
      type: DataTypes.STRING,
      allowNull: false,
      },
      postalCode: {
  type: DataTypes.NUMBER,
  allowNull: false,
  },
  territory: {
  type: DataTypes.STRING,
  allowNull: false,
  },
  },{
      tableName:"offices",
      timestamps:false,
  });
  module.exports=offices;