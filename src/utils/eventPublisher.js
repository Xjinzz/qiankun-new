const EventPublisher = function () {
  this.eventCallbackDictionary = {}
  this.on = function (eventName, callback) {
    this.eventCallbackDictionary[eventName] = callback
  }
  this.broadcast = function (eventName, data) {
    for (const i in this.eventCallbackDictionary) {
      if (i === eventName && this.eventCallbackDictionary[eventName]) {
        this.eventCallbackDictionary[eventName](data)
      }
    }
  }
}
export default new EventPublisher()
