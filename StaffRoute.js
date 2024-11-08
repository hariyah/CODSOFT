import express from "express";
import Staff from "../../models/StaffManagement/staffModel.js";

const router = express.Router();

// Route for saving a new staff member
router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, age, email, role, phone, address, salary } =
      req.body;

    // Validations to confirm all the required fields are filled
    if (!firstName || !lastName || !age || !email || !role) {
      return res.status(400).send({
        message: "Send all the required fields",
      });
    }

    const newStaff = new Staff({
      firstName,
      lastName,
      age,
      email,
      role,
      phone,
      address,
      salary,
    });

    const staff = await newStaff.save();
    return res.status(201).send(staff);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for getting all staff members
router.get("/", async (req, res) => {
  try {
    const staff = await Staff.find();
    res.status(200).send(staff);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for getting a single staff member by ID
router.get("/:id", async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);
    if (!staff) {
      return res.status(404).send({ message: "Staff member not found" });
    }
    res.status(200).send(staff);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for updating a staff member by ID
router.put("/:id", async (req, res) => {
  try {
    const { firstName, lastName, age, email, role, phone, address, salary } =
      req.body;

    // Validations to confirm all the required fields are filled
    if (!firstName || !lastName || !age || !email || !role) {
      return res.status(400).send({
        message: "Send all the required fields",
      });
    }

    const staff = await Staff.findByIdAndUpdate(
      req.params.id,
      {
        firstName,
        lastName,
        age,
        email,
        role,
        phone,
        address,
        salary,
      },
      { new: true, runValidators: true }
    );

    if (!staff) {
      return res.status(404).send({ message: "Staff member not found" });
    }

    res.status(200).send(staff);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for deleting a staff member by ID
router.delete("/:id", async (req, res) => {
  try {
    const staff = await Staff.findByIdAndDelete(req.params.id);
    if (!staff) {
      return res.status(404).send({ message: "Staff member not found" });
    }
    res.status(200).send({ message: "Staff member deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;
