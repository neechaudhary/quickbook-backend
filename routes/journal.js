const express = require('express');
const router = express.Router();
const journalSchema = require('../models/journal');

// router.get('/', (req, res) => {
//     res.send('hello from journal');
// });

//add a journal
router.post('/', async (req, res) => {
    try {
        const { date, from, to, debit, credit,narration } = req.body;
        // const mydate= new Date(date);
        // let day=mydate.getDay(), month=mydate.getMonth(), year=mydate.getFullYear();
        
        const journal = new journalSchema({
            // date: `${day}-${month}-${year}`,
            date,   
            from,
            to,
            debit,
            credit,
            narration
        });
        await journal.save();
        res.status(200).json({ message: "Journal added successfully" });
    } catch (error) {
        res.status(400).json({ message: "Journal not added", message: error.message });
    }
});


//get all journals
router.get('/', async (req, res) => {
    try {
        const journals = await journalSchema.find();
        res.status(200).json({ journals });
    } catch (error) {
        res.status(400).json({ message: "Journals not found", message: error.message });
    }
});

//get a journal
router.get('/:id', async (req, res) => {
    try {
        const journal = await journalSchema.findById(req.params.id);
        res.status(200).json({ journal });
    } catch (error) {
        res.status(400).json({ message: "Journal not found", message: error.message });
    }
});

//update a journal
router.patch('/:id', async (req, res) => {
    try {
        const { date, from, to, debit, credit } = req.body;
        const journal = await journalSchema.findById(req.params.id);
        journal.date = date;
        journal.from = from;
        journal.to = to;
        journal.debit = debit;
        journal.credit = credit;
        journal.narration = narration;
        await journal.save();
        res.status(200).json({ message: "Journal updated successfully" });
    } catch (error) {
        res.status(400).json({ message: "Journal not updated", message: error.message });
    }
});

//delete a journal
router.delete('/:id', async (req, res) => {
    try {
        const journal = await journalSchema.findById(req.params.id);
        await journal.remove();
        res.status(200).json({ message: "Journal deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: "Journal not deleted", message: error.message });
    }
});
module.exports = router;