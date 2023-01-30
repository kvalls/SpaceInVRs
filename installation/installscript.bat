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
echo 4: Run tests
echo 5: Exit

SET /P menu-section=What would you like to do? 
IF %menu-section%==1 goto :FULL-UPDATE
IF %menu-section%==2 goto :NPM-INSTALL
IF %menu-section%==3 goto :RUN-PROGRAM
IF %menu-section%==4 goto :RUN-TESTS
IF %menu-section%==5 goto :END

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

cd SpaceInVRs/backend/jsreport
echo Installing jsreport...
CALL npm i --force

cd ..

echo JWT_SECRET=V3RY#1MP0RT@NT$3CR3T# >> .env
echo MYSQL_DATABASE=db_spaceinvrs_dev >> .env
echo MYSQL_USER=root >> .env
echo MYSQL_PASSWORD=passkris >> .env
echo MYSQL_ROOT_PASSWORD=passkris >> .env
echo DB_HOST=localhost >> .env
echo NODE_ENV=development >> .env

echo Installing backend...
CALL npm i --force

cd ../frontend
echo Installing frontend...
CALL npm i --force


cd ../../
goto :RUN-PROGRAM

Rem Run backend, frontend & jsreport
:RUN-PROGRAM

cd SpaceInVRs/backend/jsreport
START npm start

cd ..
START npm start


cd ../frontend
START ionic serve

cd ../../
goto :RUN-TESTS

Rem Run backend, frontend & jsreport
:RUN-TESTS

cd SpaceInVRs/backend/
START npm run test:coverage


cd ../frontend
START npm run test:coverage




Rem Exit the script
:END
EXIT /B