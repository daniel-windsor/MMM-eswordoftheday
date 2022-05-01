const NodeHelper = require("node_helper")
const axios = require('axios')
const cheerio = require('cheerio')

module.exports = NodeHelper.create({
  socketNotificationReceived: function(notification, payload) {
    if (notification === "MMM-eswordoftheday-GET_WORD") {
      const url = "https://www.spanishdict.com/wordoftheday";

      axios.get(url).then(({ data }) => {
        const $ = cheerio.load(data);
  
        const container = $(".gl1Y0YQP")[0];
        const container1 = $(".xiQBRZra")[0];
        const container2 = $(".KkXPxEB8")[0];

        const word = $(container).find("h3");
        const translation = word.next();

        const firstExampleText = $(container1);
        const firstExample = firstExampleText.text();

        const TranslationText = $(container2);
        const translationExample = TranslationText.text();

        const examples = {
          one: {
            spanish: firstExample,
            english: translationExample
          }
        }
  
        const processed = { 
          word: word.text(),
          translation: translation.text(),
          examples: examples
        }

        this.sendSocketNotification("MMM-eswordoftheday-RETURN_WORD", processed)
      })
    }
  }
})