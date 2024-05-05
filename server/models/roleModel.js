const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Role = sequelize.define("Role", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    permissions: {
      type: DataTypes.JSONB,
      defaultValue: "{}", // Store role permissions as JSON
    },
  });

  // Add associations if needed (e.g., Role hasMany Users)
  // Role.hasMany(User, { foreignKey: 'role_id' });

  return Role;
};
