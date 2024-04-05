<template>
  <div class="docs">
    <ep-container>
      <div class="docs__intro copy-block">
        <ep-flex-container
          flex-flow="column nowrap"
          gap="2rem"
        >
          <h1>Testing and Development</h1>
          <p>Integrating with eSentire’s Atlas API Library is a simple and
            efficient
            way to retrieve important data specific to your organization.</p>
          <p>With this information, developers can then proceed to integrate it as
            they see fit by leveraging the integration techniques supported by
            each
            target system.</p>
        </ep-flex-container>
      </div>
      <div class="docs__body copy-block">
        <ep-flex-container
          flex-flow="column nowrap"
          gap="2rem"
        >
          <h2>Testing</h2>
          <p>When first evaluating the Atlas API Library, developers are
            encouraged
            to
            use any of the following techniques to understand the expected
            workflows
            and
            how to integrate them within your environment best.</p>
          <h2>REST Clients</h2>
          <ul>
            <li>Insomnia and Postman are both powerful REST client applications
              that
              can
              be freely downloaded to assist developers in testing and consuming
              RESTful
              API endpoints</li>
            <li>Each allows for the simple copying and pasting of parameters to
              receive
              production responses without having to write any source code</li>
            <li>Developers can also utilize a REST client to generate source code
              specific to your API request. This can help to reduce the
              development
              effort required for integration. Since REST is a language-agnostic
              protocol, it enables this capability for tools to generate code
              across
              a
              multitude of development languages, hopefully meeting your needs and
              familiarity.</li>
          </ul>
          <h2>Online Ticketing</h2>
          <ul>
            <li>Make use of the Online Ticketing system to cross-reference ticket
              details between an API request and existing tickets</li>
            <li>Use the Online Ticketing portal to create or reference test
              tickets
              manually</li>
            <li>eSentire’s Online Ticketing portal relies entirely on the publicly
              available Ticketing APIs</li>
          </ul>
          <h2>Creating Test Cases</h2>
          <ul>
            <li>Developers are welcome to Create, Read, Update and Resolve test
              tickets
              to validate integrations</li>
            <li>Set the "case_type": "ATLAS_API_TESTING" field to create tickets
              that
              will be unmonitored by eSentire’s SOC and not alert internal
              stakeholders
            </li>
            <li>Upon subsequent request and providing the case number, your
              Customer
              Success Manager can send a test message back to the case or update
              it
              to
              allow you to test inbound messages</li>
          </ul>
          <h2>Swagger.io Test Playground</h2>
          <ul>
            <li>eSentire’s official Atlas API Library documentation is formatted
              to
              Swagger.io specifications which allows for a dynamic environment for
              developers to receive interactive responses against their
              authenticated
              requests</li>
            <li>Provide your API token and generate production requests and
              responses
              specific to your organization's cases</li>
          </ul>
          <h2>Development</h2>
          <p>eSentire’s Atlas API Library is exposed via the REST protocol to
            support
            a
            broad developer audience across all modern development frameworks.
            Regardless of the development languages being leveraged across an
            organization, REST is an agnostic protocol with native library
            support.
          </p>
          <p>https://www.w3.org/2001/sw/wiki/REST</p>
          <h2>Polling for Changes</h2>
          <p>The REST API protocol does not support a listener function to alert
            upon
            changes to a potential payload. As such, developers are required to
            poll
            eSentire’s Atlas API REST endpoints on a regular basis to run a
            comparison
            against the last data pulled and the most current data available.</p>
          <p>The following Python pseudo-code can serve as a framework:</p>
          <div class="code-block">
            while True: 
                response = requests.get(ti_endpoint, headers=api_header) 
                if response.status_code == 200: 
                    current_data = response.json() 
                    if previous_data is not None: 
                        if previous_data != current_data: 
                            # Write to downstream system to update IP Threat List 
                            #  
                            previous_data = current_data 
                    else: 
                        # Write to downstream system to update IP Threat List 
                        #  
                        previous_data = current_data 
                else: 
                    raise Exception(f"eSentire Atlas Platform API call failed with
            status code {response.status_code}") 
                time.sleep(300) # Five minute wait period
          </div>
      </ep-flex-container>
    </div>
  </ep-container>
</div></template>

<script>
export default {
  name: 'ApiAccessDocsTesting',
}
</script>