# !Quora

## !Quora Description
!Quora is a full stack Quora clone.  Using a backend of express and sequelize to house and route all of my data and using a frontend of React and Redux to make the user experience as nice as possible when navigating the site.  It was a blast to take this on and try to make this as aesthetically and functionally like Quora as possible.

To use all of the features of the site as well as just browsing, !Quroa requires user auth just like the actual Quroa site.  Please create an account or sign in as the Demo User to begin navigating. 

## !Quora Architecture 
!Quora is built with a React/Redux frontend and an Expressbackend that is working PostgreSQL as a database.  The querying is done on the backend using Sequelize.

## Frontend Technologies
### React
!Quora is a React application that utilizes a good bit of front end logic to display dynamic features.

### Redux
!Quora is quite dependent on Redux state so that the correct information can be utilized at the correct moments.  Redux thunks are constantly making calls to the backend API to retrieve data.

## Backend Technologies

!Quora uses an Express backend with Sequelize to work with a PostgreSQL database that holds all my essential information.

### Express
Flask was my top choice for my backend considering having my most experience coding in JavaScript. This made it very easy and effecient to set up my backend and get all of the data being transfered from the backend formatted the same to the frontend since they are both talking in the same language.

### Sequelize
Sequelize was a vital tool in building all of the database models required for an easy and intuitive experience on the app.  It is faily simple to set up the correct models and associations with Sequelize and makes data manipulation very easy once it is succesfully set up and migrated.

### PostgreSQL
I chose PostgresSQL as my databse because it is very intuitive and simple to work with and works very well with Sequelize to manipulate information stored in each table.


## Features

#### Questions
Users have the ability to create questions, edit their own questions, and delete their own questions.


#### Answers
Users have the ability to create answers to particular questions as well as edit and delete their answers.


#### Comments
Users have the ability to create comments on other users answers, as well as their own answers.  Editing and deleting your own comments is also just as seamless in the UI.


...Many more features to come

### Notable Difficulties
Being my first solo project it was definitley a task to get used to the workflow of React and Redux by myself, where each feature was built out fully before moving onto the next.  I had a great learning experience in doing so and made it through several bumps in the road to get this to presentation level.


## Live Site 
https://not-quora.herokuapp.com/


