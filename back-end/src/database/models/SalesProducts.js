module.exports = (sequelize, DataTypes) => {
  const SalesProducts = sequelize.define('SalesProducts', {
    saleId: {
      type: DataTypes.INTEGER,
    },
    productId: {
      type: DataTypes.INTEGER,
    },
    quantity: {
      type: DataTypes.INTEGER,
    }
  },
  {
    timestamps: false,
    tableName: 'sales_products',
    underscored: true,
  });

  SalesProducts.associate = (models) => {
    models.Products.belongsToMany(models.Sales,
      { 
        as: 'sales',
        through: SalesProducts,
        foreignKey: 'productId',
        otherKey: 'saleId'
      });
    models.Sales.belongsToMany(models.Products,
      { 
        as: 'products',
        through: SalesProducts,
        foreignKey: 'saleId', 
        otherKey: 'productId'
     });
  };

  return SalesProducts;
}