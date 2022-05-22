const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const config = require("../config/database")
const User = require('../models/user');
const Item = require('../models/item');

//Register
router.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    //Check if username already exists
    User.getUserByUsername(req.body.username,(err, user) => {
        if(err) throw err;
        if(user){ //if user already in db, error
            return res.json({success:false, cause:"username", msg:"User already exists"});
        } else { //then, check if email already exists
            User.getUserByEmail(req.body.email,(err, user) => {
                if(err) throw err;
                if(user){ //if email address already in db, error
                    return res.json({success:false, cause:"email", msg:"Email adress already exists"});
                } else { //else, add user
                    User.addUser(newUser, (err,user) => {
                        if(err){
                            res.json({success: false, msg:"Failed to register user"});
                
                        } else {
                            res.json({success: true, msg: "User registered"});
                        }
                    });
                }
            })
        }
    });
});

//Authenticate
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if(err) throw err;
        if(!user){
            return res.json({success:false, msg: 'User not found'});
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch){
                const token = jwt.sign({date:user}, config.secret, {
                    expiresIn: 604800 //1 week
                });
                
                res.json({
                    success: true,
                    token: 'JWT '+token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                });
            } else {
                return res.json({success:false, msg: 'Wrong password'});
            }
        });
    });
});

//Profile
router.get('/profile', passport.authenticate("jwt", {session:false}), (req, res, next) => {
    res.json({user: req.user});
});

//Add item
router.post('/addItem', (req, res, next) => {
    let newItem = new Item({
        username:req.body.username,
        name: req.body.name,
        ingredients: req.body.ingredients,
        recipe: req.body.recipe,
        difficulty: req.body.difficulty,
        time: req.body.time
    });

    Item.addItem(newItem, (err,user) => {
        if(err){
            res.json({success: false, msg:"Failed to add item"});

        } else {
            res.json({success: true, msg: "Item added"});
        }
    });
});

//Add like
router.post(`/itemDetail/:id/addLike`, (req, res, next) => {
    console.log("POST LIKE")
    Item.addLike(req.params.id, (err) => {
        if(err){
            res.json({success: false, msg:"Failed to add like"});
        } else {
            res.json({success: true, msg: "Like added"});
        }
    });
});

//Modify recipe
router.put(`/itemDetail/:id/modifyRecipe`,passport.authenticate("jwt", {session:false}), (req, res, next) => {
    
    //Check if username is correct
    const username_to_check = username;

    //Find owner of the recipe
    Item.findById(req.params.id,(err, item) => {
        console.log(req.params.id)
        if (err) {
          console.error(err)
          res.status(500).json({ err: err })
          return
        } else {
            const current_username = item.username //owner of the recipe
            console.log("Username to check ",username_to_check)
            console.log("Current username ",current_username)
            if(current_username!=username_to_check){
                console.log("Different usernames!")
                res.json({success: false, msg:"Failed to modify recipe : you don't have the right to modify the recipe"});
            } else {
                console.log("Same usernames ! OK")
                let newRecipe = Item({
                    name: req.body.name,
                    ingredients: req.body.ingredients,
                    recipe: req.body.recipe,
                    difficulty: req.body.difficulty,
                    time: req.body.time
                });
                Item.modifyRecipe(req.params.id, newRecipe, (err) => {
                    if(err){
                        res.json({success: false, msg:"Failed to modify recipe"});
                    } else {
                        res.json({success: true, msg: "Recipe modified"});
                    }
                });
            }
        } 
    })
});

//Get items
router.get('/dashboard', (req, res, next) => {
    Item.find((err, items_list) => {
        if (err) {
          console.error(err)
          res.status(500).json({ err: err })
          return
        } else {
            res.status(200).json({ items: items_list })
        } 
    })
});

//Get specific item
router.get(`/itemDetail/:id`, (req, res, next) => {

    Item.findById(req.params.id,(err, item) => {
        if (err) {
          console.error(err)
          res.status(500).json({ err: err })
          return
        } else {
            res.status(200).json({ item: item })
        } 
    })
});

//Get my recipes
router.get('/myrecipes', passport.authenticate("jwt", {session:false}), (req, res, next) => {
    Item.getItemByUsername(username, (err, recipes) => {
        if (err) {
            console.error(err)
            res.status(500).json({ err: err })
            return
        } else {
            res.status(200).json({ recipes: recipes })
        }   
    })
    
});

module.exports = router;