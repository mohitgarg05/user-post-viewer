
# User Post Viewer

User Post Viewer


# Description

Assignment for LitSpark Solutions
## Installation

1.  Clone the repository:
```bash
git clone https://github.com/mohitgarg05/user-post-viewer
cd user-post-viewer
```
2. Install dependencies:
```bash
npm install
```
3. Start the server:
```bash
npm start
```
# API Endpoints

#### Endpoint: GET /users

- Fetch a paginated list of users.
- Query Parameters:
    - page (optional, default: 1): Page number.
    - limit (optional, default: 4): Number of users per page.


#### Endpoint: GET /posts/:userId
- Description: Fetch posts for a specific user.
- Path Parameters:
    - userId: ID of the user
   
#### Endpoint: GET /comment/post/:postId
- Description: Fetch comments for a specific post
- Path Parameters:
    - postId: ID of the post


# External APIs
The backend interacts with the  [JSONPlaceholder](https://jsonplaceholder.typicode.com/) API for sample data.
