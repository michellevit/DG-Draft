:: update-app.bat


:: This script will:
:: --1. Prepare the commit message based on the user input
:: --2. Rebuild the reactapp 'build' file
:: --3. Copy the new reactapp build file contents to the public folder
:: --4. Add the commit message you include in the call (or else default it to "[YYYYMMDD HH:MM] update")
:: --5. Echo message of completion if script runs successfully

:: Instructions
:: Make sure you are logged into Heroku from the terminal (run: 'heroku login')
:: Navigate into the GR-Demo directory in the PowerShell terminal
:: Run: .\update-app.bat "Your commit message here"


@echo off
setlocal EnableDelayedExpansion


:: -------------------------------
:: Prepare the commit message based on the user input
for /f "tokens=2-4 delims=/ " %%a in ('date /t') do (
    set _date=%%c%%a%%b
)
for /f "tokens=1-2 delims=:." %%a in ('time /t') do (
    set _time=%%a%%b
)
:: If no commit message is provided, use the current date and time
if "%~1"=="" (
    set commitMessage=%_date%-%_time% update
) else (
    set commitMessage=%~1
)


:: -------------------------------
:: Change into the React app directory
SET basePath=%cd%
cd "reactapp"


:: -------------------------------
:: Update the .env file with the correct API url for development
echo REACT_APP_API_URL=https://dgdraft.com/api > .env


:: ------------------------------
:: Install and rebuild the React app
SET basePath=%cd%
cd "reactapp"
call npm install
if errorlevel 1 (
    echo NPM install failed. Check the npm logs for details.
    exit /b 1
)
call npm run build
if errorlevel 1 (
    echo React app build failed. Check the build logs for details.
    exit /b 1
)
echo React app build completed


:: -------------------------------
:: Copy the new reactapp build file contents to the public folder
:: Check if the public folder exists before attempting to delete its contents
if exist "%basePath%\public\" (
    echo Deleting contents of %basePath%\public\
    rd /s /q "%basePath%\public\"
    if errorlevel 1 (
        echo Failed to delete the public directory. Check permissions.
        exit /b 1
    )
) else (
    echo Public directory does not exist. Skipping deletion.
)
xcopy /E /I "%basePath%\reactapp\build\" "%basePath%\public\"
if errorlevel 1 (
    echo File copy failed. Check if the build directory exists and is accessible.
    exit /b 1
)
echo Files copied successfully


:: -------------------------------
:: Add the commit message you include in the call (or else default it to "[YYYYMMDD HH:MM] update")
cd "%basePath%"
:: Git operations
git add .
if errorlevel 1 (
    echo Git add failed. Check the git status for details.
    exit /b 1
)
git commit -m "%commitMessage%"
if errorlevel 1 (
    echo Git commit failed. Check the git logs for details.
    exit /b 1
)
git push origin main
if errorlevel 1 (
    echo Git push failed. Check the git logs for details.
    exit /b 1
)


:: -------------------------------
:: Clear the terminal screen
cls


:: -------------------------------
:: Echo message of completion if script runs properly
echo Update, build, and git update process completed.
echo update-app.bat completed successfully.
pause
