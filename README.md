# autism-survey

## Programs needed
- SQL Express Server Instance [SQL Express Download](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)
- Sql Server Management Studio (SSMS) [SSMS Download](https://docs.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver15)
- Dbeaver [Dbeaver Download](https://dbeaver.io/download/)
- Node JS [Node.JS Download](https://nodejs.org/en/download/)
- Postman [Postman Downlaod](https://www.postman.com/downloads/)

## Setting up Server Locally
1. Download [SQL Express](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)
2. Basic installation
3. Install
4. Save the instance name and connection string for later
5. Install [SSMS](https://docs.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver15)
6. Server Type: Database Engine, Server Name: {COMPUTER NAME}{INSTANCE NAME} Example: LAPTOP-TEE3744/SQLEXPRESS, Authentication: Windows Authentication
7. Open SQL Server Configuration Manager
8. Ensure SQL Server Browser is running, if not: right click -> properties -> service -> start mode -> manual
    - If it was not running, after you changed its start mode right click and start
9. Go to SQL Server Network Configuation -> Protocols for {SERVER NAME}
10. Enable TCP/IP
11. Right click TCP/IP -> Properties -> IP Addresses
12. Change IPALL TCP Port to 1433
13. Find the IP with 127.0.0.1 and change the TCP Port to 1433
14. Enable IP with 127.0.0.1
15. Go back to SQL Server Serverices -> right click -> restart
16. Go to SSMS
17. Connect to your database (reference step 6 if you haven't)
18. Right click Databases -> New Database -> Database name: autismsurvey -> click OK
19. Go to the bottom security tab (outside most file stucture) -> right click Logins -> New Login -> Login name: username -> Select SQL Server Authentication -> password: password -> **check OFF enforce password policy** -> change default database to autismsurvey
20. New Query -> Go [Github](https://github.com/asaf17/autism-survey/blob/master/SQL/apiProcedure.sql) and get the apiProcedure -> copy it into SSMS and execute the query
21. Navigate to the autismsurvey table -> right click Users -> New User -> User type: SQL user with login -> User name: username, Login name: username, Defalult schema: db_owner
22. Go to Dbeaver
23. Database -> New Database Connection -> SQL Server
24. Host: {COMPUTER NAME}{INSTANCE NAME} OR localhost, Port: 1433, Database/Schema: master
25. Click SQL dropdown -> New SQL script
26. Create the CFQL2 and ASDQ2 tables from [Github](https://github.com/asaf17/autism-survey/blob/master/SQL/tableCreation.sql)
27. Download the current code
28. Go to the dbconfig.js file and update the instance name and port to what your current SQL Server is on
29. In the terminal rune nodemon api.js, this starts the server
30. Run the website as intended
31. If you want to test the API's open up postman
- GET: http://localhost:8090/api/cfql2/
- GET {Name}: http://localhost:8090/api/cfql2/{name}
- POST: http://localhost:8090/api/cfql2
- GET: http://localhost:8090/api/asdq2/
- GET {Name}: http://localhost:8090/api/asdq2/{name}
- POST: http://localhost:8090/api/asdq2
