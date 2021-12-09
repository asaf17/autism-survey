const config = {
  user: "username", // sql user
  password: "password", //sql user password
  server: "localhost",
  database: "autismsurvey",
  options: {
    trustedconnection: true,
    enableArithAbort: true,
    trustServerCertificate: true,
    instancename: "DESKTOP-E9GP8UU\SQLEXPRESS", // SQL Server instance name
  },
  port: 51383,
};

module.exports = config;
