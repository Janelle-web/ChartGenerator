const express = require('express');
const router = express.Router();
const chartModel = require('../models/chartSettings');

//routes
router.get('/all', (req,res)=>{
    chartModel.find((err,docs) => {
        if(err){
            console.log('Error:' + err);
            res.status(500).json({
                message: 'Problems when reading the information.',
                success: false
            });
        }else{
            console.log('The information was read successfully.');
            res.status(200).json({
                documents: docs,
                success: true
            });
        }
    });
});

router.get('/:chartId',(req,res)=>{
    chartModel.findOne({
        _id : req.params.chartId
    },(err,doc)=>{
        if(err){
            console.log('Error:' + err);
            res.status(500).json({
                message: 'Problems when reading the chart settings.',
                success: false
            });
        }else{
            console.log('The chart settings were read successfully.');
            res.status(200).json({
                documents: doc,
                success: true
            });
        }
    });
})


module.exports = router;