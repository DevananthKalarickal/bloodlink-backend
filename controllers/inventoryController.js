const mongoose = require("mongoose");
const inventoryModel = require("../models/inventoryModel");
const userModel = require("../models/userModel");

// CREATE INVENTORY
const createInventoryController = async (req, res) => {
  try {
    const { email } = req.body;
    //validation
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("User Not Found");
    }
    // if (inventoryType === "in" && user.role !== "donar") {
    //   throw new Error("Not a donar account");
    // }
    // if (inventoryType === "out" && user.role !== "hospital") {
    //   throw new Error("Not a hospital");
    // }

    if (req.body.inventoryType == "out") {
      const requestedBloodGroup = req.body.bloodGroup;
      const requestedQuantityOfBlood = req.body.quantity;
      const organisation = new mongoose.Types.ObjectId(req.body.userId);
      //calculate Blood Quanitity
      const totalInOfRequestedBlood = await inventoryModel.aggregate([
        {
          $match: {
            organisation,
            inventoryType: "in",
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      // console.log("Total In", totalInOfRequestedBlood);
      const totalIn = totalInOfRequestedBlood[0]?.total || 0;
      //calculate OUT Blood Quanitity

      const totalOutOfRequestedBloodGroup = await inventoryModel.aggregate([
        {
          $match: {
            organisation,
            inventoryType: "out",
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      const totalOut = totalOutOfRequestedBloodGroup[0]?.total || 0;

      //in & Out Calc
      const availableQuanityOfBloodGroup = totalIn - totalOut;
      //quantity validation
      // if (availableQuanityOfBloodGroup < requestedQuantityOfBlood) {
      //   return res.status(500).send({
      //     success: false,
      //     message: `Only ${availableQuanityOfBloodGroup}ML of ${requestedBloodGroup.toUpperCase()} is available`,
      //   });
      // }
      req.body.hospital = user?._id;
    } else {
      req.body.donar = user?._id;
    }

    //save record
    const inventory = new inventoryModel(req.body);
    await inventory.save();
    return res.status(201).send({
      success: true,
      message: "New Blood Reocrd Added",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Errro In Create Inventory API",
      error,
    });
  }
};

// GET ALL BLOOD RECORS
const getInventoryController = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find({
        organisation: req.body.userId,
      })
      .populate("donar")
      .populate("hospital")
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      messaage: "get all records successfully",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Get All Inventory",
      error,
    });
  }
};


const getInventoryControllerfull = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find({
        
      })
      .populate("donar")
      .populate("hospital")
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      messaage: "get all records successfully",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Get All Inventory",
      error,
    });
  }
};
// GET Hospital BLOOD RECORS
const getInventoryHospitalController = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find(req.body.filters)
      .populate("donar")
      .populate("hospital")
      .populate("organisation")
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      messaage: "get hospital comsumer records successfully",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Get consumer Inventory",
      error,
    });
  }
};

// GET BLOOD RECORD OF 3
const getRecentInventoryController = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find({
        
      })
      .limit(3)
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "recent Invenotry Data",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Recent Inventory API",
      error,
    });
  }
};

// GET DONAR REOCRDS
const getDonarsController = async (req, res) => {
  try {
    const organisation = req.body.userId;
    //find donars
    const donorId = await inventoryModel.distinct("donar", {
      organisation,
    });
    // console.log(donorId);
    const donars = await userModel.find({ _id: { $in: donorId } });

    return res.status(200).send({
      success: true,
      message: "Donar Record Fetched Successfully",
      donars,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Donar records",
      error,
    });
  }
};

const getHospitalController = async (req, res) => {
 
    try {
      const donarData = await userModel
        .find({ role: "donar" })
        .sort({ createdAt: -1 });
  
      return res.status(200).send({
        success: true,
        Toatlcount: donarData.length,
        message: "Donar List Fetched Successfully",
        donarData,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        success: false,
        message: "Error In DOnar List API",
        error,
      });
    }
  };
  const EditHospitalController = async (req, res) => {
    try {
      const { id } = req.params;
      const { bloodGroup, quantity, email,status } = req.body;
  
      const record = await inventoryModel.findByIdAndUpdate(
        id,
        { bloodGroup, quantity, email,status },
        { new: true }
      );
  
      if (!record) return res.status(404).json({ success: false, message: "Record not found" });
  
      res.status(200).json({ success: true, message: "Record updated successfully", record });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  };
  

// GET ORG PROFILES
const getOrgnaisationController = async (req, res) => {
  try {
    const donar = req.body.userId;
    const orgId = await inventoryModel.distinct("organisation", { donar });
    //find org
    const organisations = await userModel.find({
      _id: { $in: orgId },
    });
    return res.status(200).send({
      success: true,
      message: "Org Data Fetched Successfully",
      organisations,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In ORG API",
      error,
    });
  }
};
// GET ORG for Hospital
const getOrgnaisationForHospitalController = async (req, res) => {
  try {
    const hospital = req.body.userId;
    const orgId = await inventoryModel.distinct("organisation", { hospital });
    //find org
    const organisations = await userModel.find({
      _id: { $in: orgId },
    });
    return res.status(200).send({
      success: true,
      message: "Hospital Org Data Fetched Successfully",
      organisations,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Hospital ORG API",
      error,
    });
  }
};


const getcurrentUserController = async (req, res) => {
  try {
    // Correcting the user lookup to directly use the userId
    const userId = req.body.userId; // Extract user ID from request body

    if (!userId) {
      return res.status(400).send({
        success: false,
        message: "Missing required field: userId",
      });
    }

    const user = await userModel.findById({ _id: userId });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "User Fetched Successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
}
const deleteInventoryRecord = async (req, res) => {
  try {
    const { id } = req.params;  // Capture ID from URL

    // Check if the ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid ID format' });
    }

    // Find and delete the record by ID
    const deletedRecord = await inventoryModel.findByIdAndDelete(id);

    if (!deletedRecord) {
      return res.status(404).json({ success: false, message: 'Record not found' });
    }

    res.status(200).json({ success: true, message: 'Record deleted successfully' });
  } catch (error) {
    console.error("Error deleting record:", error.message); // Log the error
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
// Update donor email by record ID
const updateDonorEmail = async (req, res) => {
  
    const { id } = req.params; // Get the blood record ID from URL params
    const { donorEmail } = req.body; // Get the donor email from the request body
  
    try {
      // Find the record by ID
      const record = await inventoryModel.findById(id);
  
      if (!record) {
        return res.status(404).json({ success: false, message: "Record not found" });
      }
  
      // Check if the email already exists in the array
      if (record.donorEmail.includes(donorEmail)) {
        return res.status(400).json({ success: false, message: "Email already added" });
      }
  
      // Add the new donor email to the array
      record.donorEmail.push(donorEmail);
  
      // Save the updated record
      await record.save();
  
      res.status(200).json({ success: true, message: "Donor email added successfully!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };

  


module.exports = {
  createInventoryController,
  getInventoryController,
  getDonarsController,
  getHospitalController,
  getOrgnaisationController,
  getOrgnaisationForHospitalController,
  getInventoryHospitalController,
  getRecentInventoryController,
  getInventoryControllerfull,
  getcurrentUserController,
  EditHospitalController,
  deleteInventoryRecord,
  updateDonorEmail,
};