const express = require("express");
const app = express();
const note = require("./model/note");


const connectToDataBase = require("/mongodb");
connectToDataBase();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/getallnote", async (req, res) => {
    const notes = await note.find();
    if (notes) {
        res.send(notes);
    }
})

app.post("/addnote", async (req, res) => {
    const creatednote = await note.create({
        title: req.body.title,
        description: req.body.description
    });
    res.send(creatednote)
})

app.delete("/deletenote/:id", async (req, res) => {
    const deletednote=await note.findByIdAndDelete({_id:req.params.id});

})
app.put('/updatenote/:id',async (req,res)=>{
    const updatedNote = await note.findByIdAndUpdate(
        req.params.id,
        {
            title: req.body.title,
            description: req.body.description
        }
    );
})