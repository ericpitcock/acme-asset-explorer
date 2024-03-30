<template>
  <div class="vulnerabilities">
    <ep-header v-bind="headerProps">
      <template #left>
        <p>Vulnerabilities</p>
      </template>
      <template #right>
        <ep-date-picker
          mode="range"
          positionX="right"
          :inputProps="{
            size: 'large',
            backgroundColor: 'var(--interface-foreground)'
          }"
        />
      </template>
    </ep-header>
    <sidebar-layout>
      <template #sidebar>
        <!-- <ep-menu
          :menu-items="menuItems"
          menu-type="nav"
          :container-props="containerProps"
        /> -->
        sidebar
      </template>
      <template #content>

        <ep-container
          v-bind="commonContainerProps"
          content-padding="3rem 0 1rem 0"
        >
          <template #header>
            <ep-header v-bind="commonHeaderProps">
              <template #left>
                <h1>Severity Over Time</h1>
              </template>
              <template #right>
              </template>
            </ep-header>
          </template>
          <ep-chart
            :options="vulnChartOptions"
            :chart-colors="null"
          />
        </ep-container>
        <ep-container
          v-bind="commonContainerProps"
          container-padding="1rem 3rem 3rem"
        >
          <ep-table
            :columns="tableColumns"
            :data="createVulnData()"
            v-bind="tableProps"
            style="width: 100%;"
          />
        </ep-container>
      </template>
    </sidebar-layout>
  </div>
</template>

<script>
  import SidebarLayout from '@/layouts/SidebarLayout.vue'
  import { mapState } from 'vuex'
  import vulnChartOptions from './vulnChartOptions'
  import * as vulnData from './vulnData'
  import { faker } from '@faker-js/faker'

  export default {
    name: 'Vulnerabilities',
    components: {
      SidebarLayout
    },
    data() {
      return {
        headerProps: {
          backgroundColor: 'var(--interface-surface)',
          leftFlex: '0 0 10rem',
          centerFlex: '1',
          rightFlex: '0 0 10rem',
          sticky: true,
          stickyTop: '0',
          padding: '0 3rem',
          zIndex: 'var(--z-index--fixed)',
        },
        vulnChartOptions,
        vulnData: vulnData.default,
        tableColumns: [
          {
            header: 'ID',
            key: 'id',
            formatter: (value) => {
              return `<span style="white-space: nowrap;">${value}</span>`
            }
          },
          {
            header: 'Description',
            key: 'description',
            formatter: (value) => {
              const subString = value.substring(0, 140)
              return `<span style="line-height: 1.5;">${subString}…</span>`
              // return `<span style="line-height: 1.5;">${value}</span>`
            }
          },
          {
            header: 'Score',
            key: 'baseScore'
          },
          {
            header: 'Severity',
            key: 'baseSeverity',
            // lower case all, capitalize the first letter of the string
            formatter: (value) => {
              return value.toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase())
            }
          },
          {
            header: 'Published Date',
            key: 'publishedDate',
            formatter: (value) => {
              const date = new Date(value).toLocaleString()
              return `<span style="white-space: nowrap;">${date}</span>`
            }
          },
          {
            header: 'Last Modified Date',
            key: 'lastModifiedDate',
            formatter: (value) => {
              const date = new Date(value).toLocaleString()
              return `<span style="white-space: nowrap;">${date}</span>`
            }
          }
        ],
        tableProps: {
          bordered: true,
          // stickyHeader: true,
          // stickyTop: 61,
          sortable: true,
          width: '100%',
        }
      }
    },
    computed: {
      ...mapState([
        'commonContainerProps',
        'commonHeaderProps',
        'commonFooterProps',
        'leftPanelCollapsed',
        'rightPanelOpen',
      ])
    },
    methods: {
      createVulnData() {
        function generateFakeCVE() {
          const protocol = faker.internet.protocol()
          const port = faker.internet.port()

          const introPhrases = [
            'Exploiting',
            'A vulnerability in',
            'Discovered',
            'Security flaw found in',
            'Issue detected in',
            'Weakness identified in'
          ]

          const actionPhrases = [
            'has been discovered',
            'was detected',
            'has been identified',
            'was found',
            'has come to light',
            'has surfaced'
          ]

          const targetPhrases = [
            'The system',
            'A network interface',
            'The application',
            'A device',
            'A service',
            'An operating system'
          ]

          const exploitPhrases = [
            'is vulnerable to',
            'is susceptible to exploitation through',
            'has been compromised by',
            'is prone to attacks via',
            'has been found to be exploitable via',
            'is exposed to potential attacks through'
          ]

          const actionVerbPhrases = [
            'allowing attackers to gain unauthorized access',
            'enabling unauthorized access to sensitive information',
            'permitting remote code execution',
            'resulting in a denial of service',
            'facilitating data exfiltration',
            'leading to system compromise'
          ]

          const observationPhrases = [
            'Vulnerable files',
            'Critical directories',
            'Sensitive data',
            'Key components',
            'Critical infrastructure',
            'System resources'
          ]

          const observationActionPhrases = [
            'have been observed',
            'were detected',
            'have been compromised',
            'were found to be vulnerable',
            'have been targeted',
            'have been identified as at-risk'
          ]

          const randomIntroPhrase = faker.helpers.arrayElement(introPhrases)
          const randomActionPhrase = faker.helpers.arrayElement(actionPhrases)
          const randomTargetPhrase = faker.helpers.arrayElement(targetPhrases)
          const randomExploitPhrase = faker.helpers.arrayElement(exploitPhrases)
          const randomActionVerbPhrase = faker.helpers.arrayElement(actionVerbPhrases)
          const randomObservationPhrase = faker.helpers.arrayElement(observationPhrases)
          const randomObservationActionPhrase = faker.helpers.arrayElement(observationActionPhrases)

          const description = `
            ${randomIntroPhrase} ${faker.hacker.adjective()} ${faker.hacker.noun()} ${randomActionPhrase}.
                        ${randomTargetPhrase} ${randomExploitPhrase} ${protocol} on port ${port}, ${randomActionVerbPhrase}.
                        ${randomObservationPhrase} ${randomObservationActionPhrase}.
          `
          return description.trim()
        }

        const data = []
        for (let i = 0; i < 100; i++) {
          data.push({
            id: `CVE-${faker.date.recent().getFullYear()}-${faker.number.int({ min: 1000, max: 9999 })}`,
            description: generateFakeCVE(),
            baseScore: faker.number.float({ min: 0, max: 10, precision: 0.1 }),
            baseSeverity: faker.helpers.arrayElement(['low', 'medium', 'high', 'critical']),
            publishedDate: faker.date.past().toISOString(),
            lastModifiedDate: faker.date.recent().toISOString()
          })
        }
        return data
      }

    },
    watch: {
      leftPanelCollapsed() {
        this.$nextTick(() => {
          window.dispatchEvent(new Event('resize'))
        })
      },
      rightPanelOpen() {
        this.$nextTick(() => {
          window.dispatchEvent(new Event('resize'))
        })
      }
    },
    mounted() {
      console.log(this.createVulnData())
    }
  }
</script>

<style lang="scss" scoped>
  .vulnerabilities {
    --chart-sequence-00: var(--severity-color--low);
    --chart-sequence-01: var(--severity-color--medium);
    --chart-sequence-02: var(--severity-color--high);
    --chart-sequence-03: var(--severity-color--critical);

    // display: flex;
    // flex-direction: column;
    // gap: 2rem;
    // height: 100%;
    // // padding: 3rem;
    // > *:not(:first-child) {
    //   margin-top: 2rem;
    // }
    :deep(.highcharts-legend-item-hidden text tspan) {
      fill: var(--text-color--subtle) !important;
    }

    :deep(.highcharts-xaxis-labels text),
    :deep(.highcharts-yaxis-labels text) {
      font-size: var(--font-size--xsmall);
      fill: var(--text-color--subtle) !important;
    }

    :deep(.ep-table-container) {
      // overflow: revert;
      overflow-x: auto;
    }
  }
</style>