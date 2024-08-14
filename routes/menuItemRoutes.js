const express = require("express");

const router = express.Router();

const MenuItem = require("../models/menuitem");

//POST Method to add a Menu Item
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newMenu = new MenuItem(data);
    const response = await newMenu.save();
    console.log("data saved");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});

//GET method TO get the menuitem
router.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log("fetch data");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});

router.get("/:tasteType", async (req, res) => {
  try {
    const tasteType = req.params.tasteType; // Extract the work type from the url parameter
    if (tasteType == "sweet" || tasteType == "spicy" || tasteType == "sour") {
      const response = await MenuItem.find({ taste: tasteType });
      console.log("response fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid taste" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});

//Menuitem update

router.put("/:id", async (req, res) => {
  try {
    const MenuItemId = req.params.id;
    const updatedMenuItemData = req.body;
    const response = await MenuItem.findByIdAndUpdate(
      MenuItemId,
      updatedMenuItemData,
      {
        new: true, // Return the update document
        runValidators: true, // Run mongoose validation
      }
    );
    if (!response) {
      return res.status(404).json({
        error: "MenuItem not found",
      });
    }
    console.log("MenuItem updated");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});

//MenuItem data delete
router.delete("/:id", async (req, res) => {
  try {
    const MenuItemId = req.params.id;
    const response = await MenuItem.findByIdAndDelete(MenuItemId);
    if (!response) {
      return res.status(404).json({
        error: "Person not found",
      });
    }
    console.log(" MenuItem data deleted");
    res.status(200).json({ message: "MenuItem Deleted Sucessfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});

module.exports = router;
