const express = require('express');
const Blog = require('../models/blog');
const router = express.Router();


router.post('/allblogs',(req,res) =>{
    const blog = new Blog(req.body);
    blog.save()
        .then((result) => {res.redirect('/allblogs');
        })
        .catch((err) => {console.log(err);
        });
});

router.get('/allblogs',(req,res) =>{
    Blog.find().sort({ createdAt: -1 })
        .then((result) => { res.render('allblogs',{ blogs : result });
        })
        .catch((err) =>{ console.log(err);
        });
});

router.get('/allblogs/:id',(req,res) =>{
    const id = req.params.id;
    Blog.findById(id)
        .then((result) => { res.render('detailed',{blog : result});
        })
        .catch((err) => {console.log(err);
        });
});

router.delete('/allblogs/:id', (req, res) => {
    const id = req.params.id;
    
    Blog.findByIdAndDelete(id)
      .then(result => {
        res.json({ redirect: '/allblogs' });
      })
      .catch(err => {
        console.log(err);
      });
});

module.exports = router;