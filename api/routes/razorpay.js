const router = require('express').Router();
  const Razorpay = require('razorpay');
  var instance = new Razorpay({

    key_id: process.env.key_id,
    key_secret: process.env.key_secret,
  });


router.post("/payment",function(req,res){

var options = {
  amount: req.body.amount,  // amount in the smallest currency unit
  currency: "INR"
};
instance.orders.create(options, function(err, order) {
    console.log(order);
    res.send(order);
  }
);
})

module.exports = router;
