# [Live link](https://roxilersystemassignment1.netlify.app/)

### Backend

1. **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd <repository-backend-directory>
    ```
    
2. **Install dependencies**:
    ```bash
    npm install
    ```
    
3. **Start the server**:
    ```bash
    npm start
    ```
4. **.env**:
    ```bash
    MONGO_URI=??the uri string??
    ```
5. **initialize the database**
   ```bash
   GET http://localhost:5000/api/initialize
   ```
   this will initialize the database with provided seed url at backend 
    
   The backend will run on http://localhost:3000.
   
### Frontend

1. **Navigate to the frontend directory**:

    ```bash
    cd <repository-frontend-directory>
    ```
2. **Install dependencies**:
    ```bash 
    npm install
    ```
3. **Start the frontend**:
    ```bash
    npm run dev
    ```
    The frontend will run on http://localhost:3001 or another available port. 

