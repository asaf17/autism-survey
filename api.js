var Db = require("./dboperations");
const sql = require("mssql");

var Cfql2Answer = require("./cfql2Answer");
var Asdq2Answer = require("./asdq2Answer");
var SurveyInformation = require("./surveyInformation");
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use("/api", router);

app.use(express.static('./Website'));


const dbConfig = {
  user: "username",
  password: "password",
  server: "localhost", 
  database: "autismsurvey"
}

/**
 * 
 * @param {*} res 
 * @param {*} query 
 */
const executeQuery = function (res, query) {
  sql.connect(dbConfig, function (err) {
      if (err) {
          console.log(err);
          res.send(err);
      }
      else {
          // create Request object
          var request = new sql.Request();
          // query to the database
          request.query(query, function (err, result) {
              if (err) {
                  console.log(err);
                  res.send(err);
              }
              else {
                  console.log("data saved successfully to database...");
                  res.send(result);
              }
          });
      }
  });
}

var queryString="";

app.post("/ASDQ2/asdq2_userinput.html", function(req, res){
  console.log('creating new user...');
  console.log('childs name: ' +req.body.name_child);
  console.log('childs age: ' + req.body.age_child)

  Asdq2Answer.participantName = req.body.name_child;
  Asdq2Answer.ParticipantAge = req.body.age_child;
  Asdq2Answer.DateOfBirth = req.body.dob;
  Asdq2Answer.InformantName = req.body.name_inform;
  Asdq2Answer.InformantAge = req.body.age_inform;
  Asdq2Answer.DateOfSurvey = req.body.doa;
  Asdq2Answer.Sex = req.body.sex;
  Asdq2Answer.InformantRelationshipToPatient = req.body.relationship;
  Asdq2Answer.ParticipantDiagnosis = req.body.diagnostic;
  Asdq2Answer.ParticipantDiagosisSeverity = req.body.severity;
  Asdq2Answer.ParticipantAgeDiagnosis = req.body.age_diag;

  //queryString = "INSERT INTO [CFQL2] (ParticipantName, ParticipantAge, DateOfBirth, Sex, InformantName, InformantAge, DateOfSurvey, InformantRelationshipToPatient, ParticipantDiagnosis, ParticipantDiagosisSeverity, ParticipantAgeDiagnosis) values ('"+cfql2Answer.name_child+"', '"+cfql2Answer.age_child+"', '"+cfql2Answer.dob+"', '"+cfql2Answer.sex+"', '"+cfql2Answer.name_inform+"', '"+cfql2Answer.age_inform+"', '"+cfql2Answer.doa+"', '"+cfql2Answer.relationship+"', '"+cfql2Answer.diagnostic+"', '"+cfql2Answer.severity+"', '"+cfql2Answer.age_diag+"')";
  //executeQuery(res, queryString);

  res.redirect("/ASDQ2/1_asdq2.html");
});



app.post('/ASDQ2/1_asdq2.html', function(req, res){

  Asdq2Answer.Q1 = parseInt(req.body.q1);
  Asdq2Answer.Q2 = parseInt(req.body.q2);
  Asdq2Answer.Q3 = parseInt(req.body.q3);
  Asdq2Answer.Q4 = parseInt(req.body.q4);
  Asdq2Answer.Q5 = parseInt(req.body.q5);
  Asdq2Answer.Q6 = parseInt(req.body.q6);


  //queryString = "INSERT INTO [ASDQ2] (ParticipantName, ParticipantAge, DateOfBirth, Sex, InformantName, InformantAge, DateOfSurvey, InformantRelationshipToPatient, ParticipantDiagnosis, ParticipantDiagosisSeverity, ParticipantAgeDiagnosis, Q1, Q2, Q3, Q4, Q5, Q6) values ('"+Asdq2Answer.participantName+"', '"+Asdq2Answer.ParticipantAge+"', '"+Asdq2Answer.DateOfBirth+"', '"+Asdq2Answer.Sex+"', '"+Asdq2Answer.InformantName+"', '"+Asdq2Answer.InformantAge+"', '"+Asdq2Answer.DateOfSurvey+"', '"+Asdq2Answer.InformantRelationshipToPatient+"', '"+Asdq2Answer.ParticipantDiagnosis+"', '"+Asdq2Answer.ParticipantDiagosisSeverity+"', '"+Asdq2Answer.ParticipantAgeDiagnosis+"', '"+Asdq2Answer.Q1+"', '"+Asdq2Answer.Q2+"', '"+Asdq2Answer.Q3+"', '"+Asdq2Answer.Q4+"','"+Asdq2Answer.Q5+"','"+Asdq2Answer.Q6+"')";
  //executeQuery(res, queryString);

  res.redirect("/ASDQ2/2_asdq2.html");

});


app.post('/ASDQ2/2_asdq2.html', function(req, res){

  Asdq2Answer.Q7 = parseInt(req.body.q7);
  Asdq2Answer.Q8 = parseInt(req.body.q8);
  Asdq2Answer.Q9 = parseInt(req.body.q9);
  Asdq2Answer.Q10 = parseInt(req.body.q10);
  Asdq2Answer.Q11 = parseInt(req.body.q11);
  Asdq2Answer.Q12 = parseInt(req.body.q12);


  //queryString = "INSERT INTO [ASDQ2] (ParticipantName, ParticipantAge, DateOfBirth, Sex, InformantName, InformantAge, DateOfSurvey, InformantRelationshipToPatient, ParticipantDiagnosis, ParticipantDiagosisSeverity, ParticipantAgeDiagnosis, Q1, Q2, Q3, Q4, Q5, Q6, Q7, Q8, Q9, Q10, Q11, Q12) values ('"+Asdq2Answer.participantName+"', '"+Asdq2Answer.ParticipantAge+"', '"+Asdq2Answer.DateOfBirth+"', '"+Asdq2Answer.Sex+"', '"+Asdq2Answer.InformantName+"', '"+Asdq2Answer.InformantAge+"', '"+Asdq2Answer.DateOfSurvey+"', '"+Asdq2Answer.InformantRelationshipToPatient+"', '"+Asdq2Answer.ParticipantDiagnosis+"', '"+Asdq2Answer.ParticipantDiagosisSeverity+"', '"+Asdq2Answer.ParticipantAgeDiagnosis+"', '"+Asdq2Answer.Q1+"', '"+Asdq2Answer.Q2+"', '"+Asdq2Answer.Q3+"', '"+Asdq2Answer.Q4+"','"+Asdq2Answer.Q5+"','"+Asdq2Answer.Q6+"', '"+Asdq2Answer.Q7+"', '"+Asdq2Answer.Q8+"', '"+Asdq2Answer.Q9+"', '"+Asdq2Answer.Q10+"', '"+Asdq2Answer.Q11+"', '"+Asdq2Answer.Q12+"')";


  //executeQuery(res, queryString);
  res.redirect("/ASDQ2/3_asdq2.html");


});

app.post('/ASDQ2/3_asdq2.html', function(req, res){

  Asdq2Answer.Q13 = parseInt(req.body.q13);
  Asdq2Answer.Q14 = parseInt(req.body.q14);
  Asdq2Answer.Q15 = parseInt(req.body.q15);
  Asdq2Answer.Q16 = parseInt(req.body.q16);
  Asdq2Answer.Q17 = parseInt(req.body.q17);
  Asdq2Answer.Q18 = parseInt(req.body.q18);


  //queryString = "INSERT INTO [ASDQ2] (ParticipantName, ParticipantAge, DateOfBirth, Sex, InformantName, InformantAge, DateOfSurvey, InformantRelationshipToPatient, ParticipantDiagnosis, ParticipantDiagosisSeverity, ParticipantAgeDiagnosis, Q1, Q2, Q3, Q4, Q5, Q6, Q7, Q8, Q9, Q10, Q11, Q12, Q13, Q14, Q15, Q16, Q17, Q18) values ('"+Asdq2Answer.participantName+"', '"+Asdq2Answer.ParticipantAge+"', '"+Asdq2Answer.DateOfBirth+"', '"+Asdq2Answer.Sex+"', '"+Asdq2Answer.InformantName+"', '"+Asdq2Answer.InformantAge+"', '"+Asdq2Answer.DateOfSurvey+"', '"+Asdq2Answer.InformantRelationshipToPatient+"', '"+Asdq2Answer.ParticipantDiagnosis+"', '"+Asdq2Answer.ParticipantDiagosisSeverity+"', '"+Asdq2Answer.ParticipantAgeDiagnosis+"', '"+Asdq2Answer.Q1+"', '"+Asdq2Answer.Q2+"', '"+Asdq2Answer.Q3+"', '"+Asdq2Answer.Q4+"','"+Asdq2Answer.Q5+"','"+Asdq2Answer.Q6+"', '"+Asdq2Answer.Q7+"', '"+Asdq2Answer.Q8+"', '"+Asdq2Answer.Q9+"', '"+Asdq2Answer.Q10+"', '"+Asdq2Answer.Q11+"', '"+Asdq2Answer.Q12+"', '"+Asdq2Answer.Q13+"', '"+Asdq2Answer.Q14+"', '"+Asdq2Answer.Q15+"', '"+Asdq2Answer.Q16+"', '"+Asdq2Answer.Q17+"', '"+Asdq2Answer.Q18+"')";


  //executeQuery(res, queryString);
  res.redirect("/ASDQ2/4_asdq2.html");

});


app.post('/ASDQ2/4_asdq2.html', function(req, res){

  Asdq2Answer.Q19 = parseInt(req.body.q19);
  Asdq2Answer.Q20 = parseInt(req.body.q20);
  Asdq2Answer.Q21 = parseInt(req.body.q21);
  Asdq2Answer.Q22 = parseInt(req.body.q22);
  Asdq2Answer.Q23 = parseInt(req.body.q23);
  Asdq2Answer.Q24 = parseInt(req.body.q24);


  //queryString = "INSERT INTO [ASDQ2] (ParticipantName, ParticipantAge, DateOfBirth, Sex, InformantName, InformantAge, DateOfSurvey, InformantRelationshipToPatient, ParticipantDiagnosis, ParticipantDiagosisSeverity, ParticipantAgeDiagnosis, Q1, Q2, Q3, Q4, Q5, Q6, Q7, Q8, Q9, Q10, Q11, Q12, Q13, Q14, Q15, Q16, Q17, Q18, Q19, Q20, Q21,Q22, Q23,Q24) values ('"+Asdq2Answer.participantName+"', '"+Asdq2Answer.ParticipantAge+"', '"+Asdq2Answer.DateOfBirth+"', '"+Asdq2Answer.Sex+"', '"+Asdq2Answer.InformantName+"', '"+Asdq2Answer.InformantAge+"', '"+Asdq2Answer.DateOfSurvey+"', '"+Asdq2Answer.InformantRelationshipToPatient+"', '"+Asdq2Answer.ParticipantDiagnosis+"', '"+Asdq2Answer.ParticipantDiagosisSeverity+"', '"+Asdq2Answer.ParticipantAgeDiagnosis+"', '"+Asdq2Answer.Q1+"', '"+Asdq2Answer.Q2+"', '"+Asdq2Answer.Q3+"', '"+Asdq2Answer.Q4+"','"+Asdq2Answer.Q5+"','"+Asdq2Answer.Q6+"', '"+Asdq2Answer.Q7+"', '"+Asdq2Answer.Q8+"', '"+Asdq2Answer.Q9+"', '"+Asdq2Answer.Q10+"', '"+Asdq2Answer.Q11+"', '"+Asdq2Answer.Q12+"', '"+Asdq2Answer.Q13+"', '"+Asdq2Answer.Q14+"', '"+Asdq2Answer.Q15+"', '"+Asdq2Answer.Q16+"', '"+Asdq2Answer.Q17+"', '"+Asdq2Answer.Q18+"','"+Asdq2Answer.Q19+"','"+Asdq2Answer.Q20+"','"+Asdq2Answer.Q21+"','"+Asdq2Answer.Q22+"','"+Asdq2Answer.Q23+"','"+Asdq2Answer.Q24+"')";


  //executeQuery(res, queryString);
  res.redirect("/ASDQ2/5_asdq2.html");


});


app.post('/ASDQ2/5_asdq2.html', function(req, res){

  Asdq2Answer.Q25 = parseInt(req.body.q25);
  Asdq2Answer.Q26 = parseInt(req.body.q26);
  Asdq2Answer.Q27 = parseInt(req.body.q27);
  Asdq2Answer.Q28 = parseInt(req.body.q28);
  Asdq2Answer.Q29 = parseInt(req.body.q29);
  Asdq2Answer.Q30 = parseInt(req.body.q30);


  //queryString = "INSERT INTO [ASDQ2] (ParticipantName, ParticipantAge, DateOfBirth, Sex, InformantName, InformantAge, DateOfSurvey, InformantRelationshipToPatient, ParticipantDiagnosis, ParticipantDiagosisSeverity, ParticipantAgeDiagnosis, Q1, Q2, Q3, Q4, Q5, Q6, Q7, Q8, Q9, Q10, Q11, Q12, Q13, Q14, Q15, Q16, Q17, Q18, Q19, Q20, Q21,Q22, Q23,Q24) values ('"+Asdq2Answer.participantName+"', '"+Asdq2Answer.ParticipantAge+"', '"+Asdq2Answer.DateOfBirth+"', '"+Asdq2Answer.Sex+"', '"+Asdq2Answer.InformantName+"', '"+Asdq2Answer.InformantAge+"', '"+Asdq2Answer.DateOfSurvey+"', '"+Asdq2Answer.InformantRelationshipToPatient+"', '"+Asdq2Answer.ParticipantDiagnosis+"', '"+Asdq2Answer.ParticipantDiagosisSeverity+"', '"+Asdq2Answer.ParticipantAgeDiagnosis+"', '"+Asdq2Answer.Q1+"', '"+Asdq2Answer.Q2+"', '"+Asdq2Answer.Q3+"', '"+Asdq2Answer.Q4+"','"+Asdq2Answer.Q5+"','"+Asdq2Answer.Q6+"', '"+Asdq2Answer.Q7+"', '"+Asdq2Answer.Q8+"', '"+Asdq2Answer.Q9+"', '"+Asdq2Answer.Q10+"', '"+Asdq2Answer.Q11+"', '"+Asdq2Answer.Q12+"', '"+Asdq2Answer.Q13+"', '"+Asdq2Answer.Q14+"', '"+Asdq2Answer.Q15+"', '"+Asdq2Answer.Q16+"', '"+Asdq2Answer.Q17+"', '"+Asdq2Answer.Q18+"','"+Asdq2Answer.Q19+"','"+Asdq2Answer.Q20+"','"+Asdq2Answer.Q21+"','"+Asdq2Answer.Q22+"','"+Asdq2Answer.Q23+"','"+Asdq2Answer.Q24+"')";


  //executeQuery(res, queryString);
  res.redirect("/ASDQ2/6_asdq2.html");

});

app.post('/ASDQ2/6_asdq2.html', function(req, res){

  Asdq2Answer.Q31 = parseInt(req.body.q31);
  Asdq2Answer.Q32 = parseInt(req.body.q32);
  Asdq2Answer.Q33 = parseInt(req.body.q33);
  Asdq2Answer.Q34 = parseInt(req.body.q34);
  Asdq2Answer.Q35 = parseInt(req.body.q35);
  Asdq2Answer.Q36 = parseInt(req.body.q36);


  //queryString = "INSERT INTO [ASDQ2] (ParticipantName, ParticipantAge, DateOfBirth, Sex, InformantName, InformantAge, DateOfSurvey, InformantRelationshipToPatient, ParticipantDiagnosis, ParticipantDiagosisSeverity, ParticipantAgeDiagnosis, Q1, Q2, Q3, Q4, Q5, Q6, Q7, Q8, Q9, Q10, Q11, Q12, Q13, Q14, Q15, Q16, Q17, Q18, Q19, Q20, Q21,Q22, Q23,Q24,Q25,Q26,Q27,Q28,Q29,Q30) values ('"+Asdq2Answer.participantName+"', '"+Asdq2Answer.ParticipantAge+"', '"+Asdq2Answer.DateOfBirth+"', '"+Asdq2Answer.Sex+"', '"+Asdq2Answer.InformantName+"', '"+Asdq2Answer.InformantAge+"', '"+Asdq2Answer.DateOfSurvey+"', '"+Asdq2Answer.InformantRelationshipToPatient+"', '"+Asdq2Answer.ParticipantDiagnosis+"', '"+Asdq2Answer.ParticipantDiagosisSeverity+"', '"+Asdq2Answer.ParticipantAgeDiagnosis+"', '"+Asdq2Answer.Q1+"', '"+Asdq2Answer.Q2+"', '"+Asdq2Answer.Q3+"', '"+Asdq2Answer.Q4+"','"+Asdq2Answer.Q5+"','"+Asdq2Answer.Q6+"', '"+Asdq2Answer.Q7+"', '"+Asdq2Answer.Q8+"', '"+Asdq2Answer.Q9+"', '"+Asdq2Answer.Q10+"', '"+Asdq2Answer.Q11+"', '"+Asdq2Answer.Q12+"', '"+Asdq2Answer.Q13+"', '"+Asdq2Answer.Q14+"', '"+Asdq2Answer.Q15+"', '"+Asdq2Answer.Q16+"', '"+Asdq2Answer.Q17+"', '"+Asdq2Answer.Q18+"','"+Asdq2Answer.Q19+"','"+Asdq2Answer.Q20+"','"+Asdq2Answer.Q21+"','"+Asdq2Answer.Q22+"','"+Asdq2Answer.Q23+"','"+Asdq2Answer.Q24+"','"+Asdq2Answer.Q26+"','"+Asdq2Answer.Q27+"','"+Asdq2Answer.Q28+"','"+Asdq2Answer.Q29+"','"+Asdq2Answer.Q30+"')";


  //executeQuery(res, queryString);
  res.redirect("/ASDQ2/7_asdq2.html");

});

app.post('/ASDQ2/7_asdq2.html', function(req, res){

  Asdq2Answer.Q37 = parseInt(req.body.q37);
  Asdq2Answer.Q38 = parseInt(req.body.q38);
  Asdq2Answer.Q39 = parseInt(req.body.q39);


  queryString = "INSERT INTO [ASDQ2] (ParticipantName, ParticipantAge, DateOfBirth, Sex, InformantName, InformantAge, DateOfSurvey, InformantRelationshipToPatient, ParticipantDiagnosis, ParticipantDiagosisSeverity, ParticipantAgeDiagnosis, Q1, Q2, Q3, Q4, Q5, Q6, Q7, Q8, Q9, Q10, Q11, Q12, Q13, Q14, Q15, Q16, Q17, Q18, Q19, Q20, Q21,Q22, Q23,Q24,Q25,Q26,Q27,Q28,Q29,Q30,Q31,Q32,Q33,Q34,Q35,Q36,Q37,Q38,Q39) values ('"+Asdq2Answer.participantName+"', '"+Asdq2Answer.ParticipantAge+"', '"+Asdq2Answer.DateOfBirth+"', '"+Asdq2Answer.Sex+"', '"+Asdq2Answer.InformantName+"', '"+Asdq2Answer.InformantAge+"', '"+Asdq2Answer.DateOfSurvey+"', '"+Asdq2Answer.InformantRelationshipToPatient+"', '"+Asdq2Answer.ParticipantDiagnosis+"', '"+Asdq2Answer.ParticipantDiagosisSeverity+"', '"+Asdq2Answer.ParticipantAgeDiagnosis+"', '"+Asdq2Answer.Q1+"', '"+Asdq2Answer.Q2+"', '"+Asdq2Answer.Q3+"', '"+Asdq2Answer.Q4+"','"+Asdq2Answer.Q5+"','"+Asdq2Answer.Q6+"', '"+Asdq2Answer.Q7+"', '"+Asdq2Answer.Q8+"', '"+Asdq2Answer.Q9+"', '"+Asdq2Answer.Q10+"', '"+Asdq2Answer.Q11+"', '"+Asdq2Answer.Q12+"', '"+Asdq2Answer.Q13+"', '"+Asdq2Answer.Q14+"', '"+Asdq2Answer.Q15+"', '"+Asdq2Answer.Q16+"', '"+Asdq2Answer.Q17+"', '"+Asdq2Answer.Q18+"','"+Asdq2Answer.Q19+"','"+Asdq2Answer.Q20+"','"+Asdq2Answer.Q21+"','"+Asdq2Answer.Q22+"','"+Asdq2Answer.Q23+"','"+Asdq2Answer.Q24+"','"+Asdq2Answer.Q25+"','"+Asdq2Answer.Q26+"','"+Asdq2Answer.Q27+"','"+Asdq2Answer.Q28+"','"+Asdq2Answer.Q29+"','"+Asdq2Answer.Q30+"','"+Asdq2Answer.Q31+"','"+Asdq2Answer.Q32+"','"+Asdq2Answer.Q33+"','"+Asdq2Answer.Q34+"','"+Asdq2Answer.Q35+"','"+Asdq2Answer.Q36+"','"+Asdq2Answer.Q37+"','"+Asdq2Answer.Q38+"','"+Asdq2Answer.Q39+"')";


  executeQuery(res, queryString);

});



router.use((request, response, next) => {
  console.log("middleware");
  next();
});

router.route("/cfql2").get((request, response) => {
  Db.getCfql2Answers().then((data) => {
    response.json(data[0]);
  });
});

router.route("/cfql2/:participantName").get((request, response) => {
  Db.getCfql2Answer(request.params.participantName).then((data) => {
    response.json(data[0]);
  });
});

router.route("/cfql2").post((request, response) => {
  let cfql2Answer = { ...request.body };
  Db.addCfql2Answer(cfql2Answer).then((data) => {
    response.status(201).json(data);
  });
});

router.route("/asdq2").get((request, response) => {
  Db.getAsdq2Answers().then((data) => {
    response.json(data[0]);
  });
});

router.route("/asdq2/:participantName").get((request, response) => {
  Db.getAsdq2Answer(request.params.participantName).then((data) => {
    response.json(data[0]);
  });
});

router.route("/asdq2").post((request, response) => {
  let asdq2Answer = { ...request.body };
  Db.addAsdq2Answer(asdq2Answer).then((data) => {
    response.status(201).json(data);
  });
});

router.route("/surveyInformation").get((request, response) => {
  Db.getSurveyInformation().then((data) => {
    response.json(data[0]);
  });
});


router.route("/surveyInformation").post((request, response) => {
  let surveyInformation = { ...request.body };
  Db.addSurveyInformation(surveyInformation).then((data) => {
    response.status(201).json(data);
  });
});

var port = process.env.PORT || 8090;
app.listen(port);
console.log("API is runnning at " + port);
