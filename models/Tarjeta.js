const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Tarjeta', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    contenido: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'tarjetas'
  });
};
