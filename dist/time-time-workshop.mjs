var o = Object.defineProperty;
var c = (a, t, e) => t in a ? o(a, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : a[t] = e;
var n = (a, t, e) => (c(a, typeof t != "symbol" ? t + "" : t, e), e);
class u {
  constructor() {
    n(this, "_date");
    n(this, "_secondsDiv");
    n(this, "_minutesDiv");
    n(this, "_hoursDiv");
    n(this, "_circles");
    n(this, "_dataTic");
    n(this, "_wrapper");
    n(this, "_started");
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
    var i;
    if (!this._started)
      return;
    const t = (i = this._date) == null ? void 0 : i.getSeconds();
    if (!t || !this._dataTic)
      return;
    const e = this._dataTic * 5;
    if (t >= e - 5 && t <= e) {
      const s = this.mapRange(t, e - 5, e, 0, 100);
      this._secondsDiv && (this._secondsDiv.style.transform = `translateX(${s}%)`);
    }
  }
  handleMinuteAnimation() {
    var s, r, h, d;
    if (!this._started)
      return;
    const t = (s = this._date) == null ? void 0 : s.getMinutes();
    if (!t || !this._dataTic)
      return;
    const e = this._dataTic * 5 + 5, i = (r = this._minutesDiv) == null ? void 0 : r.hasAttribute("hide");
    t < e && t >= e ? i && ((h = this._minutesDiv) == null || h.removeAttribute("hide")) : i || (d = this._minutesDiv) == null || d.setAttribute("hide", "true");
  }
  handleHourAnimation() {
    var s, r, h, d;
    if (!this._started)
      return;
    let t = (s = this._date) == null ? void 0 : s.getHours();
    if (!t || this._dataTic)
      return;
    t = this.makeHour12(t);
    const e = this._dataTic, i = (r = this._hoursDiv) == null ? void 0 : r.hasAttribute("hide");
    t == e ? i && ((h = this._hoursDiv) == null || h.removeAttribute("hide")) : i || (d = this._hoursDiv) == null || d.setAttribute("hide", "true");
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
new u();
