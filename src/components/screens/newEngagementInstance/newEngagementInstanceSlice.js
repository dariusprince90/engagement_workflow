import { createSlice } from '@reduxjs/toolkit';

import NEW_ENGAGEMENT_INSTANCE_VIEWS from '../../../helpers/enums/newEngagementInstanceViews';
import SORT_DIRECTION from '../../../helpers/enums/sortDirection';
import VIEW_STATUSES from '../../../helpers/enums/viewStatuses';

import PmArray from '../../../helpers/customTypes/PmArray';

// **********************************************************************
// * constants

/**
 * The name of the slice (to be used in the slice and thunks).
 */
export const SLICE_NAME = 'newEngagementInstance';

export const JOB_SETUP_VIEW_PREFIX = 'jobSetup_';

// **********************************************************************
// * functions

/**
 * Gets the default object that is used for all lookups.
 * @returns The default lookup object.
 */
const getDefaultLookupObject = () => {
  return {
    data: [],
    isLoading: false,
    hasError: false,
    error: null
  };
};

/**
 * Gets the default object that is used for each job setup view.
 * @returns The default job setup view object.
 */
const getDefaultJobSetupViewObject = () => {
  return {
    sections: {
      jobSetup: {
        id: 'job-setup-section',
        label: 'Job Setup',
        title: 'Job Setup',
        status: VIEW_STATUSES.normal
      },

      jobRoles: {
        id: 'job-roles-section',
        label: 'Job Roles',
        title: 'Job Roles',
        status: VIEW_STATUSES.normal
      },

      billingSchedule: {
        id: 'billing-schedule-section',
        label: 'Billing Schedule',
        title: 'Billing Schedule',
        status: VIEW_STATUSES.normal
      }
    },

    formData: {
      // properties originating from the API resource
      id: null,
      etag: null,
      natureOfServiceId: null,
      jobHierarchyId: null,
      billToClientNumber: '',
      jobName: '',
      jobNameYear: '',
      forPeriodEndedDate: null,
      additionalCustomCharacters: '',
      clientEntityId: '',
      entityLegalName: '',
      entityShortName: '',
      expectedFees: '',
      expectedRealization: '',
      expectedJobBudgetHours: '',
      isApprovingEngagementPartner: '',
      descriptionOfNonAttestServices: '',
      descriptionOfOtherAttestationEngagement: '',
      isBusinessCoveringTheCost: '',
      areAnySpecialReturnsNeeded: '',
      hasMoreThanThreeForms5472: '',
      hasMoreThanFiveBankAccountsForFinCen114: '',
      willReturnsBePreparedForFivePlusStateLocal: '',
      billingScheduleId: null,
      newBillingScheduleId: null,

      // additional properties needed on the form (not in the API resource)
      jobTypeDisplayName: '',
      billToClientDisplayName: '',
      jobRoleId: '',
      jobRoleStaffId: '',
      jobRoleAllowablePartnerRoleAssignmentId: '',
      jobRoleStaffDisplayName: ''
    },

    lookups: {
      // client search results
      clients: getDefaultLookupObject(),

      // job roles for this jir
      jobRoles: getDefaultLookupObject(),

      // job role staff search results
      jobRoleStaff: getDefaultLookupObject(),

      // cached collection of allowable partner role assignments that came back from search results
      allowablePartnerRoleAssignments: []
    },

    metadata: {
      isLoading: false,
      hasError: false,
      error: null,

      // metadata for billing schedules (for this jir)
      billingSchedules: {
        haveBeenLoaded: false,
        isLoading: false,
        hasError: false,
        error: null
      }
    }
  };
};

// **********************************************************************
// * thunks

// ! see newEngagementInstanceThunks.js for all thunks

// **********************************************************************
// * initial state

const initialState = {
  newEngagementInstance: {
    // properties of the nei
    newEngagementInstanceId: null,
    etag: null,
    isCompleted: null,
    isDeleted: null,
    isTerminated: null,
    isAttest: null,
    isNewClient: null,

    // additional properties
    currentUserTask: null,

    metadata: {
      isLoading: false,
      hasError: false,
      error: null
    }
  },

  lookups: {
    // lookup data
    attachmentTypes: getDefaultLookupObject(),
    clientSearchTypes: getDefaultLookupObject(),
    clientTaxTypes: getDefaultLookupObject(),
    countries: getDefaultLookupObject(),
    incompatibleNaturesOfServices: getDefaultLookupObject(),
    industryHierarchies: getDefaultLookupObject(),
    internationalHeadquarterCountries: getDefaultLookupObject(),
    jobCategoryRoles: getDefaultLookupObject(),
    jobHierarchies: getDefaultLookupObject(),
    jobRoles: getDefaultLookupObject(),
    marketSectors: getDefaultLookupObject(),
    months: getDefaultLookupObject(),
    natureOfServiceJobHierarchyMaps: getDefaultLookupObject(),
    naturesOfServices: getDefaultLookupObject(),
    ownershipTypes: getDefaultLookupObject(),
    prefixes: getDefaultLookupObject(),
    regionHierarchies: getDefaultLookupObject(),
    subjectToSecOrGaoRules: getDefaultLookupObject(),
    suffixes: getDefaultLookupObject(),
    taxTypes: getDefaultLookupObject(),
    workflowSteps: getDefaultLookupObject(),

    // nei-specific data collections
    attachmentInfoResponses: getDefaultLookupObject(),
    billingSchedules: getDefaultLookupObject(),
    clientEntities: getDefaultLookupObject(),
    newBillingSchedules: getDefaultLookupObject(),
    userTasks: getDefaultLookupObject(),

    metadata: {
      lookupsAreLoaded: false
    }
  },

  views: {
    currentViewId: NEW_ENGAGEMENT_INSTANCE_VIEWS.selectClient.viewId,

    [NEW_ENGAGEMENT_INSTANCE_VIEWS.additionalInformation.viewId]: {
      formData: {
        // properties originating from the API resource
        id: null,
        relatedToExistingClient: '',
        parentClientNumber: '',
        opportunityComments: '',
        externalReferralSourceDiscussedEthics: '',
        externalReferralSourceDiscussedEthicsComments: '',
        awareOfPotentialConcerns: '',
        awareOfPotentialConcernsComments: '',

        // additional properties needed on the form (not in the API resource)
        parentClientDisplayName: ''
      },

      lookups: {
        // client search results
        clients: getDefaultLookupObject()
      },

      metadata: {
        isLoading: false,
        hasError: false,
        error: null
      }
    },

    [NEW_ENGAGEMENT_INSTANCE_VIEWS.aicpa.viewId]: {
      formData: {
        // properties originating from the API resource
        id: null,
        roleInCreatingSourceDocumentsForTransactions: '',
        roleInCreatingSourceDocumentsForTransactionsComments: '',
        roleInAppraisalValuation: '',
        roleInAppraisalValuationComments: '',
        roleInCustodyOfClientAssets: '',
        roleInCustodyOfClientAssetsComments: '',
        abilityToAuthorizeTransactionsOnBehalf: '',
        abilityToAuthorizeTransactionsOnBehalfComments: '',
        roleInMonitoringAffectingExecutionOfTransactions: '',
        roleInMonitoringAffectingExecutionOfTransactionsComments: '',
        roleInOngoingComplianceOrQualityControl: '',
        roleInOngoingComplianceOrQualityControlComments: '',
        roleInDesigningFinancialInfoSystemsOrControls: '',
        roleInDesigningFinancialInfoSystemsOrControlsComments: '',
        roleInDesignOfSignificantModificationsToInfoSystems: '',
        roleInDesignOfSignificantModificationsToInfoSystemsComments: '',
        roleInDecisionMakingOrOperations: '',
        roleInDecisionMakingOrOperationsComments: '',
        roleAsPromoterOfClientFinancingTransactions: '',
        roleAsPromoterOfClientFinancingTransactionsComments: '',
        creationOfMutualInterestWithClient: '',
        creationOfMutualInterestWithClientComments: '',
        engagementImpairsIndependence: '',
        engagementImpairsIndependenceComments: ''
      },

      metadata: {
        isLoading: false,
        hasError: false,
        error: null
      }
    },

    [NEW_ENGAGEMENT_INSTANCE_VIEWS.billingScheduleSummary.viewId]: {
      // billing schedule summary properties
    },

    [NEW_ENGAGEMENT_INSTANCE_VIEWS.clientContactDetails.viewId]: {
      // client's contact details properties
    },

    [NEW_ENGAGEMENT_INSTANCE_VIEWS.clientContacts.viewId]: {
      lookups: {
        clientContacts: getDefaultLookupObject()
      },

      metadata: {
        isLoading: false,
        hasError: false,
        error: null
      }
    },

    [NEW_ENGAGEMENT_INSTANCE_VIEWS.clientInformation.viewId]: {
      formData: {
        // properties originating from the API resource
        id: null,
        clientTaxTypeId: '',
        firstName: '',
        middleName: '',
        lastName: '',
        suffixId: '',
        clientName: '',
        ownershipTypeId: '',
        schedulingBillerStaffNumber: '',
        internationalHeadquarterCountryReferenceId: '',
        isCommunityTaxPractice: '',
        isGovernmentContractor: '',

        // additional properties needed on the form (not in the API resource)
        schedulingBillerDisplayName: ''
      },

      lookups: {
        // scheduling biller search results
        schedulingBillers: getDefaultLookupObject()
      },

      metadata: {
        isLoading: false,
        hasError: false,
        error: null
      }
    },

    [NEW_ENGAGEMENT_INSTANCE_VIEWS.engagementInformation.viewId]: {
      formData: {
        // properties originating from the API resource
        id: null,
        isNewClientSecRegistrant: '',
        tickerSymbol: '',
        doSituationsApply: '',
        engagementIncludesAuditOfSecFilings: '',
        engagementIncludesAuditOfEmployeeBenefitPlan: '',
        auditedFinancialStatementsIncludedIn11K: '',
        subjectToSecOrGaoRuleId: '',
        engagementIncludesAuditOfFinancialInstitution: '',
        prospectiveFinancialStatementsToBeIssued: '',
        performedPreviousTaxWork: '',
        pmCurrentlyProvidesAttest: '',
        relatedEntityComments: '',
        mustComplyWithSecDueToRegulation: '',
        relatedAttestPartnerStaffNumber: '',
        relevantComments: '',
        preparedFederalTaxReturnLastYear: '',
        taxColleagueStaffNumber: '',
        taxYearEndMonth: ''
      },

      metadata: {
        isLoading: false,
        hasError: false,
        error: null
      }
    },

    [NEW_ENGAGEMENT_INSTANCE_VIEWS.finalApproval.viewId]: {
      formData: {
        potentialConflictsIdentified: '',
        potentialConflictsIdentifiedComments: '',
        conclusionOnWhetherConflictExists: '',
        noConflictComments: '',
        conflictResolutionComments: '',
        finalApprovalComments: '',
        predecessorInfoExperiencedDisagreementsWithAccounting: '',
        predecessorInfoExperiencedDisagreementsWithNature: '',
        predecessorInfoExperiencedDisagreementsWithReport: '',
        predecessorInfoExperiencedDisagreementsWithConditions: '',
        predecessorInfoExperiencedDisagreementsComments: '',
        predecessorInfoHadDisagreementsWithFees: '',
        predecessorInfoHadDisagreementsWithFeesComments: '',
        predecessorInfoMattersDoSuggestClientLacksEthics: '',
        predecessorInfoMattersDoSuggestClientLacksEthicsComments: '',
        predecessorInfoMattersDoIndicateFraud: '',
        predecessorInfoMattersDoIndicateFraudComments: '',
        predecessorInfoHasIssuedCommunications: '',
        predecessorInfoHasIssuedCommunicationsComments: '',
        predecessorInfoHasRefusedReview: '',
        predecessorInfoHasRefusedReviewComments: '',
        predecessorInfoUnderstoodReasonForEngagingComments: '',
        predecessorInfoStatedReasonForEngagingComments: '',
        predecessorInfoDidIndicateResponseWasLimited: '',
        predecessorInfoDidIndicateResponseWasLimitedComments: ''
      },

      metadata: {
        isLoading: false,
        hasError: false,
        error: null
      }
    },

    [NEW_ENGAGEMENT_INSTANCE_VIEWS.gao.viewId]: {
      formData: {
        // properties for independence analysis section originating from the API resource
        descriptionOfNonAttestServices: '',
        roleInCreatingSourceDocumentsForTransactions: '',
        roleInCreatingSourceDocumentsForTransactionsComments: '',
        roleInCreatingGeneralLedger: '',
        roleInCreatingGeneralLedgerComments: '',
        roleInAppraisalValuation: '',
        roleInAppraisalValuationComments: '',
        roleInCustodyOrControlOfClientAssets: '',
        roleInCustodyOrControlOfClientAssetsComments: '',
        abilityToAuthorizeTransactions: '',
        abilityToAuthorizeTransactionsComments: '',
        roleInTransactionMonitoringOrControl: '',
        roleInTransactionMonitoringOrControlComments: '',
        roleInOngoingComplianceOrQualityControl: '',
        roleInOngoingComplianceOrQualityControlComments: '',
        roleInDesigningClientAccountingFunctions: '',
        roleInDesigningClientAccountingFunctionsComments: '',
        roleInDesigningClientInfoSystems: '',
        roleInDesigningClientInfoSystemsComments: '',
        roleInDecisionMakingOrOperations: '',
        roleInDecisionMakingOrOperationsComments: '',
        roleAsPromoterOfClientFinancingTransactions: '',
        roleAsPromoterOfClientFinancingTransactionsComments: '',
        creationOfMutualInterest: '',
        creationOfMutualInterestComments: '',
        roleInForensicAccountingInSupportOfLitigation: '',
        roleInForensicAccountingInSupportOfLitigationComments: '',
        descriptionOfClientSkillsAndExperience: '',
        significantThreatToIndependence: '',
        significantThreatToIndependenceComments: '',
        significantThreatToIndependenceSafeguards: '',
        safeguardsAdequatelyAddressThreats: '',

        // properties for conclusion section originating from the API resource
        willImpairIndependence: '',
        basisForConclusion: '',
        projectRequiresMoreThan40Hours: '',
        projectRequiresMoreThan40HoursComments: '',
        projectInvolvesMoreThanRoutineAdvice: '',
        subjectMatterOfNonAttestIsRelated: ''
      },

      metadata: {
        isLoading: false,
        hasError: false,
        error: null
      }
    },

    [NEW_ENGAGEMENT_INSTANCE_VIEWS.industryRisk.viewId]: {
      formData: {
        // properties originating from the API resource
        governmentalRecurringSignificant: '',
        governmentalRecurringSignificantComments: '',
        governmentalDifficultPoliticalEnvironment: '',
        governmentalDifficultPoliticalEnvironmentComments: '',
        ebpaPlanHasHighLevelOfComplaints: '',
        ebpaPlanHasHighLevelOfComplaintsComments: '',
        ebpaUnderIrsOrDolReviewInPastYear: '',
        ebpaUnderIrsOrDolReviewInPastYearComments: '',
        ebpaAwareOfIntentNotToCorrectComplianceIssues: '',
        ebpaAwareOfIntentNotToCorrectComplianceIssuesComments: '',
        ebpaPastInstancesOfNonComplianceCorrected: '',
        ebpaPastInstancesOfNonComplianceCorrectedComments: '',
        ebpaPlanHoldsCompanyStockNotPubliclyTraded: '',
        ebpaAppraisalComments: '',
        ebpaIsEsopLeveraged: '',
        ebpaIsEsopLeveragedComments: '',
        ebpaRecentMergerServiceProviderChangeAudit: '',
        ebpaRecentMergerServiceProviderChangeAuditComments: '',
        constructionCashFlowInsufficient: '',
        constructionCashFlowInsufficientComments: '',
        constructionBacklogSufficient: '',
        constructionBacklogSufficientComments: '',
        constructionInadequateCostSystemOrLargeChangeOrders: '',
        constructionInadequateCostSystemOrLargeChangeOrdersComments: '',
        k12RecurringSignificantFindingsNotCorrected: '',
        k12RecurringSignificantFindingsNotCorrectedComments: '',
        k12DifficultPoliticalEnvironment: '',
        k12DifficultPoliticalEnvironmentComments: '',
        realEstateImpairmentInMarketValue: '',
        realEstateImpairmentInMarketValueComments: ''
      },

      metadata: {
        isLoading: false,
        hasError: false,
        error: null
      }
    },

    [NEW_ENGAGEMENT_INSTANCE_VIEWS.knowledgeOfClient.viewId]: {
      formData: {
        // All Clients properties originating from the API resource
        creditLimit: '',
        inBankruptcyOrConsideringFiling: '',
        engagementInvolvesLitigationSupport: '',
        completedConflictCheck: '',
        involvePerformingServicesOutsideOfArea: '',
        statesInvolved: '',
        knowledgeOfClientComments: '',
        isClientInternationallyActive: '',
        internationallyActiveClientCountryName: '',

        // New Clients properties originating from the API resource
        isBackgroundCheckOptional: '',
        otherAccountantsPreviouslyWorked: '',
        financialStatementsExist: '',
        explanationForNoFinancialStatements: '',
        explanationOfTotalAssetsForClient: '',
        explanationOfTotalEquityForClient: '',
        explanationOfPast2YearsRevenue: '',
        explanationOfPast2YearsIncome: '',

        // Conflict Assessment properties originating from the API resource
        potentialConflictsExist: '',
        potentialConflictComments: '',
        requestDopsReview: ''
      },

      metadata: {
        isLoading: false,
        hasError: false,
        error: null
      }
    },

    [NEW_ENGAGEMENT_INSTANCE_VIEWS.natureOfService.viewId]: {
      // nature of service view properties
    },

    [NEW_ENGAGEMENT_INSTANCE_VIEWS.riskAssessment.viewId]: {
      formData: {
        // risk assessment attest
        usedInCapitalRaising: '',
        usedInCapitalRaisingComments: '',
        usedInSignificantTransactions: '',
        usedInSignificantTransactionsComments: '',
        newClientsInFinancialDifficulty: '',
        newClientsInFinancialDifficultyComments: '',
        mustAcquireSpecialExpertise: '',
        mustAcquireSpecialExpertiseComments: '',
        changeInExecutiveManagement: '',
        changeInExecutiveManagementComments: '',
        changeInFinancialManagement: '',
        changeInFinancialManagementComments: '',
        changeInLegalCouncil: '',
        changeInLegalCouncilComments: '',
        legalActionsArePending: '',
        legalActionsArePendingComments: '',
        significantManagementDisputesExist: '',
        significantManagementDisputesExistComments: '',
        independenceMayBeQuestioned: '',
        independenceMayBeQuestionedComments: '',
        potentialConflictOfInterestWithExistingClient: '',
        potentialConflictOfInterestWithExistingClientComments: '',
        involvedInBusinessFailures: '',
        involvedInBusinessFailuresComments: '',
        involvedInFraud: '',
        involvedInFraudComments: '',
        entityInvolvedInFraud: '',
        entityInvolvedInFraudComments: '',
        isEntityInternationallyActive: '',
        requiresOtherFirmsInvolvement: '',
        requiresOtherFirmsInvolvementComments: '',
        concernInWithRequiredCommunications: '',
        concernInWithRequiredCommunicationsComments: '',
        inAccordanceWithFinancialFramework: '',
        inAccordanceWithFinancialFrameworkComments: '',
        anticipatedAssuranceEngagementRiskRating: '',
        understandingOfRiskImpactComments: '',

        // risk assessment non-attest
        anyQuestionAboutCollectibility: '',
        potentialForAdversarialPosition: '',
        potentialForAdversarialPositionComments: '',
        concernAboutIntegrityOfManagement: '',
        concernAboutIntegrityOfManagementComments: '',
        inconsistentWithFirmsFocus: '',
        inconsistentWithFirmsFocusComments: '',
        mustAcquireSpecialKnowledge: '',
        mustAcquireSpecialKnowledgeComments: '',
        expectationsAppearUnreasonable: '',
        expectationsAppearUnreasonableComments: '',
        partneringWithOutsideConsultant: '',
        partneringWithOutsideConsultantComments: '',
        mayCreateAdversarialPosition: '',
        mayCreateAdversarialPositionComments: '',
        consultantAppearsToNeedStaff: '',
        consultantAppearsToNeedStaffComments: '',
        firmWillHaveInsufficientControl: '',
        firmWillHaveInsufficientControlComments: '',
        isEntityInternationallyActiveComments: ''
      },

      metadata: {
        isLoading: false,
        hasError: false,
        error: null
      }
    },

    [NEW_ENGAGEMENT_INSTANCE_VIEWS.sec.viewId]: {
      formData: {
        // properties originating from the API resource
        id: null,
        mattersSubjectToScrutinyOrTestingInOtherServices: '',
        mattersSubjectToScrutinyOrTestingInOtherServicesComments: '',
        roleInDeterminingAmountsInFinancialReporting: '',
        roleInDeterminingAmountsInFinancialReportingComments: '',
        roleInCustodyOfAssets: '',
        roleInCustodyOfAssetsComments: '',
        abilityToAuthorizeTransactions: '',
        abilityToAuthorizeTransactionsComments: '',
        roleInDesignOfFinancialInfoSystems: '',
        roleInDesignOfFinancialInfoSystemsComments: '',
        roleInOperatingFinancialSystems: '',
        roleInOperatingFinancialSystemsComments: '',
        roleInOperatingDecisions: '',
        roleInOperatingDecisionsComments: '',
        roleInManagementFunctions: '',
        roleInManagementFunctionsComments: '',
        roleInClientStaffing: '',
        roleInClientStaffingComments: '',
        advocateInRegulatoryProceedings: '',
        advocateInRegulatoryProceedingsComments: '',
        creationOfMutualInterest: '',
        creationOfMutualInterestComments: '',
        taxServicesToPersonInOversightRole: '',
        taxServicesToPersonInOversightRoleComments: '',
        involvementComparedToSecLimitations: ''
      },

      metadata: {
        isLoading: false,
        hasError: false,
        error: null
      }
    },

    [NEW_ENGAGEMENT_INSTANCE_VIEWS.selectClient.viewId]: {
      formData: {
        // properties originating from the API resource
        id: null,
        etag: null,
        crmSyncId: null,
        crmGuid: null,
        clientNumber: '',
        clientName: '',
        industryHierarchyId: '',
        marketSectorId: '',
        taxTypeId: '',
        taxPayerIdentificationNumberMasked: '',
        relationshipPartnerStaffNumber: '',
        clientSearchTypeId: '',

        // additional properties needed on the form (not in the API resource)
        clientOrgCrmGuid: '',
        clientContactCrmGuid: '',
        industryName: '',
        verticalName: '',
        tinCountry: '',
        taxPayerIdentificationNumber: '',
        clientDisplayName: '',
        relationshipPartnerDisplayName: ''
      },

      lookups: {
        // client search results
        clients: getDefaultLookupObject(),

        // staff search results
        staff: getDefaultLookupObject()
      },

      metadata: {
        isLoading: false,
        hasError: false,
        error: null
      }
    },

    [NEW_ENGAGEMENT_INSTANCE_VIEWS.supplementalRisk.viewId]: {
      sections: {
        prospectiveFinancialStatementSupplemental: {
          id: 'prosp-fin-stmt-supp-section',
          label: 'Prospective Financial Statement Supplemental Section',
          title: 'Prospective Financial Statement Supplemental Section',
          status: VIEW_STATUSES.normal
        },

        financialServicesSupplementalRisk: {
          id: 'fin-srv-sup-risk-section',
          label: 'Financial Services Supplemental Risk',
          title: 'Financial Services Supplemental Risk',
          status: VIEW_STATUSES.normal
        },

        secSupplementalRisk: {
          id: 'sec-sup-risk-section',
          label: 'SEC Supplemental Risk',
          title: 'SEC Supplemental Risk',
          status: VIEW_STATUSES.normal
        }
      },

      formData: {
        // properties originating from the API resource
        id: null,
        fsStatsTotalAssets: '',
        fsStatsLoans: '',
        fsStatsInvestments: '',
        fsStatsTotalEquity: '',
        fsStatsCamelRating: '',
        fsStatsCapitalRatio: '',
        fsStatsRoa: '',
        fsStatsRoe: '',
        fsStatsNumberOfShareholders: '',
        fsStatsPercentageOfStockOwned: '',
        fsOtherEvaluationOfExperienceWithBoard: '',
        fsOtherEvaluationOfExperienceWithManagement: '',
        fsOtherEvaluationOfRegulatoryIssues: '',
        fsOtherEvaluationOfImpactConsiderations: '',
        fsOtherEvaluationOfOtherSignificantMatters: '',
        pfsFeesEvaluationOfResponsibleForPaying: '',
        pfsFeesCollectabilityIsQuestionable: '',
        pfsFeesObtainingRetainerWasConsidered: '',
        pfsFirmEvaluationOfAbilityToProvideService: '',
        pfsClientAreContinuingAccountants: '',
        pfsClientAreContinuingAccountantsComments: '',
        pfsClientHasContactedReferralSources: '',
        pfsClientIdentifiedConcerns: '',
        pfsClientEvaluationOfFinancialStrengthOfPrincipalParties: '',
        pfsClientEvaluationOfConsideringNatureOfIndustry: '',
        pfsClientEvaluationOfConsideringCompanysHistory: '',
        pfsClientEvaluationOfConsideringNewVentures: '',
        pfsClientEvaluationOfLengthOfPeriodCovered: '',
        pfsEngagementEvaluationOfIntendedUse: '',
        pfsEngagementEvaluationOfCapitalRaisingActivities: '',
        pfsEngagementHasPlannedPublicOffering: '',
        pfsEngagementHasPlannedPrivateOffering: '',
        pfsEngagementPrivateOfferingIsLimited: '',
        pfsEngagementEvaluationOfOtherProfessionalsInvolved: '',
        pfsEngagementHasInsufficientAssets: '',
        pfsEngagementEvaluationOfEconomicSubstance: '',
        pfsEngagementIsLimitedToInternalUse: '',
        secAttachmentsMayImpactAcceptance: '',
        secMarketCapitalization: '',
        secMarketPrices: '',
        secInsidersPercentage: '',
        secLastYearsAuditFees: '',
        secLastYearsOtherServicesFees: '',
        secEvaluationOfDiscussionNotesAboutOfficers: '',
        secAssuranceEngagementPartnerStaffNumber: '',
        secEvaluationOfAssuranceEngagementPartnerPublicCompanyAuditExperience: '',
        secEvaluationOfAssuranceEngagementPartnerExpertiseInClientIndustry: '',
        secAssuranceManagerStaffNumber: '',
        secEvaluationOfAssuranceManagerPublicCompanyAuditExperience: '',
        secEvaluationOfAssuranceManagerExpertiseInClientIndustry: '',
        secEvaluationOfLegalCounselsFirm: '',
        secEvaluationOfLegalCounselsPrimaryAttorney: '',
        secEvaluationOfCounselsExperience: '',
        secEvaluationOfNatureOfCapitalRaise: '',
        secEvaluationOfQualityAssessment: '',
        secEvaluationOfClientsReputation: '',
        secQuestionAboutAbilityToProvideService: '',
        secQuestionAboutAbilityToProvideServiceComments: '',
        secUnderstandingOfSecIssuesComments: '',

        // additional properties needed on the form (not in the API resource)
        secAssuranceEngagementPartnerDisplayName: '',
        secAssuranceManagerDisplayName: ''
      },

      lookups: {
        // assurance engagement partner search results
        secAssuranceEngagementPartners: getDefaultLookupObject(),

        // assurance manager search results
        secAssuranceManagers: getDefaultLookupObject()
      },

      metadata: {
        isLoading: false,
        hasError: false,
        error: null
      }
    },

    [NEW_ENGAGEMENT_INSTANCE_VIEWS.taxRisk.viewId]: {
      formData: {
        // properties originating from the API resource
        id: null,
        etag: null,
        internationallyActive: '',
        internationalTaxTeamMember: '',
        requiresExpertiseOutsideOfCoreTeam: '',
        requiresExpertiseOutsideOfCoreTeamComments: '',
        significantAuditAdjustments: '',
        auditAdjustmentsIssueResolved: '',
        auditAdjustmentsImplicationsForCurrentYear: '',
        auditAdjustmentsImplicationsForCurrentYearComments: '',
        engagedInTaxLitigation: '',
        taxLitigationIssueResolved: '',
        taxLitigationImplicationsForCurrentYear: '',
        taxLitigationImplicationsForCurrentYearComments: '',
        hasUncertainTaxPositions: '',
        hasUncertainTaxPositionsComments: '',
        managementIntegrityConcerns: '',
        managementIntegrityConcernsComments: '',
        involvesPreparation: '',
        reviewedPriorYearReturn: '',
        reviewedPriorYearReturnComments: '',
        preliminaryRiskRating: ''
      },

      metadata: {
        isLoading: false,
        hasError: false,
        error: null
      }
    },

    [NEW_ENGAGEMENT_INSTANCE_VIEWS.workflowComments.viewId]: {
      workflowComments: [],
      isLoading: false,
      hasError: false,
      error: null
    },

    [NEW_ENGAGEMENT_INSTANCE_VIEWS.workflowHistory.viewId]: {
      lookups: {
        workflowStepRunLogs: getDefaultLookupObject()
      }
    }
  },

  // metadata for the ENTIRE screen
  // use these properties only when needed for the whole screen
  // e.g. if you need to lock the screen while loading all data, you can use the isLoading here
  // e.g. if an error occurs that prevents further usage of the screen (e.g. error loading the NEI from the API)
  //      then, use hasError/error here; which can then be used to lock up the screen and show a message
  metadata: {
    isLoading: false,
    loadingTasksTotal: 0,
    loadingTasksCompleted: 0,
    isSaving: false,
    savingMessage: '',
    toastInfo: { type: null, message: null },
    hasError: false,
    error: null
  }
};

// **********************************************************************
// * slice

const newEngagementInstanceSlice = createSlice({
  name: SLICE_NAME,
  initialState,

  reducers: {
    /**
     * Clears out all client details for an existing client.
     * @param {object} state - The redux state object.
     */
    existingClientDetailsCleared: (state) => {
      const viewId = NEW_ENGAGEMENT_INSTANCE_VIEWS.selectClient.viewId;
      state.views[viewId].formData.clientNumber = '';
      state.views[viewId].formData.clientName = '';
      state.views[viewId].formData.industryHierarchyId = '';
      state.views[viewId].formData.marketSectorId = '';
      state.views[viewId].formData.taxTypeId = '';
      state.views[viewId].formData.taxPayerIdentificationNumberMasked = '';
      state.views[viewId].formData.relationshipPartnerStaffNumber = '';
      state.views[viewId].formData.industryName = '';
      state.views[viewId].formData.verticalName = '';
      state.views[viewId].formData.tinCountry = '';
      state.views[viewId].formData.clientDisplayName = '';
      state.views[viewId].formData.relationshipPartnerDisplayName = '';
      state.views[viewId].formData.relationshipPartnerDisplayName = '';
    },

    /**
     * Increments the total loading task count by a given amount.
     * @param {object} state - The redux state object.
     * @param {object} action - The action that was dispatched.
     */
    incrementLoadingTasksTotal: (state, action) => {
      const incrementAmount = action.payload;
      state.metadata.loadingTasksTotal = state.metadata.loadingTasksTotal + incrementAmount;
    },

    /**
     * Creates a new job setup view object for a given jobInfoResponseId.
     * @param {object} state - The redux state object.
     * @param {object} action - The action that was dispatched.
     */
    jobSetupViewCreated: (state, action) => {
      const { jobInfoResponseId } = action.payload;
      const viewId = `${JOB_SETUP_VIEW_PREFIX}${jobInfoResponseId}`;
      state.views[viewId] = getDefaultJobSetupViewObject();
    },

    /**
     * Sets the state metadata isLoading to false.
     * @param {object} state - The redux state object.
     */
    loadExistingNewEngagementInstanceCompleted: (state) => {
      state.metadata.isLoading = false;
    },

    /**
     * Sets the state metadata isLoading to true.
     * @param {object} state - The redux state object.
     */
    loadExistingNewEngagementInstanceStarted: (state) => {
      state.metadata.isLoading = true;
    },

    /**
     * Sets the lookups metadata lookupsAreLoaded to true.
     * @param {object} state - The redux state object.
     */
    loadScreenLookupsCompleted: (state) => {
      state.lookups.metadata.lookupsAreLoaded = true;
    },

    /**
     * Clears the data for a given lookup.
     * @param {object} state - The redux state object.
     * @param {object} action - The action that was dispatched.
     */
    lookupItemDataCleared: (state, action) => {
      const { viewId, lookupName } = action.payload;
      state.views[viewId].lookups[lookupName].data = [];
    },

    /**
     * Sets newEngagementInstance.newEngagementInstanceId.
     * @param {object} state - The redux state object.
     * @param {object} action - The action that was dispatched.
     */
    newEngagementInstanceIdSet: (state, action) => {
      const newEngagementInstanceId = action.payload;
      state.newEngagementInstance.newEngagementInstanceId = newEngagementInstanceId;
    },

    /**
     * Sets state-level isSaving to false.
     * @param {object} state - The redux state object.
     */
    saveNewEngagementInstanceCompleted: (state) => {
      state.metadata.isSaving = false;
    },

    /**
     * Sets state-level metadata when saving a NEI fails.
     * @param {object} state - The redux state object
     * @param {object} action - The action that was dispatched.
     */
    saveNewEngagementInstanceFailed: (state, action) => {
      const { error } = action.payload;
      state.metadata.isSaving = false;
      state.metadata.hasError = true;
      state.metadata.error = error;
    },

    /**
     * Sets state-level isSaving to true.
     * @param {object} state - The redux state object.
     */
    saveNewEngagementInstanceStarted: (state) => {
      state.metadata.isSaving = true;
    },

    /**
     * Updates the current view id.
     * @param {object} state - The redux state object.
     * @param {object} action - The action that was dispatched.
     */
    viewChanged: (state, action) => {
      state.views.currentViewId = action.payload;
    },

    /**
     * Updates the form data for a view.
     * @summary Only the properties included within payload's formData will be applied to the view's form data.
     * @param {object} state - The redux state object.
     * @param {object} action - The action that was dispatched.
     */
    viewFormDataChanged: (state, action) => {
      const { viewId, formData } = action.payload;

      // get the formData keys (property names)
      const formDataKeys = Object.keys(formData);

      // for each formDataKey, update the view's matching formData property
      for (const propertyName of formDataKeys) {
        state.views[viewId].formData[propertyName] = formData[propertyName];
      }
    }
  },

  extraReducers: (builder) => {
    builder
      // **********************************************************************
      // * *** LOOKUPS ***

      // **********************************************************************
      // * fetchAttachmentTypes
      .addCase(`${SLICE_NAME}/lookups/fetchAttachmentTypes/pending`, (state) => {
        state.lookups.attachmentTypes.isLoading = true;
        state.lookups.attachmentTypes.hasError = false;
        state.lookups.attachmentTypes.error = null;
        state.lookups.attachmentTypes.data = [];
      })
      .addCase(`${SLICE_NAME}/lookups/fetchAttachmentTypes/fulfilled`, (state, action) => {
        const attachmentTypes = action.payload;
        state.lookups.attachmentTypes.isLoading = false;
        state.lookups.attachmentTypes.data = attachmentTypes;
        state.metadata.loadingTasksCompleted = state.metadata.loadingTasksCompleted + 1;
      })
      .addCase(`${SLICE_NAME}/lookups/fetchAttachmentTypes/rejected`, (state, action) => {
        const { payload, error } = action;
        state.lookups.attachmentTypes.isLoading = false;
        state.lookups.attachmentTypes.hasError = true;
        state.lookups.attachmentTypes.error = { ...(payload || error) };

        // cannot use the nei screen without this; set metadata error
        state.metadata.hasError = true;
        state.metadata.error = { ...(payload || error) };
        state.metadata.error.friendlyMessage = 'An error occurred fetching the attachment types!';
      })

      // **********************************************************************
      // * fetchClientEntities
      .addCase(`${SLICE_NAME}/lookups/fetchClientEntities/pending`, (state) => {
        state.lookups.clientEntities.isLoading = true;
        state.lookups.clientEntities.hasError = false;
        state.lookups.clientEntities.error = null;
        state.lookups.clientEntities.data = [];
      })
      .addCase(`${SLICE_NAME}/lookups/fetchClientEntities/fulfilled`, (state, action) => {
        const clientEntities = action.payload;
        state.lookups.clientEntities.isLoading = false;
        state.lookups.clientEntities.data = clientEntities;
      })
      .addCase(`${SLICE_NAME}/lookups/fetchClientEntities/rejected`, (state, action) => {
        const { payload, error } = action;
        state.lookups.clientEntities.isLoading = false;
        state.lookups.clientEntities.hasError = true;
        state.lookups.clientEntities.error = { ...(payload || error) };

        // cannot use the nei screen without this; set metadata error
        state.metadata.hasError = true;
        state.metadata.error = { ...(payload || error) };
        state.metadata.error.friendlyMessage = 'An error occurred fetching the client entities!';
      })

      // **********************************************************************
      // * fetchClientSearchTypes
      .addCase(`${SLICE_NAME}/lookups/fetchClientSearchTypes/pending`, (state) => {
        state.lookups.clientSearchTypes.isLoading = true;
        state.lookups.clientSearchTypes.hasError = false;
        state.lookups.clientSearchTypes.error = null;
        state.lookups.clientSearchTypes.data = [];
      })
      .addCase(`${SLICE_NAME}/lookups/fetchClientSearchTypes/fulfilled`, (state, action) => {
        const clientSearchTypes = action.payload;
        state.lookups.clientSearchTypes.isLoading = false;
        state.lookups.clientSearchTypes.data = clientSearchTypes;
        state.metadata.loadingTasksCompleted = state.metadata.loadingTasksCompleted + 1;
      })
      .addCase(`${SLICE_NAME}/lookups/fetchClientSearchTypes/rejected`, (state, action) => {
        const { payload, error } = action;
        state.lookups.clientSearchTypes.isLoading = false;
        state.lookups.clientSearchTypes.hasError = true;
        state.lookups.clientSearchTypes.error = { ...(payload || error) };

        // cannot use the nei screen without this; set metadata error
        state.metadata.hasError = true;
        state.metadata.error = { ...(payload || error) };
        state.metadata.error.friendlyMessage = 'An error occurred fetching the client search types!';
      })

      // **********************************************************************
      // * fetchClientTaxTypes
      .addCase(`${SLICE_NAME}/lookups/fetchClientTaxTypes/pending`, (state) => {
        state.lookups.clientTaxTypes.isLoading = true;
        state.lookups.clientTaxTypes.hasError = false;
        state.lookups.clientTaxTypes.error = null;
        state.lookups.clientTaxTypes.data = [];
      })
      .addCase(`${SLICE_NAME}/lookups/fetchClientTaxTypes/fulfilled`, (state, action) => {
        const clientTaxTypes = action.payload;
        state.lookups.clientTaxTypes.isLoading = false;
        state.lookups.clientTaxTypes.data = clientTaxTypes;
        state.metadata.loadingTasksCompleted = state.metadata.loadingTasksCompleted + 1;
      })
      .addCase(`${SLICE_NAME}/lookups/fetchClientTaxTypes/rejected`, (state, action) => {
        const { payload, error } = action;
        state.lookups.clientTaxTypes.isLoading = false;
        state.lookups.clientTaxTypes.hasError = true;
        state.lookups.clientTaxTypes.error = { ...(payload || error) };

        // cannot use the nei screen without this; set metadata error
        state.metadata.hasError = true;
        state.metadata.error = { ...(payload || error) };
        state.metadata.error.friendlyMessage = 'An error occurred fetching the client tax types!';
      })

      // **********************************************************************
      // * fetchCountries
      .addCase(`${SLICE_NAME}/lookups/fetchCountries/pending`, (state) => {
        state.lookups.countries.isLoading = true;
        state.lookups.countries.hasError = false;
        state.lookups.countries.error = null;
        state.lookups.countries.data = [];
      })
      .addCase(`${SLICE_NAME}/lookups/fetchCountries/fulfilled`, (state, action) => {
        const fetchCountries = action.payload;
        state.lookups.countries.isLoading = false;
        state.lookups.countries.data = fetchCountries;
        state.metadata.loadingTasksCompleted = state.metadata.loadingTasksCompleted + 1;
      })
      .addCase(`${SLICE_NAME}/lookups/fetchCountries/rejected`, (state, action) => {
        const { payload, error } = action;
        state.lookups.countries.isLoading = false;
        state.lookups.countries.hasError = true;
        state.lookups.countries.error = { ...(payload || error) };

        // cannot use the nei screen without this; set metadata error
        state.metadata.hasError = true;
        state.metadata.error = { ...(payload || error) };
        state.metadata.error.friendlyMessage = 'An error occurred fetching the countries!';
      })

      // **********************************************************************
      // * fetchIncompatibleNaturesOfServices
      .addCase(`${SLICE_NAME}/lookups/fetchIncompatibleNaturesOfServices/pending`, (state) => {
        state.lookups.incompatibleNaturesOfServices.isLoading = true;
        state.lookups.incompatibleNaturesOfServices.hasError = false;
        state.lookups.incompatibleNaturesOfServices.error = null;
        state.lookups.incompatibleNaturesOfServices.data = [];
      })
      .addCase(`${SLICE_NAME}/lookups/fetchIncompatibleNaturesOfServices/fulfilled`, (state, action) => {
        const incompatibleNaturesOfServices = action.payload;
        state.lookups.incompatibleNaturesOfServices.isLoading = false;
        state.lookups.incompatibleNaturesOfServices.data = incompatibleNaturesOfServices;
        state.metadata.loadingTasksCompleted = state.metadata.loadingTasksCompleted + 1;
      })
      .addCase(`${SLICE_NAME}/lookups/fetchIncompatibleNaturesOfServices/rejected`, (state, action) => {
        const { payload, error } = action;
        state.lookups.incompatibleNaturesOfServices.isLoading = false;
        state.lookups.incompatibleNaturesOfServices.hasError = true;
        state.lookups.incompatibleNaturesOfServices.error = { ...(payload || error) };

        // cannot use the nei screen without this; set metadata error
        state.metadata.hasError = true;
        state.metadata.error = { ...(payload || error) };
        state.metadata.error.friendlyMessage = 'An error occurred fetching the incompatible natures of services!';
      })

      // **********************************************************************
      // * fetchIndustryHierarchies
      .addCase(`${SLICE_NAME}/lookups/fetchIndustryHierarchies/pending`, (state) => {
        state.lookups.industryHierarchies.isLoading = true;
        state.lookups.industryHierarchies.hasError = false;
        state.lookups.industryHierarchies.error = null;
        state.lookups.industryHierarchies.data = [];
      })
      .addCase(`${SLICE_NAME}/lookups/fetchIndustryHierarchies/fulfilled`, (state, action) => {
        const industryHierarchies = action.payload;
        state.lookups.industryHierarchies.isLoading = false;
        state.lookups.industryHierarchies.data = industryHierarchies;
        state.metadata.loadingTasksCompleted = state.metadata.loadingTasksCompleted + 1;
      })
      .addCase(`${SLICE_NAME}/lookups/fetchIndustryHierarchies/rejected`, (state, action) => {
        const { payload, error } = action;
        state.lookups.industryHierarchies.isLoading = false;
        state.lookups.industryHierarchies.hasError = true;
        state.lookups.industryHierarchies.error = { ...(payload || error) };

        // cannot use the nei screen without this; set metadata error
        state.metadata.hasError = true;
        state.metadata.error = { ...(payload || error) };
        state.metadata.error.friendlyMessage = 'An error occurred fetching the industry hierarchies!';
      })

      // **********************************************************************
      // * fetchInternationalHeadquarterCountries
      .addCase(`${SLICE_NAME}/lookups/fetchInternationalHeadquarterCountries/pending`, (state) => {
        state.lookups.internationalHeadquarterCountries.isLoading = true;
        state.lookups.internationalHeadquarterCountries.hasError = false;
        state.lookups.internationalHeadquarterCountries.error = null;
        state.lookups.internationalHeadquarterCountries.data = [];
      })
      .addCase(`${SLICE_NAME}/lookups/fetchInternationalHeadquarterCountries/fulfilled`, (state, action) => {
        const internationalHeadquarterCountries = action.payload;
        state.lookups.internationalHeadquarterCountries.isLoading = false;
        state.lookups.internationalHeadquarterCountries.data = internationalHeadquarterCountries;
        state.metadata.loadingTasksCompleted = state.metadata.loadingTasksCompleted + 1;
      })
      .addCase(`${SLICE_NAME}/lookups/fetchInternationalHeadquarterCountries/rejected`, (state, action) => {
        const { payload, error } = action;
        state.lookups.internationalHeadquarterCountries.isLoading = false;
        state.lookups.internationalHeadquarterCountries.hasError = true;
        state.lookups.internationalHeadquarterCountries.error = { ...(payload || error) };

        // cannot use the nei screen without this; set metadata error
        state.metadata.hasError = true;
        state.metadata.error = { ...(payload || error) };
        state.metadata.error.friendlyMessage = 'An error occurred fetching the international headquarter countries!';
      })

      // **********************************************************************
      // * fetchJobCategoryRoles
      .addCase(`${SLICE_NAME}/lookups/fetchJobCategoryRoles/pending`, (state) => {
        state.lookups.jobCategoryRoles.isLoading = true;
        state.lookups.jobCategoryRoles.hasError = false;
        state.lookups.jobCategoryRoles.error = null;
        state.lookups.jobCategoryRoles.data = [];
      })
      .addCase(`${SLICE_NAME}/lookups/fetchJobCategoryRoles/fulfilled`, (state, action) => {
        const jobRoles = action.payload;
        state.lookups.jobCategoryRoles.isLoading = false;
        state.lookups.jobCategoryRoles.data = jobRoles;
        state.metadata.loadingTasksCompleted = state.metadata.loadingTasksCompleted + 1;
      })
      .addCase(`${SLICE_NAME}/lookups/fetchJobCategoryRoles/rejected`, (state, action) => {
        const { payload, error } = action;
        state.lookups.jobCategoryRoles.isLoading = false;
        state.lookups.jobCategoryRoles.hasError = true;
        state.lookups.jobCategoryRoles.error = { ...(payload || error) };

        // cannot use the nei screen without this; set metadata error
        state.metadata.hasError = true;
        state.metadata.error = { ...(payload || error) };
        state.metadata.error.friendlyMessage = 'An error occurred fetching the job category roles!';
      })

      // **********************************************************************
      // * fetchJobHierarchies
      .addCase(`${SLICE_NAME}/lookups/fetchJobHierarchies/pending`, (state) => {
        state.lookups.jobHierarchies.isLoading = true;
        state.lookups.jobHierarchies.hasError = false;
        state.lookups.jobHierarchies.error = null;
        state.lookups.jobHierarchies.data = [];
      })
      .addCase(`${SLICE_NAME}/lookups/fetchJobHierarchies/fulfilled`, (state, action) => {
        const jobRoles = action.payload;
        state.lookups.jobHierarchies.isLoading = false;
        state.lookups.jobHierarchies.data = jobRoles;
        state.metadata.loadingTasksCompleted = state.metadata.loadingTasksCompleted + 1;
      })
      .addCase(`${SLICE_NAME}/lookups/fetchJobHierarchies/rejected`, (state, action) => {
        const { payload, error } = action;
        state.lookups.jobHierarchies.isLoading = false;
        state.lookups.jobHierarchies.hasError = true;
        state.lookups.jobHierarchies.error = { ...(payload || error) };

        // cannot use the nei screen without this; set metadata error
        state.metadata.hasError = true;
        state.metadata.error = { ...(payload || error) };
        state.metadata.error.friendlyMessage = 'An error occurred fetching the job hierarchies!';
      })

      // **********************************************************************
      // * fetchJobRoles
      .addCase(`${SLICE_NAME}/lookups/fetchJobRoles/pending`, (state) => {
        state.lookups.jobRoles.isLoading = true;
        state.lookups.jobRoles.hasError = false;
        state.lookups.jobRoles.error = null;
        state.lookups.jobRoles.data = [];
      })
      .addCase(`${SLICE_NAME}/lookups/fetchJobRoles/fulfilled`, (state, action) => {
        const jobRoles = action.payload;
        state.lookups.jobRoles.isLoading = false;
        state.lookups.jobRoles.data = jobRoles;
        state.metadata.loadingTasksCompleted = state.metadata.loadingTasksCompleted + 1;
      })
      .addCase(`${SLICE_NAME}/lookups/fetchJobRoles/rejected`, (state, action) => {
        const { payload, error } = action;
        state.lookups.jobRoles.isLoading = false;
        state.lookups.jobRoles.hasError = true;
        state.lookups.jobRoles.error = { ...(payload || error) };

        // cannot use the nei screen without this; set metadata error
        state.metadata.hasError = true;
        state.metadata.error = { ...(payload || error) };
        state.metadata.error.friendlyMessage = 'An error occurred fetching the job roles!';
      })

      // **********************************************************************
      // * fetchMarketSectors
      .addCase(`${SLICE_NAME}/lookups/fetchMarketSectors/pending`, (state) => {
        state.lookups.marketSectors.isLoading = true;
        state.lookups.marketSectors.hasError = false;
        state.lookups.marketSectors.error = null;
        state.lookups.marketSectors.data = [];
      })
      .addCase(`${SLICE_NAME}/lookups/fetchMarketSectors/fulfilled`, (state, action) => {
        const marketSectors = action.payload;
        state.lookups.marketSectors.isLoading = false;
        state.lookups.marketSectors.data = marketSectors;
        state.metadata.loadingTasksCompleted = state.metadata.loadingTasksCompleted + 1;
      })
      .addCase(`${SLICE_NAME}/lookups/fetchMarketSectors/rejected`, (state, action) => {
        const { payload, error } = action;
        state.lookups.marketSectors.isLoading = false;
        state.lookups.marketSectors.hasError = true;
        state.lookups.marketSectors.error = { ...(payload || error) };

        // cannot use the nei screen without this; set metadata error
        state.metadata.hasError = true;
        state.metadata.error = { ...(payload || error) };
        state.metadata.error.friendlyMessage = 'An error occurred fetching the market sectors!';
      })

      // **********************************************************************
      // * fetchMonths
      .addCase(`${SLICE_NAME}/lookups/fetchMonths/pending`, (state) => {
        state.lookups.months.isLoading = true;
        state.lookups.months.hasError = false;
        state.lookups.months.error = null;
        state.lookups.months.data = [];
      })
      .addCase(`${SLICE_NAME}/lookups/fetchMonths/fulfilled`, (state, action) => {
        const months = action.payload;
        state.lookups.months.isLoading = false;
        state.lookups.months.data = months;
        state.metadata.loadingTasksCompleted = state.metadata.loadingTasksCompleted + 1;
      })
      .addCase(`${SLICE_NAME}/lookups/fetchMonths/rejected`, (state, action) => {
        const { payload, error } = action;
        state.lookups.months.isLoading = false;
        state.lookups.months.hasError = true;
        state.lookups.months.error = { ...(payload || error) };

        // cannot use the nei screen without this; set metadata error
        state.metadata.hasError = true;
        state.metadata.error = { ...(payload || error) };
        state.metadata.error.friendlyMessage = 'An error occurred fetching the months!';
      })

      // **********************************************************************
      // * fetchNatureOfServiceJobHierarchyMaps
      .addCase(`${SLICE_NAME}/lookups/fetchNatureOfServiceJobHierarchyMaps/pending`, (state) => {
        state.lookups.natureOfServiceJobHierarchyMaps.isLoading = true;
        state.lookups.natureOfServiceJobHierarchyMaps.hasError = false;
        state.lookups.natureOfServiceJobHierarchyMaps.error = null;
        state.lookups.natureOfServiceJobHierarchyMaps.data = [];
      })
      .addCase(`${SLICE_NAME}/lookups/fetchNatureOfServiceJobHierarchyMaps/fulfilled`, (state, action) => {
        const natureOfServiceJobHierarchyMaps = action.payload;
        state.lookups.natureOfServiceJobHierarchyMaps.isLoading = false;
        state.lookups.natureOfServiceJobHierarchyMaps.data = natureOfServiceJobHierarchyMaps;
        state.metadata.loadingTasksCompleted = state.metadata.loadingTasksCompleted + 1;
      })
      .addCase(`${SLICE_NAME}/lookups/fetchNatureOfServiceJobHierarchyMaps/rejected`, (state, action) => {
        const { payload, error } = action;
        state.lookups.natureOfServiceJobHierarchyMaps.isLoading = false;
        state.lookups.natureOfServiceJobHierarchyMaps.hasError = true;
        state.lookups.natureOfServiceJobHierarchyMaps.error = { ...(payload || error) };

        // cannot use the nei screen without this; set metadata error
        state.metadata.hasError = true;
        state.metadata.error = { ...(payload || error) };
        state.metadata.error.friendlyMessage = 'An error occurred fetching the nature of service / job hierarchy maps!';
      })

      // **********************************************************************
      // * fetchNaturesOfServices
      .addCase(`${SLICE_NAME}/lookups/fetchNaturesOfServices/pending`, (state) => {
        state.lookups.naturesOfServices.isLoading = true;
        state.lookups.naturesOfServices.hasError = false;
        state.lookups.naturesOfServices.error = null;
        state.lookups.naturesOfServices.data = [];
      })
      .addCase(`${SLICE_NAME}/lookups/fetchNaturesOfServices/fulfilled`, (state, action) => {
        const naturesOfServices = action.payload;
        state.lookups.naturesOfServices.isLoading = false;
        state.lookups.naturesOfServices.data = naturesOfServices;
        state.metadata.loadingTasksCompleted = state.metadata.loadingTasksCompleted + 1;
      })
      .addCase(`${SLICE_NAME}/lookups/fetchNaturesOfServices/rejected`, (state, action) => {
        const { payload, error } = action;
        state.lookups.naturesOfServices.isLoading = false;
        state.lookups.naturesOfServices.hasError = true;
        state.lookups.naturesOfServices.error = { ...(payload || error) };

        // cannot use the nei screen without this; set metadata error
        state.metadata.hasError = true;
        state.metadata.error = { ...(payload || error) };
        state.metadata.error.friendlyMessage = 'An error occurred fetching the natures of services!';
      })

      // **********************************************************************
      // * fetchOwnershipTypes
      .addCase(`${SLICE_NAME}/lookups/fetchOwnershipTypes/pending`, (state) => {
        state.lookups.ownershipTypes.isLoading = true;
        state.lookups.ownershipTypes.hasError = false;
        state.lookups.ownershipTypes.error = null;
        state.lookups.ownershipTypes.data = [];
      })
      .addCase(`${SLICE_NAME}/lookups/fetchOwnershipTypes/fulfilled`, (state, action) => {
        const ownershipTypes = action.payload;
        state.lookups.ownershipTypes.isLoading = false;
        state.lookups.ownershipTypes.data = ownershipTypes;
        state.metadata.loadingTasksCompleted = state.metadata.loadingTasksCompleted + 1;
      })
      .addCase(`${SLICE_NAME}/lookups/fetchOwnershipTypes/rejected`, (state, action) => {
        const { payload, error } = action;
        state.lookups.ownershipTypes.isLoading = false;
        state.lookups.ownershipTypes.hasError = true;
        state.lookups.ownershipTypes.error = { ...(payload || error) };

        // cannot use the nei screen without this; set metadata error
        state.metadata.hasError = true;
        state.metadata.error = { ...(payload || error) };
        state.metadata.error.friendlyMessage = 'An error occurred fetching the ownership types!';
      })

      // **********************************************************************
      // * fetchRegionHierarchies
      .addCase(`${SLICE_NAME}/lookups/fetchRegionHierarchies/pending`, (state) => {
        state.lookups.regionHierarchies.isLoading = true;
        state.lookups.regionHierarchies.hasError = false;
        state.lookups.regionHierarchies.error = null;
        state.lookups.regionHierarchies.data = [];
      })
      .addCase(`${SLICE_NAME}/lookups/fetchRegionHierarchies/fulfilled`, (state, action) => {
        const ownershipTypes = action.payload;
        state.lookups.regionHierarchies.isLoading = false;
        state.lookups.regionHierarchies.data = ownershipTypes;
        state.metadata.loadingTasksCompleted = state.metadata.loadingTasksCompleted + 1;
      })
      .addCase(`${SLICE_NAME}/lookups/fetchRegionHierarchies/rejected`, (state, action) => {
        const { payload, error } = action;
        state.lookups.regionHierarchies.isLoading = false;
        state.lookups.regionHierarchies.hasError = true;
        state.lookups.regionHierarchies.error = { ...(payload || error) };

        // cannot use the nei screen without this; set metadata error
        state.metadata.hasError = true;
        state.metadata.error = { ...(payload || error) };
        state.metadata.error.friendlyMessage = 'An error occurred fetching the region hierarchies!';
      })

      // **********************************************************************
      // * fetchSubjectToSecOrGaoRules
      .addCase(`${SLICE_NAME}/lookups/fetchSubjectToSecOrGaoRules/pending`, (state) => {
        state.lookups.subjectToSecOrGaoRules.isLoading = true;
        state.lookups.subjectToSecOrGaoRules.hasError = false;
        state.lookups.subjectToSecOrGaoRules.error = null;
        state.lookups.subjectToSecOrGaoRules.data = [];
      })
      .addCase(`${SLICE_NAME}/lookups/fetchSubjectToSecOrGaoRules/fulfilled`, (state, action) => {
        const subjectToSecOrGaoRules = action.payload;
        state.lookups.subjectToSecOrGaoRules.isLoading = false;
        state.lookups.subjectToSecOrGaoRules.data = subjectToSecOrGaoRules;
        state.metadata.loadingTasksCompleted = state.metadata.loadingTasksCompleted + 1;
      })
      .addCase(`${SLICE_NAME}/lookups/fetchSubjectToSecOrGaoRules/rejected`, (state, action) => {
        const { payload, error } = action;
        state.lookups.subjectToSecOrGaoRules.isLoading = false;
        state.lookups.subjectToSecOrGaoRules.hasError = true;
        state.lookups.subjectToSecOrGaoRules.error = { ...(payload || error) };

        // cannot use the nei screen without this; set metadata error
        state.metadata.hasError = true;
        state.metadata.error = { ...(payload || error) };
        state.metadata.error.friendlyMessage = 'An error occurred fetching the subjectToSecOrGaoRules!';
      })

      // **********************************************************************
      // * fetchSuffixes
      .addCase(`${SLICE_NAME}/lookups/fetchSuffixes/pending`, (state) => {
        state.lookups.suffixes.isLoading = true;
        state.lookups.suffixes.hasError = false;
        state.lookups.suffixes.error = null;
        state.lookups.suffixes.data = [];
      })
      .addCase(`${SLICE_NAME}/lookups/fetchSuffixes/fulfilled`, (state, action) => {
        const suffixes = action.payload;
        state.lookups.suffixes.isLoading = false;
        state.lookups.suffixes.data = suffixes;
        state.metadata.loadingTasksCompleted = state.metadata.loadingTasksCompleted + 1;
      })
      .addCase(`${SLICE_NAME}/lookups/fetchSuffixes/rejected`, (state, action) => {
        const { payload, error } = action;
        state.lookups.suffixes.isLoading = false;
        state.lookups.suffixes.hasError = true;
        state.lookups.suffixes.error = { ...(payload || error) };

        // cannot use the nei screen without this; set metadata error
        state.metadata.hasError = true;
        state.metadata.error = { ...(payload || error) };
        state.metadata.error.friendlyMessage = 'An error occurred fetching the suffixes!';
      })

      // **********************************************************************
      // * fetchTaxTypes
      .addCase(`${SLICE_NAME}/lookups/fetchTaxTypes/pending`, (state) => {
        state.lookups.taxTypes.isLoading = true;
        state.lookups.taxTypes.hasError = false;
        state.lookups.taxTypes.error = null;
        state.lookups.taxTypes.data = [];
      })
      .addCase(`${SLICE_NAME}/lookups/fetchTaxTypes/fulfilled`, (state, action) => {
        const taxTypes = action.payload;
        state.lookups.taxTypes.isLoading = false;
        state.lookups.taxTypes.data = taxTypes;
        state.metadata.loadingTasksCompleted = state.metadata.loadingTasksCompleted + 1;
      })
      .addCase(`${SLICE_NAME}/lookups/fetchTaxTypes/rejected`, (state, action) => {
        const { payload, error } = action;
        state.lookups.taxTypes.isLoading = false;
        state.lookups.taxTypes.hasError = true;
        state.lookups.taxTypes.error = { ...(payload || error) };

        // cannot use the nei screen without this; set metadata error
        state.metadata.hasError = true;
        state.metadata.error = { ...(payload || error) };
        state.metadata.error.friendlyMessage = 'An error occurred fetching the tax types!';
      })

      // **********************************************************************
      // * fetchWorkflowSteps
      .addCase(`${SLICE_NAME}/lookups/fetchWorkflowSteps/pending`, (state) => {
        state.lookups.workflowSteps.isLoading = true;
        state.lookups.workflowSteps.hasError = false;
        state.lookups.workflowSteps.error = null;
        state.lookups.workflowSteps.data = [];
      })
      .addCase(`${SLICE_NAME}/lookups/fetchWorkflowSteps/fulfilled`, (state, action) => {
        const workflowSteps = action.payload;
        state.lookups.workflowSteps.isLoading = false;
        state.lookups.workflowSteps.data = workflowSteps;
        state.metadata.loadingTasksCompleted = state.metadata.loadingTasksCompleted + 1;
      })
      .addCase(`${SLICE_NAME}/lookups/fetchWorkflowSteps/rejected`, (state, action) => {
        const { payload, error } = action;
        state.lookups.workflowSteps.isLoading = false;
        state.lookups.workflowSteps.hasError = true;
        state.lookups.workflowSteps.error = payload || error;

        // cannot use the nei screen without this; set metadata error
        state.metadata.hasError = true;
        state.metadata.error = { ...(payload || error) };
        state.metadata.error.friendlyMessage = 'An error occurred fetching the workflow steps!';
      })

      // **********************************************************************
      // * searchAllowablePartnerRoleAssignments
      .addCase(`${SLICE_NAME}/lookups/searchAllowablePartnerRoleAssignments/pending`, (state, action) => {
        const { viewId, lookupName } = action.meta.arg;
        state.views[viewId].lookups[lookupName].isLoading = true;
        state.views[viewId].lookups[lookupName].hasError = false;
        state.views[viewId].lookups[lookupName].error = null;
        state.views[viewId].lookups[lookupName].data = [];
      })
      .addCase(`${SLICE_NAME}/lookups/searchAllowablePartnerRoleAssignments/fulfilled`, (state, action) => {
        const { viewId, lookupName } = action.meta.arg;
        const allowablePartnerRoleAssignments = action.payload;
        state.views[viewId].lookups[lookupName].isLoading = false;
        state.views[viewId].lookups[lookupName].data = allowablePartnerRoleAssignments;

        for (const roleAssignment of allowablePartnerRoleAssignments) {
          const existingItem = state.views[viewId].lookups.allowablePartnerRoleAssignments.find(
            (o) => o.id === roleAssignment.id
          );

          if (!existingItem) {
            state.views[viewId].lookups.allowablePartnerRoleAssignments.push(roleAssignment);
          }
        }
      })
      .addCase(`${SLICE_NAME}/lookups/searchAllowablePartnerRoleAssignments/rejected`, (state, action) => {
        const { meta, payload, error } = action;
        const { viewId, lookupName } = meta.arg;
        state.views[viewId].lookups[lookupName].isLoading = false;
        state.views[viewId].lookups[lookupName].hasError = true;
        state.views[viewId].lookups[lookupName].error = { ...(payload || error) };

        // cannot use the nei screen without this; set metadata error
        state.metadata.hasError = true;
        state.metadata.error = { ...(payload || error) };
        state.metadata.error.friendlyMessage = 'An error occurred searching for partners (allowable role assignments)!';
      })

      // **********************************************************************
      // * searchClients
      .addCase(`${SLICE_NAME}/lookups/searchClients/pending`, (state, action) => {
        const viewId = action.meta.arg.viewId;
        state.views[viewId].lookups.clients.isLoading = true;
        state.views[viewId].lookups.clients.hasError = false;
        state.views[viewId].lookups.clients.error = null;
        state.views[viewId].lookups.clients.data = [];
      })
      .addCase(`${SLICE_NAME}/lookups/searchClients/fulfilled`, (state, action) => {
        const viewId = action.meta.arg.viewId;
        const clients = action.payload;
        state.views[viewId].lookups.clients.isLoading = false;
        state.views[viewId].lookups.clients.data = clients;
      })
      .addCase(`${SLICE_NAME}/lookups/searchClients/rejected`, (state, action) => {
        const { meta, payload, error } = action;
        const viewId = meta.arg.viewId;
        state.views[viewId].lookups.clients.isLoading = false;
        state.views[viewId].lookups.clients.hasError = true;
        state.views[viewId].lookups.clients.error = { ...(payload || error) };

        // cannot use the nei screen without this; set metadata error
        state.metadata.hasError = true;
        state.metadata.error = { ...(payload || error) };
        state.metadata.error.friendlyMessage = 'An error occurred searching for clients!';
      })

      // **********************************************************************
      // * searchStaff
      .addCase(`${SLICE_NAME}/lookups/searchStaff/pending`, (state, action) => {
        const { viewId, lookupName } = action.meta.arg;
        state.views[viewId].lookups[lookupName].isLoading = true;
        state.views[viewId].lookups[lookupName].hasError = false;
        state.views[viewId].lookups[lookupName].error = null;
        state.views[viewId].lookups[lookupName].data = [];
      })
      .addCase(`${SLICE_NAME}/lookups/searchStaff/fulfilled`, (state, action) => {
        const { viewId, lookupName } = action.meta.arg;
        const staff = action.payload;
        state.views[viewId].lookups[lookupName].isLoading = false;
        state.views[viewId].lookups[lookupName].data = staff;
      })
      .addCase(`${SLICE_NAME}/lookups/searchStaff/rejected`, (state, action) => {
        const { meta, payload, error } = action;
        const { viewId, lookupName } = meta.arg;
        state.views[viewId].lookups[lookupName].isLoading = false;
        state.views[viewId].lookups[lookupName].hasError = true;
        state.views[viewId].lookups[lookupName].error = { ...(payload || error) };

        // cannot use the nei screen without this; set metadata error
        state.metadata.hasError = true;
        state.metadata.error = { ...(payload || error) };
        state.metadata.error.friendlyMessage = 'An error occurred searching for staff!';
      })

      // **********************************************************************
      // * *** SELECT A CLIENT / INITIAL SETUP ***

      // **********************************************************************
      // * fetchExistingClient
      .addCase(`${SLICE_NAME}/selectClient/fetchExistingClient/pending`, (state) => {
        const viewId = NEW_ENGAGEMENT_INSTANCE_VIEWS.selectClient.viewId;
        state.views[viewId].metadata.isLoading = true;
        state.views[viewId].metadata.hasError = false;
        state.views[viewId].metadata.error = null;
      })
      .addCase(`${SLICE_NAME}/selectClient/fetchExistingClient/fulfilled`, (state, action) => {
        const viewId = NEW_ENGAGEMENT_INSTANCE_VIEWS.selectClient.viewId;
        const { client, relationshipPartner } = action.payload;
        const taxType = state.lookups.taxTypes.data.find((tt) => tt.id === client.taxTypeId);
        const industryHierarchy = state.lookups.industryHierarchies.data.find(
          (ih) => ih.id === client.industryHierarchyId
        );

        state.views[viewId].metadata.isLoading = false;

        try {
          state.views[viewId].formData.tinCountry = taxType.countryHierarchyReferenceId;
          state.views[viewId].formData.taxTypeId = client.taxTypeId;
          state.views[viewId].formData.taxPayerIdentificationNumberMasked = client.taxIdentificationNumberMasked;
          state.views[viewId].formData.industryName = industryHierarchy.displayName;
          state.views[viewId].formData.verticalName = industryHierarchy.verticalName;
          state.views[viewId].formData.industryHierarchyId = client.industryHierarchyId;
          state.views[viewId].formData.marketSectorId = client.marketSectorId;
          state.views[viewId].formData.relationshipPartnerStaffNumber = client.relationshipPartnerStaffId;
          state.views[viewId].formData.relationshipPartnerDisplayName = relationshipPartner.preferredFullName;
        } catch (error) {
          // an existing client should always have all of the above properties set
          // if they do not, there is something wrong
          state.metadata.hasError = true;
          state.metadata.error = { message: error.message };
          state.metadata.error.friendlyMessage = 'An error occurred loading the existing client details!';
        }
      })
      .addCase(`${SLICE_NAME}/selectClient/fetchExistingClient/rejected`, (state, action) => {
        const viewId = NEW_ENGAGEMENT_INSTANCE_VIEWS.selectClient.viewId;
        const { payload, error } = action;
        state.views[viewId].metadata.isLoading = false;
        state.views[viewId].metadata.hasError = true;
        state.views[viewId].metadata.error = { ...(payload || error) };

        // cannot use the nei screen without this; set metadata error
        state.metadata.hasError = true;
        state.metadata.error = { ...(payload || error) };
        state.metadata.error.friendlyMessage = 'An error occurred loading the existing client details!';
      })

      // **********************************************************************
      // * *** NATURES OF SERVICE (add/remove jobs) ***

      // **********************************************************************
      // * createJobInfoResponse
      .addCase(`${SLICE_NAME}/neiData/createJobInfoResponse/pending`, (state) => {
        state.metadata.isSaving = true;
        state.metadata.savingMessage = 'Adding the new job...';
      })
      .addCase(`${SLICE_NAME}/neiData/createJobInfoResponse/fulfilled`, (state, action) => {
        const jobInfoResponse = action.payload;

        // create the id for the new view
        const viewId = `${JOB_SETUP_VIEW_PREFIX}${jobInfoResponse.id}`;

        // create a new view using the default job setup view object
        const view = getDefaultJobSetupViewObject();

        // for each property in the jobInfoResponse, if there is a matching property in formData
        // then assign the jobInfoResponse value to formData
        Object.keys(jobInfoResponse).forEach((propertyName) => {
          if (view.formData[propertyName] !== undefined) {
            view.formData[propertyName] = jobInfoResponse[propertyName] ?? '';
          }
        });

        // set the jobTypeDisplayName
        view.formData.jobTypeDisplayName = state.lookups.jobHierarchies.data.find(
          (jh) => jh.id === view.formData.jobHierarchyId
        ).level4Name;

        state.views[viewId] = view;

        state.metadata.isSaving = false;
        state.metadata.savingMessage = '';
        state.metadata.toastInfo = {
          ...state.metadata.toastInfo,
          type: 'success',
          message: 'Your job has been added!'
        };
      })
      .addCase(`${SLICE_NAME}/neiData/createJobInfoResponse/rejected`, (state, action) => {
        const { payload, error } = action;

        state.metadata.isSaving = false;
        state.metadata.savingMessage = '';

        const err = { ...(payload || error) };
        const friendlyMessage = 'An error occurred adding the job.';
        const errorMessage = `error: ${err.message}`;
        const traceIdMessage = !!err.traceId ? `trace-id: ${err.traceId}` : '';
        const message = `${friendlyMessage} ${errorMessage} ${traceIdMessage}`;
        state.metadata.toastInfo = { ...state.metadata.toastInfo, type: 'error', message };
      })

      // **********************************************************************
      // * deleteJobInfoResponse
      .addCase(`${SLICE_NAME}/neiData/deleteJobInfoResponse/pending`, (state, action) => {
        state.metadata.isSaving = true;
        state.metadata.savingMessage = 'Deleting the job...';
      })
      .addCase(`${SLICE_NAME}/neiData/deleteJobInfoResponse/fulfilled`, (state, action) => {
        const { viewId } = action.meta.arg;

        // remove the view for the deleted job info response
        delete state.views[viewId];

        state.metadata.isSaving = false;
        state.metadata.savingMessage = '';
        state.metadata.toastInfo = {
          ...state.metadata.toastInfo,
          type: 'success',
          message: 'The job has been deleted!'
        };
      })
      .addCase(`${SLICE_NAME}/neiData/deleteJobInfoResponse/rejected`, (state, action) => {
        const { meta, payload, error } = action;
        const { viewId } = meta.arg;

        state.views[viewId].metadata.hasError = true;
        state.views[viewId].metadata.error = {
          ...(payload || error),
          friendlyMessage: 'There was an error deleting the job!'
        };

        state.metadata.isSaving = false;
        state.metadata.savingMessage = '';

        const err = { ...(payload || error) };
        const friendlyMessage = 'An error occurred deleting the job.';
        const errorMessage = `error: ${err.message}`;
        const traceIdMessage = !!err.traceId ? `trace-id: ${err.traceId}` : '';
        const message = `${friendlyMessage} ${errorMessage} ${traceIdMessage}`;
        state.metadata.toastInfo = { ...state.metadata.toastInfo, type: 'error', message };
      })

      // **********************************************************************
      // * *** JOB SETUP ***

      // **********************************************************************
      // * createJobRole
      .addCase(`${SLICE_NAME}/neiData/createJobRole/pending`, (state) => {
        state.metadata.isSaving = true;
        state.metadata.savingMessage = 'Saving the job role...';
      })
      .addCase(`${SLICE_NAME}/neiData/createJobRole/fulfilled`, (state, action) => {
        const { viewId } = action.meta.arg;
        const jobRole = action.payload;

        state.views[viewId].lookups.jobRoles.data.push(jobRole);
        state.views[viewId].formData.jobRoleId = '';
        state.views[viewId].formData.jobRoleStaffId = '';
        state.views[viewId].formData.jobRoleStaffDisplayName = '';

        state.metadata.isSaving = false;
        state.metadata.savingMessage = '';
        state.metadata.toastInfo = {
          ...state.metadata.toastInfo,
          type: 'success',
          message: 'The job role has been created!'
        };
      })
      .addCase(`${SLICE_NAME}/neiData/createJobRole/rejected`, (state, action) => {
        const { meta, payload, error } = action;
        const { viewId } = meta.arg;

        state.views[viewId].lookups.jobRoles.hasError = true;
        state.views[viewId].lookups.jobRoles.error = {
          ...(payload || error),
          friendlyMessage: 'There was an error creating the job role!'
        };

        state.metadata.isSaving = false;
        state.metadata.savingMessage = '';
      })

      // **********************************************************************
      // * deleteJobRole
      .addCase(`${SLICE_NAME}/neiData/deleteJobRole/pending`, (state) => {
        state.metadata.isSaving = true;
        state.metadata.savingMessage = 'Deleting the job role...';
      })
      .addCase(`${SLICE_NAME}/neiData/deleteJobRole/fulfilled`, (state, action) => {
        const { viewId, jobRoleId } = action.meta.arg;

        const jobRoles = [...state.views[viewId].lookups.jobRoles.data];
        state.views[viewId].lookups.jobRoles.data = jobRoles.filter((jr) => jr.id !== jobRoleId);

        state.metadata.isSaving = false;
        state.metadata.savingMessage = '';
        state.metadata.toastInfo = {
          ...state.metadata.toastInfo,
          type: 'success',
          message: 'The job role has been deleted!'
        };
      })
      .addCase(`${SLICE_NAME}/neiData/deleteJobRole/rejected`, (state, action) => {
        const { meta, payload, error } = action;
        const { viewId } = meta.arg;

        state.views[viewId].lookups.jobRoles.hasError = true;
        state.views[viewId].lookups.jobRoles.error = {
          ...(payload || error),
          friendlyMessage: 'There was an error deleting the job role!'
        };

        state.metadata.isSaving = false;
        state.metadata.savingMessage = '';
      })

      // **********************************************************************
      // * fetchBillingSchedulesForJir
      .addCase(`${SLICE_NAME}/neiData/fetchBillingSchedulesForJir/pending`, (state, action) => {
        const { viewId } = action.meta.arg;
        state.views[viewId].metadata.billingSchedules.isLoading = true;
        state.views[viewId].metadata.billingSchedules.hasError = false;
        state.views[viewId].metadata.billingSchedules.error = null;
      })
      .addCase(`${SLICE_NAME}/neiData/fetchBillingSchedulesForJir/fulfilled`, (state, action) => {
        const { meta, payload } = action;
        const { viewId, jobInfoResponseId } = meta.arg;
        const { billingSchedules, newBillingSchedules } = payload;

        // add each billing schedule to lookups.billingSchedules (if not already in the collection)
        for (const billingSchedule of billingSchedules) {
          const existingBillingSchedule = state.lookups.billingSchedules.data.find(
            (bs) => bs.id === billingSchedule.id
          );

          if (existingBillingSchedule === undefined) {
            const bs = { ...billingSchedule, allowedJobInfoResponses: [jobInfoResponseId] };
            state.lookups.billingSchedules.data = [...state.lookups.billingSchedules.data, bs];
          } else {
            existingBillingSchedule.allowedJobInfoResponses.push(jobInfoResponseId);
          }
        }

        // add each new billing schedule to lookups.newBillingSchedules (if not already in the collection)
        for (const newBillingSchedule of newBillingSchedules) {
          const existingNewBillingSchedule = state.lookups.newBillingSchedules.data.find(
            (bs) => bs.id === newBillingSchedule.id
          );

          if (existingNewBillingSchedule === undefined) {
            const bs = { ...newBillingSchedule, allowedJobInfoResponses: [jobInfoResponseId] };
            state.lookups.newBillingSchedules.data = [...state.lookups.newBillingSchedules.data, bs];
          } else {
            existingNewBillingSchedule.allowedJobInfoResponses.push(jobInfoResponseId);
          }
        }

        state.views[viewId].metadata.billingSchedules.isLoading = false;
        state.views[viewId].metadata.billingSchedules.haveBeenLoaded = true;
      })
      .addCase(`${SLICE_NAME}/neiData/fetchBillingSchedulesForJir/rejected`, (state, action) => {
        const { meta, payload, error } = action;
        const { viewId } = meta.arg;

        state.views[viewId].metadata.billingSchedules.isLoading = false;
        state.views[viewId].metadata.billingSchedules.hasError = true;
        state.views[viewId].metadata.billingSchedules.error = payload || error;
      })

      // **********************************************************************
      // * *** LOAD NEW ENGAGEMENT INSTANCE DATA ***

      // **********************************************************************
      // * fetchAttachmentInfoResponsesForNei
      .addCase(`${SLICE_NAME}/lookups/fetchAttachmentInfoResponsesForNei/pending`, (state) => {
        state.lookups.attachmentInfoResponses.isLoading = true;
        state.lookups.attachmentInfoResponses.hasError = false;
        state.lookups.attachmentInfoResponses.error = null;
        state.lookups.attachmentInfoResponses.data = [];
      })
      .addCase(`${SLICE_NAME}/lookups/fetchAttachmentInfoResponsesForNei/fulfilled`, (state, action) => {
        const attachmentInfoResponses = action.payload;
        state.lookups.attachmentInfoResponses.isLoading = false;
        state.lookups.attachmentInfoResponses.data = attachmentInfoResponses;
        state.metadata.loadingTasksCompleted = state.metadata.loadingTasksCompleted + 1;
      })
      .addCase(`${SLICE_NAME}/lookups/fetchAttachmentInfoResponsesForNei/rejected`, (state, action) => {
        const { payload, error } = action;
        state.lookups.attachmentInfoResponses.isLoading = false;
        state.lookups.attachmentInfoResponses.hasError = true;
        state.lookups.attachmentInfoResponses.error = { ...(payload || error) };

        // cannot use the nei screen without this; set metadata error
        state.metadata.hasError = true;
        state.metadata.error = { ...(payload || error) };
        state.metadata.error.friendlyMessage = 'An error occurred loading the attachment info responses!';
      })

      // **********************************************************************
      // * fetchInitialSetupResponse
      .addCase(`${SLICE_NAME}/neiData/fetchInitialSetupResponseForNei/pending`, (state) => {
        const viewId = NEW_ENGAGEMENT_INSTANCE_VIEWS.selectClient.viewId;
        state.views[viewId].metadata.isLoading = true;
        state.views[viewId].metadata.hasError = false;
        state.views[viewId].metadata.error = null;
      })
      .addCase(`${SLICE_NAME}/neiData/fetchInitialSetupResponseForNei/fulfilled`, (state, action) => {
        const isr = action.payload;
        const viewId = NEW_ENGAGEMENT_INSTANCE_VIEWS.selectClient.viewId;
        const industryHierarchy = state.lookups.industryHierarchies.data.find(
          (ih) => ih.id === isr.industryHierarchyId
        );
        const taxType = state.lookups.taxTypes.data.find((tt) => tt.id === isr.taxTypeId);
        const formData = state.views[viewId].formData;

        // for each property in the jir, if there is a matching property in formData
        // then assign the jir value to formData
        Object.keys(isr).forEach((propertyName) => {
          if (formData[propertyName] !== undefined) {
            formData[propertyName] = isr[propertyName] ?? '';
          }
        });

        // assign the additional lookup values
        formData.industryName = industryHierarchy.displayName;
        formData.verticalName = industryHierarchy.verticalName;
        formData.tinCountry = taxType.countryHierarchyReferenceId;

        state.metadata.loadingTasksCompleted = state.metadata.loadingTasksCompleted + 1;
      })
      .addCase(`${SLICE_NAME}/neiData/fetchInitialSetupResponseForNei/rejected`, (state, action) => {
        const viewId = NEW_ENGAGEMENT_INSTANCE_VIEWS.selectClient.viewId;
        const { payload, error } = action;
        state.views[viewId].metadata.isLoading = false;
        state.views[viewId].metadata.hasError = true;
        state.views[viewId].metadata.error = { ...(payload || error) };

        // cannot use the nei screen without this; set metadata error
        state.metadata.hasError = true;
        state.metadata.error = { ...(payload || error) };
        state.metadata.error.friendlyMessage = 'An error occurred loading the initial setup response!';
      })

      // **********************************************************************
      // * fetchJobInfoResponsesForNei
      .addCase(`${SLICE_NAME}/neiData/fetchJobInfoResponsesForNei/pending`, (state) => {
        // nothing to do here
        // the views are created dynamically once loaded, so there is nothing to update at this time
      })
      .addCase(`${SLICE_NAME}/neiData/fetchJobInfoResponsesForNei/fulfilled`, (state, action) => {
        const jobInfoResponses = action.payload;

        jobInfoResponses.forEach((jir) => {
          const viewId = `${JOB_SETUP_VIEW_PREFIX}${jir.id}`;
          const formData = state.views[viewId].formData;

          // for each property in the jir, if there is a matching property in formData
          // then assign the jir value to formData
          Object.keys(jir).forEach((propertyName) => {
            if (formData[propertyName] !== undefined) {
              formData[propertyName] = jir[propertyName] ?? '';
            }
          });

          // set the jobTypeDisplayName
          if (!!formData.jobHierarchyId) {
            formData.jobTypeDisplayName = state.lookups.jobHierarchies.data.find(
              (jh) => jh.id === formData.jobHierarchyId
            ).level4Name;
          }
        });

        state.metadata.loadingTasksCompleted = state.metadata.loadingTasksCompleted + 1;
      })
      .addCase(`${SLICE_NAME}/neiData/fetchJobInfoResponsesForNei/rejected`, (state, action) => {
        const { payload, error } = action;

        // cannot use the nei screen without this; set metadata error
        state.metadata.hasError = true;
        state.metadata.error = { ...(payload || error) };
        state.metadata.error.friendlyMessage = 'An error occurred loading the job info response!';
      })

      // **********************************************************************
      // * fetchJobRolesForJobInfoResponse
      .addCase(`${SLICE_NAME}/neiData/fetchJobRolesForJobInfoResponse/pending`, (state, action) => {
        const jobInfoResponseId = action.meta.arg;
        const viewId = `${JOB_SETUP_VIEW_PREFIX}${jobInfoResponseId}`;
        state.views[viewId].lookups.jobRoles.isLoading = true;
        state.views[viewId].lookups.jobRoles.hasError = false;
        state.views[viewId].lookups.jobRoles.error = null;
      })
      .addCase(`${SLICE_NAME}/neiData/fetchJobRolesForJobInfoResponse/fulfilled`, (state, action) => {
        const jobInfoResponseId = action.meta.arg;
        const jobRoles = action.payload;
        const viewId = `${JOB_SETUP_VIEW_PREFIX}${jobInfoResponseId}`;
        state.views[viewId].lookups.jobRoles.isLoading = false;
        state.views[viewId].lookups.jobRoles.data = jobRoles;
      })
      .addCase(`${SLICE_NAME}/neiData/fetchJobRolesForJobInfoResponse/rejected`, (state, action) => {
        const { meta, payload, error } = action;
        const jobInfoResponseId = meta.arg;
        const viewId = `${JOB_SETUP_VIEW_PREFIX}${jobInfoResponseId}`;
        state.views[viewId].lookups.jobRoles.isLoading = false;
        state.views[viewId].lookups.jobRoles.hasError = true;
        state.views[viewId].lookups.jobRoles.error = { ...(payload || error) };

        // cannot use the nei screen without this; set metadata error
        state.metadata.hasError = true;
        state.metadata.error = { ...(payload || error) };
        state.metadata.error.friendlyMessage = 'An error occurred loading the roles for the job!';
      })

      // **********************************************************************
      // * fetchNewEngagementInstance
      .addCase(`${SLICE_NAME}/neiData/fetchNewEngagementInstance/pending`, (state) => {
        state.newEngagementInstance.metadata.isLoading = true;
        state.newEngagementInstance.metadata.hasError = false;
        state.newEngagementInstance.metadata.error = null;
      })
      .addCase(`${SLICE_NAME}/neiData/fetchNewEngagementInstance/fulfilled`, (state, action) => {
        const nei = action.payload;
        state.newEngagementInstance.etag = nei.etag;
        state.newEngagementInstance.isCompleted = nei.isCompleted;
        state.newEngagementInstance.isDeleted = nei.isDeleted;
        state.newEngagementInstance.isTerminated = nei.isTerminated;
        state.newEngagementInstance.isAttest = nei.isAttest;

        state.metadata.loadingTasksCompleted = state.metadata.loadingTasksCompleted + 1;
      })
      .addCase(`${SLICE_NAME}/neiData/fetchNewEngagementInstance/rejected`, (state, action) => {
        const { payload, error } = action;
        state.newEngagementInstance.metadata.isLoading = false;
        state.newEngagementInstance.metadata.hasError = true;
        state.newEngagementInstance.metadata.error = { ...(payload || error) };

        // cannot use the nei screen without this; set metadata error
        state.metadata.hasError = true;
        state.metadata.error = { ...(payload || error) };
        state.metadata.error.friendlyMessage = 'An error occurred loading the new engagement instance!';
      })

      // **********************************************************************
      // * fetchTaxRiskResponseForNei
      .addCase(`${SLICE_NAME}/neiData/fetchTaxRiskResponseForNei/pending`, (state) => {
        const viewId = NEW_ENGAGEMENT_INSTANCE_VIEWS.taxRisk.viewId;
        state.views[viewId].metadata.isLoading = true;
        state.views[viewId].metadata.hasError = false;
        state.views[viewId].metadata.error = null;
      })
      .addCase(`${SLICE_NAME}/neiData/fetchTaxRiskResponseForNei/fulfilled`, (state, action) => {
        const taxRiskResponse = action.payload;
        const viewId = NEW_ENGAGEMENT_INSTANCE_VIEWS.taxRisk.viewId;
        const formData = state.views[viewId].formData;

        // for each property in the taxRiskResponse, if there is a matching property in formData
        // then assign the taxRiskResponse value to formData
        Object.keys(taxRiskResponse).forEach((propertyName) => {
          if (formData[propertyName] !== undefined) {
            formData[propertyName] = taxRiskResponse[propertyName] ?? '';
          }
        });

        state.views[viewId].metadata.isLoading = false;
        state.metadata.loadingTasksCompleted = state.metadata.loadingTasksCompleted + 1;
      })
      .addCase(`${SLICE_NAME}/neiData/fetchTaxRiskResponseForNei/rejected`, (state, action) => {
        const viewId = NEW_ENGAGEMENT_INSTANCE_VIEWS.taxRisk.viewId;
        const { payload, error } = action;
        state.views[viewId].metadata.isLoading = false;
        state.views[viewId].metadata.hasError = true;
        state.views[viewId].metadata.error = { ...(payload || error) };

        // cannot use the nei screen without this; set metadata error
        state.metadata.hasError = true;
        state.metadata.error = { ...(payload || error) };
        state.metadata.error.friendlyMessage = 'An error occurred loading the tax risk response!';
      })

      // **********************************************************************
      // * *** LOAD NEW ENGAGEMENT INSTANCE WORKFLOW DATA ***

      // **********************************************************************
      // * fetchUserTasks
      .addCase(`${SLICE_NAME}/neiWorkflowData/fetchUserTasks/pending`, (state) => {
        state.lookups.userTasks.isLoading = true;
        state.lookups.userTasks.hasError = false;
        state.lookups.userTasks.error = null;
        state.lookups.userTasks.data = [];
        state.newEngagementInstance.currentUserTask = [];
      })
      .addCase(`${SLICE_NAME}/neiWorkflowData/fetchUserTasks/fulfilled`, (state, action) => {
        const { currentUserTask, userTasks } = action.payload;
        state.lookups.userTasks.isLoading = false;
        state.lookups.userTasks.data = userTasks;
        state.newEngagementInstance.currentUserTask = currentUserTask;
        state.metadata.loadingTasksCompleted = state.metadata.loadingTasksCompleted + 1;
      })
      .addCase(`${SLICE_NAME}/neiWorkflowData/fetchUserTasks/rejected`, (state, action) => {
        const { payload, error } = action;
        state.lookups.userTasks.isLoading = false;
        state.lookups.userTasks.hasError = true;
        state.lookups.userTasks.error = { ...(payload || error) };

        // cannot use the nei screen without this; set metadata error
        state.metadata.hasError = true;
        state.metadata.error = { ...(payload || error) };
        state.metadata.error.friendlyMessage = 'An error occurred fetching the user tasks!';
      })

      // **********************************************************************
      // * fetchWorkflowStepRunLogs
      .addCase(`${SLICE_NAME}/neiWorkflowData/fetchWorkflowStepRunLogs/pending`, (state) => {
        const viewId = NEW_ENGAGEMENT_INSTANCE_VIEWS.workflowHistory.viewId;
        state.views[viewId].lookups.workflowStepRunLogs.isLoading = true;
        state.views[viewId].lookups.workflowStepRunLogs.hasError = false;
        state.views[viewId].lookups.workflowStepRunLogs.error = null;
        state.views[viewId].lookups.workflowStepRunLogs.data = [];
      })
      .addCase(`${SLICE_NAME}/neiWorkflowData/fetchWorkflowStepRunLogs/fulfilled`, (state, action) => {
        const workflowStepRunLogs = action.payload;
        const viewId = NEW_ENGAGEMENT_INSTANCE_VIEWS.workflowHistory.viewId;
        state.views[viewId].lookups.workflowStepRunLogs.isLoading = false;
        state.views[viewId].lookups.workflowStepRunLogs.data = workflowStepRunLogs;
        state.metadata.loadingTasksCompleted = state.metadata.loadingTasksCompleted + 1;
      })
      .addCase(`${SLICE_NAME}/neiWorkflowData/fetchWorkflowStepRunLogs/rejected`, (state, action) => {
        const { payload, error } = action;
        const viewId = NEW_ENGAGEMENT_INSTANCE_VIEWS.workflowHistory.viewId;
        state.views[viewId].lookups.workflowStepRunLogs.isLoading = false;
        state.views[viewId].lookups.workflowStepRunLogs.hasError = true;
        state.views[viewId].lookups.workflowStepRunLogs.error = { ...(payload || error) };

        // cannot use the nei screen without this; set metadata error
        state.metadata.hasError = true;
        state.metadata.error = { ...(payload || error) };
        state.metadata.error.friendlyMessage = 'An error occurred fetching the workflow step run logs!';
      });
  }
});

// **********************************************************************
// * actions

export const {
  existingClientDetailsCleared,
  incrementLoadingTasksTotal,
  jobSetupViewCreated,
  loadExistingNewEngagementInstanceCompleted,
  loadExistingNewEngagementInstanceStarted,
  loadScreenLookupsCompleted,
  lookupItemDataCleared,
  newEngagementInstanceIdSet,
  saveNewEngagementInstanceCompleted,
  saveNewEngagementInstanceFailed,
  saveNewEngagementInstanceStarted,
  viewChanged,
  viewFormDataChanged
} = newEngagementInstanceSlice.actions;

// **********************************************************************
// * selectors

// selects the billing schedules that are allowed to be mapped to a job info response
export const selectBillingSchedulesForJir = (state, jobInfoResponseId) => {
  const billingSchedules = state.newEngagementInstance.lookups.billingSchedules.data.filter((bs) =>
    bs.allowedJobInfoResponses.includes(jobInfoResponseId)
  );

  const newBillingSchedules = state.newEngagementInstance.lookups.newBillingSchedules.data.filter((bs) =>
    bs.allowedJobInfoResponses.includes(jobInfoResponseId)
  );

  return { billingSchedules, newBillingSchedules };
};

// selects a specific client entity
export const selectClientEntity = (state, clientEntityId) => {
  clientEntityId = parseInt(clientEntityId);
  if (isNaN(clientEntityId)) {
    return null;
  }

  return state.newEngagementInstance.lookups.clientEntities.data.find((ce) => ce.id === clientEntityId);
};

// selects the view object (from state.views) which represents the current view
export const selectCurrentView = (state) => {
  const views = state.newEngagementInstance.views;
  const currentViewId = views.currentViewId;
  return views[currentViewId];
};

// selects the current view id (from state.views)
export const selectCurrentViewId = (state) => state.newEngagementInstance.views.currentViewId;

// select the current workflow step id
export const selectCurrentWorkflowStepId = (state) => {
  const viewId = NEW_ENGAGEMENT_INSTANCE_VIEWS.workflowHistory.viewId;
  const workflowStepRunLogs = state.newEngagementInstance.views[viewId].lookups.workflowStepRunLogs.data;

  if (workflowStepRunLogs.length === 0) {
    return null;
  }

  const currentRunLog = new PmArray(...workflowStepRunLogs).sortObjects(
    'stepStartDateTime',
    SORT_DIRECTION.descending.abbreviation
  )[0];

  return currentRunLog.workflowStepId;
};

// select any job hierarchy ids that are not allowed to be used on this nei
export const selectDisallowedJobHierarchyIds = (state) => {
  // get the nature of service ids tied to all job info responses for this nei
  const natureOfServiceIds = Object.entries(state.newEngagementInstance.views)
    .filter(([key]) => key.startsWith(JOB_SETUP_VIEW_PREFIX))
    .map(([, value]) => ({ ...value.formData }))
    .map((jir) => jir.natureOfServiceId);

  // get the incompatible nos ids based on our nos ids
  const incompatibleNatureOfServiceIds = state.newEngagementInstance.lookups.incompatibleNaturesOfServices.data
    .filter((i) => natureOfServiceIds.includes(i.natureOfServiceId1))
    .map((i) => i.natureOfServiceId2);

  // get the job hierarchy ids based on the incompatible nos ids
  const disallowedJobHierarchyIds = state.newEngagementInstance.lookups.natureOfServiceJobHierarchyMaps.data
    .filter((m) => incompatibleNatureOfServiceIds.includes(m.natureOfServiceId))
    .map((m) => m.jobHierarchyId);

  return disallowedJobHierarchyIds;
};

// selects a specific job hierarchy
export const selectJobHierarchy = (state, jobHierarchyId) =>
  state.newEngagementInstance.lookups.jobHierarchies.data.find((jh) => jh.id === jobHierarchyId);

// selects the job info responses mapped to a billing schedule
export const selectJobInfoResponsesMappedToBillingSchedule = (state, billingScheduleId) => {
  const jobSetupViewIds = Object.keys(state.newEngagementInstance.views).filter((viewId) =>
    viewId.startsWith(JOB_SETUP_VIEW_PREFIX)
  );

  const jobInfoResponses = [];

  for (const viewId of jobSetupViewIds) {
    const formData = state.newEngagementInstance.views[viewId].formData;

    if (formData.billingScheduleId === billingScheduleId) {
      const { id, jobName, jobTypeDisplayName } = formData;
      const jobInfoResponseData = { id, jobName, jobTypeDisplayName };

      jobInfoResponses.push(jobInfoResponseData);
    }
  }

  return jobInfoResponses;
};

// selects the job info responses mapped to a new billing schedule
export const selectJobInfoResponsesMappedToNewBillingSchedule = (state, newBillingScheduleId) => {
  const jobSetupViewIds = Object.keys(state.newEngagementInstance.views).filter((viewId) =>
    viewId.startsWith(JOB_SETUP_VIEW_PREFIX)
  );

  const jobInfoResponses = [];

  for (const viewId of jobSetupViewIds) {
    const formData = state.newEngagementInstance.views[viewId].formData;

    if (formData.newBillingScheduleId === newBillingScheduleId) {
      const { id, jobName, jobTypeDisplayName } = formData;
      const jobInfoResponseData = { id, jobName, jobTypeDisplayName };

      jobInfoResponses.push(jobInfoResponseData);
    }
  }

  return jobInfoResponses;
};

// selects the job setup view details needed for the side bar menu items
export const selectJobSideBarMenuItemDetails = (state) => {
  const viewIds = Object.keys(state.newEngagementInstance.views).filter((viewId) =>
    viewId.startsWith(JOB_SETUP_VIEW_PREFIX)
  );

  const views = viewIds.map((viewId) => {
    const formData = state.newEngagementInstance.views[viewId].formData;
    const jobTypeDisplayName = formData.jobTypeDisplayName;
    const jobName = formData.jobName;
    const label = jobName || jobTypeDisplayName;

    return { viewId, label };
  });

  return views;
};

// selects a specific lookup object
export const selectLookup = (state, lookupName) => state.newEngagementInstance.lookups[lookupName];

// selects the lookups object
export const selectLookups = (state) => state.newEngagementInstance.lookups;

// selects the lookups object metadata
export const selectLookupsMetadata = (state) => state.newEngagementInstance.lookups.metadata;

// selects the metadata object
export const selectMetadata = (state) => state.newEngagementInstance.metadata;

// selects the job info response details needed for the nature of service view
export const selectNatureOfServiceJobInfoResponses = (state) => {
  const viewIds = Object.keys(state.newEngagementInstance.views).filter((viewId) =>
    viewId.startsWith(JOB_SETUP_VIEW_PREFIX)
  );

  const jobInfoResponses = viewIds.map((viewId) => {
    const formData = state.newEngagementInstance.views[viewId].formData;
    const { id, etag, jobName, jobTypeDisplayName, natureOfServiceId } = formData;
    const jobInfoResponse = { id, etag, jobName, jobTypeDisplayName, natureOfServiceId };
    return jobInfoResponse;
  });

  return jobInfoResponses;
};

// selects the newEngagementInstance object
export const selectNewEngagementInstance = (state) => state.newEngagementInstance.newEngagementInstance;

// selects a specific view
export const selectView = (state, viewId) => state.newEngagementInstance.views[viewId];

// **********************************************************************
// * reducer

export default newEngagementInstanceSlice.reducer;
