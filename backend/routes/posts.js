const express = require('express');
const multer = require('multer');
const path = require('path');
const sharp = require('sharp');
const fs = require('fs');
const router = express.Router();

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the uploads directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Create a unique file name
  }
});

const upload = multer({ storage: storage });

// Array to store posts temporarily
let posts = [];

// Route to handle creating a new post
router.post('/', upload.single('image'), async (req, res) => {
  const { title, content } = req.body;

  try {
    const imageBuffer = await sharp(req.file.path).metadata();
    const { width, height } = imageBuffer;

    if (width !== 1024 || height !== 1024) {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ message: 'Image must be 1024x1024 pixels' });
    }

    const image = `/uploads/${req.file.filename}`;

    const newPost = {
      id: posts.length + 1,
      title,
      content,
      image
    };

    posts.push(newPost);
    res.status(201).json(newPost);
  } catch (error) {
    console.error('Failed to create post:', error);
    res.status(500).json({ message: 'Failed to create post' });
  }
});

// Route to fetch all posts
router.get('/', (req, res) => {
  res.status(200).json(posts);
});

// Route to fetch a specific post
router.get('/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }
  res.status(200).json(post);
});

module.exports = router;
