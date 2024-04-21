const fs = require('fs')
const yaml = require('js-yaml')
const chokidar = require('chokidar')

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
    const yamlData = yaml.load(fs.readFileSync('src/assets/themes.yaml', 'utf8'))
    writeCSS(yamlData)
  } catch (error) {
    console.error('Error:', error)
  }
}

// Watch for changes in themes.yaml
const watcher = chokidar.watch('src/assets/themes.yaml')

watcher.on('change', (path) => {
  console.log('YAML file changed, regenerating CSS...')
  main() // Re-run the script to generate updated CSS
})
