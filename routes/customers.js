const express= require('express');
const router = express.Router();
const customer = require('../models/customers');

// router.get('/', (req, res) => {
//     res.send('Customer route');
// });
 

//add a new customer
router.post("/",validateCustomer, async(req,res) =>{

    //generata random customer code
    const cust_id=
    Math.random().toString(36).substring(3, 10) +
    Math.random().toString(36).substring(3, 10);

    const new_customer= new customer({
        cust_code: cust_id,
        cust_name: req.body.cust_name,
        telephone: req.body.telephone,
        address: req.body.address,
        city: req.body.city,
    });
    try {
        await new_customer.save();
        res.status(200).json({message: "Customer added successfully"});
    } catch (error) {
        res.status(400).json({message: "Something went wrong, customer not added", message: error.message});
    }
    });

    //get all customers
    router.get("/get-customer", async(req,res) =>{
        try {
            const customers = await customer.find();
            res.status(200).json({customers: customers});
        } catch (error) {
            res.status(400).json({message: "Something went wrong, customers not found", message: error.message});
        }
    });


    //get a single customer
    router.get("/:id", async(req,res) =>{
        try {
            const customer_id = await customer.findById(req.params.id);
            res.status(200).json({customer: customer_id});
        } catch (error) {
            res.status(400).json({message: "Something went wrong, customer not found", message: error.message});
        }
    });

    //update a customer
    router.put("/:id", async(req,res) =>{
        try {
            const customer_id = await customer.findById(req.params.id);
            customer_id.cust_name = req.body.cust_name;
            customer_id.telephone = req.body.telephone;
            customer_id.address = req.body.address;
            customer_id.city = req.body.city;
            await customer_id.save();
            res.status(200).json({message: "Customer updated successfully"});
        } catch (error) {
            res.status(400).json({message: "Something went wrong, customer not updated", message: error.message});
        }
    });

    //delete a customer
    router.delete("/:id", async(req,res) =>{
        try {
            const customer_id = await customer.findById(req.params.id);
            await customer_id.remove();
            res.status(200).json({message: "Customer deleted successfully"});
        } catch (error) {
            res.status(400).json({message: "Something went wrong, customer not deleted", message: error.message});
        }
    });




    //validation to add customer
    async function validateCustomer(req, res, next){

        const {cust_name, telephone, address, city} = req.body;
        //check if all fields are filled
        if( cust_name === "" || telephone === "" || address === "" || city === "" ||
          cust_name === undefined || telephone === undefined || address === undefined || city === undefined ||
          cust_name === null || telephone === null || address === null || city === null)
    
          {
            return res.status(400).json({message: "All fields are required"});
        }
        //check if customer name is valid
        if(cust_name.length < 3){
            return res.status(400).json({message: "Customer name must be at least 3 characters"});
        }
        //check if telephone number is valid
        if(telephone.length < 10){
            return res.status(400).json({message: "Telephone number must be at least 10 characters"});
        }
        //check if phone number is valid
        const phoneRegex = /^\d{10}$/;
        if(!phoneRegex.test(telephone)) return res.status(400).json({message:"Phone number must be 10 digits long"});

        //check if address is valid
        if(address.length < 5){
            return res.status(400).json({message: "Address must be at least 5 characters"});
        }
    
        next();
    };

    module.exports = router;

