/* istanbul ignore file -- justification: this is simply an enumeration; no testing needed */

const NEW_ENGAGEMENT_APPROVAL_WORKFLOW_STEPS = {
  dopsApproval: { id: 100047 },
  dopsFinalApproval: { id: 100053 },
  draft: { id: 100037 },
  ebpaApproval: { id: 100065 },
  engagementPartnerApproval: { id: 100041 },
  gmpApproval: { id: 100049 },
  industryGroupLeaderApproval: { id: 100043 },
  initiatorRework: { id: 100087 },
  internalAccountingApproval: { id: 100107 },
  internalAccountingForeignDataEntry: { id: 100120 },
  officeTaxDirectorApproval: { id: 100057 },
  pmfaPumApproval: { id: 100063 },
  pmiaPartnerApproval: { id: 100067 },
  pmtPartnerApproval: { id: 100111 },
  pumApproval: { id: 100061 },
  relationshipPartnerApproval: { id: 100039 },
  relationshipPartnerFinalApproval: { id: 100051 },
  secApproval: { id: 100045 },
  taxColleagueApproval: { id: 100055 },
  taxDirectorApproval: { id: 100059 }
};

export default Object.freeze(NEW_ENGAGEMENT_APPROVAL_WORKFLOW_STEPS);
