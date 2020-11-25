const { DataTypes, Model, Sequelize } = require("sequelize");

const JsonModel = function JsonModel(sequelize) {
  class Json extends Model {}

  Json.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      // Model attributes are defined here
      url: {
        type: DataTypes.STRING,
        unique: true,
      },
      json: {
        type: DataTypes.JSON,
        defaultValue: {},
      },
    },
    {
      sequelize,
      // table name
      modelName: "Json",
    }
  );

  return Json;
};

exports = module.exports = JsonModel;
