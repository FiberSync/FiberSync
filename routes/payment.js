const express = require('express');
const router = express.Router();
require("dotenv").config();
const stripe = require("stripe")(process.env.Private_Api_Key);

const DOMAIN = process.env.CLIENT_URL || "http://localhost:5173/index";

router.post("/paymentSubscription", async (req, res) => {
  const { plan } = req.body;
  let price_id;
  if(plan=="starter"){
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
      success_url: `${DOMAIN}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${DOMAIN}?cancelled=payment-cancelled`,
    });

    res.json({ url: session.url }); 
  } catch (error) {
    console.error("Stripe session creation failed:", error);
    res.status(500).json({ message: "Payment session creation failed", error: error.message });
  }
});

module.exports = router;
