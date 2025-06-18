const VolunteerChanceModel = (sequelize, DataTypes) => {
  const VolunteerChance = sequelize.define(
    "VolunteerChance",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      organizationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      noOfVolunteer: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      duration: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  VolunteerChance.associate = (models) => {
    VolunteerChance.belongsTo(models.Organization, {
      foreignKey: "organizationId",
      onDelete: "CASCADE"
    })
    VolunteerChance.belongsToMany(models.Volunteer, { // many - many
      through: "VolunteerForChances",
      foreignKey: "volunteerChanceId",
      otherKey: "volunteerId",
      onDelete: "CASCADE"
    })
  }

  return VolunteerChance;
};

module.exports = VolunteerChanceModel;
