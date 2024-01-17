// server/src/index.ts
import express, { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware to parse JSON
app.use(express.json());
app.use(cors());

// Define routes

// Fetch users
app.get('/users', async (req: Request, res: Response) => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    res.status(201).send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Fetch posts for a user
app.get('/posts/:userId', async (req: Request, res: Response) => {
  const userId = req.params.userId;
  try {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    res.status(201).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Fetch post details and comments
app.get('/post/:postId', async (req: Request, res: Response) => {
  const postId = req.params.postId;
  try {
    const [postResponse, commentsResponse] = await Promise.all([
      axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`),
      axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
    ]);

    const post = postResponse.data;
    const comments = commentsResponse.data;

    res.status(201).json({ post, comments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Handle 404 - Route not found
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' });
});

// Handle other errors
app.use((err: Error, req: Request, res: Response) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
