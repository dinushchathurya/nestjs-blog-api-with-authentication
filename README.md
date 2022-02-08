## NestJs blog API with authentication

### API Endpoints

| Method  | Endpoint             | Parameters      | Header                |      Description      |
| ------- | -------------------- |--------------   | --------------------  | --------------------|
| POST    | api/v1/auth/register |email , password (If Admin: role= admin) | Register new user     |
| POST    | api/v1/auth/login    |email , password |                       | Login user            |
| POST    | api/v1/auth/forgot-password  | email   |                       | Forgot password       |
| GET     | api/v1/auth/profile  |                 | Bearer { token }      | Get user profile      |
| GET     | api/v1/blog          |                 |                       | Get all blog posts    |
| GET     | api/v1/blog/:id      |                 |                       | Get blog post by id   |
| POST    | api/v1/blog/create   | title, description   | Bearer { token } | Create new blog post  |
| PUT     | api/v1/blog/:id      | title, description   | Bearer { token } | Update blog post      |
| DELETE  | api/v1/blog/:id      |                 | Bearer { token }      | Delete blog post      |
| GET     | api/v1/user          |                 | Bearer { token }      | Get all users         |
| GET     | api/v1/user/:id      |                 |                       | Get user by id with related blogs|


