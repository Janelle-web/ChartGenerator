const express = require('express');
const router = express.Router();
const chartModel = require('../models/chartSettings');

//routes
router.post('/', (req,res)=>{

    //saving info coming from web browser
    const input = req.body;
    const newDocument = new chartModel({
        title: input.title,
        description: input.description,
        labels: input.labels,
        colors: input.colors,
        numbers: input.numbers
    });
    newDocument.save((err,doc)=> {
        if(err){
            console.log('ERROR:' + err);
            res.status(500).json({
                message: 'Problems when saving the information.',
                success: false
            });
        }else{
            console.log('The chart settings were saved');
            res.status(200).json({
                message: 'Chart settings were saved',
                success: true
            });
        }
    });
});

module.exports = router;