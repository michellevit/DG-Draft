:: update-app.bat


:: This script will:
:: --1. Prepare the commit message based on the user input
:: --2. Rebuild the reactapp 'build' file
:: --3. Copy the new reactapp build file contents to the public folder
:: --4. Add the commit message you include in the call (or else default it to "[YYYYMMDD HH:MM] update")
:: --5. Echo message of completion if script runs successfully


:: Instructions
:: Make sure you are logged into heroku form terminal (run: 'heroku login')
:: Navigate into the GR-Demo directory in the powershell terminal
:: Run: .\update-app.bat "Your commit message here"


@echo off
setlocal EnableDelayedExpansion


:: --1. Prepare the commit message based on the user input
:: Get current date and time in YYYYMMDD-HHMM format
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


:: --2. Rebuild the reactapp 'build' file 
SET basePath=%cd%
cd "reactapp"
call npm install
:: Build React app with production environment
cross-env NODE_ENV=production npm run build

:: --3. Copy the new reactapp build file contents to the public folder
:: Check if the public folder exists before attempting to delete its contents
if exist "%basePath%\public\" (
    echo Deleting contents of %basePath%\public\
    rd /s /q "%basePath%\public\"
) else (
    echo Public directory does not exist. Skipping deletion.
)
xcopy /E /I "%basePath%\reactapp\build\" "%basePath%\public\"


:: --4. Add the commit message you include in the call (or else default it to "[YYYYMMDD HH:MM] update")
cd "%basePath%"
:: Git operations
git add .
git commit -m "%commitMessage%"
git push origin main


:: --5. Echo message of completion if script runs properly
echo Update, build, and git update process completed.
echo update-app.bat completed successfully.