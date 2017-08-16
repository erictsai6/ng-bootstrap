import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbDate } from './ngb-date';
import { NgbDatepickerI18n } from './datepicker-i18n';
var NgbDatepickerMonthView = (function () {
    function NgbDatepickerMonthView(i18n) {
        this.i18n = i18n;
        this.select = new EventEmitter();
        this.doSelect = this.doSelect.bind(this);
    }
    NgbDatepickerMonthView.prototype.buildContext = function (day) {
        return Object.assign({}, day.context, {
            day: day,
            doSelect: this.doSelect
        });
    };
    NgbDatepickerMonthView.prototype.doSelect = function (day) {
        if (!day.context.disabled && !this.isHidden(day)) {
            this.select.emit(NgbDate.from(day.date));
        }
    };
    NgbDatepickerMonthView.prototype.isCollapsed = function (week) {
        return this.outsideDays === 'collapsed' && week.days[0].date.month !== this.month.number &&
            week.days[week.days.length - 1].date.month !== this.month.number;
    };
    NgbDatepickerMonthView.prototype.isHidden = function (day) {
        return (this.outsideDays === 'hidden' || this.outsideDays === 'collapsed') && this.month.number !== day.date.month;
    };
    return NgbDatepickerMonthView;
}());
export { NgbDatepickerMonthView };
NgbDatepickerMonthView.decorators = [
    { type: Component, args: [{
                selector: 'ngb-datepicker-month-view',
                host: { 'class': 's-calendar' },
                styles: ["\n\n  "],
                template: "\n    <div *ngIf=\"showWeekdays\" class=\"ngb-dp-week s-row\">\n      <div *ngIf=\"showWeekNumbers\" class=\"ngb-dp-weekday\"></div>\n      <span *ngFor=\"let w of month.weekdays\" class=\"s-calendar-day u-text-center u-text-uppercase caption\">\n        {{ i18n.getWeekdayShortName(w) }}\n      </span>\n    </div>\n    <ng-template ngFor let-week [ngForOf]=\"month.weeks\">\n      <div *ngIf=\"!isCollapsed(week)\" class=\"ngb-dp-week s-row\">\n        <div *ngIf=\"showWeekNumbers\" class=\"ngb-dp-week-number small text-center font-italic text-muted\">{{ week.number }}</div>\n        <ng-template ngFor let-day [ngForOf]=\"week.days\">\n          <ng-template [ngTemplateOutlet]=\"dayTemplate\" [ngOutletContext]=\"buildContext(day)\">\n          </ng-template>\n        </ng-template>\n      </div>\n    </ng-template>\n  "
            },] },
];
/** @nocollapse */
NgbDatepickerMonthView.ctorParameters = function () { return [
    { type: NgbDatepickerI18n, },
]; };
NgbDatepickerMonthView.propDecorators = {
    'dayTemplate': [{ type: Input },],
    'month': [{ type: Input },],
    'outsideDays': [{ type: Input },],
    'showWeekdays': [{ type: Input },],
    'showWeekNumbers': [{ type: Input },],
    'minDate': [{ type: Input },],
    'maxDate': [{ type: Input },],
    'select': [{ type: Output },],
};
//# sourceMappingURL=datepicker-month-view.js.map