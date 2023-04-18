const express = require('express');
const app = express();
const items = require('./Items');

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/api/items', (req, res) => {
    res.json(items);
})

app.post('/api/items', (req, res) => {
    const newItem = {
        name: req.body.name,
        id: req.body.id,
        price: req.body.price
    }
    items.push(newItem)
    res.json(items)
})

app.delete('/api/items/:id', (req, res) => {
    let { id } = req.params
    let itemToBeDeleted = items.find(items => items.id === id);

    if(itemToBeDeleted) {
        res.json({
            message: "Item Deleted",
            items: items.filter(items => items.id !== id)
        })
    } else{
        res.status(404)
        .json({message: `Item you are looking for ${req.params.id} doesn't exist`})
    }
})

app.put('/api/items/:name', (req, res) => {
    let { name } = req.params
    let itemToBeUpdated = items.find(items => items.name === name);

    if(itemToBeUpdated){
        const updatedItem = req.body;
        items.forEach(items => {
            if(items.name === req.params.name) {
                items = updatedItem ? updatedItem : items
                res.json({message: 'Item update', items})
            }
        })
    } else{
        res.status(404)
        .json({message: `Item you are looking for ${req.params.name} doesn't exist`})
    }
})


app.listen(4000, () =>{
    console.log('My items are running at PORT - 4000');
})