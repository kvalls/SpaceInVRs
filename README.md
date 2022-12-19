# SpaceInVRs

The project will feature a virtual reality game made in Unity, a database/server with MySQL and Node.js and a webpage built with Ionic + Angular where you can log in, see your score, and view certain data shown in graphs.

The objective is to gather user’s game data, which can be useful. In short, it’s about learning what tendencies the users have or what are the most common actions they take.

The theme of the virtual reality game will be controlling a spaceship 
and shooting down enemy ships, while also picking up powerups.

Depending on the data gathered, the game will learn and adapt to it.
For example if a user loses too many times, the amount of enemies would be reduced.

This project was assigned by Aiju.

## Documentation

* [Data Model](/documentation/data_model.md)
* [Technology comparation](/documentation/technology_comparation.md)
* [User requirements](/documentation/user_requirements.md)
* [Use cases](/documentation/use_cases.md)
* [Prototype](/documentation/prototype.md)

## Prerequisites

* [Node.js](https://nodejs.org/en/download/) - To install the dependencies/modules of the project.
* [MySQL Server + Workbench](https://www.mysql.com/downloads/) - This project requires a database.

## Built With

* [Visual Studio Code](https://code.visualstudio.com/) - The IDE used in this project.
* [Node.js](https://nodejs.org/en/docs/) - As an asynchronous event-driven JavaScript runtime, Node.js is designed to build scalable network applications.
* [MySQL](https://dev.mysql.com/doc/) - MySQL is the world's most popular open source database.
* [Angular](https://angular.io/docs) - Angular is an application-design framework and development platform for creating efficient and sophisticated single-page apps.
* [Ionic 6](https://ionicframework.com/docs/intro) - Ionic Framework is an open source UI toolkit for building performant, high-quality mobile and desktop apps using web technologies (HTML, CSS, and JavaScript).


## Installation Manual

Clone this respository.

```
git clone https://github.com/kvalls/SpaceInVRs.git
```

Create an empty MySQL database, in this case it's called "db_spaceinvrs_dev"

Then configure the backend to use that database in /backend/.env:
```
MYSQL_DATABASE=db_spaceinvrs_dev
MYSQL_USER={yourusername}
MYSQL_PASSWORD={yourpassword}
MYSQL_ROOT_PASSWORD={yourpassword}
```


Install dependencies and run backend:

```
cd /backend
npm install
npm start
```

Install dependencies and run frontend:

```
cd /frontend
npm install
ionic serve
```

The website should start up now.
