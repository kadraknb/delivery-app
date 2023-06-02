module.exports = (sequelize, DataTypes) => {
  const Sales = sequelize.define('Sales', {
    id: {
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    sellerId: {
      type: DataTypes.INTEGER,
    },
    totalPrice: {
      type: DataTypes.DOUBLE,
    },
    deliveryAddress: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    deliveryNumber: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    saleDate: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    status: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
    tableName: 'sales',
    underscored: true,
  });

  Sales.associate = (models) => {
    Sales.belongsTo(models.User,
      { foreignKey: 'userId', as: 'customer' });
    Sales.belongsTo(models.User,
      { foreignKey: 'sellerId', as: 'seller' });
  };

  return Sales;
}