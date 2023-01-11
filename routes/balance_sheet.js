const express= require('express');
const router = express.Router();
const balanceSheetSchema= require('../models/balance_sheet');

//add balance sheet details
router.post('/', async(req, res)=>{
    try {
        const {current_assets, fixed_assets, current_liabilities, shareholders_equity}= req.body;
        
        //calculating total current assets
        const {cash, acnt_receivable, inventory,} = current_assets;
        const total_current= cash + acnt_receivable + inventory;
        //calculating total fixed assets
        const {plants_nd_machinery, depreciation, land, intangible_assets} = fixed_assets;
        const total_fixed= plants_nd_machinery - depreciation + land + intangible_assets;
        //calculating total assets
        const total_assets= total_current + total_fixed;

        //calculating total current liabilities
        const {acnt_payable, taxes_payable, long_term_bond} = current_liabilities;
        const total_current_liabilities= acnt_payable + taxes_payable + long_term_bond;
        //calculating total shareholders equity
        const {Common_stock, Retained_earnings} = shareholders_equity;
        const total_shareholders_equity= Common_stock + Retained_earnings;
        //calculating total liabilities
        const total_liabilities= total_current_liabilities + total_shareholders_equity;
        const balanceSheet = new balanceSheetSchema({
            current_assets:{
                cash:cash,
                acnt_receivable:acnt_receivable,
                inventory:inventory,
                total_current_assets:total_current
            },
            fixed_assets:{
                plants_nd_machinery:plants_nd_machinery,
                depreciation:depreciation,
                land:land,
                intangible_assets:intangible_assets,
                total_fixed_assets:total_fixed
            },
            total_assets:total_assets,
            current_liabilities:{
                acnt_payable:acnt_payable,
                taxes_payable:taxes_payable,
                long_term_bond:long_term_bond,
                total_current_liabilities:total_current_liabilities
            },
            shareholders_equity:{
                Common_stock:Common_stock,
                Retained_earnings:Retained_earnings,
                total_shareholders_equity:total_shareholders_equity
            },
            total_liabilities:total_liabilities
        });
        const savedBalanceSheet = await balanceSheet.save();
        res.json({message:"balance sheet added successfully",savedBalanceSheet});
    } catch (error) {
        res.json({message: error});
    }
});

//get all balance sheet details
router.get('/', async(req, res)=>{
    try {
        const balanceSheet = await balanceSheetSchema.find();
        res.json(balanceSheet);
    } catch (error) {
        res.json({message: error});
    }
});

//get specific balance sheet details
router.get('/:balanceSheetId', async(req, res)=>{
    try {
        const balanceSheet = await balanceSheetSchema.findById(req.params.balanceSheetId);
        res.json(balanceSheet);
    } catch (error) {
        res.json({message: error});
    }
});

//update balance sheet details
router.patch('/:balanceSheetId', async(req, res)=>{
    try {
        const updatedBalanceSheet = await balanceSheetSchema.findByIdAndUpdate(req.params.balanceSheetId, req.body);
            // {_id: req.params.balanceSheetId},
            // {$set: {current_assets: req.body.current_assets}},
            // {$set: {fixed_assets: req.body.fixed_assets}},
            // {$set: {current_liabilities: req.body.current_liabilities}},
            // {$set: {shareholders_equity: req.body.shareholders_equity}}
        // const updated = await updatedBalanceSheet.save();
        res.send(updatedBalanceSheet);
        res.json({message:"balance sheet updated successfully"});
    } catch (error) {
        res.json({message: error});
    }
});

//delete balance sheet details
router.delete('/:balanceSheetId', async(req, res)=>{
    try {
        const removedBalanceSheet = await balanceSheetSchema.remove({_id: req.params.balanceSheetId});
       
        res.json({message:"balancesheet deleted successfully"});
    } catch (error) {
        res.json({message: error});
    }
});

module.exports = router;