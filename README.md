# autism-survey

## Programs needed
- SQL Express Server Instance [SQL Express Download](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)
- Sql Server Management Studio (SSMS) [SSMS Download](https://docs.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver15)
- Dbeaver [Dbeaver Download](https://dbeaver.io/download/)
- Node JS [Node.JS Download](https://nodejs.org/en/download/)
- Postman [Postman Download](https://www.postman.com/downloads/)

## Setting up Server Locally
. Download [SQL Express](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)
    - Basic installation
    - Accept Terms and Conditions
    - Install
    - Save the instance name for later use - Example: INSTANCE NAME: SQLEXPRESS
. Open SQL Server Configuration Manager
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
            - Ensure under "Protocol" the settings ar as follows:
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
. Install [SSMS](https://docs.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver15) to install.
. Open SSMS
. If not prompted on start of SSMS with a "Connect to Server" window, navigate to connect -> Database Engine
    - Server Type: Database Engine
    - Server Name: {COMPUTER NAME}{INSTANCE NAME} Example: LAPTOP-TEE3744/SQLEXPRESS
    - Authentication: Windows Authentication
        - Should be autofilled, if not, these fields is your windows login
    - Click "Connect", if successful you should now be connected to the database
. Right click "Databases" -> "New Database" -> Database name: autismsurvey -> click OK
. Right click your server instance -> click "Security" -> change "Server Authentication" to "SQL Server and Windows Authentication mode"
. Open up SQL Server Configuration Manager to restart your server again
    - In SQL Server Configuration Manager 
        - Right click your server instance -> restart
. Navigate back to SSMS
. Right click "Security" (outside most file stucture) -> right click "Logins" -> "New Login"
    - Login name: username
    - Select SQL Server Authentication 
    - Password: password
    - Confirm Password: password 
    - **Check OFF enforce password policy**
    - Change "Default database" to autismsurvey
. Click "New Query" at the top of SSMS
    - Go to [Github Link](https://github.com/asaf17/autism-survey/blob/master/SQL/apiProcedure.sql) and get the apiProcedure -> copy it into SSMS and execute the query
-----
. Navigate to the autismsurvey table -> right click Users -> New User -> User type: SQL user with login -> User name: username, Login name: username, Defalult schema: db_owner
. Go to Dbeaver
. Database -> New Database Connection -> SQL Server
. Host: {COMPUTER NAME}{INSTANCE NAME} OR localhost, Port: 1433, Database/Schema: master
. Click SQL dropdown -> New SQL script
. Create the CFQL2 and ASDQ2 tables from [Github](https://github.com/asaf17/autism-survey/blob/master/SQL/tableCreation.sql)
. Download the current code
. Go to the dbconfig.js file and update the instance name and port to what your current SQL Server is on
. In the terminal rune nodemon api.js, this starts the server
. Run the website as intended
. If you want to test the API's open up postman
- GET: http://localhost:8090/api/cfql2/
- GET {Name}: http://localhost:8090/api/cfql2/{name}
- POST: http://localhost:8090/api/cfql2
- GET: http://localhost:8090/api/asdq2/
- GET {Name}: http://localhost:8090/api/asdq2/{name}
- POST: http://localhost:8090/api/asdq2
