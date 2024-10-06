const express = require("express");
const {
  Create,
  getAll,
  getOne,
  deleteOne,
  updateOne,
} = require("../controllers/all_controller");
const router = express.Router();

router.route("/create").post(Create);
router.route("/readall").get(getAll);
router.route("/readone/:id").get(getOne);
router.route("/updateone/:id").patch(updateOne);
router.route("/delete/:id").delete(deleteOne);

module.exports = router;
