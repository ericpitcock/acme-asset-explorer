<template>
  <div class="docs">
    <ep-container>
      <div class="docs__intro copy-block">
        <ep-flex-container
          flex-flow="column nowrap"
          gap="2rem"
        >
          <h1>API Library Overview</h1>
          <p>Welcome to our API Library – a collection of REST
            endpoints
            enabling customer developers to further integrate our services
            within
            your environment. To expose this functionality, the Altas API Library
            utilizes the REST protocol for developers to request data from, or
            post
            data
            to our web application servers.</p>
          <p>These RESTful endpoints are available to customer organizations to,
            at
            their will, make programmatic calls to our application servers
            to
            GET
            existing data, POST new data and PATCH data for supported services.
          </p>
          <ep-flex-container gap="3rem">
            <div class="intro-feature">
              <h2>Threat Intelligence API</h2>
              <p>Access to our proprietary blocklist of known malicious IP
                addresses.</p>
              <router-link
                to="/settings/api-access/docs-threat-intelligence"
                class="font-size--small"
              >Threat Intelligence API
                Docs</router-link>
            </div>
            <div class="intro-feature">
              <h2>Ticketing API</h2>
              <p>Create, read, update and resolve support tickets on behalf of
                your
                organization.</p>
              <router-link
                to="/settings/api-access/docs-ticketing"
                class="font-size--small"
              >Ticketing API Docs</router-link>
            </div>
          </ep-flex-container>
        </ep-flex-container>
      </div>
      <div class="docs__body copy-block">
        <ep-flex-container
          flex-flow="column nowrap"
          gap="2rem"
        >
          <h2>Provisioning</h2>
          <p>At the core of our API Library is the enforcement of the
            right-of-least-privilege across customer accounts, which segments
            organizational data to ensure each request is legitimate and specific
            to
            your organization.</p>
          <div class="callout">
            To maintain the highest level of security, the API Library uses
            industry-standard authentication protocols, including Basic Token
            Authentication and OAuth 2.0, to authenticate each REST API call made
            to
            our
            web application servers.
          </div>
          <p>From the API Credentials menu, Insight users can manage your
            organization’s
            ability to:</p>
          <ul>
            <li>Generate (or regenerate) up to 3 API credentials for each
              endpoint
            </li>
            <li>Choose your preferred authentication protocol</li>
            <li>Identify each credential by name to distinguish it from others
            </li>
            <li>Restrict the IP address from which a token’s requests can be sent
            </li>
          </ul>
          <h2>Use Cases</h2>
          <p>By ingesting this data, developers can then further integrate with
            exposed
            our services to accommodate several use cases, including:</p>
          <ul>
            <li>Adding the Threat Intelligence API payload to your existing
              firewalls'
              threat feed, for areas of your infrastructure unprotected by
              Network sensors (labs, DMZs, remote locales, etc.)</li>
            <li>Document or monitor our Threat Intelligence feed for
              extended
              threat reporting capabilities</li>
            <li>Integrate your ticketing data with your internal
              ticketing
              system of choice
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
          <p>While the API Library enables your ability to automate
            operational
            tasks and communication between our parties, it does require
            development
            resources to be allocated by a customer organization to carry out the
            integration within your environment.
          </p>
          <p>Usage of Atlas Ticketing API is self-service and the responsibility
            of
            the
            Client. We’re not responsible for the implementation, usage, or
            outcomes of using the Ticketing API feed in client applications.</p>
        </ep-flex-container>
      </div>
    </ep-container>
  </div>
</template>

<script>
  export default {
    name: 'ApiAccessDocsOverview',
  }
</script>

<style lang="scss" scoped>
  .intro-feature {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    h2 {
      font-size: var(--font-size--body)
    }
  }
</style>