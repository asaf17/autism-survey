CREATE TABLE autismsurvey.dbo.CFQL2 (
RequesterEmail varchar(64),
ParticipantName varchar(64),
ParticipantAge int,
DateOfBirth varchar(64),
Sex varchar(64),
InformantName varchar(64),
InformantAge int,
DateOfSurvey varchar(64),
InformantRelationshipToPatient varchar(64),
ParticipantDiagnosis varchar(64),
ParticipantAgeDiagnosis int,
ParticipantDiagosisSeverity varchar (64),
ChildQol1 int,
ChildQol2 int,
ChildQol3 int,
ChildQol4 int,
ChildQolAverage decimal(5,2), 
FamilyQol5 int,
FamilyQol6 int,
FamilyQol7 int,
FamilyQol8 int,
FamilyQolAverage decimal(5,2), 
CaregiverQol9 int,
CaregiverQol10 int,
CaregiverQol11 int,
CaregiverQol12 int,
CaregiverQolAverage decimal(5,2), 
FinancialQol13 int,
FinancialQol14 int,
FinancialQol15 int,
FinancialQolAverage decimal(5,2), 
SocialNetworkQol16 int,
SocialNetworkQol17 int,
SocialNetworkQol18 int,
SocialNetworkQol19 int,
SocialQolAverage decimal(5,2), 
PartnerRelationshipQolSpouseRelation varchar(64),
PartnerRelationshipQol20 int,
PartnerRelationshipQol21 int,
PartnerRelationshipQol22 int,
PartnerRelationshipQol23 int,
PartnerRelationshipQolAverage decimal(5,2), 
CopingQol24 int,
CopingQol25 int,
CopingQol26 int,
CopingQolAverage decimal(5,2), 
CumulativeScore decimal(5,2)
);

CREATE TABLE autismsurvey.dbo.ASDQ2 (
RequesterEmail varchar(64),
ParticipantName varchar(64),
ParticipantAge int,
DateOfBirth varchar(64),
Sex varchar(64),
InformantName varchar(64),
InformantAge int,
DateOfSurvey varchar(64),
InformantRelationshipToPatient varchar(64),
ParticipantDiagnosis varchar(64),
ParticipantAgeDiagnosis int,
ParticipantDiagosisSeverity varchar (64),
Q1 int,
Q2 int,
Q3 int,
Q4 int,
Q5 int,
Q6 int,
Q7 int,
Q8 int,
Q9 int,
Q10 int,
Q11 int,
Q12 int,
Q13 int,
Q14 int,
Q15 int,
Q16 int,
Q17 int,
Q18 int,
Q19 int,
Q20 int,
Q21 int,
Q22 int,
Q23 int,
Q24 int,
Q25 int,
Q26 int,
Q27 int,
Q28 int,
Q29 int,
Q30 int,
Q31 int,
Q32 int,
Q33 int,
Q34 int,
Q35 int,
Q36 int,
Q37 int,
Q38 int,
Q39 int,
SCISubscore decimal(5,2),
RRBSubscore decimal(5,2),
SocialMotivationSubscore decimal(5,2),
NonVervalCommunicationSubscore decimal(5,2),
ReciprocitySubscore decimal(5,2),
PerspectiveTakingSubscore decimal(5,2),
RelationshipsSubscore decimal(5,2),
RepetitiveBehaviorSubscore decimal(5,2),
NeedForSamenessSubscore decimal(5,2),
SensorySenstivitySubscore decimal(5,2),
SensoryInterestsSubscore decimal(5,2),
RestrictedInterestsSubscore decimal(5,2),
CumulativeScore decimal(5,2)
);

CREATE TABLE autismsurvey.dbo.SurveyInformation (
UniqueId varchar(64),
CFQL2Selected varchar(1),
ASDQ2Selected varchar(1),
PhysicianFirstName varchar(64),
PhysicianLastName varchar(64),
RequesterEmail varchar(64),
RecicipientEmail varchar(64)
);
