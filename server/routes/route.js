const express = require("express")
const  router  = express.Router();

// import controllesrs
const {signIn,logIn} = require("../controllers/auth")
const {getUserList,editUser,deleteUser,bulkCreateUsers,getUserById}=  require("../controllers/user")
// define route
router.post("/signin",signIn);
router.post("/login",logIn);
router.get("/user-list",getUserList)
router.put("/user/:id", editUser);    // Endpoint to edit user
router.delete("/user/:id", deleteUser); // Endpoint to delete user
router.post("/users/bulk-create", bulkCreateUsers);
router.get('/user/:id', getUserById);


module.exports =router;