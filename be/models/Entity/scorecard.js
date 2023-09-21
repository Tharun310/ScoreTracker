module.exports = (sequelize, DataTypes) => {
    const Scorecard = sequelize.define("scores", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      team_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      score: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      wickets: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      innings: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      overs: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    return Scorecard;
  };
  
