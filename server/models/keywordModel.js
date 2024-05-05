const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Keyword = sequelize.define("Keyword", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  // Add associations if needed (e.g., Keyword belongsToMany Blogs)
  // Keyword.belongsToMany(Blog, { through: 'BlogKeywords', foreignKey: 'keyword_id' });

  return Keyword;
};
