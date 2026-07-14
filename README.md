
## E-commerce API

### Introduction 

**Description**: I built an API software that handles CRUD operations of orders , cart , products , categories
and throws easy-to-understand error messages to the user.

**The Tech Stack**: Node.js, Express.js, MongoDB, Mongoose.

### Features

- Categories API :
 1. The Client is able to read all categories.
 2. The Client is able to read specific categories by its id .
 3. The Client is able to create a new category .
 4. The Client is able to Update a specific category .
 5. The Client is able to delete a category .

- Products API :
 1. The Client is able to read all Products.
 2. The Client is able to read specific Products by its id .
 3. The Client is able to create a new Product .
 4. The Client is able to Update a specific Product .
 5. The Client is able to delete a Product .
- Cart API :
 1. The Client is able to get his cart.
 2. The Client is able to add an item to the cart  .
 3. The Client is able to update an item in the cart .
 4. The Client is able to delete an item in the cart .
 5. The Client is able to delete all items the cart .
- Orders API :
 1. The Client is able to read all orders.
 2. The Client is able to read specific orders by its id .
 3. The Client is able to create an new order .
 4. The Client is able to Update an specific order .
 5. The Client is able to cancel an order .

### Prerequisites

- Node.js v24.15.0
- Express.js 4.22.2
- MongoDB and Compass
- NPM

### Installation

1. git clone
2. npm install
3. set up .env
4. npm run seed
5. npm run dev

###  Environment Variables
.env file variables

|Name|      |Explaination|                 |Example|

| :--- |     :--- |                         :--- |

|PORT|      |localhost port|               |3000|

|NODE_ENV|  |environment of the project|   |development|

|MONGO_URI| |database connection string|   |mongodb://localhost:27017/database_name|

### API Endpoints

##### Section 1 : Categories endpoints :

 1.  GET https://localhost:3000/api/categories     "Get all categories"
 2.  GET https://localhost:3000/api/categories/:id "Get category by id "
 3.  POST https://localhost:3000/api/categories    "create new category"
 4. PATCH https://localhost:3000/api/categories/:id "update category"
 5. DELETE https://localhost:3000/api/categories   "delete category"

##### Section 2 : Products endpoints :

 1.  GET    https://localhost:3000/api/products     "Get all products"
 2.  GET    https://localhost:3000/api/products/:id "Get product by id "
 3.  POST   https://localhost:3000/api/products     "create new product"
 4.  PATCH  https://localhost:3000/api/products/:id  "update product"
 5.  DELETE https://localhost:3000/api/products   " delete product"

##### Section 3 : Cart endpoints :

 1.  GET    https://localhost:3000/api/cart              "Get cart"
 2.  POST   https://localhost:3000/api/cart/items/       "create new item"
 3.  PATCH  https://localhost:3000/api/cart/items/:id    "update item"
 4.  DELETE https://localhost:3000/api/cart              "empty cart"
 5.  DELETE https://localhost:3000/api/cart/items/:id    "detete item"
 
##### Section 4 : Orders endpoints :

 1.  GET    https://localhost:3000/api/orders              "Get all orders"
 2.  GET    https://localhost:3000/api/orders/:id          "Get order by id "
 3.  PATCH  https://localhost:3000/api/orders/:id/status   "update order"
 4.  PATCH  https://localhost:3000/api/orders/:id/cancel   "cancel order"
 5.  POST   https://localhost:3000/api/orders/             "create new order"

### Project Structure

 1. controllers/ folder that carries buisness logic of the project.
 2. data/        folder that carries sample data for database.
 3. db/          folder that carries function that connects database with the app.
 4. middleware/  folder that carries the central error handler middleware.
 5. models/      folder that carries the schema of the data.
 6. node_modules/folder that carries the modules and packages.
 7. routes/      folder that carries the routes of each api .
 8. utils/       folder that carries the customized errors "app errors" and the async handler.
 9. root files:
- app.js : server
- .env : environment variables
- .env.example : environment variables with no actual values
- .gitignore : it carries the files that wont be uploaded to github.
- seed.js : data seeder
- REAdME 

**Thanks for reading! I hope this file helped you understand the project structure and setup. Feel free to explore the code!**
