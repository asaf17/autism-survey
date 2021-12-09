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
 * Inserts the results of the entered query string into the connected database
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

/**
 * Appends each results in the cfql survey to be executed in the SQL insert statement
 */
var cfqlQueryString="";

//CFQL SURVEY POST METHODS

app.post("/CFQL2/cfql2_instructions.html", function(req, res){

  res.redirect("/CFQL2/cfql2_userInput.html");

});


app.post("/CFQL2/cfql2_userInput.html", function(req, res){
  console.log('creating new user...');
  console.log('childs name: ' +req.body.name_child);
  console.log('childs age: ' + req.body.age_child)

  Cfql2Answer.ParticipantName = req.body.name_child;
  Cfql2Answer.ParticipantAge = parseInt(req.body.age_child);
  Cfql2Answer.DateOfBirth = req.body.dob;
  Cfql2Answer.InformantName = req.body.name_inform;
  Cfql2Answer.InformantAge = parseInt(req.body.age_inform);
  Cfql2Answer.DateOfSurvey = req.body.doa;
  Cfql2Answer.Sex = req.body.sex;
  Cfql2Answer.InformantRelationshipToPatient = req.body.relationship;
  Cfql2Answer.ParticipantDiagnosis = req.body.diagnostic;
  Cfql2Answer.ParticipantDiagosisSeverity = req.body.severity;
  Cfql2Answer.ParticipantAgeDiagnosis = parseInt(req.body.age_diag);


  res.redirect("/CFQL2/1_cfql2_ChildSurvey.html");
});


app.post('/CFQL2/1_cfql2_ChildSurvey.html', function(req, res){

  Cfql2Answer.ChildQol1 = parseInt(req.body.q1);
  Cfql2Answer.ChildQol2 = parseInt(req.body.q2);
  Cfql2Answer.ChildQol3 = parseInt(req.body.q3);
  Cfql2Answer.ChildQol4 = parseInt(req.body.q4);

  res.redirect("/CFQL2/2_cfql2_FamilySurvey.html");

});

app.post('/CFQL2/2_cfql2_FamilySurvey.html', function(req, res){

  Cfql2Answer.FamilyQol5 = parseInt(req.body.q5);
  Cfql2Answer.FamilyQol6 = parseInt(req.body.q6);
  Cfql2Answer.FamilyQol7 = parseInt(req.body.q7);
  Cfql2Answer.FamilyQol8 = parseInt(req.body.q8);

  res.redirect("/CFQL2/3_cfql2_CaregiverSurvey.html");

});

app.post('/CFQL2/3_cfql2_CaregiverSurvey.html', function(req, res){

  Cfql2Answer.CaregiverQol9 = parseInt(req.body.q9);
  Cfql2Answer.CaregiverQol10 = parseInt(req.body.q10);
  Cfql2Answer.CaregiverQol11 = parseInt(req.body.q11);
  Cfql2Answer.CaregiverQol12 = parseInt(req.body.q12);

  res.redirect('/CFQL2/4_cfql2_FinancialSurvey.html');

});

app.post('/CFQL2/4_cfql2_FinancialSurvey.html', function(req, res){

  Cfql2Answer.FinancialQol13 = parseInt(req.body.q13);
  Cfql2Answer.FinancialQol14 = parseInt(req.body.q14);
  Cfql2Answer.FinancialQol15 = parseInt(req.body.q15);

  res.redirect('/CFQL2/5_cfql2_SocialNetworkSurvey.html');

});

/**
 * Stores the response from question "I have a significant other/spouse/partner:" as a binary value
 */
var marry="";

app.post('/CFQL2/5_cfql2_SocialNetworkSurvey.html', function(req, res){

  Cfql2Answer.SocialNetworkQol16 = parseInt(req.body.q16);
  Cfql2Answer.SocialNetworkQol17 = parseInt(req.body.q17);
  Cfql2Answer.SocialNetworkQol18 = parseInt(req.body.q18);
  Cfql2Answer.SocialNetworkQol19 = parseInt(req.body.q19);

  marry = parseInt(req.body.marry);
  
  //USER CLICKS YES ON "I have a significant other/spouse/partner:" radio button
  if(marry == 1){
    console.log("Yes: "+parseInt(marry));
    res.redirect('/CFQL2/7_cfql2_PartnerRelationshipSurvey.html')
  }
  //USER CLICKS NO ON "I have a significant other/spouse/partner:" radio button
  if(marry == 2){
    console.log("No: "+parseInt(marry));
    res.redirect('/CFQL2/8_cfql2_CopingSurvey.html')
  }
  
});


app.post('/CFQL2/7_cfql2_PartnerRelationshipSurvey.html', function(req, res){
  Cfql2Answer.PartnerRelationshipQolSpouseRelation = req.body.qRelate;

  Cfql2Answer.PartnerRelationshipQol20 = parseInt(req.body.q20);
  Cfql2Answer.PartnerRelationshipQol21 = parseInt(req.body.q21);
  Cfql2Answer.PartnerRelationshipQol22 = parseInt(req.body.q22);
  Cfql2Answer.PartnerRelationshipQol23 = parseInt(req.body.q23);

  res.redirect('/CFQL2/8_cfql2_CopingSurvey.html');

});


app.post('/CFQL2/8_cfql2_CopingSurvey.html', function(req, res){

  Cfql2Answer.CopingQol24 = parseInt(req.body.q24);
  Cfql2Answer.CopingQol25 = parseInt(req.body.q25);
  Cfql2Answer.CopingQol26 = parseInt(req.body.q26);

  if(marry==2){
    Cfql2Answer.PartnerRelationshipQolSpouseRelation="None";
    Cfql2Answer.PartnerRelationshipQol20 = 0;
    Cfql2Answer.PartnerRelationshipQol21 = 0;
    Cfql2Answer.PartnerRelationshipQol22 = 0;
    Cfql2Answer.PartnerRelationshipQol23 = 0;

  }

  var cfql2Responses = [
    Cfql2Answer.ChildQol1,
    Cfql2Answer.ChildQol2,
    Cfql2Answer.ChildQol3,
    Cfql2Answer.ChildQol4,
    Cfql2Answer.FamilyQol5,
    Cfql2Answer.FamilyQol6,
    Cfql2Answer.FamilyQol7,
    Cfql2Answer.FamilyQol8,
    Cfql2Answer.CaregiverQol9,
    Cfql2Answer.CaregiverQol10,
    Cfql2Answer.CaregiverQol11,
    Cfql2Answer.CaregiverQol12,
    Cfql2Answer.FinancialQol13,
    Cfql2Answer.FinancialQol14,
    Cfql2Answer.FinancialQol15,
    Cfql2Answer.SocialNetworkQol16,
    Cfql2Answer.SocialNetworkQol17,
    Cfql2Answer.SocialNetworkQol18,
    Cfql2Answer.SocialNetworkQol19,
    Cfql2Answer.PartnerRelationshipQol20,
    Cfql2Answer.PartnerRelationshipQol21,
    Cfql2Answer.PartnerRelationshipQol22,
    Cfql2Answer.PartnerRelationshipQol23,
    Cfql2Answer.CopingQol24,
    Cfql2Answer.CopingQol25,
    Cfql2Answer.CopingQol26
  ];
  const cfql2ScoringArray = cfql2(cfql2Responses);

  Cfql2Answer.ChildQolAverage = parseFloat(cfql2ScoringArray[0]);
  Cfql2Answer.FamilyQolAverage = parseFloat(cfql2ScoringArray[1]);
  Cfql2Answer.CaregiverQolAverage = parseFloat(cfql2ScoringArray[2]);
  Cfql2Answer.FinancialQolAverage = parseFloat(cfql2ScoringArray[3]);
  Cfql2Answer.SocialQolAverage = parseFloat(cfql2ScoringArray[4]);
  Cfql2Answer.PartnerRelationshipQolAverage = parseFloat(cfql2ScoringArray[5]);
  Cfql2Answer.CopingQolAverage = parseFloat(cfql2ScoringArray[6]);
  Cfql2Answer.CumulativeScore = parseFloat(cfql2ScoringArray[7]);
  

  cfqlQueryString = "INSERT INTO [CFQL2] (ParticipantName, ParticipantAge,"+
  "DateOfBirth, Sex, InformantName, InformantAge, DateOfSurvey, InformantRelationshipToPatient,"+ 
  "ParticipantDiagnosis, ParticipantDiagosisSeverity, ParticipantAgeDiagnosis, ChildQol1, ChildQol2, "+
  "ChildQol3, ChildQol4, ChildQolAverage, FamilyQol5, FamilyQol6, FamilyQol7, FamilyQol8, FamilyQolAverage, "+
  "CaregiverQol9, CaregiverQol10, CaregiverQol11, CaregiverQol12, CaregiverQolAverage, FinancialQol13, "+
  "FinancialQol14, FinancialQol15, FinancialQolAverage, SocialNetworkQol16, SocialNetworkQol17, "+
  "SocialNetworkQol18, SocialNetworkQol19, SocialQolAverage, PartnerRelationshipQolSpouseRelation, "+
  "PartnerRelationshipQol20, PartnerRelationshipQol21, PartnerRelationshipQol22, PartnerRelationshipQol23, "+
  "PartnerRelationshipQolAverage, CopingQol24, CopingQol25, CopingQol26, CopingQolAverage, CumulativeScore) values ('"+
  Cfql2Answer.ParticipantName+
  "', '"+Cfql2Answer.ParticipantAge+
  "', '"+Cfql2Answer.DateOfBirth+
  "', '"+Cfql2Answer.Sex+
  "', '"+Cfql2Answer.InformantName+
  "', '"+Cfql2Answer.InformantAge+
  "', '"+Cfql2Answer.DateOfSurvey+
  "', '"+Cfql2Answer.InformantRelationshipToPatient+
  "', '"+Cfql2Answer.ParticipantDiagnosis+
  "', '"+Cfql2Answer.ParticipantDiagosisSeverity+
  "', '"+Cfql2Answer.ParticipantAgeDiagnosis+
  "', '"+Cfql2Answer.ChildQol1+
  "', '"+Cfql2Answer.ChildQol2+
  "', '"+Cfql2Answer.ChildQol3+
  "', '"+Cfql2Answer.ChildQol4+
  "', '"+Cfql2Answer.ChildQolAverage+
  "', '"+Cfql2Answer.FamilyQol5+
  "', '"+Cfql2Answer.FamilyQol6+
  "', '"+Cfql2Answer.FamilyQol7+
  "', '"+Cfql2Answer.FamilyQol8+
  "', '"+Cfql2Answer.FamilyQolAverage+
  "', '"+Cfql2Answer.CaregiverQol9+
  "', '"+Cfql2Answer.CaregiverQol10+
  "', '"+Cfql2Answer.CaregiverQol11+
  "', '"+Cfql2Answer.CaregiverQol12+
  "', '"+Cfql2Answer.CaregiverQolAverage+
  "', '"+Cfql2Answer.FinancialQol13+
  "', '"+Cfql2Answer.FinancialQol14+
  "', '"+Cfql2Answer.FinancialQol15+
  "', '"+Cfql2Answer.FinancialQolAverage+
  "', '"+Cfql2Answer.SocialNetworkQol16+
  "', '"+Cfql2Answer.SocialNetworkQol17+
  "', '"+Cfql2Answer.SocialNetworkQol18+
  "', '"+Cfql2Answer.SocialNetworkQol19+
  "', '"+Cfql2Answer.SocialQolAverage+
  "', '"+Cfql2Answer.PartnerRelationshipQolSpouseRelation+
  "', '"+Cfql2Answer.PartnerRelationshipQol20+
  "', '"+Cfql2Answer.PartnerRelationshipQol21+
  "', '"+Cfql2Answer.PartnerRelationshipQol22+
  "', '"+Cfql2Answer.PartnerRelationshipQol23+
  "', '"+Cfql2Answer.PartnerRelationshipQolAverage+
  "', '"+Cfql2Answer.CopingQol24+
  "', '"+Cfql2Answer.CopingQol25+
  "', '"+Cfql2Answer.CopingQol26+
  "', '"+Cfql2Answer.CopingQolAverage+
  "', '"+Cfql2Answer.CumulativeScore+"')";


  executeQuery(res, cfqlQueryString);

  //cfql2 scores in JSON format
  console.log(
    report_cfql2("[{"+JSON.stringify("ParticipantName")+":"+JSON.stringify(Cfql2Answer.ParticipantName)+","+ JSON.stringify("ParticipantAge")+":"+JSON.stringify(Cfql2Answer.ParticipantAge)+","+
    JSON.stringify("DateOfBirth")+":"+JSON.stringify(Cfql2Answer.DateOfBirth)+","+JSON.stringify("Sex")+":"+JSON.stringify(Cfql2Answer.Sex)+","+JSON.stringify("InformantName")+":"+JSON.stringify(Cfql2Answer.InformantName)+","+
    JSON.stringify("InformantAge")+":"+JSON.stringify(Cfql2Answer.InformantAge)+","+JSON.stringify("DateOfSurvey")+":"+JSON.stringify(Cfql2Answer.DateOfSurvey)+","+
    JSON.stringify("InformantRelationshipToPatient")+":"+JSON.stringify(Cfql2Answer.InformantRelationshipToPatient)+","+JSON.stringify("ParticipantDiagnosis")+":"+JSON.stringify(Cfql2Answer.ParticipantDiagnosis)+","+
    JSON.stringify("ParticipantAgeDiagnosis")+":"+JSON.stringify(Cfql2Answer.ParticipantAgeDiagnosis)+","+JSON.stringify("ParticipantDiagosisSeverity")+":"+JSON.stringify(Cfql2Answer.ParticipantDiagosisSeverity)+","+
    JSON.stringify("ChildQol1")+":"+JSON.stringify(Cfql2Answer.ChildQol1)+","+JSON.stringify("ChildQol2")+":"+JSON.stringify(Cfql2Answer.ChildQol2)+","+JSON.stringify("ChildQol3")+":"+JSON.stringify(Cfql2Answer.ChildQol3)+","+
    JSON.stringify("ChildQol4")+":"+JSON.stringify(Cfql2Answer.ChildQol4)+","+JSON.stringify("ChildQolAverage")+":"+JSON.stringify(Cfql2Answer.ChildQolAverage)+","+JSON.stringify("FamilyQol5")+":"+JSON.stringify(Cfql2Answer.FamilyQol5)+","+
    JSON.stringify("FamilyQol6")+":"+JSON.stringify(Cfql2Answer.FamilyQol6)+","+JSON.stringify("FamilyQol7")+":"+JSON.stringify(Cfql2Answer.FamilyQol7)+","+JSON.stringify("FamilyQol8")+":"+JSON.stringify(Cfql2Answer.FamilyQol8)+","+
    JSON.stringify("FamilyQolAverage")+":"+JSON.stringify(Cfql2Answer.FamilyQolAverage)+","+JSON.stringify("CaregiverQol9")+":"+JSON.stringify(Cfql2Answer.CaregiverQol9)+","+
    JSON.stringify("CaregiverQol10")+":"+JSON.stringify(Cfql2Answer.CaregiverQol10)+","+JSON.stringify("CaregiverQol11")+":"+JSON.stringify(Cfql2Answer.CaregiverQol11)+","+
    JSON.stringify("CaregiverQol12")+":"+JSON.stringify(Cfql2Answer.CaregiverQol12)+","+JSON.stringify("CaregiverQolAverage")+":"+JSON.stringify(Cfql2Answer.CaregiverQolAverage)+","+
    JSON.stringify("FinancialQol13")+":"+JSON.stringify(Cfql2Answer.FinancialQol13)+","+JSON.stringify("FinancialQol14")+":"+JSON.stringify(Cfql2Answer.FinancialQol14)+","+
    JSON.stringify("FinancialQol15")+":"+JSON.stringify(Cfql2Answer.FinancialQol15)+","+JSON.stringify("FinancialQolAverage")+":"+JSON.stringify(Cfql2Answer.FinancialQolAverage)+","+
    JSON.stringify("SocialNetworkQol16")+":"+JSON.stringify(Cfql2Answer.SocialNetworkQol16)+","+JSON.stringify("SocialNetworkQol17")+":"+JSON.stringify(Cfql2Answer.SocialNetworkQol17)+","+
    JSON.stringify("SocialNetworkQol18")+":"+JSON.stringify(Cfql2Answer.SocialNetworkQol18)+","+JSON.stringify("SocialNetworkQol19")+":"+JSON.stringify(Cfql2Answer.SocialNetworkQol19)+","+
    JSON.stringify("SocialQolAverage")+":"+JSON.stringify(Cfql2Answer.SocialQolAverage)+","+JSON.stringify("PartnerRelationshipQolSpouseRelation")+":"+JSON.stringify(Cfql2Answer.PartnerRelationshipQolSpouseRelation)+","+
    JSON.stringify("PartnerRelationshipQol20")+":"+JSON.stringify(Cfql2Answer.PartnerRelationshipQol20)+","+JSON.stringify("PartnerRelationshipQol21")+":"+JSON.stringify(Cfql2Answer.PartnerRelationshipQol21)+","+
    JSON.stringify("PartnerRelationshipQol22")+":"+JSON.stringify(Cfql2Answer.PartnerRelationshipQol22)+","+JSON.stringify("PartnerRelationshipQol23")+":"+JSON.stringify(Cfql2Answer.PartnerRelationshipQol23)+","+
    JSON.stringify("PartnerRelationshipQolAverage")+":"+JSON.stringify(Cfql2Answer.PartnerRelationshipQolAverage)+","+JSON.stringify("CopingQol24")+":"+JSON.stringify(Cfql2Answer.CopingQol24)+","+
    JSON.stringify("CopingQol25")+":"+JSON.stringify(Cfql2Answer.CopingQol25)+","+JSON.stringify("CopingQol26")+":"+JSON.stringify(Cfql2Answer.CopingQol26)+","+JSON.stringify("CopingQolAverage")+":"+JSON.stringify(Cfql2Answer.CopingQolAverage)+","+
    JSON.stringify("CumulativeScore")+":"+JSON.stringify(Cfql2Answer.CumulativeScore)+"}]")
   );

});


/**
 * Appends each results in the asdq survey to be executed in the SQL insert statement
 */
var asdqQueryString="";


//ASDQ2 SURVEY POST METHODS

app.post("/ASDQ2/asdq2_instructions.html", function(req, res){

  res.redirect("/ASDQ2/asdq2_userinput.html");

});


app.post("/ASDQ2/asdq2_userinput.html", function(req, res){
  console.log('creating new user...');
  console.log('childs name: ' +req.body.name_child);
  console.log('childs age: ' + req.body.age_child)

  Asdq2Answer.ParticipantName = req.body.name_child;
  Asdq2Answer.ParticipantAge = parseInt(req.body.age_child);
  Asdq2Answer.DateOfBirth = req.body.dob;
  Asdq2Answer.InformantName = req.body.name_inform;
  Asdq2Answer.InformantAge = parseInt(req.body.age_inform);
  Asdq2Answer.DateOfSurvey = req.body.doa;
  Asdq2Answer.Sex = req.body.sex;
  Asdq2Answer.InformantRelationshipToPatient = req.body.relationship;
  Asdq2Answer.ParticipantDiagnosis = req.body.diagnostic;
  Asdq2Answer.ParticipantDiagosisSeverity = req.body.severity;
  Asdq2Answer.ParticipantAgeDiagnosis = parseInt(req.body.age_diag);



  res.redirect("/ASDQ2/1_asdq2.html");
});


app.post('/ASDQ2/1_asdq2.html', function(req, res){

  Asdq2Answer.Q1 = parseInt(req.body.q1);
  Asdq2Answer.Q2 = parseInt(req.body.q2);
  Asdq2Answer.Q3 = parseInt(req.body.q3);
  Asdq2Answer.Q4 = parseInt(req.body.q4);
  Asdq2Answer.Q5 = parseInt(req.body.q5);
  Asdq2Answer.Q6 = parseInt(req.body.q6);

  res.redirect("/ASDQ2/2_asdq2.html");

});


app.post('/ASDQ2/2_asdq2.html', function(req, res){

  Asdq2Answer.Q7 = parseInt(req.body.q7);
  Asdq2Answer.Q8 = parseInt(req.body.q8);
  Asdq2Answer.Q9 = parseInt(req.body.q9);
  Asdq2Answer.Q10 = parseInt(req.body.q10);
  Asdq2Answer.Q11 = parseInt(req.body.q11);
  Asdq2Answer.Q12 = parseInt(req.body.q12);

  res.redirect("/ASDQ2/3_asdq2.html");


});

app.post('/ASDQ2/3_asdq2.html', function(req, res){

  Asdq2Answer.Q13 = parseInt(req.body.q13);
  Asdq2Answer.Q14 = parseInt(req.body.q14);
  Asdq2Answer.Q15 = parseInt(req.body.q15);
  Asdq2Answer.Q16 = parseInt(req.body.q16);
  Asdq2Answer.Q17 = parseInt(req.body.q17);
  Asdq2Answer.Q18 = parseInt(req.body.q18);

  res.redirect("/ASDQ2/4_asdq2.html");

});


app.post('/ASDQ2/4_asdq2.html', function(req, res){

  Asdq2Answer.Q19 = parseInt(req.body.q19);
  Asdq2Answer.Q20 = parseInt(req.body.q20);
  Asdq2Answer.Q21 = parseInt(req.body.q21);
  Asdq2Answer.Q22 = parseInt(req.body.q22);
  Asdq2Answer.Q23 = parseInt(req.body.q23);
  Asdq2Answer.Q24 = parseInt(req.body.q24);

  res.redirect("/ASDQ2/5_asdq2.html");

});


app.post('/ASDQ2/5_asdq2.html', function(req, res){

  Asdq2Answer.Q25 = parseInt(req.body.q25);
  Asdq2Answer.Q26 = parseInt(req.body.q26);
  Asdq2Answer.Q27 = parseInt(req.body.q27);
  Asdq2Answer.Q28 = parseInt(req.body.q28);
  Asdq2Answer.Q29 = parseInt(req.body.q29);
  Asdq2Answer.Q30 = parseInt(req.body.q30);

  res.redirect("/ASDQ2/6_asdq2.html");

});

app.post('/ASDQ2/6_asdq2.html', function(req, res){

  Asdq2Answer.Q31 = parseInt(req.body.q31);
  Asdq2Answer.Q32 = parseInt(req.body.q32);
  Asdq2Answer.Q33 = parseInt(req.body.q33);
  Asdq2Answer.Q34 = parseInt(req.body.q34);
  Asdq2Answer.Q35 = parseInt(req.body.q35);
  Asdq2Answer.Q36 = parseInt(req.body.q36);
  
  res.redirect("/ASDQ2/7_asdq2.html");

});

app.post('/ASDQ2/7_asdq2.html', function(req, res){

  Asdq2Answer.Q37 = parseInt(req.body.q37);
  Asdq2Answer.Q38 = parseInt(req.body.q38);
  Asdq2Answer.Q39 = parseInt(req.body.q39);


  var asdq2Responses = [
    Asdq2Answer.Q1,
    Asdq2Answer.Q2,
    Asdq2Answer.Q3,
    Asdq2Answer.Q4,
    Asdq2Answer.Q5,
    Asdq2Answer.Q6,
    Asdq2Answer.Q7,
    Asdq2Answer.Q8,
    Asdq2Answer.Q9,
    Asdq2Answer.Q10,
    Asdq2Answer.Q11,
    Asdq2Answer.Q12,
    Asdq2Answer.Q13,
    Asdq2Answer.Q14,
    Asdq2Answer.Q15,
    Asdq2Answer.Q16,
    Asdq2Answer.Q17,
    Asdq2Answer.Q18,
    Asdq2Answer.Q19,
    Asdq2Answer.Q20,
    Asdq2Answer.Q21,
    Asdq2Answer.Q22,
    Asdq2Answer.Q23,
    Asdq2Answer.Q24,
    Asdq2Answer.Q25,
    Asdq2Answer.Q26,
    Asdq2Answer.Q27,
    Asdq2Answer.Q28,
    Asdq2Answer.Q29,
    Asdq2Answer.Q30,
    Asdq2Answer.Q31,
    Asdq2Answer.Q32,
    Asdq2Answer.Q33,
    Asdq2Answer.Q34,
    Asdq2Answer.Q35,
    Asdq2Answer.Q36,
    Asdq2Answer.Q37,
    Asdq2Answer.Q38,
    Asdq2Answer.Q39,
  ];
  
  const asdq2ScoringArray = asdq(asdq2Responses);

  Asdq2Answer.SCISubscore = parseFloat(asdq2ScoringArray[0]);
  Asdq2Answer.RRBSubscore = parseFloat(asdq2ScoringArray[1]);
  Asdq2Answer.SocialMotivationSubscore = parseFloat(asdq2ScoringArray[2]);
  Asdq2Answer.NonVervalCommunicationSubscore = parseFloat(asdq2ScoringArray[3]);
  Asdq2Answer.ReciprocitySubscore = parseFloat(asdq2ScoringArray[4]);
  Asdq2Answer.PerspectiveTakingSubscore = parseFloat(asdq2ScoringArray[5]);
  Asdq2Answer.RelationshipsSubscore = parseFloat(asdq2ScoringArray[6]);
  Asdq2Answer.RepetitiveBehaviorSubscore = parseFloat(asdq2ScoringArray[7]);
  Asdq2Answer.NeedForSamenessSubscore = parseFloat(asdq2ScoringArray[8]);
  Asdq2Answer.SensorySenstivitySubscore = parseFloat(asdq2ScoringArray[9]);
  Asdq2Answer.SensoryInterestsSubscore = parseFloat(asdq2ScoringArray[10]);
  Asdq2Answer.RestrictedInterestsSubscore = parseFloat(asdq2ScoringArray[11]);
  Asdq2Answer.CumulativeScore = parseFloat(asdq2ScoringArray[12]);

  


  asdqQueryString = "INSERT INTO [ASDQ2] (ParticipantName, ParticipantAge, DateOfBirth, "+
  "Sex, InformantName, InformantAge, DateOfSurvey, InformantRelationshipToPatient, ParticipantDiagnosis, "+
  "ParticipantDiagosisSeverity, ParticipantAgeDiagnosis, Q1, Q2, Q3, Q4, Q5, Q6, Q7, Q8, Q9, Q10, Q11, "+
  "Q12, Q13, Q14, Q15, Q16, Q17, Q18, Q19, Q20, Q21,Q22, Q23,Q24,Q25,Q26,Q27,Q28,Q29,Q30,Q31,Q32,Q33,Q34,"+
  "Q35,Q36,Q37,Q38,Q39,SCISubscore, RRBSubscore, SocialMotivationSubscore, NonVervalCommunicationSubscore, "+
  "ReciprocitySubscore, PerspectiveTakingSubscore, RelationshipsSubscore, RepetitiveBehaviorSubscore, "+
  "NeedForSamenessSubscore, SensorySenstivitySubscore, SensoryInterestsSubscore, RestrictedInterestsSubscore, CumulativeScore) values ('"+
  Asdq2Answer.ParticipantName+
  "', '"+Asdq2Answer.ParticipantAge+
  "', '"+Asdq2Answer.DateOfBirth+
  "', '"+Asdq2Answer.Sex+
  "', '"+Asdq2Answer.InformantName+
  "', '"+Asdq2Answer.InformantAge+
  "', '"+Asdq2Answer.DateOfSurvey+
  "', '"+Asdq2Answer.InformantRelationshipToPatient+
  "', '"+Asdq2Answer.ParticipantDiagnosis+
  "', '"+Asdq2Answer.ParticipantDiagosisSeverity+
  "', '"+Asdq2Answer.ParticipantAgeDiagnosis+
  "', '"+Asdq2Answer.Q1+
  "', '"+Asdq2Answer.Q2+
  "', '"+Asdq2Answer.Q3+
  "', '"+Asdq2Answer.Q4+
  "', '"+Asdq2Answer.Q5+
  "', '"+Asdq2Answer.Q6+
  "', '"+Asdq2Answer.Q7+
  "', '"+Asdq2Answer.Q8+
  "', '"+Asdq2Answer.Q9+
  "', '"+Asdq2Answer.Q10+
  "', '"+Asdq2Answer.Q11+
  "', '"+Asdq2Answer.Q12+
  "', '"+Asdq2Answer.Q13+
  "', '"+Asdq2Answer.Q14+
  "', '"+Asdq2Answer.Q15+
  "', '"+Asdq2Answer.Q16+
  "', '"+Asdq2Answer.Q17+
  "', '"+Asdq2Answer.Q18+
  "', '"+Asdq2Answer.Q19+
  "', '"+Asdq2Answer.Q20+
  "', '"+Asdq2Answer.Q21+
  "', '"+Asdq2Answer.Q22+
  "', '"+Asdq2Answer.Q23+
  "', '"+Asdq2Answer.Q24+
  "', '"+Asdq2Answer.Q25+
  "', '"+Asdq2Answer.Q26+
  "', '"+Asdq2Answer.Q27+
  "', '"+Asdq2Answer.Q28+
  "', '"+Asdq2Answer.Q29+
  "', '"+Asdq2Answer.Q30+
  "', '"+Asdq2Answer.Q31+
  "', '"+Asdq2Answer.Q32+
  "', '"+Asdq2Answer.Q33+
  "', '"+Asdq2Answer.Q34+
  "', '"+Asdq2Answer.Q35+
  "', '"+Asdq2Answer.Q36+
  "', '"+Asdq2Answer.Q37+
  "', '"+Asdq2Answer.Q38+
  "', '"+Asdq2Answer.Q39+
  "', '"+Asdq2Answer.SCISubscore+
  "', '"+Asdq2Answer.RRBSubscore+
  "', '"+Asdq2Answer.SocialMotivationSubscore+
  "', '"+Asdq2Answer.NonVervalCommunicationSubscore+
  "', '"+Asdq2Answer.ReciprocitySubscore+
  "', '"+Asdq2Answer.PerspectiveTakingSubscore+
  "', '"+Asdq2Answer.RelationshipsSubscore+
  "', '"+Asdq2Answer.RepetitiveBehaviorSubscore+
  "', '"+Asdq2Answer.NeedForSamenessSubscore+
  "', '"+Asdq2Answer.SensorySenstivitySubscore+
  "', '"+Asdq2Answer.SensoryInterestsSubscore+
  "', '"+Asdq2Answer.RestrictedInterestsSubscore+
  "', '"+Asdq2Answer.CumulativeScore+
  "')";


  executeQuery(res, asdqQueryString);

  //asdq2 scores in JSON format
  console.log(
    report_asdq("[{"+JSON.stringify("ParticipantName")+":"+JSON.stringify(Asdq2Answer.ParticipantName)+","+ JSON.stringify("ParticipantAge")+":"+JSON.stringify(Asdq2Answer.ParticipantAge)+","+
    JSON.stringify("DateOfBirth")+":"+JSON.stringify(Asdq2Answer.DateOfBirth)+","+JSON.stringify("Sex")+":"+JSON.stringify(Asdq2Answer.Sex)+","+JSON.stringify("InformantName")+":"+JSON.stringify(Asdq2Answer.InformantName)+","+
    JSON.stringify("InformantAge")+":"+JSON.stringify(Asdq2Answer.InformantAge)+","+JSON.stringify("DateOfSurvey")+":"+JSON.stringify(Asdq2Answer.DateOfSurvey)+","+
    JSON.stringify("InformantRelationshipToPatient")+":"+JSON.stringify(Asdq2Answer.InformantRelationshipToPatient)+","+JSON.stringify("ParticipantDiagnosis")+":"+JSON.stringify(Asdq2Answer.ParticipantDiagnosis)+","+
    JSON.stringify("ParticipantAgeDiagnosis")+":"+JSON.stringify(Asdq2Answer.ParticipantAgeDiagnosis)+","+JSON.stringify("ParticipantDiagosisSeverity")+":"+JSON.stringify(Asdq2Answer.ParticipantDiagosisSeverity)+","+
    JSON.stringify("Q1")+":"+JSON.stringify(Asdq2Answer.Q1)+","+JSON.stringify("Q2")+":"+JSON.stringify(Asdq2Answer.Q2)+","+
    JSON.stringify("Q3")+":"+JSON.stringify(Asdq2Answer.Q3)+","+JSON.stringify("Q4")+":"+JSON.stringify(Asdq2Answer.Q4)+","+JSON.stringify("Q5")+":"+JSON.stringify(Asdq2Answer.Q5)+","+
    JSON.stringify("Q6")+":"+JSON.stringify(Asdq2Answer.Q6)+","+JSON.stringify("Q7")+":"+JSON.stringify(Asdq2Answer.Q7)+","+JSON.stringify("Q8")+":"+JSON.stringify(Asdq2Answer.Q8)+","+
    JSON.stringify("Q9")+":"+JSON.stringify(Asdq2Answer.Q9)+","+JSON.stringify("Q10")+":"+JSON.stringify(Asdq2Answer.Q10)+","+JSON.stringify("Q11")+":"+JSON.stringify(Asdq2Answer.Q11)+","+
    JSON.stringify("Q12")+":"+JSON.stringify(Asdq2Answer.Q12)+","+JSON.stringify("Q13")+":"+JSON.stringify(Asdq2Answer.Q13)+","+JSON.stringify("Q14")+":"+JSON.stringify(Asdq2Answer.Q14)+","+
    JSON.stringify("Q15")+":"+JSON.stringify(Asdq2Answer.Q15)+","+JSON.stringify("Q16")+":"+JSON.stringify(Asdq2Answer.Q16)+","+JSON.stringify("Q17")+":"+JSON.stringify(Asdq2Answer.Q17)+","+
    JSON.stringify("Q18")+":"+JSON.stringify(Asdq2Answer.Q18)+","+JSON.stringify("Q19")+":"+JSON.stringify(Asdq2Answer.Q19)+","+JSON.stringify("Q20")+":"+JSON.stringify(Asdq2Answer.Q20)+","+
    JSON.stringify("Q21")+":"+JSON.stringify(Asdq2Answer.Q21)+","+JSON.stringify("Q22")+":"+JSON.stringify(Asdq2Answer.Q22)+","+JSON.stringify("Q23")+":"+JSON.stringify(Asdq2Answer.Q23)+","+
    JSON.stringify("Q24")+":"+JSON.stringify(Asdq2Answer.Q24)+","+JSON.stringify("Q25")+":"+JSON.stringify(Asdq2Answer.Q25)+","+JSON.stringify("Q26")+":"+JSON.stringify(Asdq2Answer.Q26)+","+
    JSON.stringify("Q27")+":"+JSON.stringify(Asdq2Answer.Q27)+","+JSON.stringify("Q28")+":"+JSON.stringify(Asdq2Answer.Q28)+","+JSON.stringify("Q29")+":"+JSON.stringify(Asdq2Answer.Q29)+","+
    JSON.stringify("Q30")+":"+JSON.stringify(Asdq2Answer.Q30)+","+JSON.stringify("Q31")+":"+JSON.stringify(Asdq2Answer.Q31)+","+JSON.stringify("Q32")+":"+JSON.stringify(Asdq2Answer.Q32)+","+
    JSON.stringify("Q33")+":"+JSON.stringify(Asdq2Answer.Q33)+","+JSON.stringify("Q34")+":"+JSON.stringify(Asdq2Answer.Q34)+","+JSON.stringify("Q35")+":"+JSON.stringify(Asdq2Answer.Q35)+","+
    JSON.stringify("Q36")+":"+JSON.stringify(Asdq2Answer.Q36)+","+JSON.stringify("SCISubscore")+":"+JSON.stringify(Asdq2Answer.SCISubscore)+","+JSON.stringify("RRBSubscore")+":"+JSON.stringify(Asdq2Answer.RRBSubscore)+","+
    JSON.stringify("SocialMotivationSubscore")+":"+JSON.stringify(Asdq2Answer.SocialMotivationSubscore)+","+JSON.stringify("NonVervalCommunicationSubscore")+":"+JSON.stringify(Asdq2Answer.NonVervalCommunicationSubscore)+","+
    JSON.stringify("ReciprocitySubscore")+":"+JSON.stringify(Asdq2Answer.ReciprocitySubscore)+","+JSON.stringify("PerspectiveTakingSubscore")+":"+JSON.stringify(Asdq2Answer.PerspectiveTakingSubscore)+","+
    JSON.stringify("RelationshipsSubscore")+":"+JSON.stringify(Asdq2Answer.RelationshipsSubscore)+","+JSON.stringify("RepetitiveBehaviorSubscore")+":"+JSON.stringify(Asdq2Answer.RepetitiveBehaviorSubscore)+","+
    JSON.stringify("NeedForSamenessSubscore")+":"+JSON.stringify(Asdq2Answer.NeedForSamenessSubscore)+","+JSON.stringify("SensorySenstivitySubscore")+":"+JSON.stringify(Asdq2Answer.SensorySenstivitySubscore)+","+
    JSON.stringify("SensoryInterestsSubscore")+":"+JSON.stringify(Asdq2Answer.SensoryInterestsSubscore)+","+JSON.stringify("RestrictedInterestsSubscore")+":"+JSON.stringify(Asdq2Answer.RestrictedInterestsSubscore)+","+
    JSON.stringify("CumulativeScore")+":"+JSON.stringify(Asdq2Answer.CumulativeScore)+"}]")
   );

});





//SCORING ALGRORITHM FUNCTIONS
//----------------------------------------------------------------------------------------------------------------------------------------------------

/**
 * Subtract a set of arbitrary score valules from 6.  
 */
function scorefrom6(scores, indices) {
  for(var i = 0; i < indices.length; i++) {
    if(indices[i] >= scores.length) continue; 
    scores[indices[i]] = 6 - scores[indices[i]]; 
  }
  return scores; 
}

/**
 * Take a sum over a contiguous range of indices of scores.  
 */
function sumoverindices(scores, a, b) {
  if(b < a) { //Ensure a < b. 
    var tmp = b; 
    b = a; 
    a = tmp; 
  }
  var s = 0; 
  for(var i = a; i <= b && i < scores.length; i++) { //Take sum over the specified range of indices. 
    s += scores[i]; 
  }
  return s; 
}

/**
 * Ensure that the vector of scores is compliant with the needed formatting. 
 * AND: Ideally, this should not be the case. Opininos differ on this of course, 
 * ... but really the function should just do nothing upon invalid input. 
 * @param {*} scores 
 * @param {*} requiredlength 
 * @param {*} minscore 
 * @param {*} maxscore 
 * @returns 
 */
function validatescores(scores, requiredlength, minscore, maxscore) {
  //Ensure correct length of score vector. 
  while(scores.length < requiredlength) scores.push(minscore); 
  while(scores.length > requiredlength) scores.pop(); 
  //Verify that each score is in the range 1 to 5. 
  for(var i = 0; i < scores.length; i++) {
    if(scores < minscore) {
      scores = minscore; 
    } else if(scores > maxscore) {
      scores = maxscore; 
    }
  }
  return scores; 
}

/**
 * Compute the CFQL2 autism quality of life score. Translated from a spreadsheet (16 Sept. '21). 
 * All sub-scores are to be stored in the database. 
 * Basics of reports should look like the spreadsheets (spatially, in terms of layout and content), interpretation. 
 * @param {*} scores 
 * @returns 
 */
function cfql2(scores) {
  //Ensure scores vector is conforming. 
  scores = validatescores(scores, 26, 1, 5); 
  //Transform scores (subtract some from 6). 
  scores = scorefrom6(scores, [1,3,4,5,6,7,8,9,11,12,13,14,15,17,18,22,23,24,25]); 
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
  var relationshippossible; 
  if(relationshipqol == 0) { //Handle case where participant does not have a spouse (3 Dec. '21). 
    relationshippossible = 0; 
  } else {
    relationshippossible = 20; 
  }
  var copingqol = sumoverindices(scores, 23, 25); 
  var copingpossible = 15; 
  var changescale = scores[3]+scores[7]+scores[11]+scores[14]+scores[18]+scores[22]+scores[25];
  var changescalepossible = 35; 
  //Penultimate step. 
  var rawtotal = childqol + familyqol + caregiverqol + financialqol + socialqol + relationshipqol + copingqol; 
  var totalpossible = childpossible+ familypossible + caregiverpossible + financialpossible + socialpossible + relationshippossible + copingpossible;
  //Final computation. 
  var averageitemtotal = 5.0 * rawtotal / totalpossible; 
  //Yield. 
  const finalScores = [childqol,familyqol,caregiverqol,financialqol,socialqol,relationshipqol,copingqol,parseFloat(averageitemtotal)]
  return finalScores; //Could also append other measures here as a string. 
}

/**
 * Compute ASDQ scoring, translated from spreadsheet (23 Sept. '21). 
 * @param {*} scores 
 * @returns 
 */
function asdq(scores) {
  //Ensure scores vector is conforming. 
  scores = validatescores(scores, 39, 1, 5); 
  //Transform scores (subtract some from 6). 
  scores = scorefrom6(scores, [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]); 
  //Begin determining scores, all are essentially averages. 
  var asdtotal = sumoverindices(scores, 0, 35) / 36.0; 
  //alert(scores + "  - " + asdtotal); 
  //"Domains". 
  var sci = sumoverindices(scores, 0, 17) / 18.0; 
  var rrb = sumoverindices(scores, 17, 35) / 19.0; 
  //"Social sub-scales". 
  var ssb_socialmotivation = sumoverindices(scores, 0, 2) / 3.0; 
  var ssb_nonverbalcommunication = sumoverindices(scores, 3, 5) / 3.0; 
  var ssb_reciprocity = sumoverindices(scores, 6, 10) / 5.0; 
  var ssb_perspectivetaking = sumoverindices(scores, 11, 13) / 3.0; 
  var ssb_relationships = sumoverindices(scores, 14, 16) / 3.0; 
  //"Repetitive sub-scales". 
  var rsb_repetitivebehavior = sumoverindices(scores, 19, 21) / 3.0; 
  var rsb_needforsamaeness = sumoverindices(scores, 21, 24) / 4.0; 
  var rsb_sensorysensitivity = sumoverindices(scores, 25, 27) / 3.0; 
  var rsb_sensoryinterests = sumoverindices(scores, 28, 30) / 3.0; 
  var rsb_restrictedinterests = sumoverindices(scores, 30, 36) / 7.0; 
  //Yield. 
  const asdq2ScoresArray=[
    sci,
    rrb,
    ssb_socialmotivation,
    ssb_nonverbalcommunication,
    ssb_reciprocity,
    ssb_perspectivetaking,
    ssb_relationships,
    rsb_repetitivebehavior,
    rsb_needforsamaeness,
    rsb_sensorysensitivity,
    rsb_sensoryinterests,
    rsb_restrictedinterests,
    asdtotal];
  return asdq2ScoresArray; 
}

//REPORTING FUNCTIONS
//----------------------------------------------------------------------------------------------------------------------------------------------------

//Request a pristine data set and hand-computed correct output from the client at next meeting, to help verify these. 

		//Produce an english language description of a given quality of life score (21 Oct '21'). 
		function score_description(score, lowmax, ademax) {
			if(score <= lowmax) {
				return "low"; 
			} else if(score <= ademax) {
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
			var participantname = row.ParticipantName;//row.ParticipantName; 
			var participantage = row.ParticipantAge;//row.participantage; 
			var child = row.ChildQolAverage; 
			var family = row.FamilyQolAverage; 
			var caregiver = row.CaregiverQolAverage; 
			var financial = row.FinancialQolAverage; 
			var social = row.SocialQolAverage; 
			var relationship = row.PartnerRelationshipQolAverage; 
			var coping = row.CopingQolAverage; 
			var cumulative = row.CumulativeScore; 
			var average = 5.0 * (cumulative) / 130.0; 
			//Format those values into the desired formatting. 
			var outline1 = "Scores - " + participantname + ", age: " + participantage + "\n" + 
							"Child QoL: " + child + "/20, " + score_description(child, 8, 15) + "\n" + 
							"Familiy QoL: " + family + "/20, " + score_description(family, 8, 15) + "\n" + 
							"Caregiber QoL: " + caregiver + "/20, " + score_description(caregiver, 8, 15) + "\n" + 
							"Financial QoL: " + financial + "/15, " + score_description(financial, 6, 11) + "\n" + 
							"Social Network QoL: " + social + "/20, " + score_description(social, 8, 15) + "\n" + 
							"Relationship QoL: " + relationship +"/20, " + score_description(relationship, 8, 15) + "\n" + 
							"Coping QoL: " + coping + "/15, " + score_description(coping, 6, 11) + "\n" + 
							"Total QoL: " + cumulative + "/130, QoL Average: " + average + ", " + score_description(average, 2, 3) + "\n"; 
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
      var participantname = row.ParticipantName;//row.ParticipantName; 
			var participantage = row.ParticipantAge;//row.participantage; 
			var asdtotal = row.CumulativeScore; 
			var sci = row.SCISubscore; 
			var rrb = row.RRBSubscore; 
			var socialmotivation = row.SocialMotivationSubscore; 
			var nonverbalcommunication = row.NonVervalCommunicationSubscore; 
			var reciprocity = row.ReciprocitySubscore; 
			var perspectivetaking = row.PerspectiveTakingSubscore; 
			var relationships = row.RelationshipsSubscore; 
			var repetitive = row.RepetitiveBehaviorSubscore; 
			var sameness = row.NeedForSamenessSubscore; 
			var sensitiviy = row.SensorySenstivitySubscore; 
			var interests = row.SensoryInterestsSubscore; 
			var restrictedinterests = row.RestrictedInterestsSubscore; 
			//Format those values into the desired formatting. 
			var outline1 = "Scores - " + participantname + ", age: " + participantage + "\n" +
              "ASD Total: " + asdtotal + "\n" + 
						   "Domains\n" + 
						   "SCI: " + sci + "\n" + 
						   "RRB: " + rrb + "\n" + 
						   "\nSocial Sub-scales\n" + 
						   "Social Motivation: " + socialmotivation + "\n" + 
						   "Non-Verbal Communication: "  + nonverbalcommunication + "\n"+ 
						   "Reciprocity: " + reciprocity + "\n" + 
						   "Perspective Taking: " + perspectivetaking + "\n" + 
						   "Relationships: " + relationships + "\n" + 
						   "\nRepetitive Sub-scales\n" + 
						   "Repetitive Behavior: " + repetitive + "\n" + 
						   "Need for sameness: " + sameness + "\n" + 
						   "Sensory sensitivity: " + sensitiviy + "\n" + 
						   "Sensory interests: " + interests + "\n" + 
						   "Restricted interests: " + restrictedinterests + "\n"; 
			//alert(outline1); //JUST FOR TESTING. 
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
			report_cfql2("[{\"ParticipantName\":\"Hello There\",\"ParticipantAge\":99,\"DateOfBirth\":\"1999-01-01T00:00:00.000Z\",\"Sex\":\"Male\",\"InformantName\":\"Daddy Squiggles\",\"InformantAge\":99,\"DateOfSurvey\":\"1999-01-01T00:00:00.000Z\",\"InformantRelationshipToPatient\":\"Father\",\"ParticipantDiagnosis\":\"Autism\",\"ParticipantAgeDiagnosis\":10,\"ParticipantDiagosisSeverity\":\"Severe\",\"ChildQol1\":99,\"ChildQol2\":99,\"ChildQol3\":99,\"ChildQol4\":99,\"ChildQolAverage\":99.99,\"FamilyQol5\":99,\"FamilyQol6\":99,\"FamilyQol7\":99,\"FamilyQol8\":99,\"FamilyQolAverage\":99.99,\"CaregiverQol9\":99,\"CaregiverQol10\":99,\"CaregiverQol11\":99,\"CaregiverQol12\":99,\"CargegiverQolAverage\":99.99,\"FinancialQol13\":99,\"FinancialQol14\":99,\"FinancialQol15\":99,\"FinancialQolAverage\":99.99,\"SocialNetworkQol16\":99,\"SocialNetworkQol17\":99,\"SocialNetworkQol18\":99,\"SocialNetworkQol19\":99,\"SocialQolAverage\":99.99,\"PartnerRelationshipQolSpouse\":\"Yes\",\"PartnerRelationshipQolSpouseRelation\":\"Father\",\"PartnerRelationshipQol20\":99,\"PartnerRelationshipQol21\":99,\"PartnerRelationshipQol22\":99,\"PartnerRelationshipQol23\":99,\"PartnerRelationshipQolAverage\":99.99,\"CopingQol24\":99,\"CopingQol25\":99,\"CopingQol26\":99,\"CopingQolAverage\":99.99,\"CumulativeScore\":99.99}]"); 
		}


var port = process.env.PORT || 8090;
app.listen(port);
console.log("API is runnning at " + port);
