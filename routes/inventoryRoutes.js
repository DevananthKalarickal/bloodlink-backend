const express = require("express");
const authMiddelware = require("../middlewares/authMiddelware");

const {
  createInventoryController,
  getInventoryController,
 
  getHospitalController,
  getOrgnaisationController,
  getOrgnaisationForHospitalController,

  getRecentInventoryController,
  getInventoryControllerfull,
  getcurrentUserController,
  EditHospitalController,
  deleteInventoryRecord,
  updateDonorEmail,
  
} = require("../controllers/inventoryController");


// DELETE route to delete an inventory record


const router = express.Router();


router.put("/update-donor/:id", authMiddelware, updateDonorEmail);

router.delete('/api/v1/inventory/:id', authMiddelware, deleteInventoryRecord);

//routes
// ADD INVENTORY || POST
router.put('/update/:id', authMiddelware, EditHospitalController);

router.post("/create-inventory", authMiddelware, createInventoryController);

//GET ALL BLOOD RECORDS
router.get("/get-inventory", authMiddelware, getInventoryControllerfull);
//GET RECENT BLOOD RECORDS
router.get(
  "/get-recent-inventory",
  authMiddelware,
  getRecentInventoryController
);

//GET HOSPITAL BLOOD RECORDS
router.post(
  "/get-inventory-hospital",
  authMiddelware,
  getInventoryController
);


router.post("/get-user", authMiddelware, getcurrentUserController );
//GET DONAR RECORDS
router.get("/get-donars", authMiddelware, getInventoryController);

//GET HOSPITAL RECORDS
router.get("/get-hospitals", authMiddelware, getHospitalController);

//GET orgnaisation RECORDS
router.get("/get-orgnaisation", authMiddelware, getOrgnaisationController);

//GET orgnaisation RECORDS
router.get(
  "/get-orgnaisation-for-hospital",
  authMiddelware,
  getOrgnaisationForHospitalController
);

module.exports = router;
