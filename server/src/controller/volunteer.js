const { Volunteer, User, VolunteerChance } = require("../models");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const { ErrorHandler } = require("../middlewares/error");

const getVolunteers = catchAsyncErrors(async (req, res) => {
  const volunteers = await Volunteer.findAll({
    attributes: ['id'],
    include: [{
      model: User,
      attributes: ['id', 'username', 'email', 'phone', 'role'],
    }],
  });

  const result = volunteers.map(v => ({
    volunteerId: v.id,
    ...v.User?.toJSON(),
  }));


  res.status(200).json({ success: true, volunteers: result });
});

const getVolunteerByUserId = catchAsyncErrors(async (req, res, next) => {
  const { userId } = req.params;

  const volunteer = await Volunteer.findOne({
    where: { userId },
    attributes: ['id'],
    include: [
      {
        model: User,
        attributes: ['id', 'username', 'email', 'phone', 'role'],
      },
    ]
  });

  if (!volunteer) {
    return next(new ErrorHandler("Volunteer not found", 404));
  }

  const result = {
    volunteerId: volunteer.id,
    ...volunteer.User?.toJSON()
  }

  res.status(200).json({ success: true, volunteer: result });
});

const deleteVolunteer = catchAsyncErrors(async (req, res) => {
  const volunteer = req.volunteer;
  const user = await volunteer.getUser();
  const authenticatedUser = req.authenticatedUser

  await user.destroy();

  if (authenticatedUser.id === user.id)
    return res
      .status(200)
      .cookie("volunteerToken", "", {
        httpOnly: true,
        expires: new Date(0),
      })
      .json({ success: true, msg: "User Deleted Successfully" });


  res.status(200).json({ success: true, msg: "Volunteer and associated user deleted successfully" });
});


const joinVolunteerChance = catchAsyncErrors(async (req, res, next) => {
  const volunteer = req.volunteer;
  const volunteerChance = req.volunteerChance

  await volunteer.addVolunteerChance(volunteerChance);
  res.status(200).json({ success: true, msg: "Joined volunteer chance successfully" });
});

module.exports = {
  getVolunteers,
  getVolunteerByUserId,
  deleteVolunteer,
  joinVolunteerChance
};
