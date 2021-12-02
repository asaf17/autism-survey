const config = {
  user: "username", // sql user
  password: "password", //sql user password
  server: "localhost",
  database: "autismsurvey",
  options: {
    trustedconnection: true,
    enableArithAbort: true,
    trustServerCertificate: true,
    instancename: "DESKTOP-H6SN653/SQLEXPRESS01", // SQL Server instance name
  },
  port: 50890,
};

module.exports = config;
