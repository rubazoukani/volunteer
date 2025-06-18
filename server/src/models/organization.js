const OrganizationModel = (sequelize, DataTypes) => {
  const Organization = sequelize.define(
    "Organization",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      facebook: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      youtube: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      instagram: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      website: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      commercialRegister: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      verified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      }
    },
    {
      timestamps: false,
    }
  );

  Organization.associate = (models) => {
    Organization.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    })

    Organization.hasMany(models.VolunteerChance, {
      foreignKey: "organizationId",
      onDelete: "CASCADE"
    })
  }

  return Organization;
};

module.exports = OrganizationModel;
