module.exports = (sequelize, DataTypes) => {
    const Scorecard = sequelize.define("scores", {
      team_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      score: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      wickets: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      overs: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          // Custom validation for overs format (e.g., 1.2, 2.3)
          isValidOvers(value) {
            if (!/^(\d+)\.(\d+)$/.test(value)) {
              throw new Error('Overs should be in the format "x.y", e.g., 1.2');
            }
          },
        },
      },
    });
  
    return Scorecard;
  };
  