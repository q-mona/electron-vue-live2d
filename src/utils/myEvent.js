class myEvent {
  constructor() {
    this.handles = {}
  }

  on(eventName, callBack) {
    if (this.handles[eventName])
      this.handles[eventName].push(callBack)
    else
      this.handles[eventName] = []

    this.handles[eventName].push(callBack)
  }


  emit(eventName, data) {
    if (this.handles[eventName]) {
      console.log(this.handles[eventName])
      this.handles[eventName].forEach(element => {
        console.log(element)
        element(data)
      });
    }
  }
}

export default new myEvent()