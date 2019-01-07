const PuppeteerToIstanbul = require('./lib/puppeteer-to-istanbul')

module.exports = {
  /*
   * puppeteerFormat = puppeteer coverage
   * output - optional string output filename
   * filter - optional method: takes the url and returns false to include url
   *
   */
  write: (puppeteerFormat, output, filter) => {
    const pti = PuppeteerToIstanbul(puppeteerFormat)
    pti.writeIstanbulFormat(output, filter)
  }
}
