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


### Tech Stack
-Front-end: JS, HTML, CSS, CSS Tailwind, React, Netlify
-Back-end: Node.js, Express, Mongoose, MongoDB, Heroku

# MVP

### Frontend
- A frontend routing in App.js to:
  - 2 main components 
    - Home.js: Displays all projects and their details
    - Profile.js: Displays projects of the current user, allows user to update or delete them, and presents button to create a new project
  - 2 Side components: Header.js, Footer.js
- User authentication with google
- Full CRUD functionality connected to the backend
- A friendly Ui experience with interactive components
- Tablet and Mobile design


### Backend
- A backend routing in index.js to:
  - 2 Models:
    - projectModel.js
      -Properties: title, github, deployedLinks, picture, code, gid(googleID), user(id of creator), creator(name of creator)
    - userModel.js
      -Properties: googleid, email, name, profilePicture 
  - 2 Controllers:
    - projectController.js
      -Routes: get, getByID, post, put, delete 
    - userController.js
      -Routes: get, getByGoogleID, post, put, delete 
  - 4 database files:
    - connection.js
    - seed.js
    - projectSeed.json
    - userSeed.json
- Functional and connected MERN stack 


### Post MVP
- 2 frontend side components:     
  - IDE.js: Code Editor
  - Search.js: Presents user with ability to search through all of the projects in the server
- Implement a Nav Bar

### User Stories
- As a user, I want to make an account so that I can enter the website
- As a user, I want to go to my profile page so that I can add a project for others to see
- As a user, I want to update or delete my projects so change their values if an error occured
- As a user, I want to scroll through the homepage so that I can see everyone else's posted projects
- As a user, I want to navigate to the IDE tab so that I can input my code and check for errors
- As a user, I want to navigate to the Search tab so that I can look for a specific project

# Time Frames

Task | Priority | Estimated Time | Actual Time Invested
---- | ---- | ---- | ----
Creating Components | H | 2hrs | 3hrs  
Setting up + Initializing API | H | 6hrs | 8hrs 
Making links and lining routes | M | 4hrs | 5hrs
Adding Modals/forms and passing it changes | M | 6hrs | 7hrs
Connecting frontend to backend(CRUD) | H | 6hrs | 8hrs
Passing parameters and updating component | H | 3hrs | 4hrs
Implementing navbar | H | 2hrs | 3hrs 
Total | N/A | 29hrs | 38hrs 

# Additional Libraries
- Axios was used to assist the import and implemention of API's from the backend
- Css Tailwind was used to implement the navbar
  - Citation: https://app.tailwinduikit.com/listing/webapp/navigation/horizontal_navigation
- iframe
  - Citation: https://codesandbox.io/s/new

# Issues and Resolutions
#### Error: Access-Control-Allow-Origin-header missing-also blocked by cors 
#### Resolution: Issue was receiving the api call from frontend due to incorrect api call function.

####

