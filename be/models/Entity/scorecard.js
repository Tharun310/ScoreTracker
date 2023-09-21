module.exports = (sequelize, DataTypes) => {
    const Scorecard = sequelize.define("scores", {
      team_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      score: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      wickets: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      innings: {
        type: DataTypes.ENUM('batting', 'fielding'),
        allowNull: false,
      },
      overs: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0,
      },
    });
  
    return Scorecard;
  };
  
