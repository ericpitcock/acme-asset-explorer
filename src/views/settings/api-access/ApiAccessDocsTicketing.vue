<template>
  <div class="docs">
    <ep-container>
      <div class="docs__intro copy-block">
        <ep-flex-container
          flex-flow="column nowrap"
          gap="2rem"
        >
          <h1>Ticketing API</h1>
          <p>
            Requests to the Atlas Ticketing API enable developers to create,
            read,
            update and resolve support tickets on behalf of their organization
            with
            us.
          </p>
          <ul>
            <li>Create a new support ticket</li>
            <li>Read the information for an existing ticket</li>
            <li>
              Update an existing ticket with a comment, or change its details
            </li>
            <li>Resolve a case</li>
          </ul>
        </ep-flex-container>
      </div>
      <div class="docs__body copy-block">
        <ep-flex-container
          flex-flow="column nowrap"
          gap="2rem"
        >
          <h2>Searching by State Changes</h2>
          <p>
            Searching by state does not mean the ticket is currently in that
            state.
            For
            example, if you want to search for all cases opened in the last week,
            the
            search is based on the open_date, but the current state could now be
            closed.
          </p>
          <h2>ServiceNow Integration</h2>
          <p>
            If your organization uses ServiceNow as its ticketing agent, it is
            suggested to use ServiceNow’s REST API Explorer feature to reduce
            development efforts and response times. The REST API Explorer supports
            OAuth2.0 credentials which can be generated above.
          </p>
          <h2>Ticket Lifecycle</h2>
          <div class="lifecycle-item">
            <ep-badge label="New" />
            <p>
              A recently submitted ticket request that has yet to be assigned to
              the
              appropriate company analyst.
            </p>
          </div>
          <div class="lifecycle-item">
            <ep-badge label="Open" />
            <p>
              Once assigned, the case will be in an open state for the duration
              of
              its
              engagement.
            </p>
          </div>
          <div class="lifecycle-item">
            <ep-badge label="Resolved" />
            <p>
              Once a case has concluded, its state will be changed to resolved.
              If
              a
              comment is posted back to a resolved ticket, the state of the ticket
              will
              move back to an Open state, until resolved once again.
            </p>
          </div>
          <div class="lifecycle-item">
            <ep-badge label="Closed" />
            <p>
              After sitting in a Resolved state for 30 days, a ticket is
              permanently
              closed to a Read-Only state.
            </p>
          </div>
          <h2>Endpoints</h2>
          <div
            v-for="endpoint in endpoints"
            class="code-block"
          >
            {{ endpoint }}
          </div>
          <h2>Authorization</h2>
          <p>
            The Ticketing API uses the Authorization HTTP header to authenticate
            requests, with the value: {token}.
          </p>
          <div class="code-block">
            curl -H 'Authorization: {token}'
            'https:/api.domain.com/tickets/cases'
          </div>
          <h2>HTTP Headers</h2>
          <div class="code-block">
            Authorization = {token}
            Content-Type = application/json
          </div>
          <h2>Sample Ticketing JSON Payloads</h2>
          <ep-tabs
            :items="['Create (POST)', 'Read (GET)', 'Comment/Update (PATCH)', 'Resolve (PATCH)']"
          />
          <div class="code-clock create-post">
            {
            "username": "Firstname Lastname",
            "case_type": "API_TESTING",
            "customer_urgency": "LOW",
            "short_description":"Customer Test 1 of Atlas Ticketing
            API",
            "description": "This is the body of a test ticket to validate the
            functionality of the API integration between the customer environment
            and
            the ticketing system. Feel free to validate this case within
            the
            Online Ticketing section located at insight.domain.com/tickets.
            Additional
            details can be included here a well.",
            "customer_field1":"JIRA-123",
            "customer_field2":"True",
            "customer_field3":"14",
            "customer_field4":"DevOps"
            }
          </div>
          <div class="code-block read-get">
            N/A
          </div>
          <div class="code-block comment-update-patch">
            {
            "username": "Firsname Lastname",
            "comments": "Customer comment to Update the case via a PATCH command."
            }
          </div>
          <div class="code-block resolve-patch">
            {
            "username": "Firsname Lastname"",
            "comments": "Customer comment to Resolve the case via a PATCH
            command",
            "state": "resolved"
            }
          </div>
        </ep-flex-container>
      </div>
    </ep-container>
  </div>
</template>

<script>
  export default {
    name: 'ApiAccessDocsTicketing',
    data() {
      return {
        endpoints: [
          'https:/api.domain.com/tickets/cases',
          'https:/api.domain.com/tickets/cases/{ticket_id}',
          'https:/api.domain.com/tickets/cases/{ticket_id}/emails',
          'https:/api.domain.com/tickets/cases/{ticket_id}/comments',
          'https:/api.domain.com/tickets/cases/{ticket_id}',
          'https:/api.domain.com/tickets/cases',
          'https://api.domain.com/tickets/cases?limit=1&offset_ptr=0&start_date=2022-06-01T15:47:43Z'
        ]
      }
    },
  }
</script>