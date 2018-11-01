const PuppeteerToIstanbul = require('./lib/puppeteer-to-istanbul')

module.exports = {
  write: (puppeteerFormat, output) => {
    const pti = PuppeteerToIstanbul(puppeteerFormat)
    pti.writeIstanbulFormat(output)
  }
}
