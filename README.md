## NestJs blog API with authentication

### API Endpoints

| Method  | Endpoint             | Parameters          | Header ( Bearer)       |      Description       |
| ------- | -------------------- |--------------       | --------------------   | --------------------   |
| POST    | api/v1/auth/register |email , password (If Admin: role= admin) |    | Register new user      |
| POST    | api/v1/auth/login    |email , password      |                       | Login user             |
| POST    | api/v1/auth/forgot-password  | email        |                       | Forgot password        |
| GET     | api/v1/auth/profile  |                      | { token }             | Get user profile       |
| GET     | api/v1/blog          |                      |                       | Get all blog posts     |
| GET     | api/v1/blog/:id      |                      |                       | Get blog post by id    |
| POST    | api/v1/blog/create   | title, description   | { token }             | Create new blog post   |
| PUT     | api/v1/blog/:id      | title, description   | { token }             | Update blog post       |
| DELETE  | api/v1/blog/:id      |                      | { token }             | Delete blog post       |
| GET     | api/v1/user          |                      | { token }             | Get all users          |
| GET     | api/v1/user/:id      |                      |                       | Get user by id with related blogs|

## Author
[Dinush Chathurya](https://dinushchathurya.github.io/)

## License

Copyright (c) 2022 <a href="https://dinushchathurya.github.io/">Dinush Chathurya</a> and <a href="https://codingtricks.io/">codingtricks.io</a>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Blog

https://codingtricks.io/

## 

<p ><h2 align="center">Happy<i class="fa fa-heart" style="color:red;"></i> Coding<i class="fa fa-code" style="color:orange;"> </i></h2></p>
