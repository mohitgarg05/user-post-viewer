"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// server/src/index.ts
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
// Middleware to parse JSON
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Define routes
// Fetch users
app.get('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = parseInt(req.query.page, 10) || 1; // Default to page 1 if not provided
    const limit = parseInt(req.query.limit, 10) || 4; // Default to limit of 5 if not provided
    try {
        const response = yield axios_1.default.get('https://jsonplaceholder.typicode.com/users');
        const users = response.data.slice((page - 1) * limit, page * limit);
        const totalUsers = response.data.length;
        const calculatedTotalPages = Math.ceil(totalUsers / limit);
        res.status(200).json({ users, totalPages: calculatedTotalPages });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
// Fetch posts for a user
app.get('/posts/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    try {
        const response = yield axios_1.default.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
        res.status(201).json(response.data);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
// Fetch post details and comments
app.get('/post/:postId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = req.params.postId;
    try {
        const [postResponse, commentsResponse] = yield Promise.all([
            axios_1.default.get(`https://jsonplaceholder.typicode.com/posts/${postId}`),
            axios_1.default.get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
        ]);
        const post = postResponse.data;
        const comments = commentsResponse.data;
        res.status(201).json({ post, comments });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
app.get('/comment/post/:postId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = req.params.postId;
    try {
        const response = yield axios_1.default.get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
        res.status(201).json(response.data);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
// Handle 404 - Route not found
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});
// Handle other errors
app.use((err, req, res) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});
// Start the server
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
exports.default = server;
