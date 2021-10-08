var config = require("./dbconfig");
const sql = require("mssql");

async function getCqflq2Answers() {
  try {
    let pool = await sql.connect(config);
    let result = await pool.request().query("SELECT * from CFQL2");
    return result.recordsets;
  } catch (error) {
    console.log(error);
  }
}

// async  function  getOrder(productId) {
//     try {
//       let  pool = await  sql.connect(config);
//       let  product = await  pool.request()
//       .input('input_parameter', sql.Int, productId)
//       .query("SELECT * from Orders where Id = @input_parameter");
//       return  product.recordsets;
//     }
//     catch (error) {
//       console.log(error);
//     }
//   }

async function addCfql2Answer(cfql2Answer) {
  try {
    let pool = await sql.connect(config);
    let addCfql2Survey = await pool
      .request()
      .input("ParticipantName", sql.NVarChar(64), "John Squiggles")
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

module.exports = {
  getCqflq2Answers: getCqflq2Answers,
  addCfql2Answer: addCfql2Answer,
};
