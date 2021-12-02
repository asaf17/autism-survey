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

var cfqlQueryString="";



//CFQL SURVEY POST METHODS


app.post("/CFQL2/cfql2_instructions.html", function(req, res){

  res.redirect("/CFQL2/cfql2_userInput.html");

});


app.post("/CFQL2/cfql2_userInput.html", function(req, res){
  console.log('creating new user...');
  console.log('childs name: ' +req.body.name_child);
  console.log('childs age: ' + req.body.age_child)

  Cfql2Answer.participantName = req.body.name_child;
  Cfql2Answer.ParticipantAge = req.body.age_child;
  Cfql2Answer.DateOfBirth = req.body.dob;
  Cfql2Answer.InformantName = req.body.name_inform;
  Cfql2Answer.InformantAge = req.body.age_inform;
  Cfql2Answer.DateOfSurvey = req.body.doa;
  Cfql2Answer.Sex = req.body.sex;
  Cfql2Answer.InformantRelationshipToPatient = req.body.relationship;
  Cfql2Answer.ParticipantDiagnosis = req.body.diagnostic;
  Cfql2Answer.ParticipantDiagosisSeverity = req.body.severity;
  Cfql2Answer.ParticipantAgeDiagnosis = req.body.age_diag;

  //queryString = "INSERT INTO [CFQL2] (ParticipantName, ParticipantAge, DateOfBirth, Sex, InformantName, InformantAge, DateOfSurvey, InformantRelationshipToPatient, ParticipantDiagnosis, ParticipantDiagosisSeverity, ParticipantAgeDiagnosis) values ('"+cfql2Answer.name_child+"', '"+cfql2Answer.age_child+"', '"+cfql2Answer.dob+"', '"+cfql2Answer.sex+"', '"+cfql2Answer.name_inform+"', '"+cfql2Answer.age_inform+"', '"+cfql2Answer.doa+"', '"+cfql2Answer.relationship+"', '"+cfql2Answer.diagnostic+"', '"+cfql2Answer.severity+"', '"+cfql2Answer.age_diag+"')";
  //executeQuery(res, queryString);

  res.redirect("/CFQL2/1_cfql2_ChildSurvey.html");
});



app.post('/CFQL2/1_cfql2_ChildSurvey.html', function(req, res){

  Cfql2Answer.ChildQol1 = parseInt(req.body.q1);
  Cfql2Answer.ChildQol2 = parseInt(req.body.q2);
  Cfql2Answer.ChildQol3 = parseInt(req.body.q3);
  Cfql2Answer.ChildQol4 = parseInt(req.body.q4);

  //Cfql2Answer.ChildQolAverage = parseFloat(sumoverindices([Cfql2Answer.ChildQol1,Cfql2Answer.ChildQol2,Cfql2Answer.ChildQol3,Cfql2Answer.ChildQol4], 0, 3));
  //console.log(Cfql2Answer.ChildQol1);

  res.redirect("/CFQL2/2_cfql2_FamilySurvey.html");

  //queryString = "INSERT INTO [CFQL2] (ParticipantName, ParticipantAge, DateOfBirth, Sex, InformantName, InformantAge, DateOfSurvey, InformantRelationshipToPatient, ParticipantDiagnosis, ParticipantDiagosisSeverity, ParticipantAgeDiagnosis, ChildQol1, ChildQol2, ChildQol3, ChildQol4) values ('"+Cfql2Answer.participantName+"', '"+Cfql2Answer.ParticipantAge+"', '"+Cfql2Answer.DateOfBirth+"', '"+Cfql2Answer.Sex+"', '"+Cfql2Answer.InformantName+"', '"+Cfql2Answer.InformantAge+"', '"+Cfql2Answer.DateOfSurvey+"', '"+Cfql2Answer.InformantRelationshipToPatient+"', '"+Cfql2Answer.ParticipantDiagnosis+"', '"+Cfql2Answer.ParticipantDiagosisSeverity+"', '"+Cfql2Answer.ParticipantAgeDiagnosis+"', '"+Cfql2Answer.ChildQol1+"', '"+Cfql2Answer.ChildQol2+"', '"+Cfql2Answer.ChildQol3+"', '"+Cfql2Answer.ChildQol4+"')";

  //queryString = "INSERT INTO [CFQL2] (ParticipantName, ParticipantAge, DateOfBirth, Sex, InformantName, InformantAge, DateOfSurvey, InformantRelationshipToPatient, ParticipantDiagnosis, ParticipantDiagosisSeverity, ParticipantAgeDiagnosis, ChildQol1, ChildQol2, ChildQol3, ChildQol4, ChildQolAverage) values ('"+Cfql2Answer.participantName+"', '"+Cfql2Answer.ParticipantAge+"', '"+Cfql2Answer.DateOfBirth+"', '"+Cfql2Answer.Sex+"', '"+Cfql2Answer.InformantName+"', '"+Cfql2Answer.InformantAge+"', '"+Cfql2Answer.DateOfSurvey+"', '"+Cfql2Answer.InformantRelationshipToPatient+"', '"+Cfql2Answer.ParticipantDiagnosis+"', '"+Cfql2Answer.ParticipantDiagosisSeverity+"', '"+Cfql2Answer.ParticipantAgeDiagnosis+"', '"+Cfql2Answer.ChildQol1+"', '"+Cfql2Answer.ChildQol2+"', '"+Cfql2Answer.ChildQol3+"', '"+Cfql2Answer.ChildQol4+"', '"+Cfql2Answer.ChildQolAverage+"')";


  //executeQuery(res, queryString);

});

app.post('/CFQL2/2_cfql2_FamilySurvey.html', function(req, res){

  Cfql2Answer.FamilyQol5 = parseInt(req.body.q5);
  Cfql2Answer.FamilyQol6 = parseInt(req.body.q6);
  Cfql2Answer.FamilyQol7 = parseInt(req.body.q7);
  Cfql2Answer.FamilyQol8 = parseInt(req.body.q8);

  //Cfql2Answer.FamilyQolAverage = parseFloat(sumoverindices([Cfql2Answer.FamilyQol5,Cfql2Answer.FamilyQol6,Cfql2Answer.FamilyQol7,Cfql2Answer.FamilyQol8], 4, 7));

  // queryString = "INSERT INTO [CFQL2] (ParticipantName, ParticipantAge, DateOfBirth, Sex, InformantName, InformantAge, DateOfSurvey, InformantRelationshipToPatient, ParticipantDiagnosis, ParticipantDiagosisSeverity, ParticipantAgeDiagnosis, ChildQol1, ChildQol2, ChildQol3, ChildQol4) values ('"+name_child+"', '"+age_child+"', '"+dob+"', '"+sex+"', '"+name_inform+"', '"+age_inform+"', '"+doa+"', '"+relationship+"', '"+diagnostic+"', '"+severity+"', '"+age_diag+"', '"+ChildQol1+"', '"+ChildQol2+"', '"+ChildQol3+"', '"+ChildQol4+"')";
  //queryString = "INSERT INTO [CFQL2] (ParticipantName, ParticipantAge, DateOfBirth, Sex, InformantName, InformantAge, DateOfSurvey, InformantRelationshipToPatient, ParticipantDiagnosis, ParticipantDiagosisSeverity, ParticipantAgeDiagnosis, ChildQol1, ChildQol2, ChildQol3, ChildQol4, FamilyQol5, FamilyQol6, FamilyQol7, FamilyQol8) values ('"+name_child+"', '"+age_child+"', '"+dob+"', '"+sex+"', '"+name_inform+"', '"+age_inform+"', '"+doa+"', '"+relationship+"', '"+diagnostic+"', '"+severity+"', '"+age_diag+"', '"+ChildQol1+"', '"+ChildQol2+"', '"+ChildQol3+"', '"+ChildQol4+"', '"+FamilyQol5+"', '"+FamilyQol6+"', '"+FamilyQol7+"', '"+FamilyQol8+"')";

  //queryString = "INSERT INTO [CFQL2] (ParticipantName, ParticipantAge, DateOfBirth, Sex, InformantName, InformantAge, DateOfSurvey, InformantRelationshipToPatient, ParticipantDiagnosis, ParticipantDiagosisSeverity, ParticipantAgeDiagnosis, ChildQol1, ChildQol2, ChildQol3, ChildQol4, ChildQolAverage, FamilyQol5, FamilyQol6, FamilyQol7, FamilyQol8, FamilyQolAverage) values ('"+Cfql2Answer.participantName+"', '"+Cfql2Answer.ParticipantAge+"', '"+Cfql2Answer.DateOfBirth+"', '"+Cfql2Answer.Sex+"', '"+Cfql2Answer.InformantName+"', '"+Cfql2Answer.InformantAge+"', '"+Cfql2Answer.DateOfSurvey+"', '"+Cfql2Answer.InformantRelationshipToPatient+"', '"+Cfql2Answer.ParticipantDiagnosis+"', '"+Cfql2Answer.ParticipantDiagosisSeverity+"', '"+Cfql2Answer.ParticipantAgeDiagnosis+"', '"+Cfql2Answer.ChildQol1+"', '"+Cfql2Answer.ChildQol2+"', '"+Cfql2Answer.ChildQol3+"', '"+Cfql2Answer.ChildQol4+"', '"+Cfql2Answer.ChildQolAverage+"', '"+Cfql2Answer.FamilyQol5+"', '"+Cfql2Answer.FamilyQol6+"', '"+Cfql2Answer.FamilyQol7+"', '"+Cfql2Answer.FamilyQol8+"', '"+Cfql2Answer.FamilyQolAverage+"')";

  //executeQuery(res, queryString);

  res.redirect("/CFQL2/3_cfql2_CaregiverSurvey.html");

});

app.post('/CFQL2/3_cfql2_CaregiverSurvey.html', function(req, res){

  Cfql2Answer.CaregiverQol9 = parseInt(req.body.q9);
  Cfql2Answer.CaregiverQol10 = parseInt(req.body.q10);
  Cfql2Answer.CaregiverQol11 = parseInt(req.body.q11);
  Cfql2Answer.CaregiverQol12 = parseInt(req.body.q12);

  //Cfql2Answer.CargegiverQolAverage = parseFloat(sumoverindices([Cfql2Answer.CaregiverQol9,Cfql2Answer.CaregiverQol10,Cfql2Answer.CaregiverQol11,Cfql2Answer.CaregiverQol2], 8, 11));

  // queryString = "INSERT INTO [CFQL2] (ParticipantName, ParticipantAge, DateOfBirth, Sex, InformantName, InformantAge, DateOfSurvey, InformantRelationshipToPatient, ParticipantDiagnosis, ParticipantDiagosisSeverity, ParticipantAgeDiagnosis, ChildQol1, ChildQol2, ChildQol3, ChildQol4) values ('"+name_child+"', '"+age_child+"', '"+dob+"', '"+sex+"', '"+name_inform+"', '"+age_inform+"', '"+doa+"', '"+relationship+"', '"+diagnostic+"', '"+severity+"', '"+age_diag+"', '"+ChildQol1+"', '"+ChildQol2+"', '"+ChildQol3+"', '"+ChildQol4+"')";
  //queryString = "INSERT INTO [CFQL2] (ParticipantName, ParticipantAge, DateOfBirth, Sex, InformantName, InformantAge, DateOfSurvey, InformantRelationshipToPatient, ParticipantDiagnosis, ParticipantDiagosisSeverity, ParticipantAgeDiagnosis, ChildQol1, ChildQol2, ChildQol3, ChildQol4, FamilyQol5, FamilyQol6, FamilyQol7, FamilyQol8) values ('"+name_child+"', '"+age_child+"', '"+dob+"', '"+sex+"', '"+name_inform+"', '"+age_inform+"', '"+doa+"', '"+relationship+"', '"+diagnostic+"', '"+severity+"', '"+age_diag+"', '"+ChildQol1+"', '"+ChildQol2+"', '"+ChildQol3+"', '"+ChildQol4+"', '"+FamilyQol5+"', '"+FamilyQol6+"', '"+FamilyQol7+"', '"+FamilyQol8+"')";

  //queryString = "INSERT INTO [CFQL2] (ParticipantName, ParticipantAge, DateOfBirth, Sex, InformantName, InformantAge, DateOfSurvey, InformantRelationshipToPatient, ParticipantDiagnosis, ParticipantDiagosisSeverity, ParticipantAgeDiagnosis, ChildQol1, ChildQol2, ChildQol3, ChildQol4, FamilyQol5, FamilyQol6, FamilyQol7, FamilyQol8, CaregiverQol9, CaregiverQol10, CaregiverQol11, CaregiverQol12) values ('"+cfql2Answer.name_child+"', '"+cfql2Answer.age_child+"', '"+cfql2Answer.dob+"', '"+cfql2Answer.sex+"', '"+cfql2Answer.name_inform+"', '"+cfql2Answer.age_inform+"', '"+cfql2Answer.doa+"', '"+cfql2Answer.relationship+"', '"+cfql2Answer.diagnostic+"', '"+cfql2Answer.severity+"', '"+cfql2Answer.age_diag+"', '"+cfql2Answer.ChildQol1+"', '"+cfql2Answer.ChildQol2+"', '"+cfql2Answer.ChildQol3+"', '"+cfql2Answer.ChildQol4+"', '"+cfql2Answer.FamilyQol5+"', '"+cfql2Answer.FamilyQol6+"', '"+cfql2Answer.FamilyQol7+"', '"+cfql2Answer.FamilyQol8+"', '"+cfql2Answer.CaregiverQol9+"', '"+cfql2Answer.CaregiverQol10+"', '"+cfql2Answer.CaregiverQol11+"', '"+cfql2Answer.CaregiverQol12+"')";

  //executeQuery(res, queryString);

  res.redirect('/CFQL2/4_cfql2_FinancialSurvey.html');

});

app.post('/CFQL2/4_cfql2_FinancialSurvey.html', function(req, res){

  Cfql2Answer.FinancialQol13 = parseInt(req.body.q13);
  Cfql2Answer.FinancialQol14 = parseInt(req.body.q14);
  Cfql2Answer.FinancialQol15 = parseInt(req.body.q15);

  //Cfql2Answer.FinancialQolAverage = parseFloat(sumoverindices([Cfql2Answer.FinancialQol13,Cfql2Answer.FinancialQol14,Cfql2Answer.FinancialQol15], 12, 14));

  // queryString = "INSERT INTO [CFQL2] (ParticipantName, ParticipantAge, DateOfBirth, Sex, InformantName, InformantAge, DateOfSurvey, InformantRelationshipToPatient, ParticipantDiagnosis, ParticipantDiagosisSeverity, ParticipantAgeDiagnosis, ChildQol1, ChildQol2, ChildQol3, ChildQol4) values ('"+name_child+"', '"+age_child+"', '"+dob+"', '"+sex+"', '"+name_inform+"', '"+age_inform+"', '"+doa+"', '"+relationship+"', '"+diagnostic+"', '"+severity+"', '"+age_diag+"', '"+ChildQol1+"', '"+ChildQol2+"', '"+ChildQol3+"', '"+ChildQol4+"')";
  //queryString = "INSERT INTO [CFQL2] (ParticipantName, ParticipantAge, DateOfBirth, Sex, InformantName, InformantAge, DateOfSurvey, InformantRelationshipToPatient, ParticipantDiagnosis, ParticipantDiagosisSeverity, ParticipantAgeDiagnosis, ChildQol1, ChildQol2, ChildQol3, ChildQol4, FamilyQol5, FamilyQol6, FamilyQol7, FamilyQol8) values ('"+name_child+"', '"+age_child+"', '"+dob+"', '"+sex+"', '"+name_inform+"', '"+age_inform+"', '"+doa+"', '"+relationship+"', '"+diagnostic+"', '"+severity+"', '"+age_diag+"', '"+ChildQol1+"', '"+ChildQol2+"', '"+ChildQol3+"', '"+ChildQol4+"', '"+FamilyQol5+"', '"+FamilyQol6+"', '"+FamilyQol7+"', '"+FamilyQol8+"')";


  //cfqlQueryString = "INSERT INTO [CFQL2] (ParticipantName, ParticipantAge, DateOfBirth, Sex, InformantName, InformantAge, DateOfSurvey, InformantRelationshipToPatient, ParticipantDiagnosis, ParticipantDiagosisSeverity, ParticipantAgeDiagnosis, ChildQol1, ChildQol2, ChildQol3, ChildQol4, ChildQolAverage, FamilyQol5, FamilyQol6, FamilyQol7, FamilyQol8, FamilyQolAverage, CaregiverQol9, CaregiverQol10, CaregiverQol11, CaregiverQol12, CargegiverQolAverage, FinancialQol13, FinancialQol14, FinancialQol15, FinancialQolAverage) values ('"+Cfql2Answer.participantName+"', '"+Cfql2Answer.ParticipantAge+"', '"+Cfql2Answer.DateOfBirth+"', '"+Cfql2Answer.Sex+"', '"+Cfql2Answer.InformantName+"', '"+Cfql2Answer.InformantAge+"', '"+Cfql2Answer.DateOfSurvey+"', '"+Cfql2Answer.InformantRelationshipToPatient+"', '"+Cfql2Answer.ParticipantDiagnosis+"', '"+Cfql2Answer.ParticipantDiagosisSeverity+"', '"+Cfql2Answer.ParticipantAgeDiagnosis+"', '"+Cfql2Answer.ChildQol1+"', '"+Cfql2Answer.ChildQol2+"', '"+Cfql2Answer.ChildQol3+"', '"+Cfql2Answer.ChildQol4+"', '"+Cfql2Answer.ChildQolAverage+"', '"+Cfql2Answer.FamilyQol5+"', '"+Cfql2Answer.FamilyQol6+"', '"+Cfql2Answer.FamilyQol7+"', '"+Cfql2Answer.FamilyQol8+"', '"+Cfql2Answer.FamilyQolAverage+"', '"+Cfql2Answer.CaregiverQol9+"', '"+Cfql2Answer.CaregiverQol10+"', '"+Cfql2Answer.CaregiverQol11+"', '"+Cfql2Answer.CaregiverQol12+"', '"+Cfql2Answer.CargegiverQolAverage+"' , '"+Cfql2Answer.FinancialQol13+"', '"+Cfql2Answer.FinancialQol14+"', '"+Cfql2Answer.FinancialQol15+"', '"+Cfql2Answer.FinancialQolAverage+"')";


  //executeQuery(res, cfqlQueryString);

  res.redirect('/CFQL2/5_cfql2_SocialNetworkSurvey.html');

});


var marry="";

app.post('/CFQL2/5_cfql2_SocialNetworkSurvey.html', function(req, res){

  Cfql2Answer.SocialNetworkQol16 = parseInt(req.body.q16);
  Cfql2Answer.SocialNetworkQol17 = parseInt(req.body.q17);
  Cfql2Answer.SocialNetworkQol18 = parseInt(req.body.q18);
  Cfql2Answer.SocialNetworkQol19 = parseInt(req.body.q19);

  marry = parseInt(req.body.marry);
  

  if(marry == 1){
    console.log("Yes: "+parseInt(marry));
    res.redirect('/CFQL2/7_cfql2_PartnerRelationshipSurvey.html')
  }
  if(marry == 2){
    console.log("No: "+parseInt(marry));
    res.redirect('/CFQL2/8_cfql2_CopingSurvey.html')
  }
  
  //cfqlQueryString = "INSERT INTO [CFQL2] (ParticipantName, ParticipantAge, DateOfBirth, Sex, InformantName, InformantAge, DateOfSurvey, InformantRelationshipToPatient, ParticipantDiagnosis, ParticipantDiagosisSeverity, ParticipantAgeDiagnosis, ChildQol1, ChildQol2, ChildQol3, ChildQol4, FamilyQol5, FamilyQol6, FamilyQol7, FamilyQol8, CaregiverQol9, CaregiverQol10, CaregiverQol11, CaregiverQol12, FinancialQol13, FinancialQol14, FinancialQol15, SocialNetworkQol16, SocialNetworkQol17, SocialNetworkQol18, SocialNetworkQol19) values ('"+Cfql2Answer.participantName+"', '"+Cfql2Answer.ParticipantAge+"', '"+Cfql2Answer.DateOfBirth+"', '"+Cfql2Answer.Sex+"', '"+Cfql2Answer.InformantName+"', '"+Cfql2Answer.InformantAge+"', '"+Cfql2Answer.DateOfSurvey+"', '"+Cfql2Answer.InformantRelationshipToPatient+"', '"+Cfql2Answer.ParticipantDiagnosis+"', '"+Cfql2Answer.ParticipantDiagosisSeverity+"', '"+Cfql2Answer.ParticipantAgeDiagnosis+"', '"+Cfql2Answer.ChildQol1+"', '"+Cfql2Answer.ChildQol2+"', '"+Cfql2Answer.ChildQol3+"', '"+Cfql2Answer.ChildQol4+"', '"+Cfql2Answer.FamilyQol5+"', '"+Cfql2Answer.FamilyQol6+"', '"+Cfql2Answer.FamilyQol7+"', '"+Cfql2Answer.FamilyQol8+"', '"+Cfql2Answer.CaregiverQol9+"', '"+Cfql2Answer.CaregiverQol10+"', '"+Cfql2Answer.CaregiverQol11+"', '"+Cfql2Answer.CaregiverQol12+"', '"+Cfql2Answer.FinancialQol13+"', '"+Cfql2Answer.FinancialQol14+"', '"+Cfql2Answer.FinancialQol15+"', '"+Cfql2Answer.SocialNetworkQol16+"', '"+Cfql2Answer.SocialNetworkQol17+"', '"+Cfql2Answer.SocialNetworkQol18+"', '"+Cfql2Answer.SocialNetworkQol19+"')";

  //executeQuery(res, cfqlQueryString);

});

//TODO - save radio button respsones or text field to DB
app.post('/CFQL2/7_cfql2_PartnerRelationshipSurvey.html', function(req, res){
  //Cfql2Answer.PartnerRelationshipQolSpouse = req.body.qRelate;
  //console.log(Cfql2Answer.PartnerRelationshipQolSpouse);

  

   Cfql2Answer.PartnerRelationshipQol20 = parseInt(req.body.q20);
   Cfql2Answer.PartnerRelationshipQol21 = parseInt(req.body.q21);
   Cfql2Answer.PartnerRelationshipQol22 = parseInt(req.body.q22);
   Cfql2Answer.PartnerRelationshipQol23 = parseInt(req.body.q23);

 
  //cfqlQueryString = "INSERT INTO [CFQL2] (ParticipantName, ParticipantAge, DateOfBirth, Sex, InformantName, InformantAge, DateOfSurvey, InformantRelationshipToPatient, ParticipantDiagnosis, ParticipantDiagosisSeverity, ParticipantAgeDiagnosis, ChildQol1, ChildQol2, ChildQol3, ChildQol4, FamilyQol5, FamilyQol6, FamilyQol7, FamilyQol8, CaregiverQol9, CaregiverQol10, CaregiverQol11, CaregiverQol12, FinancialQol13, FinancialQol14, FinancialQol15, SocialNetworkQol16, SocialNetworkQol17, SocialNetworkQol18, SocialNetworkQol19, PartnerRelationshipQolSpouse) values ('"+Cfql2Answer.participantName+"', '"+Cfql2Answer.ParticipantAge+"', '"+Cfql2Answer.DateOfBirth+"', '"+Cfql2Answer.Sex+"', '"+Cfql2Answer.InformantName+"', '"+Cfql2Answer.InformantAge+"', '"+Cfql2Answer.DateOfSurvey+"', '"+Cfql2Answer.InformantRelationshipToPatient+"', '"+Cfql2Answer.ParticipantDiagnosis+"', '"+Cfql2Answer.ParticipantDiagosisSeverity+"', '"+Cfql2Answer.ParticipantAgeDiagnosis+"', '"+Cfql2Answer.ChildQol1+"', '"+Cfql2Answer.ChildQol2+"', '"+Cfql2Answer.ChildQol3+"', '"+Cfql2Answer.ChildQol4+"', '"+Cfql2Answer.FamilyQol5+"', '"+Cfql2Answer.FamilyQol6+"', '"+Cfql2Answer.FamilyQol7+"', '"+Cfql2Answer.FamilyQol8+"', '"+Cfql2Answer.CaregiverQol9+"', '"+Cfql2Answer.CaregiverQol10+"', '"+Cfql2Answer.CaregiverQol11+"', '"+Cfql2Answer.CaregiverQol12+"', '"+Cfql2Answer.FinancialQol13+"', '"+Cfql2Answer.FinancialQol14+"', '"+Cfql2Answer.FinancialQol15+"', '"+Cfql2Answer.SocialNetworkQol16+"', '"+Cfql2Answer.SocialNetworkQol17+"', '"+Cfql2Answer.SocialNetworkQol18+"', '"+Cfql2Answer.SocialNetworkQol19+"', '"+Cfql2Answer.PartnerRelationshipQolSpouse+"')";
  
  //cfqlQueryString = "INSERT INTO [CFQL2] (ParticipantName, ParticipantAge, DateOfBirth, Sex, InformantName, InformantAge, DateOfSurvey, InformantRelationshipToPatient, ParticipantDiagnosis, ParticipantDiagosisSeverity, ParticipantAgeDiagnosis, ChildQol1, ChildQol2, ChildQol3, ChildQol4, FamilyQol5, FamilyQol6, FamilyQol7, FamilyQol8, CaregiverQol9, CaregiverQol10, CaregiverQol11, CaregiverQol12, FinancialQol13, FinancialQol14, FinancialQol15, SocialNetworkQol16, SocialNetworkQol17, SocialNetworkQol18, SocialNetworkQol19, PartnerRelationshipQol20, PartnerRelationshipQol21, PartnerRelationshipQol22, PartnerRelationshipQol23) values ('"+Cfql2Answer.participantName+"', '"+Cfql2Answer.ParticipantAge+"', '"+Cfql2Answer.DateOfBirth+"', '"+Cfql2Answer.Sex+"', '"+Cfql2Answer.InformantName+"', '"+Cfql2Answer.InformantAge+"', '"+Cfql2Answer.DateOfSurvey+"', '"+Cfql2Answer.InformantRelationshipToPatient+"', '"+Cfql2Answer.ParticipantDiagnosis+"', '"+Cfql2Answer.ParticipantDiagosisSeverity+"', '"+Cfql2Answer.ParticipantAgeDiagnosis+"', '"+Cfql2Answer.ChildQol1+"', '"+Cfql2Answer.ChildQol2+"', '"+Cfql2Answer.ChildQol3+"', '"+Cfql2Answer.ChildQol4+"', '"+Cfql2Answer.FamilyQol5+"', '"+Cfql2Answer.FamilyQol6+"', '"+Cfql2Answer.FamilyQol7+"', '"+Cfql2Answer.FamilyQol8+"', '"+Cfql2Answer.CaregiverQol9+"', '"+Cfql2Answer.CaregiverQol10+"', '"+Cfql2Answer.CaregiverQol11+"', '"+Cfql2Answer.CaregiverQol12+"', '"+Cfql2Answer.FinancialQol13+"', '"+Cfql2Answer.FinancialQol14+"', '"+Cfql2Answer.FinancialQol15+"', '"+Cfql2Answer.SocialNetworkQol16+"', '"+Cfql2Answer.SocialNetworkQol17+"', '"+Cfql2Answer.SocialNetworkQol18+"', '"+Cfql2Answer.SocialNetworkQol19+"', '"+Cfql2Answer.PartnerRelationshipQol20+"', '"+Cfql2Answer.PartnerRelationshipQol21+"', '"+Cfql2Answer.PartnerRelationshipQol21+"', '"+Cfql2Answer.PartnerRelationshipQol21+"')";


  //executeQuery(res, cfqlQueryString);

  res.redirect('/CFQL2/8_cfql2_CopingSurvey.html');

});


//TODO - somehow calculate partner relationship answers if we skip page 7 from answering no on 5
app.post('/CFQL2/8_cfql2_CopingSurvey.html', function(req, res){


  if(marry==2){
    Cfql2Answer.PartnerRelationshipQol20 = 0;
    Cfql2Answer.PartnerRelationshipQol21 = 0;
    Cfql2Answer.PartnerRelationshipQol22 = 0;
    Cfql2Answer.PartnerRelationshipQol23 = 0;
  }

  Cfql2Answer.CopingQol24 = parseInt(req.body.q24);
  Cfql2Answer.CopingQol25 = parseInt(req.body.q25);
  Cfql2Answer.CopingQol26 = parseInt(req.body.q26);

  //cfqlQueryString = "INSERT INTO [CFQL2] (ParticipantName, ParticipantAge, DateOfBirth, Sex, InformantName, InformantAge, DateOfSurvey, InformantRelationshipToPatient, ParticipantDiagnosis, ParticipantDiagosisSeverity, ParticipantAgeDiagnosis, ChildQol1, ChildQol2, ChildQol3, ChildQol4, FamilyQol5, FamilyQol6, FamilyQol7, FamilyQol8, CaregiverQol9, CaregiverQol10, CaregiverQol11, CaregiverQol12, FinancialQol13, FinancialQol14, FinancialQol15, SocialNetworkQol16, SocialNetworkQol17, SocialNetworkQol18, SocialNetworkQol19, PartnerRelationshipQol20, PartnerRelationshipQol21, PartnerRelationshipQol22, PartnerRelationshipQol23) values ('"+Cfql2Answer.participantName+"', '"+Cfql2Answer.ParticipantAge+"', '"+Cfql2Answer.DateOfBirth+"', '"+Cfql2Answer.Sex+"', '"+Cfql2Answer.InformantName+"', '"+Cfql2Answer.InformantAge+"', '"+Cfql2Answer.DateOfSurvey+"', '"+Cfql2Answer.InformantRelationshipToPatient+"', '"+Cfql2Answer.ParticipantDiagnosis+"', '"+Cfql2Answer.ParticipantDiagosisSeverity+"', '"+Cfql2Answer.ParticipantAgeDiagnosis+"', '"+Cfql2Answer.ChildQol1+"', '"+Cfql2Answer.ChildQol2+"', '"+Cfql2Answer.ChildQol3+"', '"+Cfql2Answer.ChildQol4+"', '"+Cfql2Answer.FamilyQol5+"', '"+Cfql2Answer.FamilyQol6+"', '"+Cfql2Answer.FamilyQol7+"', '"+Cfql2Answer.FamilyQol8+"', '"+Cfql2Answer.CaregiverQol9+"', '"+Cfql2Answer.CaregiverQol10+"', '"+Cfql2Answer.CaregiverQol11+"', '"+Cfql2Answer.CaregiverQol12+"', '"+Cfql2Answer.FinancialQol13+"', '"+Cfql2Answer.FinancialQol14+"', '"+Cfql2Answer.FinancialQol15+"', '"+Cfql2Answer.SocialNetworkQol16+"', '"+Cfql2Answer.SocialNetworkQol17+"', '"+Cfql2Answer.SocialNetworkQol18+"', '"+Cfql2Answer.SocialNetworkQol19+"', '"+Cfql2Answer.PartnerRelationshipQol20+"', '"+Cfql2Answer.PartnerRelationshipQol21+"', '"+Cfql2Answer.PartnerRelationshipQol22+"', '"+Cfql2Answer.PartnerRelationshipQol23+"')";


  //CFQL2 SCORING
  // import {cfql2} from "./Scoring Algorithm/scoringAlgorithm.js";
  
  const cfql2Responses = [
    Cfql2Answer.ChildQol1,Cfql2Answer.ChildQol2,Cfql2Answer.ChildQol3,Cfql2Answer.ChildQol4,Cfql2Answer.FamilyQol5,
    Cfql2Answer.FamilyQol6,Cfql2Answer.FamilyQol7,Cfql2Answer.FamilyQol8,Cfql2Answer.CaregiverQol9,Cfql2Answer.CaregiverQol10,
    Cfql2Answer.CaregiverQol11,Cfql2Answer.CaregiverQol12,Cfql2Answer.FinancialQol13,Cfql2Answer.FinancialQol14,Cfql2Answer.FinancialQol15,
    Cfql2Answer.SocialNetworkQol16,Cfql2Answer.SocialNetworkQol17,Cfql2Answer.SocialNetworkQol18,Cfql2Answer.SocialNetworkQol19,Cfql2Answer.PartnerRelationshipQol20,
    Cfql2Answer.PartnerRelationshipQol21,Cfql2Answer.PartnerRelationshipQol22,Cfql2Answer.PartnerRelationshipQol23,Cfql2Answer.CopingQol24,Cfql2Answer.CopingQol25,
    Cfql2Answer.CopingQol26
  ];
  var cfql2Score = new cfql2(cfql2Responses, false);
  // var cfql2ScoreEdit = parseFloat(cfql2Score).toFixed(2);
  // var cfql2ScoreDouble = Number(cfql2ScoreEdit);
  Cfql2Answer.CumulativeScore=cfql2Score;
  

  // console.log(cfql2Score);

  
  
cfqlQueryString = "INSERT INTO [CFQL2] (ParticipantName, ParticipantAge, DateOfBirth, Sex, InformantName, InformantAge, DateOfSurvey, InformantRelationshipToPatient, ParticipantDiagnosis, ParticipantDiagosisSeverity, ParticipantAgeDiagnosis, ChildQol1, ChildQol2, ChildQol3, ChildQol4, FamilyQol5, FamilyQol6, FamilyQol7, FamilyQol8, CaregiverQol9, CaregiverQol10, CaregiverQol11, CaregiverQol12, FinancialQol13, FinancialQol14, FinancialQol15, SocialNetworkQol16, SocialNetworkQol17, SocialNetworkQol18, SocialNetworkQol19, PartnerRelationshipQol20, PartnerRelationshipQol21, PartnerRelationshipQol22, PartnerRelationshipQol23, CopingQol24, CopingQol25, CopingQol26, CumulativeScore) values ('"+Cfql2Answer.participantName+"', '"+Cfql2Answer.ParticipantAge+"', '"+Cfql2Answer.DateOfBirth+"', '"+Cfql2Answer.Sex+"', '"+Cfql2Answer.InformantName+"', '"+Cfql2Answer.InformantAge+"', '"+Cfql2Answer.DateOfSurvey+"', '"+Cfql2Answer.InformantRelationshipToPatient+"', '"+Cfql2Answer.ParticipantDiagnosis+"', '"+Cfql2Answer.ParticipantDiagosisSeverity+"', '"+Cfql2Answer.ParticipantAgeDiagnosis+"', '"+Cfql2Answer.ChildQol1+"', '"+Cfql2Answer.ChildQol2+"', '"+Cfql2Answer.ChildQol3+"', '"+Cfql2Answer.ChildQol4+"', '"+Cfql2Answer.FamilyQol5+"', '"+Cfql2Answer.FamilyQol6+"', '"+Cfql2Answer.FamilyQol7+"', '"+Cfql2Answer.FamilyQol8+"', '"+Cfql2Answer.CaregiverQol9+"', '"+Cfql2Answer.CaregiverQol10+"', '"+Cfql2Answer.CaregiverQol11+"', '"+Cfql2Answer.CaregiverQol12+"', '"+Cfql2Answer.FinancialQol13+"', '"+Cfql2Answer.FinancialQol14+"', '"+Cfql2Answer.FinancialQol15+"', '"+Cfql2Answer.SocialNetworkQol16+"', '"+Cfql2Answer.SocialNetworkQol17+"', '"+Cfql2Answer.SocialNetworkQol18+"', '"+Cfql2Answer.SocialNetworkQol19+"', '"+Cfql2Answer.PartnerRelationshipQol20+"', '"+Cfql2Answer.PartnerRelationshipQol21+"', '"+Cfql2Answer.PartnerRelationshipQol22+"', '"+Cfql2Answer.PartnerRelationshipQol23+"', '"+Cfql2Answer.CopingQol24+"', '"+Cfql2Answer.CopingQol25+"', '"+Cfql2Answer.CopingQol26+"', '"+Cfql2Answer.CumulativeScore+"')";
  //cfqlQueryString = "INSERT INTO [CFQL2] (ParticipantName, ParticipantAge, DateOfBirth, Sex, InformantName, InformantAge, DateOfSurvey, InformantRelationshipToPatient, ParticipantDiagnosis, ParticipantDiagosisSeverity, ParticipantAgeDiagnosis, ChildQol1, ChildQol2, ChildQol3, ChildQol4, FamilyQol5, FamilyQol6, FamilyQol7, FamilyQol8, CaregiverQol9, CaregiverQol10, CaregiverQol11, CaregiverQol12, FinancialQol13, FinancialQol14, FinancialQol15, SocialNetworkQol16, SocialNetworkQol17, SocialNetworkQol18, SocialNetworkQol19, PartnerRelationshipQol20, PartnerRelationshipQol21, PartnerRelationshipQol22, PartnerRelationshipQol23, CopingQol24, CopingQol25, CopingQol26) values ('"+Cfql2Answer.participantName+"', '"+Cfql2Answer.ParticipantAge+"', '"+Cfql2Answer.DateOfBirth+"', '"+Cfql2Answer.Sex+"', '"+Cfql2Answer.InformantName+"', '"+Cfql2Answer.InformantAge+"', '"+Cfql2Answer.DateOfSurvey+"', '"+Cfql2Answer.InformantRelationshipToPatient+"', '"+Cfql2Answer.ParticipantDiagnosis+"', '"+Cfql2Answer.ParticipantDiagosisSeverity+"', '"+Cfql2Answer.ParticipantAgeDiagnosis+"', '"+Cfql2Answer.ChildQol1+"', '"+Cfql2Answer.ChildQol2+"', '"+Cfql2Answer.ChildQol3+"', '"+Cfql2Answer.ChildQol4+"', '"+Cfql2Answer.FamilyQol5+"', '"+Cfql2Answer.FamilyQol6+"', '"+Cfql2Answer.FamilyQol7+"', '"+Cfql2Answer.FamilyQol8+"', '"+Cfql2Answer.CaregiverQol9+"', '"+Cfql2Answer.CaregiverQol10+"', '"+Cfql2Answer.CaregiverQol11+"', '"+Cfql2Answer.CaregiverQol12+"', '"+Cfql2Answer.FinancialQol13+"', '"+Cfql2Answer.FinancialQol14+"', '"+Cfql2Answer.FinancialQol15+"', '"+Cfql2Answer.SocialNetworkQol16+"', '"+Cfql2Answer.SocialNetworkQol17+"', '"+Cfql2Answer.SocialNetworkQol18+"', '"+Cfql2Answer.SocialNetworkQol19+"', '"+Cfql2Answer.PartnerRelationshipQol20+"', '"+Cfql2Answer.PartnerRelationshipQol21+"', '"+Cfql2Answer.PartnerRelationshipQol22+"', '"+Cfql2Answer.PartnerRelationshipQol23+"', '"+Cfql2Answer.CopingQol24+"', '"+Cfql2Answer.CopingQol25+"', '"+Cfql2Answer.CopingQol26+"')";

  executeQuery(res, cfqlQueryString);


});



var asdqQueryString="";


//ASDQ2 SURVEY POST METHODS

app.post("/ASDQ2/asdq2_instructions.html", function(req, res){

  res.redirect("/ASDQ2/asdq2_userinput.html");

});


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


  asdqQueryString = "INSERT INTO [ASDQ2] (ParticipantName, ParticipantAge, DateOfBirth, Sex, InformantName, InformantAge, DateOfSurvey, InformantRelationshipToPatient, ParticipantDiagnosis, ParticipantDiagosisSeverity, ParticipantAgeDiagnosis, Q1, Q2, Q3, Q4, Q5, Q6, Q7, Q8, Q9, Q10, Q11, Q12, Q13, Q14, Q15, Q16, Q17, Q18, Q19, Q20, Q21,Q22, Q23,Q24,Q25,Q26,Q27,Q28,Q29,Q30,Q31,Q32,Q33,Q34,Q35,Q36,Q37,Q38,Q39) values ('"+Asdq2Answer.participantName+"', '"+Asdq2Answer.ParticipantAge+"', '"+Asdq2Answer.DateOfBirth+"', '"+Asdq2Answer.Sex+"', '"+Asdq2Answer.InformantName+"', '"+Asdq2Answer.InformantAge+"', '"+Asdq2Answer.DateOfSurvey+"', '"+Asdq2Answer.InformantRelationshipToPatient+"', '"+Asdq2Answer.ParticipantDiagnosis+"', '"+Asdq2Answer.ParticipantDiagosisSeverity+"', '"+Asdq2Answer.ParticipantAgeDiagnosis+"', '"+Asdq2Answer.Q1+"', '"+Asdq2Answer.Q2+"', '"+Asdq2Answer.Q3+"', '"+Asdq2Answer.Q4+"','"+Asdq2Answer.Q5+"','"+Asdq2Answer.Q6+"', '"+Asdq2Answer.Q7+"', '"+Asdq2Answer.Q8+"', '"+Asdq2Answer.Q9+"', '"+Asdq2Answer.Q10+"', '"+Asdq2Answer.Q11+"', '"+Asdq2Answer.Q12+"', '"+Asdq2Answer.Q13+"', '"+Asdq2Answer.Q14+"', '"+Asdq2Answer.Q15+"', '"+Asdq2Answer.Q16+"', '"+Asdq2Answer.Q17+"', '"+Asdq2Answer.Q18+"','"+Asdq2Answer.Q19+"','"+Asdq2Answer.Q20+"','"+Asdq2Answer.Q21+"','"+Asdq2Answer.Q22+"','"+Asdq2Answer.Q23+"','"+Asdq2Answer.Q24+"','"+Asdq2Answer.Q25+"','"+Asdq2Answer.Q26+"','"+Asdq2Answer.Q27+"','"+Asdq2Answer.Q28+"','"+Asdq2Answer.Q29+"','"+Asdq2Answer.Q30+"','"+Asdq2Answer.Q31+"','"+Asdq2Answer.Q32+"','"+Asdq2Answer.Q33+"','"+Asdq2Answer.Q34+"','"+Asdq2Answer.Q35+"','"+Asdq2Answer.Q36+"','"+Asdq2Answer.Q37+"','"+Asdq2Answer.Q38+"','"+Asdq2Answer.Q39+"')";


  executeQuery(res, asdqQueryString);

});


//--------------------------------------------------------------------------------------------------------------------------


function scorefrom6(scores, indices) {
  for (var i = 0; i < indices.length; i++) {
    if (indices[i] >= scores.length) continue;
    scores[indices[i]] = 6 - scores[indices[i]];
  }
  return scores;
}

//Take a sum over a contiguous range of indices of scores.
function sumoverindices(scores, a, b) {
  if (b < a) {
    //Ensure a < b.
    var tmp = b;
    b = a;
    a = tmp;
  }
  var s = 0;
  for (var i = a; i <= b && i < scores.length; i++) {
    //Take sum over the specified range of indices.
    s += scores[i];
  }
  return s;
}

//Ensure that the vector of scores is compliant with the needed formatting.
//AN: Ideally, this should not be the case. Opininos differ on this of course,
//... but really the function should just do nothing upon invalid input.
function validatescores(scores, requiredlength, minscore, maxscore) {
  //Ensure correct length of score vector.
  while (scores.length < requiredlength) scores.push(minscore);
  while (scores.length > requiredlength) scores.pop();
  //Verify that each score is in the range 1 to 5.
  for (var i = 0; i < scores.length; i++) {
    if (scores < minscore) {
      scores = minscore;
    } else if (scores > maxscore) {
      scores = maxscore;
    }
  }
  return scores;
}

//Compute the CFQL2 autism quality of life score. Translated from a spreadsheet (16 Sept. '21).
//All sub-scores are to be stored in the database.
//Basics of reports should look like the spreadsheets (spatially, in terms of layout and content), interpretation.

//function cfql2(scores, print) {
 function cfql2(scores,print) {
  //Ensure scores vector is conforming.
  scores = validatescores(scores, 26, 1, 5);
  //Transform scores (subtract some from 6).
  scores = scorefrom6(
    scores,
    [1, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 17, 18, 22, 23, 24, 25]
  );
  //Determine qol scores for each of these parameters.
  var childqol = sumoverindices(scores, 0, 3);
  var childpossible = 20;
  var familyqol = sumoverindices(scores, 4, 7);
  var familypossible = 20;
  var caregiverqol = sumoverindices(scores, 8, 11);
  var caregiverpossible = 20;
  var financialqol = sumoverindices(scores, 12, 14);
  var financialpossible = 15;
  var socialqol = sumoverindices(scores, 15, 18);
  var socialpossible = 20;
  var relationshipqol = sumoverindices(scores, 19, 22);
  var relationshippossible = 20;
  var copingqol = sumoverindices(scores, 23, 25);
  var copingpossible = 15;
  var changescale =
    scores[3] +
    scores[7] +
    scores[11] +
    scores[14] +
    scores[18] +
    scores[22] +
    scores[25];
  var changescalepossible = 35;
  //Penultimate step.
  var rawtotal =
    childqol +
    familyqol +
    caregiverqol +
    financialqol +
    socialqol +
    relationshipqol +
    copingqol;
  var totalpossible =
    childpossible +
    familypossible +
    caregiverpossible +
    financialpossible +
    socialpossible +
    relationshippossible +
    copingpossible;
  //Final computation.
  var averageitemtotal = (5.0 * rawtotal) / totalpossible;
  //Yield.
  return averageitemtotal; //Could also append other measures here as a string.
}

//Compute ASDQ scoring, translated from spreadsheet (23 Sept. '21).
function asdq(scores, print) {
  //Ensure scores vector is conforming.
  scores = validatescores(scores, 39, 1, 5);
  //Transform scores (subtract some from 6).
  scores = scorefrom6(
    scores,
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
  );
  //Begin determining scores, all are essentially averages.
  var asdtotal = sumoverindices(scores, 0, 35) / 36.0;
  //alert(scores + "  - " + asdtotal);
  //"Domains".
  var sci = sumoverindices(0, 17) / 18.0;
  var rrb = sumoverindices(17, 35) / 19.0;
  //"Social sub-scales".
  var ssb_socialmotivation = sumoverindices(0, 2) / 3.0;
  var ssb_nonverbalcommunication = sumoverindices(3, 5) / 3.0;
  var ssb_reciprocity = sumoverindices(6, 10) / 5.0;
  var ssb_perspectivetaking = sumoverindices(11, 13) / 3.0;
  var ssb_relationships = sumoverindices(14, 16) / 3.0;
  //"Repetitive sub-scales".
  var rsb_repetitivebehavior = sumoverindices(19, 21) / 3.0;
  var rsb_needforsamaeness = sumoverindices(21, 24) / 4.0;
  var rsb_sensorysensitivity = sumoverindices(25, 27) / 3.0;
  var rsb_sensoryinterests = sumoverindices(28, 30) / 3.0;
  var rsb_restrictedinterests = sumoverindices(30, 36) / 7.0;
  //Yield.
  return asdtotal;
}

//"Driver" functions that performs the tests.
function run_cfql2() {
  var content = document.getElementById("content");
  //content.textContent = "adsfasdfs";
  content.textContent =
    "" +
    cfql2(
      [
        3, 3, 4, 3, 5, 3, 3, 3, 3, 1, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3,
        3, 5,
      ],
      false
    );
}
//Ditto.
function run_asdq() {
  var content = document.getElementById("content");
  //content.textContent = "adsfasdfs";
  content.textContent =
    "" +
    asdq(
      [
        3, 4, 2, 3, 5, 1, 2, 4, 5, 5, 3, 4, 1, 4, 5, 1, 3, 5, 1, 3, 4, 2, 3, 3,
        1, 4, 5, 1, 3, 4, 3, 1, 2, 3, 3, 4, 5, 4, 5,
      ],
      false
    );
}

//Request a pristine data set and hand-computed correct output from the client at next meeting, to help verify these.

//Produce an english language description of a given quality of life score (21 Oct '21').
function score_description(score, lowmax, ademax) {
  if (score <= lowmax) {
    return "low";
  } else if (score <= ademax) {
    return "adequate";
  } else {
    return "high";
  }
}

//Produce a properly formatted text report for some row of the CFQL2 data (21 Oct. '21).
function report_cfql2(str) {
  //Extract parsed JSON object from reply.
  var row = JSON.parse(str);
  row = row[0]; //Access the inner data.
  //Accumulate the relevant entries of 'row'.
  var participantname = row.ParticipantName;
  var participantage = row.participantage;
  var child = row.ChildQolAverage;
  var family = row.FamilyQolAverage;
  var caregiver = row.CargegiverQolAverage;
  var financial = row.FinancialQolAverage;
  var social = row.SocialQolAverage;
  var relationship = row.PartnerRelationshipQolAverage;
  var coping = row.CopingQolAverage;
  var cumulative = row.CumulativeScore;
  var average = (5.0 * cumulative) / 130.0;
  //Format those values into the desired formatting.
  var outline1 =
    "Scores - " +
    participantname +
    ", age: " +
    participantage +
    "\n" +
    "Child QoL: " +
    child +
    "/20, " +
    score_description(child, 8, 15) +
    "\n" +
    "Familiy QoL: " +
    family +
    "/20, " +
    score_description(family, 8, 15) +
    "\n" +
    "Caregiber QoL: " +
    caregiver +
    "/20, " +
    score_description(caregiver, 8, 15) +
    "\n" +
    "Financial QoL: " +
    financial +
    "/15, " +
    score_description(financial, 6, 11) +
    "\n" +
    "Social Network QoL: " +
    social +
    "/20, " +
    score_description(social, 8, 15) +
    "\n" +
    "Relationship QoL: " +
    relationship +
    "/20, " +
    score_description(relationship, 8, 15) +
    "\n" +
    "Coping QoL: " +
    coping +
    "/15, " +
    score_description(coping, 6, 11) +
    "\n" +
    "Total QoL: " +
    cumulative +
    "/130, QoL Average: " +
    average +
    ", " +
    score_description(average, 2, 3) +
    "\n";
  //alert(outline1); //JUST FOR TESTING.
  return outline1;
}

//Produce a properly formatted text report for some row of the ASDQ data (28 Oct. '21).
function report_asdq(str) {
  //Extract parsed JSON object from reply.
  var row = JSON.parse(str);
  row = row[0]; //Access the inner data.
  //Accumulate the relevant entries of 'row'.
  //As far as I can tell, the database does not actually store these scores, so that needs to be corrected.
  var asdtotal = row.ASDTotal;
  var sci = row.SCI;
  var rrb = row.RRB;
  var socialmotivation = row.SocialMotivation;
  var nonverbalcommunication = row.NonVerbalCommunication;
  var reciprocity = row.Reciprocity;
  var perspectivetaking = row.PerspectiveTaking;
  var relationships = row.Relationships;
  var repetitive = row.RepetitiveBehavior;
  var sameness = row.NeedForSameness;
  var sensitiviy = row.SensorySensitivity;
  var interests = row.SensoryInterests;
  var restrictedinterests = row.RestrictedInterests;
  //Format those values into the desired formatting.
  var outline1 =
    "ASD Total: " +
    asdtotal +
    "\n" +
    "Domains\n" +
    "SCI: " +
    sci +
    "\n" +
    "RRB: " +
    rrb +
    "\n" +
    "\nSocial Sub-scales\n" +
    "Social Motivation: " +
    socialmotivation +
    "\n" +
    "Non-Verbal Communication: " +
    nonverbalcommunication +
    "\n" +
    "Reciprocity: " +
    reciprocity +
    "\n" +
    "Perspective Taking: " +
    perspectivetaking +
    "\n" +
    "Relationships: " +
    relationships +
    "\n" +
    "\nRepetitive Sub-scales\n" +
    "Repetitive Behavior: " +
    repetitive +
    "\n" +
    "Need for sameness: " +
    sameness +
    "\n" +
    "Sensory sensitivity: " +
    sensitiviy +
    "\n" +
    "Sensory interests: " +
    interests +
    "\n" +
    "Restricted interests" +
    restrictedinterests +
    "\n";
  alert(outline1); //JUST FOR TESTING.
  return outline1;
}

function run_report() {
  /*
				7 Oct.'21
				I am assuming that the structure of "data" is a string structured as a CSV following the schema specified by Austin in the "information" section of the Discord. 
				The basic plan here will be to produce an output string which can be sent as a component of an email report to the "informant" who administers the test to the patient. 
				Actually getting the data in this format is of uncertain difficulty, but Austin tells me that he is working on an HTTP-GET API that will make that process extremely simple. 

				Without knowing for sure what Dr. Frazier wants the report to look like, it's tough for me to do anything final here; nonetheless I will put together a preliminary structure
			*/
  report_cfql2(
    '[{"ParticipantName":"Hello There","ParticipantAge":99,"DateOfBirth":"1999-01-01T00:00:00.000Z","Sex":"Male","InformantName":"Daddy Squiggles","InformantAge":99,"DateOfSurvey":"1999-01-01T00:00:00.000Z","InformantRelationshipToPatient":"Father","ParticipantDiagnosis":"Autism","ParticipantAgeDiagnosis":10,"ParticipantDiagosisSeverity":"Severe","ChildQol1":99,"ChildQol2":99,"ChildQol3":99,"ChildQol4":99,"ChildQolAverage":99.99,"FamilyQol5":99,"FamilyQol6":99,"FamilyQol7":99,"FamilyQol8":99,"FamilyQolAverage":99.99,"CaregiverQol9":99,"CaregiverQol10":99,"CaregiverQol11":99,"CaregiverQol12":99,"CargegiverQolAverage":99.99,"FinancialQol13":99,"FinancialQol14":99,"FinancialQol15":99,"FinancialQolAverage":99.99,"SocialNetworkQol16":99,"SocialNetworkQol17":99,"SocialNetworkQol18":99,"SocialNetworkQol19":99,"SocialQolAverage":99.99,"PartnerRelationshipQolSpouse":"Yes","PartnerRelationshipQolSpouseRelation":"Father","PartnerRelationshipQol20":99,"PartnerRelationshipQol21":99,"PartnerRelationshipQol22":99,"PartnerRelationshipQol23":99,"PartnerRelationshipQolAverage":99.99,"CopingQol24":99,"CopingQol25":99,"CopingQol26":99,"CopingQolAverage":99.99,"CumulativeScore":99.99}]'
  );
}

//--------------------------------------------------------------------------------------------------------------------------

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
