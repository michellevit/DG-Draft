:: update-local.bat


:: This script will:
:: --1. Install and build the React app
:: --2. Copy the new reactapp build file contents to the public folder
:: --3. Echo message of completion if script runs successfully

:: Instructions
:: Navigate into the DG-Draft directory in the powershell terminal
:: Run: .\update-app.bat "Your commit message here"


@echo off
setlocal EnableDelayedExpansion


:: -------------------------------
echo Starting update-local.bat


:: -------------------------------
:: Change the directory to where the script is located
cd /d "%~dp0"
echo Current directory: %cd%


:: -------------------------------
:: Change into the React app directory
SET basePath=%cd%
cd "reactapp"


:: -------------------------------
:: Update the .env file with the correct API url for development
echo REACT_APP_API_URL=http://localhost:3000/api > .env


:: ------------------------------
:: Install and rebuild the React app
call npm install
if errorlevel 1 (
    echo NPM install failed. Check the build logs for details.
    exit /b 1
)
echo NPM install completed
call npm run build
if errorlevel 1 (
    echo NPM build failed. Check the build logs for details.
    exit /b 1
)
echo React app build completed


:: -------------------------------
:: Copy the new reactapp build file contents to the public folder
:: Check if the public folder exists before attempting to delete its contents
if exist "%basePath%\public\" (
    echo Deleting contents of %basePath%\public\
    rd /s /q "%basePath%\public\"
) else (
    echo Public directory does not exist. Skipping deletion.
)
xcopy /E /I "%basePath%\reactapp\build\" "%basePath%\public\"
if errorlevel 1 exit /b %errorlevel%
echo Files copied successfully


:: -------------------------------
:: Clear the terminal screen
cls


:: -------------------------------
:: Echo message of completion if script runs properly
echo update-local.bat completed successfully.
pause
