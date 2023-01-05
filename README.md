# Proshare
- 

# Site Map

![]()
![]()
![]()



# Project Links
- [Github FrontEnd Repo]()
- [Github BackEnd Repo]()
- [Vercel Deploy]()
- [Heroku Depoy]()

# Wireframes & React Component Hierarchy
![]()
![]()


### MVP
- A frontend and backend connected with full CRUD functionality on a MERN stack.
- - Implement User Auth.
### Backend
- Making components [index, connections, seed.js, seed.json].
- iIndex requires cors & contains .env file with URL connecting to MongoDb database.

### Frontend
- An app page that connects all components.
- Contains Routes for all routing within the App. 
- Consist of a profile page for creating, getting, updating, and deleting the contacts.
- Sending request to the deployed backend to to receive a desirable output that will be displayed. 
- A css file that allows the app to be used on all screen displays.
- A friendly Ui experience with interactive components
- Header and Footer. 

### Post MVP
- Implement a Nav Bar 

### User Stories
- As a User I want to ... so that I can ...

# Components

| Components   | Description                                                                                 |
|------------- |:-------------------------------------------------------------------------------------------:|
| App          | Contains the main Routing componets with and imported links.|
| Intro        | The intro / how-to of the App.                                           |
| Main         | Renders the main page setup with the create new and update Contacts.                     |
| Login        | set up for Google sign in with Firebase along with the layout of the container                                            |
| CreateContact| Contains the operations to do a fetch call on built api. To create | post a new contact                            |
| UpdateContact| Contains the operations to do a fetch call on built api. To update | delete a new contact                              |
| Header       | Contains the Title of the application & have it renders in a banner across the top of app.
| Footer       | Contains the dev names with links to Github and Linkedin & it renders in a banner across the bottom of app.

# Time Frames

Component | Priority | Estimated Time | Time Invested | Actual Time
---- | ---- | ---- | ---- | ----
Creating Components | H | 2hr | 3hrs | 3hrs   
Setting up + Initializing API | H | 8hrs | 10hrs | 10hrs
Making links and lining routes- | M | 4hr | 5hrs | 5hrs
Adding Form and passing its changes/Connecting fronend to backend | M | 6hrs | 7hrs | 7hrs
Passing states/ propts and updating component | H | 6hrs | 7hrs | 7hrs
Retrieving and implementing new API with separate url | H | 6hrs | 7hrs | 7hrs
Total | N/A | 32hrs | 39hrs | 39hrs

# Additional Libraries
- Axios was used to assist the import and implement API's from the backend.

# Issues and Resolutions
#### Error: Access-Control-Allow-Origin-header missing-also blocked by cors 
#### Resolution: Issue was receiving the api call from frontend due to use params being used but not funtional.
