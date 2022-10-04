class Tic {
  private _secondsDiv: HTMLDivElement | undefined;
  private _minutesDiv: HTMLDivElement | undefined;
  private _hoursDiv: HTMLDivElement | undefined;
  private _circles: HTMLDivElement[] | undefined;
  private _dataTic: number | undefined;
  private _wrapper: HTMLDivElement | undefined;
  private _started: boolean;

  constructor() {
    this._started = false;
    this.setup();
  }

  setup() {
    this._circles = [];
    this.setupDivs();
  }

  setupDivs() {
    this._wrapper = document.querySelector(".wrapper") as HTMLDivElement;
    this._secondsDiv = this.generateSecDiv();
    this._minutesDiv = this.generateMinuteDiv();
    this._hoursDiv = this.generateHourDiv();
  }

  start() {
    console.log("🕥: Start");
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
    this.animate();
  }

  private animate() {
    this.handleSecondAnimation();
    this.handleMinuteAnimation();
    this.handleHourAnimation();
    setTimeout(() => this.animate(), 1000);
  }

  private handleSecondAnimation() {
    if (!this._started) return;
    const date = new Date();
    const seconds = date?.getSeconds();
    if (!seconds || !this._dataTic) return;
    const maxSec = this._dataTic * 5;
    if (seconds >= maxSec - 5 && seconds <= maxSec) {
      const val = this.mapRange(seconds, maxSec - 5, maxSec, 0, 100);
      if (this._secondsDiv) {
        this._secondsDiv.style.transform = `translateX(${val}vw)`;
      }
    }
  }

  private handleMinuteAnimation() {
    if (!this._started) return;
    const date = new Date();
    const minutes = date?.getMinutes();
    if (!minutes || !this._dataTic) return;
    const minuteVal = minutes > 5 ? this._dataTic * 5 : 0;
    const mm = minuteVal === 60 ? minuteVal : minuteVal + 5;
    const isHidden = this._minutesDiv?.hasAttribute("hide");
    if (minutes < mm && minutes >= minuteVal) {
      isHidden ? this._minutesDiv?.removeAttribute("hide") : null;
    } else {
      !isHidden ? this._minutesDiv?.setAttribute("hide", "true") : null;
    }
  }

  private handleHourAnimation() {
    if (!this._started) return;
    const date = new Date();
    let hours = date?.getHours();
    if (!hours || !this._dataTic) return;
    hours = this.makeHour12(hours);
    const hourVal = this._dataTic;
    const isHidden = this._hoursDiv?.hasAttribute("hide");
    if (hours === hourVal) {
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
    const minDiv = this.generateDiv("minute");
    minDiv.setAttribute("hide", "true");
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
    hourDiv.setAttribute("hide", "true");
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
}

export { Tic };
