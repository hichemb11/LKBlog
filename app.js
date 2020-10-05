const express = require ("express");
const app = express();
const ejs = require ("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
mongoose.connect("mongodb://localhost:27017/lukountblogDB", {useNewUrlParser: true,useUnifiedTopology:true});

const loremTitle = "Sed ut perspiciatis unde omnis iste natus error sit."
const postContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras faucibus dolor eget nunc condimentum, ut tristique risus luctus. Praesent pulvinar vulputate tellus nec vulputate. In condimentum ex vitae tellus mollis faucibus. Nulla dictum scelerisque sapien quis vehicula. Ut est urna, venenatis at consectetur a, mattis quis sem. Maecenas feugiat, lacus quis condimentum porta, diam enim dapibus nulla, sit amet consectetur sapien nibh eget libero. Phasellus volutpat auctor diam sit amet dictum. Vivamus aliquam tortor quis augue ornare, eu eleifend nibh cursus. Curabitur mi arcu, molestie in diam non, sagittis congue enim. Quisque pharetra felis urna, at rhoncus diam aliquet non. Mauris euismod, odio non pulvinar euismod, lacus lorem lacinia elit, vitae auctor elit ante eu dui. Sed interdum gravida ipsum. Donec aliquet convallis lorem, et molestie dui pulvinar eget."

// -------------Database----------
const postSchema = new mongoose.Schema({
  title: String,
  content: String
  })

const Post = mongoose.model("Post", postSchema);
// ---------------------------------




app.get("/", function(req,res){
  
  Post.find({}, function(err, posts){
    res.render("bloghome", {
      posts: posts
      });
  });
});

app.get("/post", function(req,res){
  res.render("blogpost", {postTitle:postTitle, postContent:postContent})
});

app.get("/compose", function(req,res){
  res.render("compose")
});

app.post("/compose", function(req,res){

  const post = new Post({

    title: req.body.postTitle,
    content : req.body.postContent,
  
    });

    post.save(function(err){
      if (!err) {
        res.redirect("/");
      }
    });

});







app.get("/post/:postId", function(req, res){

  const requestedPostId = req.params.postId;
  
    Post.findOne({_id: requestedPostId}, function(err, post){
      res.render("blogpost", {
        title: post.title,
        content: post.content
      });
    });
  
  });

//------------
app.listen(3000, function(){
  console.log("Server started on port 3000!");
})
//-----------
