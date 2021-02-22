const router = require("express").Router();
const controllers = require("../controllers/controller");
const upload = require("../middlewares/upload");


//@desc upload excel file 
//@route POST  /api/excel/upload
router.post("/upload", upload.single("file"), controllers.upload);

//@desc get all students (data) 
//@route GET  /api/excel/students
router.get("/students", controllers.getStudents);
module.exports = router;