const express= require('express');
const router = express.Router();
const invoice= require('../models/invoice');

//add payment history   
router.post("/payment_history", async(req,res) =>{

    //generate invoice_id
    const invoice_id = 
    Math.random().toString(36).substring(2, 9);

    const invoice_collection = new invoice({
        invoice_number: invoice_id,
        amount: req.body.amount,
        status: req.body.status,
        recepient: req.body.recepient,
        invoice_date: req.body.date,
        due_date: req.body.date,
        pyament_method: req.body.pyament_method,
    });
    try {
        await invoice_collection.save();
        res.status(200).json({message: "Invoice generated",invoice_id: invoice_id,});
    } catch (error) {
        res.status(500).json({message: "Error generating invoice",error: error,});
    }
});

//get all payment history
router.get("/payment_history", async(req,res) =>{
    try {
        const invoice_collection = await invoice.find();
        res.status(200).json({message: "Invoice history",invoice_collection: invoice_collection,});
    } catch (error) {
        res.status(500).json({message: "Error fetching invoice history",error: error,});
    }
});

//get specific invoice
router.get("/payment_history/:invoice_id", async(req,res) =>{
    try {
        const invoice_collection = await invoice.findOne({invoice_number: req.params.invoice_id});
        res.status(200).json({message: "Invoice history",invoice_collection: invoice_collection,});
    } catch (error) {
        res.status(500).json({message: "Error fetching invoice history",error: error,});
    }
});

//update invoice
router.put("/payment_history/:invoice_id", async(req,res) =>{
    try {
        const invoice_collection = await invoice.findOne({invoice_number: req.params.invoice_id});
        invoice_collection.status = req.body.status;
        invoice_collection.due_date = req.body.due_date;
        invoice_collection.pyament_method = req.body.pyament_method;
        invoice_collection.recepient = req.body.recepient;
        invoice_collection.amount = req.body.amount;
        await invoice_collection.save();
        res.status(200).json({message: "Invoice updated",invoice_collection: invoice_collection,});
    } catch (error) {
        res.status(500).json({message: "Error updating invoice",error: error,});
    }
});

//delete invoice
router.delete("/payment_history/:invoice_id", async(req,res) =>{
    try {
        const invoice_collection = await invoice.findOne({invoice_number: req.params.invoice_id});
        await invoice_collection.remove();
        res.status(200).json({message: "Invoice deleted",invoice_collection: invoice_collection,});
    } catch (error) {
        res.status(500).json({message: "Error deleting invoice",error: error,});
    }
});

module.exports = router;
