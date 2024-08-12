import React from 'react';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';

const Post = ({ post, onClick }) => {
  return (
    <Card variant="outlined" sx={{ mb: 2, cursor: 'pointer' }} onClick={onClick}>
      {post.image && (
        <CardMedia
          component="img"
          height="140"
          image={`http://localhost:5000${post.image}`} // Ensure the path is correct
          alt={post.title}
        />
      )}
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          {post.title}
        </Typography>
        <Typography variant="body1">
          {post.content}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Post;
