const fs = require('fs')
const OutputFiles = require('./output-files')
const mkdirp = require('mkdirp')
const PuppeteerToV8 = require('./puppeteer-to-v8')
const v8toIstanbul = require('v8-to-istanbul')

class PuppeteerToIstanbul {
  constructor (coverageInfo) {
    this.coverageInfo = coverageInfo
    this.puppeteerToConverter = OutputFiles(coverageInfo).getTransformedCoverage()
    this.puppeteerToV8Info = PuppeteerToV8(this.puppeteerToConverter).convertCoverage()
  }

  setCoverageInfo (coverageInfo) {
    this.coverageInfo = coverageInfo
  }

  /*
   * output - optional string output filename
   * filter - optional method: takes the url and returns false to include url
   */
  writeIstanbulFormat (output, filter) {
    var fullJson = {}

    this.puppeteerToV8Info.forEach(jsFile => {
      const script = v8toIstanbul(jsFile.url)
      script.applyCoverage(jsFile.functions)

      let istanbulCoverage = script.toIstanbul()
      let keys = Object.keys(istanbulCoverage)

      if (!filter || !filter(jsFile.url)) {
        fullJson[keys[0]] = istanbulCoverage[keys[0]]
      }
    })

    if (!output) {
      mkdirp.sync('./.nyc_output')
      fs.writeFileSync('./.nyc_output/out.json', JSON.stringify(fullJson), 'utf8')
    } else {
      fs.writeFileSync(output, JSON.stringify(fullJson), 'utf8')
    }
  }
}

module.exports = function (coverageInfo) {
  return new PuppeteerToIstanbul(coverageInfo)
}
