const express= require('express');
const router = express.Router();
const cashflowSchema= require('../models/cash_flow');

//ADD CASH FLOW DETAILS
router.post('/', async(req, res)=>{
    try {
        //calculate total revenues
        const {cash_balance,revenues, month} = req.body;
        const {in_store_sales,online_sales,other_revenues}=revenues;
        const total_rev = in_store_sales + online_sales + other_revenues;
        // //calculate total expenses
        // const {cost_of_goods_sold, operating_expenses} = req.body;
        // const total_expenses = cost_of_goods_sold + operating_expenses;

        const cashflow = new cashflowSchema({
            month,
            cash_balance,
            revenues:{
                in_store_sales: in_store_sales,
                online_sales:online_sales,
                other_revenues:other_revenues,
                total_revenues:total_rev
            }
           
        });
        const savedCashflow = await cashflow.save();
        res.status(200).json(savedCashflow);
    } catch (error) {
        res.json({message: error});
    }
});

//get all cash flow details
router.get('/', async(req, res)=>{
    try {
        const cashflow = await cashflowSchema.find().limit(5);
        res.json(cashflow);
    } catch (error) {
        res.json({message: error});
    }
});

//get specific cash flow details
router.get('/:cashflowId', async(req, res)=>{
    try {
        const cashflow = await cashflowSchema.findById(req.params.cashflowId);
        res.json(cashflow);
    } catch (error) {
        res.json({message: error});
    }
});

//update cash flow details
router.patch('/:cashflowId', async(req, res)=>{
    try {
           //calculate total revenues
           const {cash_balance,revenues} = req.body;
           const {in_store_sales,online_sales,other_revenues}=revenues;
           const total_rev = in_store_sales + online_sales + other_revenues;

        const updatedCashflow = await cashflowSchema.updateOne(
            {_id: req.params.cashflowId},
            {$set: {
                month,
                cash_balance,
                revenues:{
                    in_store_sales:in_store_sales,
                    online_sales:online_sales,
                    other_revenues:req.body.other_revenues,
                    total_revenues:total_rev
                }
        
            }}
        );
        res.status(200).json({message:"cashflow updated successfully", updatedCashflow });
    } catch (error) {
        res.json({message: error});
    }
});

//delete cash flow details
router.delete('/:cashflowId', async(req, res)=>{
    try {
        const removedCashflow = await cashflowSchema.remove({_id: req.params.cashflowId});
        res.json({message:"detail deleted successfully",removedCashflow});
    } catch (error) {
        res.json({message: error});
    }
});

module.exports = router;
