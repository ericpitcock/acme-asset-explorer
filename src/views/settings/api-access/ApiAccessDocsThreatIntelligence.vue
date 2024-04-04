<template>
  <ep-container>
    <div class="intro">
      <h1>Threat Intelligence API</h1>
      <p>eSentire’s Atlas Threat Intelligence API provides customers with access
        to
        eSentire’s proprietary blocklist of known malicious IP addresses.</p>
      <p>These addresses are actively blocked across your supported environments
        and
        protected by our Network sensors, giving you reliable threat data that
        helps
        you protect against malicious activity. With dynamic updates based on the
        latest threat landscape (updates between 5s - 1h), our dedicated team of
        SOC
        and Threat Response Unit experts are constantly working to ensure that our
        blocklist is accurate and up-to-date.</p>
      <p>When a successful request (HTTP 200) is made to the Atlas Threat
        Intelligence API, you’ll also receive the expected payload in the
        Extensible
        Data Language (EDL) format. EDL is a format commonly used to define lists
        of
        data that different types of security devices and software can consume.
      </p>
    </div>
    <h2>Endpoint</h2>
    <p>The Threat Intelligence API retrieves the complete Threat Intelligence IP
      blocklist feed. This API has a single endpoint and no parameters.</p>
    <div class="code-block">GET https://api.esentire.com/ti/rules</div>
    <h2>Authorization</h2>
    <p>The Threat Intelligence API uses the ‘Authorization’ HTTP header to
      authenticate requests with the value: {token}.</p>
    <div class="code-block">curl -H 'Authorization: {token}'
      'https://api.esentire.com/ti/rules'</div>
    <h2>HTTP Header</h2>
    <div class="code-block">Authorization = {token}</div>
    <h2>Sample Threat Intelligence EDL Payload</h2>
    <div class="code-block">
      # eSentire Threat Intelligence full IP Feed
      # https://www.esentire.com
      #
      # Note that this is for eSentire client use only.
      #
      1.2.1.22
      1.2.2.22
      1.4.2.22
      1.9.3.22
    </div>

  </ep-container>
</template>

<script>
  export default {
    name: 'ApiAccessDocsThreatIntelligence',
  }
</script>

