const NodeHelper = require("node_helper")
const axios = require("axios")
const cheerio = require("cheerio")

module.exports = NodeHelper.create({
  socketNotificationReceived: function (notification, payload) {
    if (notification === "MMM-eswordoftheday-GET_WORD") {
      const url = "https://www.spanishdict.com/wordoftheday"

      axios.get(url).then(({ data }) => {
        const $ = cheerio.load(data)

        const wotdContainer = $("h3").first()
        const wotd = wotdContainer.text()

        const translation = wotdContainer.next().text()

        let spanishExample = ''
        let englishExample = ''
        const exampleContainer = $('.YRbPpWPt').first()

        if (exampleContainer.length) {
          spanishExample = exampleContainer.find('.jxXGMKma').text().trim()
          englishExample = exampleContainer.find('.B8zBqhO4').text().trim().replace(/^.*—\s*/, '') // Remove "—" and preceding whitespace
        }

        const translationData = {
          word: wotd,
          translation: translation,
          spanishExample: spanishExample,
          englishExample: englishExample,
        }

        console.log("Fetched data:", translationData)

        this.sendSocketNotification(
          "MMM-eswordoftheday-RETURN_WORD",
          translationData
        )
      }).catch(error => {
        console.error("Error fetching data:", error)
      })
    }
  },
})