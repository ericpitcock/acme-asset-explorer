<template>
  <ep-container>
    <h1>Atlas API Library Overview</h1>
    <p>Welcome to eSentire's Atlas API Library – a collection of REST endpoints
      enabling customer developers to further integrate eSentire services within
      your environment. To expose this functionality, the Altas API Library
      utilizes the REST protocol for developers to request data from, or post data
      to eSentire’s web application servers.</p>
    <p>These RESTful endpoints are available to customer organizations to, at
      their will, make programmatic calls to eSentire’s application servers to GET
      existing data, POST new data and PATCH data for supported services.</p>
    <div class="features">
      <div>
        <h2>Threat Intelligence API</h2>
        <p>Access to eSentire’s proprietary blocklist of known malicious IP
          addresses.</p>
        <p>Threat Intelligence API Docs</p>
      </div>
      <div>
        <h2>Ticketing API</h2>
        <p>Create, read, update and resolve support tickets on behalf of your
          organization.</p>
        <p>Ticketing API Docs</p>
      </div>
    </div>
    <h2>Provisioning</h2>
    <p>At the core of eSentire’s Atlas API Library is the enforcement of the
      right-of-least-privilege across customer accounts, which segments
      organizational data to ensure each request is legitimate and specific to
      your organization.</p>
    <div class="callout">
      To maintain the highest level of security, the Atlas API Library uses
      industry-standard authentication protocols, including Basic Token
      Authentication and OAuth 2.0, to authenticate each REST API call made to our
      web application servers.
    </div>
    <p>From the API Credentials menu, Insight users can manage your organization’s
      ability to:</p>
    <ul>
      <li>Generate (or regenerate) up to 3 API credentials for each endpoint </li>
      <li>Choose your preferred authentication protocol </li>
      <li>Identify each credential by name to distinguish it from others </li>
      <li>Restrict the IP address from which a token’s requests can be sent </li>
    </ul>
    <h2>Use Cases</h2>
    <p>By ingesting this data, developers can then further integrate with exposed
      eSentire services to accommodate several use cases, including:</p>
    <ul>
      <li>Adding the Threat Intelligence API payload to your existing firewalls'
        threat feed, for areas of your infrastructure unprotected by eSentire
        Network sensors (labs, DMZs, remote locales, etc.)</li>
      <li>Document or monitor eSentire’s Threat Intelligence feed for extended
        threat reporting capabilities</li>
      <li>Integrate your eSentire ticketing data with your internal ticketing
        system of choice</li>
      <li>
        <ul>
          <li>Create new tickets (POST)</li>
          <li>Read high-level details of all active cases (GET)</li>
          <li>Read all details of specific case (GET)</li>
          <li>Comment on an existing ticket (PATCH)</li>
          <li>Resolve an existing ticket (PATCH)</li>
        </ul>
      </li>
    </ul>
    <h2>Development Resourcing</h2>
    <p>While the Atlas API Library enables your ability to automate operational
      tasks and communication between our parties, it does require development
      resources to be allocated by a customer organization to carry out the
      integration within your environment. 
    </p>
    <p>Usage of Atlas Ticketing API is self-service and the responsibility of the
      Client. eSentire is not responsible for the implementation, usage, or
      outcomes of using the Ticketing API feed in client applications.</p>
  </ep-container>
</template>

<script>
export default {
  name: 'ApiAccessDocsOverview',
}
</script>