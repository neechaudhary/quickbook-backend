const express= require('express');
const router= express.Router();
const Dashboard= require('../models/dashboard');
const Invoice = require('../models/invoice');


//get allamount sum
router.get('/', async (req, res) => {
    try {
        const invoice_collection= await Invoice.find({status:"received"});
        let total_payment=0;
        invoice_collection.forEach((e) => {
            total_payment+= e.amount;
        });
        res.status(200).json({total_payment: total_payment});
    } catch (error) {
        res.status(500).json({message: 'Error getting total payment'});
    }
});

// add TO service request queue
router.post('/', async (req, res) => {

    //generate random request id
    const requestId= 
    Math.random().toString(36).substring(2,10)+
    Math.random().toString(36).substring(2,10);

    //add
    const dashboard_collection= new Dashboard({
        request_id: requestId,
        support_agent: req.body.support_agent,
        status: req.body.status
    });
    try {
        await dashboard_collection.save();
        res.status(200).json({message: 'Added to Dashboard successfully'});
    } catch (error) {
        res.status(500).json({message: 'Error adding dashboard'});
    }
});

module.exports= router;
