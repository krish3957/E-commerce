const user = require('../models/User');
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken');

const router = require('express').Router();


router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    if (req.body.password) {
        req.body.password = Crypto.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
        ).toString();
    }
    try {
        const updatedUser = await user.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: false });
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Delete 

router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        user.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted...");
    } catch (error) {
        res.status(500).json(error);
    }
})

//Get Specific User

router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        user.findById(req.params.id).then((result) => {
            const { password, ...others } = result._doc

            res.status(200).json(others);
        })
    } catch (err) {
        res.status(500).json(err);
    }
});

//Find all users

router.get("/find", verifyTokenAndAdmin, async (req, res) => {
    try {
        const qNew = req.query.new;
        if (qNew) {
            await user.find().sort({ createdAt: -1 }).limit(5).then((results) => {
                res.status(200).json(results);
            });
        }
        else {
            user.find().then((result) => {
                const { password, ...others } = result

                res.status(200).json(others);
            });
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;

//User Stats

router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    try {
        const data = await user.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            {
                $project: {
                    month: { $month: "$createdAt" }
                }
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 }
                }
            }
        ])
        res.status(200).json(data);
    }
    catch (err) {
        res.status(500).json(err);
    }
})