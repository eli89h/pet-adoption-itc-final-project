const express = require("express");
const router = express.Router();
const { sign } = require("../lib/auth");
const { v4: uuidv4 } = require("uuid");
const S = require("fluent-json-schema");
const bcrypt = require("bcrypt");
const { validationMid } = require("../middlewares/validation.js");
const { upload } = require("../lib/uploadFiles");
const {
  addUser,
  getUserByEmail,
  updateUserPic,
  addPetPic,
  addPet,
  getAllPets,
  getPetByName,
  getAllUsers,
  getAdminByEmail,
} = require("../data/mysqldb");
//const bcrypt = require("bcrypt");
const authenticate = require("../middlewares/authentication");

const addPetSchema = S.object()
  .prop("type", S.string().required())
  .prop("name", S.string().required())
  .prop("status", S.string().required())
  .prop("height", S.string().required())
  .prop("weight", S.string().required())
  .prop("color", S.string().required())
  .prop("bio", S.string().required())
  .prop("hypoallergenic", S.boolean().required())
  .prop("restrictions", S.string().required())
  .prop("breed", S.string().required())
  .valueOf();

router.post(
  "/pet",
  //authenticate(),
  validationMid(addPetSchema),
  async (req, res, next) => {
    const id = uuidv4();
    try {
      await addPet(
        id,
        req.body.type,
        req.body.name,
        req.body.status,
        req.body.height,
        req.body.weight,
        req.body.color,
        req.body.bio,
        req.body.hypoallergenic,
        req.body.restrictions,
        req.body.breed
      );
      let newPet = null;
      newPet = await getPetByName(req.body.name);
      if (!newPet) {
        res.status(401).send("we didnt find this pet");
        return;
      }
      //await addPetPic(id, req.file.path);
      res.send({
        //picture: req.file.path,
        pet: newPet,
        message: "pet created successfully",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

router.put(
  "/petPicUpload/:petId",
  // authenticate(),
  upload.single("picture"),
  async (req, res, next) => {
    try {
      await addPetPic(req.params.petId, req.file.path);
      return res.json({ picture: req.file.path, message: "pet pic saved" });
    } catch (error) {
      console.log(error);
      next();
    }
  }
);

router.get("/user", async (req, res, next) => {

  try {
    const petsList = await getAllUsers();
    res.send(petsList);
    console.log(petsList);
  } catch (error) {
    next(error);
  }
});

const loginSchema = S.object()
  .prop("email", S.string().required())
  .prop("password", S.string().minLength(6).maxLength(20).required())
  .valueOf();
router.post("/login", validationMid(loginSchema), async (req, res, next) => {
  try {
    let admin = null;
    admin = await getAdminByEmail(req.body.email);
    if (!admin) {
      res.status(401).send("we didnt find this user");
      return;
    }
    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      admin.password
    );
    if (!isPasswordMatch) {
      res.status(401).send("incorrect password");
      return;
    }
    //continue login process
    const token = sign({ appAdminId: admin.id, appAdminEmail: admin.email });
    res.send({
      text: "valid login input",
      token,
      appAdminId: admin.id,
      appAdminEmail: admin.email,
    });
  } catch (error) {
    console.log(error);
    next();
  }
});

module.exports = router;
