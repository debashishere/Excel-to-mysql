const router = require("express").Router();
const studentRoute = require('./student_route');

//@ROUTE /api/excel/
router.use('/excel', studentRoute)


module.exports = router;