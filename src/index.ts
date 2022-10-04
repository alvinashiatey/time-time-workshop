import "./scss/style.scss";
class Tic {
  private _date: Date | undefined;
  private _secondsDiv: HTMLDivElement | undefined;
  private _minutesDiv: HTMLDivElement | undefined;
  private _hoursDiv: HTMLDivElement | undefined;
  private _circles: HTMLDivElement[] | undefined;
  private _dataTic: number | undefined;
  private _wrapper: HTMLDivElement | undefined;
  private _started: boolean;

  constructor() {
    this._started = false;
    window.onload = () => this.setup();
  }

  setup() {
    this._date = new Date();
    this._secondsDiv = this.generateSecDiv();
    this._minutesDiv = this.generateMinuteDiv();
    this._hoursDiv = this.generateHourDiv();
    this._wrapper = document.querySelector(".wrapper") as HTMLDivElement;
    this._circles = [];
  }

  start() {
    const body = document.body;
    if (!body.dataset.tic) return;
    this._dataTic = +body.dataset.tic;
    const content = this.generateDiv("content");
    if (this._wrapper) this._wrapper.appendChild(content);
    for (let i = 0; i < this._dataTic; i++) {
      const c = this.generateCircleDiv(content);
      if (c && this._circles) {
        this._circles.push(c);
      }
    }
    this._started = true;
    window.onload = () => this.animate();
  }

  private animate() {
    setTimeout(() => {
      this.handleSecondAnimation();
      this.handleMinuteAnimation();
      this.handleHourAnimation();
    }, 1000);
  }

  private handleSecondAnimation() {
    if (!this._started) return;
    const seconds = this._date?.getSeconds();
    if (!seconds || !this._dataTic) return;
    const maxSec = this._dataTic * 5;
    if (seconds >= maxSec - 5 && seconds <= maxSec) {
      const val = this.mapRange(seconds, maxSec - 5, maxSec, 0, 100);
      if (this._secondsDiv) {
        this._secondsDiv.style.transform = `translateX(${val}%)`;
      }
    }
  }

  private handleMinuteAnimation() {
    if (!this._started) return;
    const minutes = this._date?.getMinutes();
    if (!minutes || !this._dataTic) return;
    const minuteVal = this._dataTic * 5 + 5;
    const isHidden = this._minutesDiv?.hasAttribute("hide");
    if (minutes < minuteVal && minutes >= minuteVal) {
      isHidden ? this._minutesDiv?.removeAttribute("hide") : null;
    } else {
      !isHidden ? this._minutesDiv?.setAttribute("hide", "true") : null;
    }
  }

  private handleHourAnimation() {
    if (!this._started) return;
    let hours = this._date?.getHours();
    if (!hours || this._dataTic) return;
    hours = this.makeHour12(hours);
    const hourVal = this._dataTic;
    const isHidden = this._hoursDiv?.hasAttribute("hide");
    if (hours == hourVal) {
      isHidden ? this._hoursDiv?.removeAttribute("hide") : null;
    } else {
      !isHidden ? this._hoursDiv?.setAttribute("hide", "true") : null;
    }
  }

  private makeHour12(hr: number): number {
    return hr > 12 ? hr - 12 : hr;
  }

  private mapRange(value: number, a: number, b: number, c: number, d: number) {
    value = (value - a) / (b - a);
    return c + value * (d - c);
  }

  private generateMinuteDiv(): HTMLDivElement | undefined {
    if (!this._wrapper) return;
    const minDiv = this.generateDiv("second");
    this._wrapper.appendChild(minDiv);
    return minDiv;
  }

  private generateSecDiv(): HTMLDivElement | undefined {
    if (!this._wrapper) return;
    const secDiv = this.generateDiv("second");
    this._wrapper.appendChild(secDiv);
    return secDiv;
  }

  private generateHourDiv(): HTMLDivElement | undefined {
    if (!this._wrapper) return;
    const hourDiv = this.generateDiv("hour");
    this._wrapper.appendChild(hourDiv);
    return hourDiv;
  }

  private generateCircleDiv(
    contentDiv: HTMLDivElement
  ): HTMLDivElement | undefined {
    const circle = this.generateDiv("circle");
    contentDiv.appendChild(circle);
    return circle;
  }

  private generateDiv(
    className: string | undefined = undefined
  ): HTMLDivElement {
    const el = document.createElement("div");
    if (!className) return el;
    el.classList.add(className);
    return el;
  }

  get date(): Date | undefined {
    return this._date;
  }

  set date(value: Date | undefined) {
    if (value === undefined) this._date = new Date();
    this._date = value;
  }
}

export default Tic;
