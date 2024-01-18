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
  const page = parseInt(req.query.page as string, 10) || 1; // Default to page 1 if not provided
  const limit = parseInt(req.query.limit as string, 10) || 4; // Default to limit of 5 if not provided

  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    const users = response.data.slice((page - 1) * limit, page * limit);
    const totalUsers = response.data.length;
    const calculatedTotalPages = Math.ceil(totalUsers / limit);
    res.status(200).json({ users, totalPages: calculatedTotalPages });
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


app.get('/comment/post/:postId', async (req: Request, res: Response) => {
 
  const postId = req.params.postId;
  try {

    const response = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)

    res.status(201).json(response.data);
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
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default server;