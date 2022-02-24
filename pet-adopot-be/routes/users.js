const express = require("express");
const router = express.Router();
const { sign } = require("../lib/auth");
const { v4: uuidv4 } = require("uuid");
const S = require("fluent-json-schema");
const bcrypt = require("bcrypt");
const { validationMid } = require("../middlewares/validation.js");
const authenticate = require("../middlewares/authentication");
const { upload } = require("../lib/uploadFiles");
const {
  addUser,
  getUserByEmail,
  getUserById,
  updateUserPic,
  updateUser,
  getAllUsers,
  addAdmin,
} = require("../data/mysqldb");

const signupSchema = S.object()
  .prop("firstName", S.string().required())
  .prop("lastName", S.string().required())
  .prop("password", S.string().minLength(6).maxLength(20).required())
  .prop("email", S.string().required())
  .prop("phone", S.string().required())
  .valueOf();
router.post("/signup", validationMid(signupSchema), async (req, res, next) => {
  try {
    const passwordHash = await bcrypt.hash(req.body.password, 10);
    console.log(passwordHash);
    const id = uuidv4();
    await addUser(
      id,
      req.body.email,
      passwordHash,
      req.body.firstName,
      req.body.lastName,
      req.body.phone
    );

    const newUser = await getUserByEmail(req.body.email);
    const token = sign({ appUserId: newUser.id, appUserEmail: newUser.email });
    res.send({
      text: "valid signup",
      token,
      appUserId: newUser.id,
      appUserEmail: newUser.email,
    });
  } catch (error) {
    console.log(error);
    next();
  }
});

const updateUserSchema = S.object()
  .prop("firstName", S.string().required())
  .prop("lastName", S.string().required())
  .prop("password", S.string().minLength(6).maxLength(20).required())
  .prop("email", S.string().required())
  .prop("phone", S.string().required())
  .prop("bio", S.string().required())
  .valueOf();
router.put(
  "/:id",
  authenticate(),
  validationMid(updateUserSchema),
  async (req, res, next) => {
    const isEmailExist = await getUserByEmail(req.decoded.appUserEmail);
    if (isEmailExist === req.body.email) {
      res.status(403).send("Email already exist");
      return;
    }

    try {
      const passwordHash = await bcrypt.hash(req.body.password, 10);
      let updatedUser = null;
      await updateUser(
        req.params.id,
        req.body.email,
        passwordHash,
        req.body.firstName,
        req.body.lastName,
        req.body.phone,
        req.body.bio
      );
      updatedUser = await getUserByEmail(req.body.email);
      const token = sign({
        appUserId: updatedUser.id,
        appUserEmail: updatedUser.email,
      });
      console.log(updatedUser);
      res.send({
        text: "Detail Updated",
        token,
        appUserId: updatedUser.id,
        appUserEmail: updatedUser.email,
        appUserFirstName: updatedUser.first_name,
        appUserLastName: updatedUser.last_name,
      });
    } catch (error) {
      console.log(error);
      next();
    }
  }
);

const loginSchema = S.object()
  .prop("email", S.string().required())
  .prop("password", S.string().minLength(6).maxLength(20).required())
  .valueOf();
router.post("/login", validationMid(loginSchema), async (req, res, next) => {
  try {
    let user = null;
    user = await getUserByEmail(req.body.email);
    if (!user) {
      res.status(401).send("we didnt find this user");
      return;
    }
    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordMatch) {
      res.status(401).send("incorrect password");
      return;
    }
    //continue login process
    const token = sign({ appUserId: user.id, appUserEmail: user.email });
    res.send({
      text: "valid login input",
      token,
      appUserId: user.id,
      appUserEmail: user.email,
      appUserFirstName: user.first_name,
      appUserLastName: user.last_name,
    });
  } catch (error) {
    console.log(error);
    next();
  }
});

router.put(
  "/profilePicUpload",
  authenticate(),
  upload.single("picture"),
  async (req, res, next) => {
    try {
      const userPic = await updateUserPic(req.decoded.appUserId, req.file.path);
      return res.json({ picture: req.file.path, message: "pic saved" });
    } catch (error) {
      console.log(error);
      next();
    }
  }
);

router.get("/:id", async (req, res, next) => {
  try {
    const UserById = await getUserById(req.params.id);
    res.send(UserById);
    console.log(UserById);
  } catch (error) {
    next(error);
  }
});

router.post("/allusers", async (req, res, next) => {
  try {
    const allUsers = await getAllUsers();
    res.send(allUsers);
    console.log(allUsers);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
