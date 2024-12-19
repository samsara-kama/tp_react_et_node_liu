const express = require("express");
const router = express.Router();
const { registerUser ,Login,updateUser,deleteUser,getUsers} = require("./Controllers/userController");
const authMiddleware =require("./Middleware/Middleware")
const {
    createAnnonce,
    getAnnonces,
    updateAnnonce,
    getAnnonceByUserId,
    deleteAnnonce,
  } = require("./Controllers/annonceController");

router.post("/users", registerUser);
router.post("/login",Login)
router.put("/update/:id", authMiddleware, updateUser);
router.delete("/delete", authMiddleware, deleteUser);
router.get("/users", authMiddleware, getUsers);
router.post("/annonce", authMiddleware, createAnnonce);
router.get("/annonces", authMiddleware, getAnnonces);
router.put("/annonce/:annonceId", authMiddleware, updateAnnonce);
router.get("/annonce/:userId", authMiddleware, getAnnonceByUserId);
router.delete("/annonce/:annonceId", authMiddleware, deleteAnnonce);
module.exports = router;
