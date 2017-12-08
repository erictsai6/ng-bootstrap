import {Component, Input, TemplateRef, Output, EventEmitter} from '@angular/core';
import {MonthViewModel, DayViewModel, WeekViewModel} from './datepicker-view-model';
import {NgbDate} from './ngb-date';
import {NgbDatepickerI18n} from './datepicker-i18n';
import {DayTemplateContext} from './datepicker-day-template-context';

@Component({
  selector: 'ngb-datepicker-month-view',
  host: {'class': 's-calendar'},
  styles: [`

  `],
  template: `
    <div *ngIf="showWeekdays" class="ngb-dp-week s-row">
      <div *ngIf="showWeekNumbers" class="ngb-dp-weekday"></div>
      <span *ngFor="let w of month.weekdays" class="s-calendar-day u-text-center u-text-uppercase caption">
        {{ i18n.getWeekdayShortName(w) }}
      </span>
    </div>
    <ng-template ngFor let-week [ngForOf]="month.weeks">
      <div *ngIf="!isCollapsed(week)" class="ngb-dp-week s-row">
        <div *ngIf="showWeekNumbers" class="ngb-dp-week-number small text-center font-italic text-muted">{{ week.number }}</div>
        <ng-template ngFor let-day [ngForOf]="week.days">
          <ng-template [ngTemplateOutlet]="dayTemplate" [ngTemplateOutletContext]="buildContext(day)">
          </ng-template>
        </ng-template>
      </div>
    </ng-template>
  `
})
export class NgbDatepickerMonthView {
  @Input() dayTemplate: TemplateRef<DayTemplateContext>;
  @Input() month: MonthViewModel;
  @Input() outsideDays: 'visible' | 'hidden' | 'collapsed';
  @Input() showWeekdays;
  @Input() showWeekNumbers;
  @Input() minDate: NgbDate;
  @Input() maxDate: NgbDate;

  @Output() select = new EventEmitter<NgbDate>();

  constructor(public i18n: NgbDatepickerI18n) {
    this.doSelect = this.doSelect.bind(this);
  }

  buildContext(day) {
    return Object.assign({}, day.context, {
      day: day,
      doSelect: this.doSelect
    });
  }

  doSelect(day: DayViewModel) {
    if (!day.context.disabled && !this.isHidden(day)) {
      this.select.emit(NgbDate.from(day.date));
    }
  }

  isCollapsed(week: WeekViewModel) {
    return this.outsideDays === 'collapsed' && week.days[0].date.month !== this.month.number &&
        week.days[week.days.length - 1].date.month !== this.month.number;
  }

  isHidden(day: DayViewModel) {
    return (this.outsideDays === 'hidden' || this.outsideDays === 'collapsed') && this.month.number !== day.date.month;
  }
}
