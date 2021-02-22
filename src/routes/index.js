const router = require("express").Router();
const { renderHome } = require("../controllers/render");

router.get("/", (req, res) => {
    renderHome(req, res)
})


module.exports = router;