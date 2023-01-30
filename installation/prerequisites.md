# Prerequisites
* [Node.js](https://nodejs.org/en/download/) - You need this to install the dependencies/modules of the project.
* [MySQL Server + Workbench](https://www.mysql.com/downloads/) - You need this for the database.
> Create a MySQL Connection with the user/password according to the [.env](../installation/installscript.bat#L61) file created in the script.
>> These are the lines of the .env that you have to edit:
>>>JWT_SECRET=V3RY#1MP0RT@NT$3CR3T#

>>>MYSQL_DATABASE=db_spaceinvrs_dev (the database/connection name)

>>>MYSQL_USER=root (your root user)

>>>MYSQL_PASSWORD=passkris (your connection's password)

>>>MYSQL_ROOT_PASSWORD=passkris (your root password)

>>>DB_HOST=localhost (your host)

>>>NODE_ENV=development

## Ready to run
* [Installation Script](../installation/installscript.bat)