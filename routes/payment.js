const express = require('express');
const router = express.Router();
require("dotenv").config();
const stripe = require("stripe")(process.env.Private_Api_Key);
const jwt = require("jsonwebtoken");
const SubscriberModel = require("../models/subscribers");

const DOMAIN = process.env.CLIENT_URL || "https://fibersync-portfolio.vercel.app";

router.post("/paymentSubscription", async (req, res) => {
  const { plan,token } = req.body;
  let email,orgName;
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    email = decoded.email; 
    orgName = decoded.orgName;
  } catch (error) {
    console.error("Token verific ation failed:", error);
    return null;
  }

  const subscriber = await SubscriberModel.findOne({ email });

  let price_id;
  if(plan=="Starter Subscription"){
    price_id = "price_1QFfyYBImh8kdtbe73KYWBtZ";
  }else{
     price_id = "price_1QFg7qBImh8kdtbeCCm9GOQV";
  }
  try {
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
              price: `${price_id}`,
              quantity: 1,
            },
          ],
      mode: 'subscription', 
      success_url: `${DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${DOMAIN}/cancel?cancelled=payment-cancelled`,
    });
    
  if (!subscriber) {  
    const newSubscriber = new SubscriberModel({ email,orgName,plan });
    await newSubscriber.save();
  }else{
    subscriber.plan = plan;
    await subscriber.save();
  }

    res.json({ url: session.url }); 
  } catch (error) {
    console.error("Stripe session creation failed:", error);
    res.status(500).json({ message: "Payment session creation failed", error: error.message });
  }
});

module.exports = router;
