Module.register("MMM-eswordoftheday", {
  defaults: {
    updateInterval: 6 * 60 * 60 * 1000, // 6 hours in milliseconds
    retryDelay: 5000,
    showExamples: true,
    showExampleTranslations: true,
  },

  start: function () {
    Log.info(`Starting module: ${this.name}`)
    this.apiData = null
    this.sendSocketNotification("MMM-eswordoftheday-GET_WORD", {})
    setInterval(() => {
      this.sendSocketNotification("MMM-eswordoftheday-GET_WORD", {})
    }, this.config.updateInterval)
  },

  getHeader: function () {
    return "Spanish Word of the Day"
  },

  getStyles: function () {
    return ["MMM-eswordoftheday.css"]
  },

  socketNotificationReceived: function (notification, payload) {
    if (notification === "MMM-eswordoftheday-RETURN_WORD") {
      Log.info("Received:", payload)
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

      if (this.config.showExamples && this.apiData.spanishExample) {
        const exampleContainer = document.createElement("div")
        exampleContainer.className = "small example-spacing"

        const es = document.createElement("div")
        es.innerHTML = this.apiData.spanishExample || "."
        exampleContainer.appendChild(es)

        if (this.config.showExampleTranslations && this.apiData.englishExample) {
          const en = document.createElement("div")
          en.innerHTML = this.apiData.englishExample || "."
          exampleContainer.appendChild(en)
        }

        wrapper.appendChild(exampleContainer)
      }
    } else {
      wrapper.innerHTML = "Loading..."
    }

    return wrapper
  },
})