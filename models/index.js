const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // Para Supabase usualmente es necesario
      }
    },
    logging: false // No mostramos los logs de SQL para que la consola esté limpia
  }
);

const Usuario = require('./Usuario')(sequelize);
const Tablero = require('./Tablero')(sequelize);
const Lista = require('./Lista')(sequelize);
const Tarjeta = require('./Tarjeta')(sequelize);

// Definimos las relaciones (HT-01)
// Usuario ↔ Tablero (Uno a Muchos)
Usuario.hasMany(Tablero, { as: 'tableros', foreignKey: 'usuarioId', onDelete: 'CASCADE' });
Tablero.belongsTo(Usuario, { as: 'usuario', foreignKey: 'usuarioId' });

// Tablero ↔ Lista (Uno a Muchos)
Tablero.hasMany(Lista, { as: 'listas', foreignKey: 'tableroId', onDelete: 'CASCADE' });
Lista.belongsTo(Tablero, { as: 'tablero', foreignKey: 'tableroId' });

// Lista ↔ Tarjeta (Uno a Muchos)
Lista.hasMany(Tarjeta, { as: 'tarjetas', foreignKey: 'listaId', onDelete: 'CASCADE' });
Tarjeta.belongsTo(Lista, { as: 'lista', foreignKey: 'listaId' });

module.exports = {
  sequelize,
  Usuario,
  Tablero,
  Lista,
  Tarjeta
};
