# DG Draft

![Ruby Version](https://img.shields.io/badge/Ruby-3.2.3-cc0000.svg)
![Rails Version](https://img.shields.io/badge/Rails-7.1.3-cc0000.svg)
![React Version](https://img.shields.io/badge/React-18.2.0-61dafb.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-3178c6.svg)
![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-336791.svg)
![Heroku](https://img.shields.io/badge/Platform-Heroku-6762a6.svg)

This website was created for creating fantasy disc golf leagues.

<a href="https://dgdraft.com" target="_blank"><img src="https://img.shields.io/badge/Website-red?style=for-the-badge&logo=ruby"></a>


## Table of Contents
- [Technologies Used](#technologies-used)
- [Features](#features)
- [How to Deploy Locally](#deploy-local)
- [How to Deploy on Heroku](#deploy-heroku)
- [Basic Usage](#basic-usage)
  - [Activate Virtual Env](#virtual-env)
  - [Test Data](#test-data)
  - [Common Postgres Queries](#postgres-queries)
  - [Update Player/Event Data](#update-pdga-data)
  - [Using the Heroku CLI](#heroku-cli)
- [Troubleshooting](#troubleshooting)
- [Features To Add](#features-to-add)
- [Credits](#credits)


## Technologies Used<a name="technologies-used"></a>
- Ruby
- Rails
- React
- Typescript
  

## Features<a name="features"></a>
- User Authentication


## How to Deploy Locally<a name="deploy-local"></a>
- Preliminary checks  
  - Check if the Database Exists:
    - Open the project folder in a terminal.
    - Run:
      ```bash
      psql -U postgres -h localhost -c "\l"
      ```
    - Enter the database password (found in the `.env` file).
    - Verify that the database name (`DB_NAME` from `.env`) is listed.
    - If the database does not exist, create and migrate it:
      ```bash
      rails db:create
      rails db:migrate
      ```
  - Install Dependencies:
    - Ensure all required gems are installed:
      ```bash
      bundle install
      ```
  - Start the Rails Server:
    - Run the server:
      ```bash
      rails s
      ```
  - Verify Database Data:
    - Open Rails console:
      ```bash
      rails console
      ```
    - List tables to verify schema:
      ```ruby
      ActiveRecord::Base.connection.tables
      ```
    - Check if tables contain data:
      ```ruby
      players = Player.limit(10)
      players.each { |player| puts player.inspect }
      exit
      ```
    - If the database is empty, seed it:
      ```bash
      rails db:seed
      ```
- Running the application (locally):
  - Start the Rails Server:
    - Open a terminal in the project directory.
    - Run the command:
      ```bash
      rails s
      ```
    - The server will start, and you can access the application in your web browser at `http://localhost:3000`.
  - Access the Application:
    - Open your web browser.
    - Go to `http://localhost:3000` to view and interact with your application.
  - Stop the Server:
    - When you are done working on your application, stop the server by returning to the terminal where the server is running and pressing `Ctrl + C`.
  - Optional - Monitor Logs:
    - If you need to debug or monitor the server, you can view the logs directly in the terminal where the server is running.
    - Alternatively, you can use the following command to tail the development logs:
      ```bash
      tail -f log/development.log
      ```
  - Make Changes and Restart:
    - After making changes to your code, you may need to restart the server to see the changes.
    - Stop the server with `Ctrl + C` and restart it with:
      ```bash
      rails s
      ```


## How to Deploy on Heroku<a name="deploy-heroku"></a>
- Change the reactapp .env file:
  - Go to reactapp/.env and comment out the "Development" section, and comment in the "Production" section


## Basic Usage<a name="basic-usage"></a>

### Activate the Virtual Env<a name="virtual-env"></a>
- Activate the virtual env: 
  - Navigate to the python folder in the terminal
  - Run `.\venv\Scripts\activate`

### Test Data <a name="test-data"></a>
- User: mic@mic.com
- Password: test123

### Common PostgreSQL Queries<a name="postgres-queries"></a>
- Start the Rails Console:
  - Development: `rails console`
  - Production: `heroku run rails console -a dg-draft`
- List all User data: `User.all`
- Change a User password:
  - `user = User.find_by(email: 'user@example.com')`
  - `user.password = 'new_password'`
  - `user.save`
  - Verify: `user.authenticate('new_password')`

### Update Player/Event Data<a name="update-pdga-data"></a>
- Make a copy of the python/dg-data-2024.xlsx file and update the year
- Get the data from pdga.com (follow notes instructions)
  - Copy/paste the player and event data
- Save the file in the python folder
- Modify the jsonify-data.py var 'excel_file_name' to have the current year
- Run `python jsonify.data.py`
- The data will be saved to the json files in lib/seeds
- Run the rake file to push the data to the database 
  - Development: `rails db:seed`
  - Production: `heroku run rake db:seed --app dg-draft`
  - Note: this will not create duplicates of entries with the same pdga#
  - Note: this will not create duplicates of events with the same start/end date

### Using the Heroku CLI<a name="heroku-cli"></a>
- Login: `heroku login`
- Migrate DB: `heroku run rake db:migrate -a dg-draft`
  - Note: make sure to commit to git before migrating
- Open DB Console: `heroku pg:psql -a dg-draft`
  - View all data from table: `SELECT * FROM users;`
  - Delete all data from table: `DELETE FROM challenges;`
- Get DB Data?: `heroku run rails console -a dg-draft`
- Get Heroku Logs: `heroku logs -a dg-draft`
- Restart Heroku Server: `heroku restart -a dg-draft`
- Seed DB: `heroku run rake db:seed --app dg-draft`


## Troubleshooting<a name="troubleshooting"></a>
- Apply migrations after modifying the models

## Features To Add <a name="features-to-add"></a>
- add bet-card component
  - tournament name
  - MPO or FPO
  - tournament date start
  - tournament date end 
  - close-window for selecting players
  - single or matchup
  - player A
  - player B
  - player C
  - player D
  - player E
- add leaderboard
- forgot password
- change password
- contact form


## Credits <a name="credits"></a>
Michelle Flandin