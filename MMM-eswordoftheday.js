Module.register("MMM-eswordoftheday", {
  defaults: {
    updateInterval: 86400000,
    retryDelay: 5000,
    showExamples: true,
    showExampleTranslations: true,
  },

  start: function () {
    Log.info(`Starting module: ${this.name}`)

    this.apiData = null

    this.sendSocketNotification("MMM-eswordoftheday-GET_WORD", null)

    const self = this
    setTimeout(function () {
      self.sendSocketNotification("MMM-eswordoftheday-GET_WORD", null)
    }, this.config.updateInterval)
  },

  getHeader: function () {
    return "Spanish Word of the Day"
  },

  socketNotificationReceived: function (notification, payload) {
    if (notification === "MMM-eswordoftheday-RETURN_WORD") {
      Log.info("recieved: ", payload)
      this.apiData = payload
      this.updateDom()
    }
  },

  getDom: function () {
    const wrapper = document.createElement("div")

    if (this.apiData) {
      const word = document.createElement("div")
      word.innerHTML = this.apiData.word
      word.className = "bold large"
      wrapper.appendChild(word)

      const translation = document.createElement("div")
      translation.innerHTML = this.apiData.translation
      wrapper.appendChild(translation)

      if (this.config.showExamples) {
        const list = document.createElement("ul")
        list.className = "small"

        const listItem = document.createElement("li")

        const es = document.createElement("div")
        es.innerHTML = this.apiData.spanishExample
        listItem.appendChild(es)

        if (this.config.showExampleTranslations) {
          const en = document.createElement("div")
          en.innerHTML = this.apiData.englishExample
          listItem.appendChild(en)
        }

        list.appendChild(listItem)

        wrapper.appendChild(list)
      }
    } else {
      wrapper.innerHTML = "Loading..."
    }

    return wrapper
  },
})
