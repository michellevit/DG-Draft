@echo off

REM Builds the reactapp after changes are made
REM .\update-local

REM Change the directory to where the script is located
cd /d "%~dp0"

REM Change into the React app directory and build it
SET basePath=%cd%
cd "reactapp"
call npm install


REM Build React app with development environment
cross-env NODE_ENV=development npm run build

REM Copy the new reactapp build file contents to the public folder
REM Check if the public folder exists before attempting to delete its contents
if exist "%basePath%\public\" (
    echo Deleting contents of %basePath%\public\
    rd /s /q "%basePath%\public\"
) else (
    echo Public directory does not exist. Skipping deletion.
)
xcopy /E /I "%basePath%\reactapp\build\" "%basePath%\public\"

echo update-local.bat completed successfully.
pause
