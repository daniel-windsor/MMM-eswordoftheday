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

        const examples = $("li").first().children()
        const spanishExample = examples.first("div").contents().first().text()
        const englishExample = examples.last("div").contents().first().text()

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
