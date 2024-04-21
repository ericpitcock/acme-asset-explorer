const fs = require('fs')
const yaml = require('js-yaml')
const chokidar = require('chokidar')
const glob = require('glob')

function loadYAMLFiles(pattern) {
  const yamlData = {}
  const files = glob.sync(pattern)
  files.forEach(file => {
    try {
      const data = yaml.load(fs.readFileSync(file, 'utf8'))
      Object.assign(yamlData, data)
    } catch (error) {
      console.error('Error:', error)
    }
  })
  return yamlData
}

function writeCSS(yamlData) {
  let cssOutput = `/* DO NOT EDIT DIRECTLY */\n`

  cssOutput += `:root {\n`

  Object.entries(yamlData).forEach(([key, value]) => {
    cssOutput += `  --${key}: ${value.dark};\n`
  })

  cssOutput += `}\n`

  cssOutput += `html[data-color-theme='light'] {\n`
  Object.entries(yamlData).forEach(([key, value]) => {
    cssOutput += `  --${key}: ${value.light || value.dark};\n`
  })
  cssOutput += `}\n`

  fs.writeFileSync('src/assets/themes.css', cssOutput)
}

function main() {
  try {
    const yamlData = loadYAMLFiles('src/assets/**/*.yaml')
    writeCSS(yamlData)
  } catch (error) {
    console.error('Error:', error)
  }
}

// Watch for changes in YAML files
const watcher = chokidar.watch('src/assets/**/*.yaml')

watcher.on('change', () => {
  console.log('YAML file changed, regenerating CSS...')
  main() // Re-run the script to generate updated CSS
})

// Initial run
main()
