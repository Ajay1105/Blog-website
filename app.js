const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

var posts = [];

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit ameluctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odi"
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elvitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivaneque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut cor"

app.get("/", (req, res) => {
    res.render('home', { homeText: homeStartingContent, inputData: posts });
});
app.get("/contact", (req, res) => {
    res.render('contact', { contactText: contactContent });
});
app.get("/about", (req, res) => {
    res.render('about', { aboutText: aboutContent });
});
app.get("/compose", (req, res) => {
    res.render('compose');
});
app.post("/compose", (req, res) => {
    const input = {
        title: req.body.postTitle,
        content: req.body.postBody
    };
    posts.push(input);
    res.redirect("/");
});

app.get("/posts/:postName", function (req, res) {
    const requestedTitle = _.lowerCase(req.params.postName);
    posts.forEach(function (post) {
        const storedTitle = _.lowerCase(post.title);
        if (storedTitle === requestedTitle) {
            res.render('post', {
                title: post.title,
                content: post.content
            });
        }
    });
});

// app.get("/posts/:postName", (req, res) => {
//     for (var i = 0; i < posts.length; i++) {
//         var lowerPostName = _.lowerCase(req.params.postName);
//         var lowerTitle = _.lowerCase(posts[i].title);
//         if (lowerTitle === lowerPostName) {
//             res.render('post', { Title: posts[i].title, Content: posts[i].content })
//         } else {
//             console.log("Match not Found!");
//         }
//     };
// });


app.listen(3000, () => {
    console.log("server running at port 3000");
})