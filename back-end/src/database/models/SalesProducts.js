module.exports = (sequelize, DataTypes) => {
  const SalesProducts = sequelize.define('SalesProducts', {
    saleId: {
      type: DataTypes.INTEGER,
    },
    productId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: false,
    tableName: 'products',
    underscored: true,
  });

  SalesProducts.associate = (models) => {
    SalesProducts.belongsToMany(models.Sales,
      { 
        as: 'sale',
        through: SalesProducts,
        foreignKey: 'saleId',
        otherKey: 'saleId'
      });
    SalesProducts.belongsToMany(models.Products,
      { 
        as: 'product',
        through: SalesProducts,
        foreignKey: 'productId', 
        otherKey: 'productId'
     });
  };

  return SalesProducts;
}