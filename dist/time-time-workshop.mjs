class a {
  _date;
  _secondsDiv;
  _minutesDiv;
  _hoursDiv;
  _circles;
  _dataTic;
  _wrapper;
  _started;
  constructor() {
    this._started = !1, window.onload = () => this.setup();
  }
  setup() {
    this._date = new Date(), this._secondsDiv = this.generateSecDiv(), this._minutesDiv = this.generateMinuteDiv(), this._hoursDiv = this.generateHourDiv(), this._wrapper = document.querySelector(".wrapper"), this._circles = [];
  }
  start() {
    const t = document.body;
    if (!t.dataset.tic)
      return;
    this._dataTic = +t.dataset.tic;
    const e = this.generateDiv("content");
    this._wrapper && this._wrapper.appendChild(e);
    for (let i = 0; i < this._dataTic; i++) {
      const s = this.generateCircleDiv(e);
      s && this._circles && this._circles.push(s);
    }
    this._started = !0, window.onload = () => this.animate();
  }
  animate() {
    setTimeout(() => {
      this.handleSecondAnimation(), this.handleMinuteAnimation(), this.handleHourAnimation();
    }, 1e3);
  }
  handleSecondAnimation() {
    if (!this._started)
      return;
    const t = this._date?.getSeconds();
    if (!t || !this._dataTic)
      return;
    const e = this._dataTic * 5;
    if (t >= e - 5 && t <= e) {
      const i = this.mapRange(t, e - 5, e, 0, 100);
      this._secondsDiv && (this._secondsDiv.style.transform = `translateX(${i}%)`);
    }
  }
  handleMinuteAnimation() {
    if (!this._started)
      return;
    const t = this._date?.getMinutes();
    if (!t || !this._dataTic)
      return;
    const e = this._dataTic * 5 + 5, i = this._minutesDiv?.hasAttribute("hide");
    t < e && t >= e ? i && this._minutesDiv?.removeAttribute("hide") : i || this._minutesDiv?.setAttribute("hide", "true");
  }
  handleHourAnimation() {
    if (!this._started)
      return;
    let t = this._date?.getHours();
    if (!t || this._dataTic)
      return;
    t = this.makeHour12(t);
    const e = this._dataTic, i = this._hoursDiv?.hasAttribute("hide");
    t == e ? i && this._hoursDiv?.removeAttribute("hide") : i || this._hoursDiv?.setAttribute("hide", "true");
  }
  makeHour12(t) {
    return t > 12 ? t - 12 : t;
  }
  mapRange(t, e, i, s, r) {
    return t = (t - e) / (i - e), s + t * (r - s);
  }
  generateMinuteDiv() {
    if (!this._wrapper)
      return;
    const t = this.generateDiv("second");
    return this._wrapper.appendChild(t), t;
  }
  generateSecDiv() {
    if (!this._wrapper)
      return;
    const t = this.generateDiv("second");
    return this._wrapper.appendChild(t), t;
  }
  generateHourDiv() {
    if (!this._wrapper)
      return;
    const t = this.generateDiv("hour");
    return this._wrapper.appendChild(t), t;
  }
  generateCircleDiv(t) {
    const e = this.generateDiv("circle");
    return t.appendChild(e), e;
  }
  generateDiv(t = void 0) {
    const e = document.createElement("div");
    return t && e.classList.add(t), e;
  }
  get date() {
    return this._date;
  }
  set date(t) {
    t === void 0 && (this._date = new Date()), this._date = t;
  }
}
export {
  a as Tic
};
