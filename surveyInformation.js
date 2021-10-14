class SurveyInformation {
  constructor(
    UniqueId,
    CFQL2Selected,
    ASDQ2Selected,
    PhysicianFirstName,
    PhysicianLastName,
    RequesterEmail,
    RecicipientEmail
  ) {
      this.UniqueId = UniqueId,
      this.CFQL2Selected = CFQL2Selected,
      this.ASDQ2Selected = ASDQ2Selected,
      this.PhysicianFirstName = PhysicianFirstName,
      this.PhysicianLastName = PhysicianLastName,
      this.RequesterEmail = RequesterEmail,
      this.RecicipientEmail = RecicipientEmail   
  }
}

module.exports = SurveyInformation;
