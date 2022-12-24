const express = require('express');
const router = express.Router();
const Notice_board = require('../models/notice_board');

// add notice
router.post('/notice_post', async (req, res) => {
const title= req.body.notice_title;
const date= req.body.notice_date;
const body= req.body.notice_body;
console.log(`${title}, ${date}, ${body}`)
    const notice_collection= new Notice_board({
        notice_title: title,
        notice_date: date,
        notice_body:body,
    });
    console.log(notice_collection)

    try {
        await notice_collection.save();

        res.status(200).json({message: 'Notice added successfully', data: req.body});

    } catch (error) {
        res.status(500).json({message: 'Error adding notice', error: error.message});
    }
});

// get all notices
router.get('/all', async (req, res) => {
    try {
        const notices = await Notice_board.find({}).limit(8);
        res.status(200).json(notices);
    } catch (error) {
        res.status(500).json({message: 'Error fetching notices'});
    }
});

// get notice by id
router.get('/:id', async (req, res) => {
    try {
        const notice = await Notice_board.findById(req.params.id);
        res.status(200).json(notice);
    } catch (error) {
        res.status(500).json({message: 'Error fetching notice, recheck your id'});
    }
});
  
// update notice
router.put('/update/:id', async (req, res) => {
    try {
        const notice = await Notice_board.findByIdAndUpdate(req.params.id, {
            notice_title: req.body.notice_title,
            notice_date: req.body.notice_date,
            notice_body: req.body.notice_body,
        });
        res.status(200).json({message: 'Notice updated successfully'});
    } catch (error) {
        res.status(500).json({message: 'Error updating notice, recheck your id'});
    }   
});

// delete notice
router.delete('/delete/:id', async (req, res) => {
    try {
        await Notice_board.findByIdAndDelete(req.params.id);
        res.status(200).json({message: 'Notice deleted successfully'});
    } catch (error) {
        res.status(500).json({message: 'Error deleting notice, recheck your id'});
    }
});
module.exports = router;