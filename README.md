# SpaceInVRs

## Documentation

* [Data Model](/documentation/data_model.md)
* [Technology comparation](/documentation/technology_comparation.md)
* [User requirements](/documentation/user_requirements.md)
* [Prototype](/documentation/prototype.md)

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
