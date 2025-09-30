## Create a course selling app

- Initalise a new Node.js project
- Add Express, jsonwebtoken, mongoose, bcrypt to it as a dependency
- Create index.js
- Add route skeleton for user login, signup, purchase a course, sees all courses, sees the purchased courses course
- Add routes for admin login, admin signup, create a course, delete a course, add course content
- Add middlewares for user and admin auth
- Add a database (mongodb), use dotenv to store the database connection string
- Define the Schema for User, Admin, Course, Purchase
- Complete the routes for user login, singup, purchase a course, see courses (Extra points - Use express routing to better structure your routes)
- Crate the frontend


### Course selling app schema

User
- id : Object ID
- email: String
- password: String
- firstname: String
- lastName: String

Admin
- id: Object ID
- email: String
- password: String
- firstName: String
- lastName: String

Course
- id: Object ID
- title: String
- description: String
- price: Number
- imageUrl: String
- adminId: Object ID

Purchases (Mapping table for user and courses purchased)
- id: Object ID
- courseId: Object ID
- userId: Object ID

