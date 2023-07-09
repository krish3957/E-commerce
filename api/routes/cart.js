const cart = require('../models/Cart');
const { verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyToken } = require('./verifyToken');

const router = require('express').Router();

//CREATE

router.post("/", verifyToken, async (req, res) => {
    const newCart = new cart(req.body);

    try {
        await newCart.save().then((result) => {
            res.status(200).json(newCart);
        })
    }
    catch (err) {
        res.status(500).json(err);
    }
})

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {

    try {
        const updatedCart = await product.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: false });
        res.json(updatedCart);
    } catch (err) {
        res.status(500).json(err);
    }
});

// //Delete 

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Cart has been deleted...");
    } catch (error) {
        res.status(500).json(error);
    }
})

// //Get User Cart

//Here id is the User Id not the Cart Id
router.get("/find/:id", async (req, res) => {
    try {
        cart.findOne({userId:req.params.id}).then((result) => {

            res.status(200).json(result);
        })
    } catch (err) {
        res.status(500).json(err);
    }
});

// //Get All Carts

router.get("/",verifyTokenAndAdmin , async (req, res) => {
    try{
        cart.find().then((result)=>{
            result.json(200).json(result);
        })
    }
    catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;
