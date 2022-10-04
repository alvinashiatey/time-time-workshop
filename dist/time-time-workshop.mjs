class a {
  _secondsDiv;
  _minutesDiv;
  _hoursDiv;
  _circles;
  _dataTic;
  _wrapper;
  _started;
  constructor() {
    this._started = !1, this.setup();
  }
  setup() {
    this._circles = [], this.setupDivs();
  }
  setupDivs() {
    this._wrapper = document.querySelector(".wrapper"), this._secondsDiv = this.generateSecDiv(), this._minutesDiv = this.generateMinuteDiv(), this._hoursDiv = this.generateHourDiv();
  }
  start() {
    console.log("\u{1F565}: Start");
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
    this._started = !0, this.animate();
  }
  animate() {
    this.handleSecondAnimation(), this.handleMinuteAnimation(), this.handleHourAnimation(), setTimeout(() => this.animate(), 1e3);
  }
  handleSecondAnimation() {
    if (!this._started)
      return;
    const e = new Date()?.getSeconds();
    if (!e || !this._dataTic)
      return;
    const i = this._dataTic * 5;
    if (e >= i - 5 && e <= i) {
      const s = this.mapRange(e, i - 5, i, 0, 100);
      this._secondsDiv && (this._secondsDiv.style.transform = `translateX(${s}vw)`);
    }
  }
  handleMinuteAnimation() {
    if (!this._started)
      return;
    const e = new Date()?.getMinutes();
    if (!e || !this._dataTic)
      return;
    const i = e > 5 ? this._dataTic * 5 : 0, s = i === 60 ? i : i + 5, r = this._minutesDiv?.hasAttribute("hide");
    e < s && e >= i ? r && this._minutesDiv?.removeAttribute("hide") : r || this._minutesDiv?.setAttribute("hide", "true");
  }
  handleHourAnimation() {
    if (!this._started)
      return;
    let e = new Date()?.getHours();
    if (!e || !this._dataTic)
      return;
    e = this.makeHour12(e);
    const i = this._dataTic, s = this._hoursDiv?.hasAttribute("hide");
    e === i ? s && this._hoursDiv?.removeAttribute("hide") : s || this._hoursDiv?.setAttribute("hide", "true");
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
    const t = this.generateDiv("minute");
    return t.setAttribute("hide", "true"), this._wrapper.appendChild(t), t;
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
    return t.setAttribute("hide", "true"), this._wrapper.appendChild(t), t;
  }
  generateCircleDiv(t) {
    const e = this.generateDiv("circle");
    return t.appendChild(e), e;
  }
  generateDiv(t = void 0) {
    const e = document.createElement("div");
    return t && e.classList.add(t), e;
  }
}
export {
  a as Tic
};
