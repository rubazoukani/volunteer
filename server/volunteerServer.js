const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const { errorMiddleware } = require("./src/middlewares/error")
const authRouter = require("./src/router/auth")
const volunteerRouter = require("./src/router/volunteer")
const volunteerChanceRouter = require("./src/router/volunteerChance")
const organizationRouter = require("./src/router/organization")
const adminRouter = require("./src/router/admin")
const { sequelize } = require("./src/models")

const app = express();

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/auth", authRouter)
app.use("/api/admin", adminRouter)
app.use("/api/volunteers", volunteerRouter)
app.use("/api/chances", volunteerChanceRouter)
app.use("/api/organizations", organizationRouter)

app.use(errorMiddleware)

const port = process.env.PORT;
sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on ${port}`);
  });
});