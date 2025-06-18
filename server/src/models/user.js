const UserModel = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM("admin", "volunteer", "organization")
      }
    },
    {
      timestamps: false,
    }
  );

  User.associate = (models) => {
    User.hasOne(models.Volunteer, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    })

    User.hasOne(models.Organization, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    })

    User.hasOne(models.Verification, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    })
  }

  return User;
};

module.exports = UserModel;


// User:
// 15 Bassel xxx@gmail.com 09xxxxxx xxxxx volunteer
// 2 Ala xxx@gmail.com 09xxxxxx xxxxx organization
// 3 Waael xxx@gmail.com 09xxxxxx xxxxx admin
// 4 mohammed xxx@gmail.com 09xxxxxx xxxxx organization

// Volunteer
// 1 15


// organization
// 2 ATK ..., .., ..., 5050, 2 ,true
// 5 FBI ..., .., ..., 1238, 4 ,true