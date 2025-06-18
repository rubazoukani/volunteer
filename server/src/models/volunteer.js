const VolunteerModel = (sequelize, DataTypes) => {
  const Volunteer = sequelize.define(
    "Volunteer",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    },
    {
      timestamps: false,
    }
  );

  Volunteer.associate = (models) => {
    Volunteer.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    })
    Volunteer.belongsToMany(models.VolunteerChance, {
      through: "VolunteerForChances",
      foreignKey: "volunteerId",
      otherKey: "volunteerChanceId",
      onDelete: "CASCADE"
    })
  }

  return Volunteer;
};

module.exports = VolunteerModel;
