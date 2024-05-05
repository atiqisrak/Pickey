const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Role",
        key: "id",
      },
      onDelete: "SET NULL", // Set to NULL on role deletion
    },
  });

  // Add associations if needed (e.g., User hasMany Blogs)
  // User.hasMany(Blog, { foreignKey: 'author_id' });

  return User;
};
