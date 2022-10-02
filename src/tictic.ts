class Tic {
    private _date: Date | undefined;
    private seconds: number | undefined;
    private minutes: number | undefined;
    private hours: number | undefined;

    constructor() {
        this.setup()
    }

    setup() {
        this._date = new Date;
        this.seconds = this._date.getSeconds();
        this.minutes = this._date.getMinutes();
        this.hours = this._date.getHours();
    }

    get date(): Date | undefined {
        return this._date;
    }

    set date(value: Date | undefined) {
        if (value === undefined) this._date = new Date()
        this._date = value;
    }

}

export const tic = new Tic()