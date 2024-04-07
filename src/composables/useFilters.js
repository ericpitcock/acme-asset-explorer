import { ref, computed } from 'vue' // Import computed from vue package
import { faker } from '@faker-js/faker'

export default function useFilters(columns, data) {
  const filters = ref({})

  const generateFilters = (columnsToFilter, disabledFilters) => {
    const uniqueValues = {}
    // Extract unique values for specified columns
    columns.forEach(column => {
      if (columnsToFilter.includes(column.key)) {
        uniqueValues[column.key] = Array.from(
          new Set(data.value.map(user => getColumnValue(user, column.key))))
      }
    })

    // Alphabetize unique values
    for (const key in uniqueValues) {
      uniqueValues[key].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
    }

    const generatedFilters = {}

    // Generate filter objects based on unique values
    for (const key in uniqueValues) {
      generatedFilters[key] = uniqueValues[key].map(value => ({
        id: faker.string.uuid(),
        name: key,
        value: value,
        checked: true,
        label: value,
        disabled: false
      }))
    }

    // uncheck disabledFilters by default
    for (const key in generatedFilters) {
      generatedFilters[key].forEach(filter => {
        if (disabledFilters.includes(filter.value)) {
          filter.checked = false
        }
      })
    }

    filters.value = generatedFilters
  }

  const getColumnValue = (user, key) => {
    const column = columns.find(column => column.key === key)
    if (column.cellType === 'component') {
      return user[key].value
    } else {
      return user[key]
    }
  }

  const filteredData = computed(() => {
    let filtered = data.value

    // Apply filters
    for (const key in filters.value) {
      filtered = filtered.filter(user => {
        const value = getColumnValue(user, key)
        const checked = filters.value[key].find(filter => filter.value === value).checked
        return checked
      })
    }

    return filtered
  })

  return {
    filters,
    generateFilters,
    filteredData
  }
}
