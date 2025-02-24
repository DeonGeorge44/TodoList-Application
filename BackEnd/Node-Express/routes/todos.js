var express = require('express');
var router = express.Router();


const mongoose =require('mongoose');

mongoose.connect('mongodb://localhost:27017/TODOLIST')
.then(()=>console.log('Connected'))
.catch((err)=>console.error(err));

const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    title:String,
    description:String,
    status:String,
    priority:String
})

const TodoModel = mongoose.model('todolist', TodoSchema);



/*GET Users Listing*/
router.get('/',async function(req,res,next){
    let todos = await TodoModel.find({})
    

    res.json(todos);
})


router.get('/:id',async function(req,res,next){
    let id = req.params.id;
    
    let todo = await TodoModel.findById(id);
    
    
    res.json(todo);
})

/*POST Todo Details*/
router.post('/',async function(req,res,next){
    let todo = req.body;
    let result = await TodoModel.create(todo);
    res.json(result);
})

    /*PATCH Todo Details*/
router.patch('/:id',async function(req,res,next){
    let id = req.params.id;
    let todo = req.body; 

    let result = await TodoModel.findByIdAndUpdate(id,todo);
    console.log(result);

    res.json(todo);
});

/*DELETE Todo Details*/
router.delete('/:id' ,async function(req,res,next){
    let id = req.params.id;

    let result = await TodoModel.findByIdAndDelete(id)

    res.json(id);
});




module.exports = router;