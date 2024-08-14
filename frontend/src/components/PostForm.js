import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Paper, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

const PostForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [submitSuccess, setSubmitSuccess] = useState('');

  const onSubmit = async (data) => {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('content', data.content);
    formData.append('image', data.image[0]);

    try {
      await axios.post(
        'https://fullsstakkblog.netlify.app/api/posts', // Updated to use Netlify URL
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      setSubmitSuccess('Post created successfully');
    } catch (error) {
      console.error('Failed to create post:', error);
      alert('Failed to create post');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Create Post
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Title"
            {...register('title', { required: 'Title is required' })}
            error={!!errors.title}
            helperText={errors.title ? errors.title.message : ''}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Content"
            multiline
            rows={4}
            {...register('content', { required: 'Content is required' })}
            error={!!errors.content}
            helperText={errors.content ? errors.content.message : ''}
          />
          <input
            type="file"
            {...register('image', { required: 'Image is required' })}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Create Post
          </Button>
          {submitSuccess && <Typography color="green">{submitSuccess}</Typography>}
        </form>
      </Paper>
    </Container>
  );
};

export default PostForm;
