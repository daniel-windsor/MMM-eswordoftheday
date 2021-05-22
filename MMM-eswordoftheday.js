Module.register("MMM-eswordoftheday", {
  defaults: {
    updateInterval: 86400000,
    retryDelay: 5000,
  },

  start: function() {
    Log.info(`Starting module: ${this.name}`)

    this.apiData = null

    this.sendSocketNotification("MMM-eswordoftheday-GET_WORD", null)

    const self = this
    setTimeout(function() {
      self.sendSocketNotification("MMM-eswordoftheday-GET_WORD", null)
    }, this.config.updateInterval)
  },

  getHeader: function() {
    return "Spanish Word of the Day"
  },

  socketNotificationReceived: function(notification, payload) {
    if (notification === "MMM-eswordoftheday-RETURN_WORD") {
      console.log('recieved: ', payload)
      this.apiData = payload
      this.updateDom()
    }
  },

  getDom: function() {
		const wrapper = document.createElement("div");

    if (this.apiData) {
      const word = document.createElement('div')
      word.innerHTML = this.apiData.word
      word.className = "bold large"

      const translation = document.createElement('div')
      translation.innerHTML = this.apiData.translation

      const list = document.createElement('ol')
      list.className = "small"

      for (const key in this.apiData.examples) {
        const listItem = document.createElement('li')

        const es = document.createElement('div')
        es.innerHTML = this.apiData.examples[key].spanish

        const en = document.createElement('div')
        en.innerHTML = this.apiData.examples[key].english

        listItem.appendChild(es)
        listItem.appendChild(en)
        list.appendChild(listItem)
      }
      
      wrapper.appendChild(word)
      wrapper.appendChild(translation)
      wrapper.appendChild(list)
    }

    return wrapper
  },
})