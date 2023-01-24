# Proshare
- Proshare is a social media platform for developers to share their projects. It has a user and project model that allows users to signin with their google account and add their projects. It contains a personal page for users to see all of their projects. It allows developers to explore and see their friends or acquaintances projects, and the links associated with them.

# Site Map
<img width="1440" alt="Screen Shot 2023-01-14 at 5 28 41 AM" src="https://user-images.githubusercontent.com/115019127/212469090-4242c646-6c6b-40bb-a55d-a1023233d5d9.png">
<img width="1440" alt="Screen Shot 2023-01-15 at 5 31 51 AM" src="https://user-images.githubusercontent.com/115019127/212535748-9ed017b2-c013-46c8-a6a6-a5f38e0c0de1.png">
<img width="1440" alt="Screen Shot 2023-01-15 at 5 26 49 AM" src="https://user-images.githubusercontent.com/115019127/212535592-9d7ebbde-0aff-4b1b-9cb1-fd2987eee70e.png">
<img width="1440" alt="Screen Shot 2023-01-14 at 5 30 17 AM" src="https://user-images.githubusercontent.com/115019127/212469104-da8d542f-f2ab-494e-9cb1-418b599ea6de.png">
<img width="1440" alt="Screen Shot 2023-01-14 at 5 31 21 AM" src="https://user-images.githubusercontent.com/115019127/212469106-63a2905a-d243-4d3b-a2d1-69e96fe849ed.png">

[Mobile Nav](https://user-images.githubusercontent.com/115019127/212536299-a1400260-bb20-45d8-937a-8dfe62092120.PNG)

[Mobile Home Page](https://user-images.githubusercontent.com/115019127/212469297-ed60d0a8-b158-4fad-b2f8-e67e26d8336e.PNG)

[Mobile Dashboard](https://user-images.githubusercontent.com/115019127/212469113-bb156155-3c27-43d6-a442-31203ac63d61.PNG)

[Mobile New-Project](https://user-images.githubusercontent.com/115019127/212536421-fe217999-6b5c-4d65-98e8-e0a422568fc6.PNG)

[Mobile Update](https://user-images.githubusercontent.com/115019127/212536431-8faf381b-8a02-4f4f-ab21-671828c469a7.PNG)

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
-Front-end: JS, HTML, CSS, CSS Tailwind, React, AWS Amplify, Netlify
-Back-end: Node.js, Express, Mongoose, MongoDB, Heroku, AWS EC2

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

# External Technologies
- Axios was used to assist the import and implemention of API's from the backend
- Css Tailwind was used to implement the navbar
  - Citation: https://app.tailwinduikit.com/listing/webapp/navigation/horizontal_navigation
- Iframe
  - Citation: https://codesandbox.io/s/new

# Issues and Resolutions
#### Error: Access-Control-Allow-Origin-header missing-also blocked by cors
#### Issue was receiving the api call from frontend due to incorrect api call function
#### Resolution: Changed the put request to match the requirements of the backend API

