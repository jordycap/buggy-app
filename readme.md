# Buggy App

A simple todo application, deliberately filled with bugs for testing purposes.
The app consists of a fake backend server that stores the todo's and an angular 20 frontend

## Features

- Add todo
- Delete todo
- Mark todo as completed
- Filter todos by status
- Intentionally buggy behaviors for testing

## Getting Started

1. Clone the repository:
    ```bash
    git clone https://github.com/jordycap/buggy-app.git
    ```
2. Install dependencies:
    ```bash
    npm run install-all
    ```
3. Run the frontend:
    ```bash
    npm run start-frontend
    ```
4. Run the backend server:
    ```bash
    npm run start-backend
    ```

## Known Bugs (Intentional)
This app intentionally includes several quirks to simulate a “buggy” experience:

- **Incorrect item count:** The “items left” counter may not always reflect the true number of incomplete todos.  
- **Delete failures:** Deleting a todo can fail randomly, roughly 50% of the time.  
- **Fetching issues:** Loading the todo list may fail about 40% of the time.  
- **Add todo glitches:** Occasionally, adding a new todo will result in an incorrect title.  
- **Delete inconsistencies:** Sometimes deleting a todo removes the wrong item.  
- **Update inconsistencies:** Updating a todo can sometimes modify the wrong todo.  


## Unknown Bugs
There may be other unintentional bugs in the app that have not yet been discovered. Consider it a feature, not a bug :)
