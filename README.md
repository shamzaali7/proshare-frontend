# Proshare
- This app is a social media platform for programmers to share their projects on an explore page. It has a user model and project model that allows users to signin with a google account and add their projects. It contains a personal page for users to see all of their projects. It allows programmers to explore and see their friends or acquaintances projects, and the links associated with them.

# Site Map
<img width="1440" alt="Screen Shot 2023-01-05 at 4 14 34 PM" src="https://user-images.githubusercontent.com/115019127/210881641-08f10377-3674-456a-927e-fccbdda4c715.png">
<img width="1440" alt="Screen Shot 2023-01-05 at 4 15 00 PM" src="https://user-images.githubusercontent.com/115019127/210881693-d2d635d3-06cc-439d-a27e-bb5af1f5aed4.png">
<img width="1440" alt="Screen Shot 2023-01-05 at 4 15 26 PM" src="https://user-images.githubusercontent.com/115019127/210881714-3f335967-103d-4bd3-9e90-1352f3c31ca3.png">
<img width="1440" alt="Screen Shot 2023-01-05 at 4 16 26 PM" src="https://user-images.githubusercontent.com/115019127/210881735-4f45d220-95b6-46a0-84d5-bf302762715e.png">


# Project Links
- [Github FrontEnd Repo](https://github.com/shamzaali7/proshare-frontend)
- [Github BackEnd Repo](https://github.com/shamzaali7/proshare-backend)
- [Netlify Deploy](https://main--proshares.netlify.app/search)
- [Heroku Deploy](https://proshare-backend.herokuapp.com/api/projects)

# Wireframes & React Component Hierarchy
<img width="1010" alt="Screen Shot 2023-01-05 at 4 26 55 PM" src="https://user-images.githubusercontent.com/115019127/210883419-32715069-cbb1-4e5f-b358-d505bdace16d.png">
<img width="860" alt="Screen Shot 2023-01-05 at 4 27 19 PM" src="https://user-images.githubusercontent.com/115019127/210883456-b49cd276-990c-4bbf-b170-b46f204698ca.png">
<img width="749" alt="Screen Shot 2023-01-05 at 4 27 59 PM" src="https://user-images.githubusercontent.com/115019127/210883485-75743ee9-bc05-40c6-b286-b56104f2496f.png">


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

| Components   | Description                                                                                 
|------------- |:-------------------------------------------------------------------------------------------:|
| App          | Contains the main Routing componets with and imported links.|
| Intro        | The intro / how-to of the App.|
| Main         | Renders the main page setup with the create new and update Contacts.                |
| Login        | set up for Google sign in with Firebase along with the layout of the container                                            |
| CreateContact| Contains the operations to do a fetch call on built api. To create | post a new contact                            |
| UpdateContact| Contains the operations to do a fetch call on built api. To update | delete a new contact                              |
| Header       | Contains the Title of the application & have it renders in a banner across the top of app.                             |
| Footer       | Contains the dev names with links to Github and Linkedin & it renders in a banner across the bottom of app.              |

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
