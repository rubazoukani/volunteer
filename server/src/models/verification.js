const VerificationModel = (sequelize, DataTypes) => {
  const Verification = sequelize.define("Verification", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING(4),
      allowNull: false,
    },
    expiresAt: {
      type: DataTypes.DATE, 
      allowNull: false,
    },
  }, {
    timestamps: false,
  });

  Verification.associate = (models) => {
    Verification.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    })
  }

  return Verification;
};

module.exports = VerificationModel;
