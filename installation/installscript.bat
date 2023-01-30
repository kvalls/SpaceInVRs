@echo off

Rem First install
IF NOT EXIST "SpaceInVRs" (
    echo SpaceInVRs folder not found.
    goto :FETCH
) ELSE (
    goto :MENU
)

Rem Main menu
:MENU
echo Options (Note that after an update is done, everything will start as normal)
echo 1: Full update
echo 2: npm install
echo 3: Start the server and the web
echo 4: Exit

SET /P menu-section=What would you like to do? 
IF %menu-section%==1 goto :FULL-UPDATE
IF %menu-section%==2 goto :NPM-INSTALL
IF %menu-section%==3 goto :RUN-PROGRAM
IF %menu-section%==4 goto :END

echo Unknown option, please try again.
goto :MENU


Rem Fetch from GitHub
:FULL-UPDATE
SET /P answer=Do you wish to update the repository? (y/n) 
IF %answer%==y goto :INITIATE-UPDATE
IF %answer%==Y goto :INITIATE-UPDATE
IF %answer%==n goto :MENU
IF %answer%==N goto :MENU

echo Unknown option, please try again.
goto :FULL-UPDATE

:INITIATE-UPDATE
rd /s SpaceInVRs
goto :FETCH

:FETCH
echo Cloning from GitHub...
git clone https://github.com/kvalls/SpaceInVRs.git
goto :NPM-INSTALL


:NPM-INSTALL
Rem npm install
cd SpaceInVRs/backend
echo Installing backend...
CALL echo 'JWT_SECRET=V3RY#1MP0RT@NT$3CR3T#

MYSQL_DATABASE=db_spaceinvrs_dev
MYSQL_USER=root
MYSQL_PASSWORD=passkris
MYSQL_ROOT_PASSWORD=passkris

DB_HOST=localhost

NODE_ENV=development' >> .env
CALL npm i --force
CALL npm run dbpush

cd /jsreport
echo Installing jsreport...
CALL npm i --force

cd ../../frontend
echo Installing frontend...
CALL npm i --force


cd ../../
goto :RUN-PROGRAM


Rem Run backend, frontend & jsreport
:RUN-PROGRAM
cd SpaceInVRs/backend
START npm start

cd /jsreport
START npm start

cd ../../frontend
START ionic serve




Rem Exit the script
:END
EXIT /B