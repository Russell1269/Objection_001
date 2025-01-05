const express = require("express");
const app = express();

const port = 8080;
const path = require("path");
const methodOverride = require("method-override");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
const { v4: uuidv4 } = require("uuid");
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.send("Working well");
});

app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/posts", (req, res) => {
  let id = uuidv4();
  let { username, content } = req.body;
  let numWords = 0;
  for (let i = 0; i < content.length; i++) {
    let currentCharacter = content[i];
    if (currentCharacter == " ") {
      numWords += 1;
    }
  }
  numWords += 1;
  console.log(numWords);
  if (numWords <= 5) {
    res.send(
      "Post does not accepted! \n Go back and try again with proper details"
    );
  } else {
    posts.push({ id, username, content });
    res.redirect("/posts");
  }
});

app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);

  res.render("show.ejs", post);
});

app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  console.log(post);
  res.render("edit.ejs", { post });
});

app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newContent = req.body.content;
  console.log(req.body.content);
  let post = posts.find((p) => id === p.id);
  post.content = newContent;
  res.redirect("/posts");
});

app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
 posts = posts.filter((p) => id !== p.id);
  res.redirect("/posts");
});

let posts = [
  {
    id: uuidv4(),
    username: "unknown01",
    content: "This University is not Good.",
  },
  {
    id: uuidv4(),
    username: "unknown02",
    content: "This University is  Good.",
  },
  {
    id: uuidv4(),
    username: "unknown03",
    content: "This University is not bad.",
  },
  {
    id: uuidv4(),
    username: "unknown04",
    content: "This University is bad.",
  },
];
app.listen(port, () => {
  console.log("app is listening on port : 8080");
});
