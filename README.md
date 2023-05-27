# CineQuizz

CineQuizz is an e-learning app focused on the movie domain. It covers various aspects such as genres, actors, directors, 
film business, and film analysis. The app follows a client-server architecture, with a React frontend and a Flask backend.

## Getting Started

To get started with CineQuizz, follow the instructions below.

### Prerequisites

- Node.js (v12 or above)
- Python (v3.7 or above)
- Flask (Python web framework)

### Installation

1. Clone the repository
2. Navigate to the project directory
   ```bash
   cd path/to/your/cloned/repo
   ```
 
3. Install frontend dependencies:

    ```bash
    npm install
   ```
 
4. Install backend dependencies:

    ```bash
    pip install -r requirements.txt
    ```
   Make sure to enter your **Virtual Environment** first

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

1. Start the Flask backend run either

    ```bash
    npm run start-flask-api
   ```

    or in the *`/server`* directory

    ```bash
    flask run
   ```
   This will launch the flask server.

2. Start the React frontend:

    ```bash
    npm start
   ```
   This command will start the development server for the React frontend.
3. Access the app in your browser:

    Open your web browser and navigate to http://localhost:3000 to access the CineQuizz app.
    The server is running on http://localhost:5000. 



