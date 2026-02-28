const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Tablero', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'tableros'
  });
};
