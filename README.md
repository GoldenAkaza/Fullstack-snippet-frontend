# Snippets Library Frontend (Project 3)

## Live Deployment
Live: https://fullstack-snippet-frontend.onrender.com // The public URL where the live application can be accessed (from Render).

### Setup and Local Run Instructions
<p>1. Download or Clone the project.</p>
<p>2. Install Dependencies.<br/>
npm install express mongoose cors dotenv</p>
<p>3. Create a .env file in the project root. <br/>
Inside the .env file put:<br/>
PORT=3000<br/>
MONGODB_URI=Your own MongoDB Atlas connection string</p>
<p>4. Start the server. <br/>
node server.js</p>
<p>You should see:<br/>
Connected to MongoDB<br/>
Server running on port 3000</p>

## Features
<p>- Create a New Snippet – POST /api/snippets <br/>
It accepts a JSON body with the required fields title, language, and code.
</p>
- Get All Snippets – GET /api/snippets
<p>This endpoint returns all snippets stored in the database. <br/>
You can filter the results by adding a lang query parameter, such as ?lang=javascript, to only show snippets written in a specific language. <br/>
You can also limit the number of results using ?limit=5. If no limit is provided, the API returns up to 10 snippets by default. <br/>
All returned snippets are sorted by their creation date, with the newest ones appearing first.
</p>


## Reflection
<p>Working on this backend API taught me not only how to use Express and Mongoose, but also why these tools are valuable in real-world web development.
  Setting up the server from scratch helped me understand the core responsibilities of a backend—receiving requests, validating data, interacting with a database, and sending structured responses. 
  I also learned how middleware such as cors() and express.json() plays a crucial role in allowing the frontend to communicate smoothly with the backend.</p>

<p>One of the most insightful parts of the project was the Mongoose schema. 
  Defining required fields like title, language, and code, and adding automatic timestamps, helped me understand more how schemas enforce structure in a flexible NoSQL database like MongoDB. 
  I also learned the importance of transforming data for consistency—such as converting language names to lowercase for easier filtering.</p>

<p>Building the routes taught me how powerful RESTful design really is. 
  Implementing GET, POST, and identifier-based queries showed me how backend systems deliver data efficiently and predictably. 
  The route for filtering snippets using query parameters demonstrated how small features dramatically improve the usability of an API. 
  Overall, this project strengthened my understanding of backend development</p>

## Video Presentation
<h3>Timestamps</h3>
<p>00:00 Introduction and problem</p>
<p>00:48 Technologies and Features</p>
<p>01:57 Live demo: POST, GET all, GET by filtered by language and limit, GET by id</p>
<p>04:33 Conclusion</p>
