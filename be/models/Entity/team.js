module.exports = (sequelize, DataTypes) => {
    const Team = sequelize.define("teams", {
      team_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      team_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
    return Team;
  };
  