import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, Box, CardMedia } from '@mui/material';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`https://fullsstakkblog.netlify.app/api/posts/${id}`); // Updated to use Netlify URL
        setPost(response.data);
      } catch (error) {
        console.error('Failed to fetch post:', error);
        alert('Failed to fetch post');
      }
    };
    fetchPost();
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <Container component="main" maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        {post.title}
      </Typography>
      {post.image && (
        <Box sx={{ mb: 2 }}>
          <CardMedia
            component="img"
            image={`https://fullsstakkblog.netlify.app${post.image}`} // Updated to use Netlify URL
            alt={post.title}
            sx={{ maxHeight: '500px', objectFit: 'cover' }}
          />
        </Box>
      )}
      <Typography variant="body1">
        {post.content}
      </Typography>
    </Container>
  );
};

export default PostDetail;
