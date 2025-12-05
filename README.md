# Snippets Library Frontend (Project 3)

## Live Deployment
Live: https://fullstack-snippet-frontend.onrender.com // The public URL where the live application can be accessed (from Render).

### Setup and Local Run Instructions
<p>1. Download or Clone the project.</p>
<p>2. Install Dependencies.<br/>
npm install react bootstrap</p>
<p>3. Create a .env file in the project root. <br/>
Inside the .env file put:<br/>
VITE_API_BASE=Your own backend connection string</p>
<p>4. Run the app locally. <br/>
npm run dev</p>
<p>You should see:<br/>
Local:  http://localhost:5173/</p>

## Features
<p>- Create a New Snippet – POST /api/snippets <br/>
Can add snippets by typing the required fields title, language, and code. <br/>
There is also an option to add a description and tags to the snippets.

</p>
- Get All Snippets – GET /api/snippets
<p>This endpoint returns all snippets stored in the database. <br/>
You can filter the results by adding a lang query parameter, such as ?lang=javascript, to only show snippets written in a specific language. <br/>
You can also limit the number of results using ?limit=5. If no limit is provided, the API returns up to 10 snippets by default. <br/>
All returned snippets are sorted by their creation date, with the newest ones appearing first.
</p>


## Reflection
<p>Building this full-stack project gave me the opportunity to connect everything I’ve learned this semester into one working application. The goal of the project was to create a frontend interface that communicates with the API I previously built, while providing a simple and useful solution for storing and browsing code snippets. This project helped me understand how the frontend and backend work together through HTTP requests, how data moves between layers, and how the user interacts with that data through a graphical interface.</p>

<p>One of the most valuable parts of this project was working with React. Using useEffect to load data on page load made the application feel dynamic, and managing state with useState taught me how important predictable state updates are in React. I also learned how to handle form submissions, send POST requests, and update the UI immediately after saving a new snippet.</p>


## Video Presentation
<h3>Timestamps</h3>
<p>00:00 Introduction and problem</p>
<p>00:48 Technologies and Features</p>
<p>01:57 Live demo: POST, GET all, GET by filtered by language and limit, GET by id</p>
<p>04:33 Conclusion</p>
