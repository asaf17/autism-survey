var config = require("./dbconfig");
const sql = require("mssql");

/**
 * GET Method
 * Gets all the current data in the database
 * @returns JSON output of every survey response and data.
 */
async function getCfql2Answers() {
  try {
    let pool = await sql.connect(config);
    let result = await pool.request()
    .query("SELECT * FROM CFQL2");
    return result.recordsets;
  } catch (error) {
    console.log(error);
  }
}

//TODO: Update to a primary key such as email or add addtional params
/**
 * GET Method
 * Gets survey where survey respondant is {ParticipantName}
 * @param {Name of survey repspondant} ParticipantName 
 * @returns JSON output of survey responses by {ParticipantName}
 */
async function getCfql2Answer(participantName) {
  try {
    let pool = await sql.connect(config);
    let result = await pool.request()
    .input('participantName', sql.NVarChar(64), participantName)
    .query("SELECT * FROM CFQL2 WHERE ParticipantName = @participantName");
    return result.recordsets;
  } catch (error) {
    console.log(error);
  }
}

//TODO Remove test data and extract survey answers.
/**
 * POST Method
 * Posts survey responses to the SQL server.
 * @param {Survey responses for CFQL-2 survey} cfql2Answer 
 * @returns
 */
async function addCfql2Answer(cfql2Answer) {
  try {
    let pool = await sql.connect(config);
    let addCfql2Survey = await pool 
      .request()
      .input("ParticipantName", sql.NVarChar(64), "Water Bottle")
      .input("ParticipantAge", sql.Int, 99)
      .input("DateOfBirth", sql.Date, 1999 / 01 / 01)
      .input("Sex", sql.NVarChar(64), "Male")
      .input("InformantName", sql.NVarChar(64), "Daddy Squiggles")
      .input("InformantAge", sql.Int, 99)
      .input("DateOfSurvey", sql.Date, 1999 / 01 / 01)
      .input("InformantRelationshipToPatient", sql.NVarChar(64), "Father")
      .input("ParticipantDiagnosis", sql.NVarChar(64), "Autism")
      .input("ParticipantAgeDiagnosis", sql.Int, 10)
      .input("ParticipantDiagosisSeverity", sql.NVarChar(64), "Severe")
      .input("ChildQol1", sql.Int, 99)
      .input("ChildQol2", sql.Int, 99)
      .input("ChildQol3", sql.Int, 99)
      .input("ChildQol4", sql.Int, 99)
      .input("ChildQolAverage", sql.Decimal(5, 2), 99.99)
      .input("FamilyQol5", sql.Int, 99)
      .input("FamilyQol6", sql.Int, 99)
      .input("FamilyQol7", sql.Int, 99)
      .input("FamilyQol8", sql.Int, 99)
      .input("FamilyQolAverage", sql.Decimal(5, 2), 99.99)
      .input("CaregiverQol9", sql.Int, 99)
      .input("CaregiverQol10", sql.Int, 99)
      .input("CaregiverQol11", sql.Int, 99)
      .input("CaregiverQol12", sql.Int, 99)
      .input("CaregiverQolAverage", sql.Decimal(5, 2), 99.99)
      .input("FinancialQol13", sql.Int, 99)
      .input("FinancialQol14", sql.Int, 99)
      .input("FinancialQol15", sql.Int, 99)
      .input("FinancialQolAverage", sql.Decimal(5, 2), 99.99)
      .input("SocialNetworkQol16", sql.Int, 99)
      .input("SocialNetworkQol17", sql.Int, 99)
      .input("SocialNetworkQol18", sql.Int, 99)
      .input("SocialNetworkQol19", sql.Int, 99)
      .input("SocialNetworkQolAverage", sql.Decimal(5, 2), 99.99)
      .input("PartnerRelationshipQolSpouse", sql.NVarChar(3), "Yes")
      .input("PartnerRelationshipQolSpouseRelation", sql.NVarChar(64), "Father")
      .input("PartnerRelationshipQol20", sql.Int, 99)
      .input("PartnerRelationshipQol21", sql.Int, 99)
      .input("PartnerRelationshipQol22", sql.Int, 99)
      .input("PartnerRelationshipQol23", sql.Int, 99)
      .input("PartnerRelationshipQolAverage", sql.Decimal(5, 2), 99.99)
      .input("CopingQol24", sql.Int, 99)
      .input("CopingQol25", sql.Int, 99)
      .input("CopingQol26", sql.Int, 99)
      .input("CopingQolAverage", sql.Decimal(5, 2), 99.99)
      .input("CumulativeScore", sql.Decimal(5, 2), 99.99)
      .execute("addCfql2Answer");
    return addCfql2Survey.recordsets;
  } catch (err) {
    console.log(err);
  }
}

/**
 * GET Method
 * Gets all the current data in the database
 * @returns JSON output of every survey response and data.
 */
async function getAsdq2Answers() {
  try {
    let pool = await sql.connect(config);
    let result = await pool.request()
    .query("SELECT * FROM ASDQ2");
    return result.recordsets;
  } catch (error) {
    console.log(error);
  }
}

/**
 * GET Method
 * Gets survey where survey respondant is {ParticipantName}
 * @param {Name of survey repspondant} ParticipantName 
 * @returns JSON output of survey responses by {ParticipantName}
 */
 async function getAsdq2Answer(participantName) {
  try {
    let pool = await sql.connect(config);
    let result = await pool.request()
    .input('participantName', sql.NVarChar(64), participantName)
    .query("SELECT * FROM ASDQ2 WHERE ParticipantName = @participantName");
    return result.recordsets;
  } catch (error) {
    console.log(error);
  }
}

//TODO Remove test data and extract survey answers.
/**
 * POST Method
 * Posts survey responses to the SQL server.
 * @param {Survey responses for ASDQ-2 survey} asdq2Answer 
 * @returns
 */
 async function addAsdq2Answer(asdq2Answer) {
  try {
    let pool = await sql.connect(config);
    let addAsdq2Survey = await pool 
      .request()
      .input("ParticipantName", sql.NVarChar(64), "Full Send500")
      .input("SurveyDate", sql.Date, 1999 / 01 / 01)
      .input("Q1", sql.Int, 99)
      .input("Q2", sql.Int, 99)
      .input("Q3", sql.Int, 99)
      .input("Q4", sql.Int, 99)
      .input("Q5", sql.Int, 99)
      .input("Q6", sql.Int, 99)
      .input("Q7", sql.Int, 99)
      .input("Q8", sql.Int, 99)
      .input("Q9", sql.Int, 99)
      .input("Q10", sql.Int, 99)
      .input("Q11", sql.Int, 99)
      .input("Q12", sql.Int, 99)
      .input("Q13", sql.Int, 99)
      .input("Q14", sql.Int, 99)
      .input("Q15", sql.Int, 99)
      .input("Q16", sql.Int, 99)
      .input("Q17", sql.Int, 99)
      .input("Q18", sql.Int, 99)
      .input("Q19", sql.Int, 99)
      .input("Q20", sql.Int, 99)
      .input("Q21", sql.Int, 99)
      .input("Q22", sql.Int, 99)
      .input("Q23", sql.Int, 99)
      .input("Q24", sql.Int, 99)
      .input("Q25", sql.Int, 99)
      .input("Q26", sql.Int, 99)
      .input("Q27", sql.Int, 99)
      .input("Q28", sql.Int, 99)
      .input("Q29", sql.Int, 99)
      .input("Q30", sql.Int, 99)
      .input("Q31", sql.Int, 99)
      .input("Q32", sql.Int, 99)
      .input("Q33", sql.Int, 99)
      .input("Q34", sql.Int, 99)
      .input("Q35", sql.Int, 99)
      .input("Q36", sql.Int, 99)
      .input("Q37", sql.Int, 99)
      .input("Q38", sql.Int, 99)
      .input("Q39", sql.Int, 99)
      .execute("addAsdq2Answer");
    return addAsdq2Survey.recordsets;
  } catch (err) {
    console.log(err);
  }
}

/**
 * GET Method
 * Gets all the current data in the database
 * @returns JSON output of every survey response and data.
 */
async function getAsdq2Answers() {
  try {
    let pool = await sql.connect(config);
    let result = await pool.request()
    .query("SELECT * FROM ASDQ2");
    return result.recordsets;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getCfql2Answers: getCfql2Answers,
  getCfql2Answer: getCfql2Answer,
  addCfql2Answer: addCfql2Answer,
  getAsdq2Answers: getAsdq2Answers,
  getAsdq2Answer: getAsdq2Answer,
  addAsdq2Answer: addAsdq2Answer
};
