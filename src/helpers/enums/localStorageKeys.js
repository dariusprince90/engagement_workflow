/* istanbul ignore file -- justification: this is simply an enumeration; no testing needed */

const LOCAL_STORAGE_KEYS = {
  app: {
    version: { name: 'pm--app-version' }
  },
  lookups: {
    clientSearchTypes: { name: 'pm--client-search-types', expireDays: 30 },
    clientTaxTypes: { name: 'pm--client-tax-types', expireDays: 30 },
    countries: { name: 'pm--countries', expireDays: 45 },
    incompatibleNaturesOfServices: { name: 'pm--incompatible-nos', expireDays: 30 },
    industryHierarchies: { name: 'pm--industry-hierarchies', expireDays: 31 },
    internationalHeadquarterCountries: { name: 'pm--intl-headquarter-countries', expireDays: 31 },
    jobCategoryRoles: { name: 'pm--job-category-roles', expireDays: 31 },
    jobHierarchies: { name: 'pm--job-hierarchies', expireDays: 32 },
    jobRoles: { name: 'pm--job-roles', expireDays: 32 },
    marketSectors: { name: 'pm--market-sectors', expireDays: 32 },
    months: { name: 'pm--months', expireDays: 45 },
    natureOfServiceJobHierarchyMaps: { name: 'pm--nos-job-hierarchy-maps', expireDays: 33 },
    naturesOfServices: { name: 'pm--natures-of-services', expireDays: 33 },
    ownershipTypes: { name: 'pm--ownership-types', expireDays: 33 },
    regionHierarchies: { name: 'pm--region-hierarchies', expireDays: 33 },
    subjectToSecOrGaoRules: { name: 'pm--subject-to-sec-or-gao-rules', expireDays: 45 },
    suffixes: { name: 'pm--suffixes', expireDays: 45 },
    taxTypes: { name: 'pm--tax-types', expireDays: 34 },
    workflowSteps: { name: 'pm--workflow-steps', expireDays: 45 }
  }
};

export default Object.freeze(LOCAL_STORAGE_KEYS);
