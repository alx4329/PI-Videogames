const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    release_date: {
      type: DataTypes.STRING,
     
    },
    rating: {
      type: DataTypes.STRING,
      
    },
    platforms: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdByUser: {
      type: DataTypes.STRING,
      defaultValue: 'si'
    },

  });
};
