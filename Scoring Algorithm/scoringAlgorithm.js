// {
//   /* <html>
// <head>
// 	<script> */
// }
//Subtract a set of arbitrary score valules from 6.
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
export function cfql2(scores) {
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

//This code will likely not be necessary, disregard for now.
/*
		function csv_to_array(csvstring) {
			//Count the number of entries in the CSV (assume last entry has no following comma). 
			var entries = 0; 
			for(var i = 0; i < csvstring.length; i++)  {
				if(csvstring[i] == ',') entries++; 
			}
			entries += 1; 
			//Begin constructing the array to contain the substrings. 
			var values[entries]; 
			//Populate that array with each substring. 
			var nextcommaindex = csvstring.indexOf(","); 
			var i = 0; 
			while(nextcommaindex != -1) {
				var entry = csvstring.substring(0, nextcommaindex); 
				values[i] = entry; 
				i += 1; 
				csvstring = csvstring.substring(nextcommaindex+1, csvstring.length); 
				nextcommaindex = csvstring.indexOf(","); 
			}
			values[i] = csvstring.substring(1, csvstring.length); //Append the final entry. 
			//Yield resulting array. 
			return values; 
		} */

// 	</script>
// </head>
// <body>
// 	<main>
// 		<span id="content">test</span>
// 		<form><input type = "button" value = "CFQL2" onclick = "run_cfql2();" /></form>
// 		<form><input type = "button" value = "ASDQ" onclick = "run_asdq();" /></form>
// 		<form><input type = "button" value = "report" onclick = "run_report();" /></form>
// 	</main>
// </body>
// </html>

