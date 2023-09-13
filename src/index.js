const express = require('express')
const mongoose = require('mongoose')

const app = express()
app.use(express.json())
const port = 3000

const Post = mongoose.model('Post', {
  title: String,
  content: String,
  image_url: String,
  author: String,
})

app.get('/', async (req, res) => {
  const posts = await Post.find()
  return res.send(posts)
})

app.post("/", async (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    image_url: req.body.image_url,
    author: req.body.author
  })
  await post.save()
  return res.send(post)
})

app.put("/:id", async (req, res) => {
  const post = await Post.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    content: req.body.content,
    image_url: req.body.image_url,
    author: req.body.author
  }, {
    new: true
  })
  return res.send(post)
})

app.delete("/:id", async (req, res) => {
  const post = await Post.findByIdAndDelete(req.params.id)
  return res.send(post)
})

app.listen(port, () => {
  mongoose.connect('mongodb+srv://devdarioreis:IReGK0ecD22khM3D@blog-tecnologia-sem-seg.tt1xduf.mongodb.net/?retryWrites=true&w=majority')

  console.log(`Example app listening on port ${port}`)
})