const mongoose = require('mongoose');
const config = require('../config/database');

//User Schema
const ItemSchema = mongoose.Schema({
    username:{
        type:String
    },
    name: {
        type: String
    },
    ingredients: {
        type: String,
        required: true
    },
    recipe: {
        type: String,
        required: true
    },
    difficulty: {
        type: Number,
        required: true
    },
    time: {
        type: Number,
        required: true
    },
    likes: {
        type: Number,
        required: false
    }
});

const Item = module.exports = mongoose.model("Item", ItemSchema);


module.exports.getItemByUsername = function(username, callback){
    const query = {username:username}
    Item.find(query, callback);
}

module.exports.addItem = function(newItem, callback){
    newItem.save(callback)
}

module.exports.addLike = function(id,callback){
    Item.updateOne({_id:id},{$inc: { likes: 1 }},callback);
}

module.exports.modifyRecipe = function(id, newRecipe, callback){
    Item.updateOne({_id:id},{
        name:newRecipe.name,
        ingredients:newRecipe.ingredients,
        recipe:newRecipe.recipe,
        difficulty:newRecipe.difficulty,
        time:newRecipe.time
    },callback);
}