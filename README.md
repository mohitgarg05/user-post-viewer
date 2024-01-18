
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


# Architecture
User Post Viewer follows a **RESTful API** architecture, which is designed to provide a scalable and modular approach for building web services. The architecture is structured into the following main components:

#### 1. Express Server (Backend)

The backend of the application is built using the Express framework. It handles incoming HTTP requests, defines routes, and manages responses. Key components and their responsibilities include:

- **API Routes**: Define routes for fetching users, posts, and comments.
- **Middleware**: Utilizes middleware functions to parse JSON and enable Cross-Origin Resource Sharing (CORS).

#### 2. Frontend
The frontend of the application is responsible for user interface, user interactions. It is built using ReactJs(Typescript). Key components and their responsibilities include:

* **UserList** : List of users is displayed in this component 
* **UserPost** : List of Post of specific user is displayed in this component along with the comments on that post
