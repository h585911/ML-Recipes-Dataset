## ML Recipes webapp
A small fullstack project that recommends recipes based on ingredients in your fridge.
This project splits the frontend and backend into their own directories:
- `backend` - Python (FastAPI). Trains the model on datasets and serves a response to the frontend. See README in backend folder.
- `frontend` - React + Typescript. Collects user input and displays UI, also calls backend.
