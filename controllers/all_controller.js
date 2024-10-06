const User = require("../models/user");

// create user and save data in database
const Create = async (req, res) => {
  try {
    const { email, password, fname, lname } = req.body;
    const emailExist = await User.findOne({ email });
    if (emailExist) {
      return res.status(400).json({ msg: "email already exist" });
    }
    const data = new User(req.body);
    if (!data) {
      return res.status(400).json({ msg: "Data Not Inserted..." });
    }
    const saveData = await data.save();
    if (saveData) {
      return res.status(200).json({ msg: "Data Inserted..." });
      res.status(200).json(saveData);
    }
  } catch (error) {
    res.status(500).json({ "create backend error": error });
  }
};

// reade all user Data form database
const getAll = async (req, res) => {
  try {
    const AllData = await User.find().select({ password: 0 });
    if (!AllData) {
      return res.status(404).json({ msg: "Record Not Found" });
    }
    res.status(200).json(AllData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// get particular user data
const getOne = async (req, res) => {
  try {
    const id = req.params.id;
    const Exist = await User.findById(id);
    if (!Exist) {
      return res.status(404).json({ msg: "User  Not Found" });
    }
    res.status(200).json(Exist);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// update particulat user data
const updateOne = async (req, res) => {
  try {
    const id = req.params.id;
    const Exist = await User.findById(id);
    if (!Exist) {
      return res.status(404).json({ msg: "User  Not Found" });
    }
    const updateData = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (updateData) {
      return res.status(200).json({ msg: "data updated successfully" });
      res.status(200).json(updateData);
    }
  } catch (error) {
    res.status(500).json({ "update back-end error ": error });
  }
};

// delete particulat user by id
const deleteOne = async (req, res) => {
  try {
    const id = req.params.id;
    const Exist = await User.findById(id);
    if (!Exist) {
      return res.status(404).json({ msg: "User  Not Found" });
    }
    const deleteData = await User.findByIdAndDelete(id);
    if (deleteData) {
      return res.status(200).json({ msg: "record deleted successfully" });
      res.status(200).json(deleteData);
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

module.exports = { Create, getAll, getOne, deleteOne, updateOne };
