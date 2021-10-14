# autism-survey

## Programs needed
- SQL Express Server Instance [SQL Express Download](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)
- Sql Server Management Studio (SSMS) [SSMS Download](https://docs.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver15)
- Git [Git Download](https://git-scm.com/downloads)
- Node.JS [Node.JS Download](https://nodejs.org/en/download/)
- Postman [Postman Download](https://www.postman.com/downloads/)
- Visual Studio Code [Visual Studio Code Download](https://code.visualstudio.com/download)
- Dbeaver (Optional SQL GUI) [Dbeaver Download](https://dbeaver.io/download/)

## Setting up your Machine
1. Download and install [Git](https://git-scm.com/downloads)
2. Download and install Node.JS [Node.JS](https://nodejs.org/en/download/)
3. Download your IDE of choice, to replicate our steps download [Visual Studio Code](https://code.visualstudio.com/download)

## Setting up Server Locally
1. Download and install [SQL Express](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)
- Basic installation
- Accept Terms and Conditions
- Install
- Save the instance name for later use - Example: INSTANCE NAME: SQLEXPRESS
2. Open SQL Server Configuration Manager
  - Navigate to "SQL Server Services" tab
    - Ensure your SQL Server is running, it should say SQL Server {INSTANCE NAME} - Running
      - If it is not, right click SQL Server {INSTANCE NAME} -> properties -> service -> start mode -> manual
      - Go back to  "SQL Server Services" tab -> right click SQL Server {INSTANCE NAME} -> start
    - Ensure SQL Server Browser is running, it should say SQL Server Browswer - Running
      - If it is not, right click SQL Server Browser -> properties -> service -> start mode -> manual
      - Go back to  "SQL Server Services" tab -> right click SQL Server Browser -> start
    - Go to SQL Server Network Configuation -> Protocols for {SERVER NAME}
      - Right click "TCP/IP" -> Enable TCP/IP
      - Right click TCP/IP -> Properties
      - Ensure under "Protocol" the settings are as follows:
        - Enabled: Yes
        - Keep Alive: 30000
        - Listen All: Yes
      - Click "IP Addresses" tab
        - Navigate to "IPAll" tab
        - Change "TCP Port" in "IPAll" tab to 1433
        - Search for the IP tab with the IP address "127.0.0.1" & "::1"
        - Change the "TCP Port" in both these tabs to 1433
        - Click "Enabled" in both these tables -> Yes
        - Click "Active" in both these tables -> Yes
    - Go to SQL Native Client {VERSION} Configuation -> Client Protocols
      - Ensure TCP/IP is enabled
    - Go back to SQL Server Services -> Right click your server instance -> restart
3. Download and install [SSMS](https://docs.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver15) to install.
4. Open SSMS
  - If not prompted on start of SSMS with a "Connect to Server" window, navigate to "Connect" -> "Database Engine"
    - Server Type: Database Engine
    - Server Name: {COMPUTER NAME}{INSTANCE NAME} Example: LAPTOP-TEE3744/SQLEXPRESS
    - Authentication: Windows Authentication
      - Should be autofilled, if not, these fields are your windows login
    - Click "Connect", if successful, you should now be connected to the database
  - Right click "Databases" -> "New Database" -> Database name: autismsurvey -> click OK
  - Right click your server instance -> click "Security" -> change "Server Authentication" to "SQL Server and Windows Authentication mode"
  - Open up SQL Server Configuration Manager to restart your server again
    - In SQL Server Configuration Manager 
      - Right click your server instance -> restart
  - Navigate back to SSMS
  - Right click "Security" (outside most file stucture) -> right click "Logins" -> "New Login"
    - Login name: username
    - Select SQL Server Authentication 
    - Password: password
    - Confirm Password: password 
    - **Check OFF enforce password policy**
    - Change "Default database" to "autismsurvey"
  - Expand "Databases" -> expand "autismsurvey" -> expand "Security" -> right click "Users" -> click "New User"
    - User Type: SQL user with login
    - User name: username
    - Login name: username
    - Click "Membership"
      - Select all roles
  - Right click "autismsurvey" database -> click "New Query"
    - Go to [Github Link](https://github.com/asaf17/autism-survey/blob/master/SQL/apiProcedure.sql) and copy the code under SQL -> apiProcedure.sql
      - Copy the code into the query field -> Click "Execute" at the top of SSMS
- Right click "autismsurvey" database -> click "New Query"
    - Go to [Github Link](https://github.com/asaf17/autism-survey/blob/development/SQL/tableCreation.sql) and copy the code under SQL -> tableCreation.sql
      - Copy the code into the query field -> Click "Execute" at the top of SSMS
5. Note: The next step of using Dbeaver is **optional**, however, performing this step will ensure your server has access through the internet (localhost) and is a very easy to use GUI to perform SQL operations (that can be performed in SSMS instead if you so desire)
6. Download and install [Dbeaver](https://dbeaver.io/download/)
  - Open Dbeaver
  - Select "SQL Server"
    - If not prompted to select a database on start go to - "Database" -> "New Database Connection" -> "SQL Server"
      - Host: {COMPUTER NAME}{INSTANCE NAME} OR localhost
      - Port: 1433
      - Database/Schema: master
      - Authentication: SQL Server Authentication
      - User name: username
      - Password: password
  - At this point you should be able to see the server, database, and tables in Dbeaver.

## Running Our Website
1. If not done already, download and install [Git](https://git-scm.com/downloads)
2. If not done already, download and install [Node.JS](https://nodejs.org/en/download/)
3. If not done already, download and install your IDE of choice, to replicate our steps use [Visual Studio Code](https://code.visualstudio.com/download)
4. Open Visual Studio Code (VSCode)
  - Cloning code
    - Click the "Source Control" tile on the left (third tile down)
    - "Clone Repository"
    - "CLone from Github"
    - "Allow"
    - "Continue"
    - "Open Visual Studio Code"
    - "Open"
    - Select "asaf17/autism-survey"
    - Select a location you would like to download the code to
    - Open that folder in VSCode
    - "Yes, I trust the authors"
  - Running code
    - Navigate to Website -> index.html -> "Run Without Debugging" -> "Chrome"
      - You have successfully ran the front end of our website, if you would like to run other pages do the same procedure above while on those pages in VSCode

## Running/Testing APIs
1. If you have not done so already, download and install Postman [Postman](https://www.postman.com/downloads/) 
2. Go to the dbconfig.js file and update the instance name and port to what your current SQL Server is on
  - To get the port the SQL server is running on:
    - Go to SQL Server Configuration Manager
    - Click SQL Server Network Configuration
    - Right click protocols for {INSTANCE NAME}
      - Scroll down to "IPAll" and copy the port in "TCP Dynamic Ports"
3. Click "Terminal" -> "New Terminal"
4. Run ```npm install```
5. Run ```Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass```
6. Run ```nodemon api.js```
7. Open Postman
- If you want to test the API's open up postman
- GET: http://localhost:8090/api/cfql2/
- GET {Name}: http://localhost:8090/api/cfql2/{name}
- POST: http://localhost:8090/api/cfql2
- GET: http://localhost:8090/api/asdq2/
- GET {Name}: http://localhost:8090/api/asdq2/{name}
- POST: http://localhost:8090/api/asdq2
