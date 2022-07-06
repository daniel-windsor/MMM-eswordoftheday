const NodeHelper = require("node_helper")
const axios = require("axios")
const cheerio = require("cheerio")

module.exports = NodeHelper.create({
  socketNotificationReceived: function (notification, payload) {
    if (notification === "MMM-eswordoftheday-GET_WORD") {
      const url = "https://www.spanishdict.com/wordoftheday"

      axios.get(url).then(({ data }) => {
        const $ = cheerio.load(data)

        const wotd = $("h3[class*='wotdHeadword--']").first().text()

        const translation = $("div[class^=translation]").first().text()

        const spanishExample = $("div[class^=exampleSource]").first().text()

        const englishExample = $("div[class^=exampleTranslation]")
          .first()
          .text()

        const translationData = {
          word: wotd,
          translation: translation,
          spanishExample: spanishExample,
          englishExample: englishExample,
        }

        // Send Data
        this.sendSocketNotification(
          "MMM-eswordoftheday-RETURN_WORD",
          translationData
        )
      })
    }
  },
})
