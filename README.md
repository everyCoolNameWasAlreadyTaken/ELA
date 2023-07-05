# CineQuizz

CineQuizz is an e-learning app focused on the movie domain. It covers various aspects such as genres, actors, directors, 
film business, and film analysis. The app follows a client-server architecture, with a React frontend and a Flask backend.

## Getting Started

To get started with CineQuizz, follow the instructions below.

### Prerequisites

- Node.js (v12 or above)
- Python (v3.7 or above)
- Flask (Python web framework)
- [MongoDB](https://www.mongodb.com/try/download/community)

### Installation

1. Start MongoDB
   - start MongoDB server by running the following in your terminal

   ```bash
   mongod
   ```

   - by default, MongoDB runs on *`localhost`* at port *`27017`*
2. Clone the repository
3. Navigate to the project directory
   ```bash
   cd path/to/your/cloned/repo
   ```
 
4. Install frontend dependencies:

    ```bash
    npm install
   ```
 
5. Install backend dependencies:

    ```bash
    pip install -r requirements.txt
    ```
   Make sure to enter your **Virtual Environment** first
6. Update the following code to connect to MongoDB if needed in *`server/users.py`* 

   ```bash
   host = 'localhost'
   port = 27017
   user_data = 'userdata/users.json'

   client = pymongo.MongoClient(host, port)
   db = client.ela
   collection = db.users
   ```
   

### Environment Configuration

1. Create an *`env`* file in the root directory of the Flask backend.

   ```bash
   touch .env
   ```
   
2. Open the *`env`* file and add the necessary environment variables:

   ```bash
   FLASK_APP=server.py
   FLASK_ENV=development
   ```

Customize the environment variables according to your specific requirements.
### Starting the App

1. To start the Flask backend run either

    ```bash
    npm run start-flask-api
   ```
    
    in the *`/frontend`* directory,
    
    or

    ```bash
    flask run
   ```
   in the *`/server`* directory
   
   This will launch the flask server.

2. Start the React frontend:

    ```bash
    npm start
   ```
   This command will start the development server for the React frontend.
3. Access the app in your browser:

    Open your web browser and navigate to http://localhost:3000 to access the CineQuizz app.
    The server is running on http://localhost:5000. 



