import express          from "express";
const router = express.Router();

router.get("/", (req, res) => {
    return res.status(200).send("Bank API - v0.1");
});

module.exports = router;
