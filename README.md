# Proshare
- This app is a social media platform for developers to share their projects on an explore page. It has a user model and project model that allows users to signin with a google account and add their projects. It contains a personal page for users to see all of their projects. It allows programmers to explore and see their friends or acquaintances projects, and the links associated with them.

# Site Map
<img width="1440" alt="Screen Shot 2023-01-14 at 5 28 41 AM" src="https://user-images.githubusercontent.com/115019127/212469090-4242c646-6c6b-40bb-a55d-a1023233d5d9.png">
<img width="1440" alt="Screen Shot 2023-01-14 at 6 20 54 AM" src="https://user-images.githubusercontent.com/115019127/212469503-a7338613-7761-4486-bccf-afdd8ba1ef71.png">
<img width="1440" alt="Screen Shot 2023-01-14 at 6 19 05 AM" src="https://user-images.githubusercontent.com/115019127/212469441-728f8d78-c4de-4edc-b37b-45c04eaad56d.png">
<img width="1440" alt="Screen Shot 2023-01-14 at 5 30 17 AM" src="https://user-images.githubusercontent.com/115019127/212469104-da8d542f-f2ab-494e-9cb1-418b599ea6de.png">
<img width="1440" alt="Screen Shot 2023-01-14 at 5 31 21 AM" src="https://user-images.githubusercontent.com/115019127/212469106-63a2905a-d243-4d3b-a2d1-69e96fe849ed.png">

[Mobile Nav](https://user-images.githubusercontent.com/115019127/212469224-c350464d-db6b-41d1-9f98-b7b35596a497.PNG)

[Mobile Home Page](https://user-images.githubusercontent.com/115019127/212469297-ed60d0a8-b158-4fad-b2f8-e67e26d8336e.PNG)

[Mobile Dashboard](https://user-images.githubusercontent.com/115019127/212469113-bb156155-3c27-43d6-a442-31203ac63d61.PNG)

[Mobile New-Project](https://user-images.githubusercontent.com/115019127/212469117-630f77f6-fa20-4b46-a50a-cb206b27f2f7.PNG)

[Mobile Update](https://user-images.githubusercontent.com/115019127/212469123-9fc74820-c78f-4bb5-a63a-90ffd64b61af.PNG)



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

# Additional Libraries
- Axios was used to assist the import and implemention of API's from the backend
- Css Tailwind was used to implement the navbar
  - Citation: https://app.tailwinduikit.com/listing/webapp/navigation/horizontal_navigation
- iframe
  - Citation: https://codesandbox.io/s/new

# Issues and Resolutions
#### Error: Access-Control-Allow-Origin-header missing-also blocked by cors
#### Issue was receiving the api call from frontend due to incorrect api call function
#### Resolution: Changed the put request to match the requirements of the backend API

