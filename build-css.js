const fs = require('fs')
const yaml = require('js-yaml')

function generateCSS(yamlData) {
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
    const cssOutput = generateCSS(yamlData)
    console.log(cssOutput)
  } catch (error) {
    console.error('Error:', error)
  }
}

main()
