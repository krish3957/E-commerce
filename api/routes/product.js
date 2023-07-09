const product = require('../models/Product');
const { verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyToken } = require('./verifyToken');

const router = require('express').Router();

//CREATE

//Adding product details and loacal image of the product to the database

router.post("/", verifyTokenAndAdmin, async (req, res) => {
    const newProduct = new product(req.body);
    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (error) {
        res.status(500).json(error);
    }
});



//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {

    try {
        const updatedUser = await product.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: false });
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

// //Delete 

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        product.findByIdAndDelete(req.params.id);
        res.status(200).json("Product  has been deleted...");
    } catch (error) {
        res.status(500).json(error);
    }
})

// //Get Specific Products

router.get("/find/:id", async (req, res) => {
    try {
        product.findById(req.params.id).then((result) => {

            res.status(200).json(result);
        })
    } catch (err) {
        res.status(500).json(err);
    }
});

// //Find all Products

router.get("/", async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try {
        if (qNew) {
            await product.find().sort({ createdAt: -1 }).limit(5).then((results) => {
                res.status(200).send(results);
            })
        }
        else if (qCategory) {
            await product.find({
                categories: {
                    $in: [qCategory],
                }
            }).then((results) => {
                res.status(200).send(results);
            });
        }
        else {
            product.find().then((results) => {
                res.status(200).send(results);
            })
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
