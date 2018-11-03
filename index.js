const PuppeteerToIstanbul = require('./lib/puppeteer-to-istanbul')

module.exports = {
  /*
   * puppeteerFormat = puppeteer coverage
   * output = optional string filename
   * filter = optional url string array filter
   *
   */
  write: (puppeteerFormat, output, filter) => {
    const pti = PuppeteerToIstanbul(puppeteerFormat)
    pti.writeIstanbulFormat(output, filter)
  }
}
