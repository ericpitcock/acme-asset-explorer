// for filtering the raw data from nvdcve-1.1-2021.json

function filterVulnData() {
  // remove all objects where description.description_data[0].value includes the word "REJECT"
  const filteredRejects = this.vulnData.default.filter(vuln => !vuln.cve.description.description_data[0].value.includes('REJECT'))

  // now remove all objects where baseScore and/or baseSeverity key don't exist
  const filteredRejectsAndNoScore = filteredRejects.filter(vuln => vuln.impact?.baseMetricV3?.cvssV3.baseScore && vuln.impact?.baseMetricV3?.cvssV3.baseSeverity)

  // map the following keys from this.vulnData.default to a new array
  // cve.CVE_data_meta.ID
  // cve.description.description_data[0].value
  // impact.baseMetricV3.cvssV3.baseScore
  // impact.baseMetricV3.cvssV3.baseSeverity
  // publishedDate
  // lastModifiedDate
  // and assign it to this.vulnData
  const newVulns = filteredRejectsAndNoScore.map(vuln => {
    return {
      id: vuln.cve.CVE_data_meta.ID,
      // description: vuln.cve.description.description_data[0].value,
      // truncate description to 100 characters
      description: vuln.cve.description.description_data[0].value.substring(0, 100),
      baseScore: vuln.impact.baseMetricV3.cvssV3.baseScore,
      baseSeverity: vuln.impact.baseMetricV3.cvssV3.baseSeverity,
      publishedDate: vuln.publishedDate,
      lastModifiedDate: vuln.lastModifiedDate
    }
  })

  console.log(newVulns)
}