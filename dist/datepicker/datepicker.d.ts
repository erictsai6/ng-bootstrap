import { ChangeDetectorRef, OnChanges, TemplateRef, OnInit, SimpleChanges, EventEmitter, OnDestroy } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { NgbCalendar } from './ngb-calendar';
import { NgbDate } from './ngb-date';
import { NgbDatepickerService } from './datepicker-service';
import { NgbDatepickerKeyMapService } from './datepicker-keymap-service';
import { DatepickerViewModel, NavigationEvent } from './datepicker-view-model';
import { DayTemplateContext } from './datepicker-day-template-context';
import { NgbDatepickerConfig } from './datepicker-config';
import { NgbDateStruct } from './ngb-date-struct';
import { NgbDatepickerI18n } from './datepicker-i18n';
/**
 * The payload of the datepicker navigation event
 */
export interface NgbDatepickerNavigateEvent {
    /**
     * Currently displayed month
     */
    current: {
        year: number;
        month: number;
    };
    /**
     * Month we're navigating to
     */
    next: {
        year: number;
        month: number;
    };
}
/**
 * A lightweight and highly configurable datepicker directive
 */
export declare class NgbDatepicker implements OnDestroy, OnChanges, OnInit, ControlValueAccessor {
    private _keyMapService;
    _service: NgbDatepickerService;
    private _calendar;
    i18n: NgbDatepickerI18n;
    private _cd;
    model: DatepickerViewModel;
    private _subscription;
    /**
     * Reference for the custom template for the day display
     */
    dayTemplate: TemplateRef<DayTemplateContext>;
    /**
     * Number of months to display
     */
    displayMonths: number;
    /**
     * First day of the week. With default calendar we use ISO 8601: 'weekday' is 1=Mon ... 7=Sun
     */
    firstDayOfWeek: number;
    /**
     * Callback to mark a given date as disabled.
     * 'Current' contains the month that will be displayed in the view
     */
    markDisabled: (date: NgbDateStruct, current: {
        year: number;
        month: number;
    }) => boolean;
    /**
     * Max date for the navigation. If not provided will be 10 years from today or `startDate`
     */
    maxDate: NgbDateStruct;
    /**
     * Min date for the navigation. If not provided will be 10 years before today or `startDate`
     */
    minDate: NgbDateStruct;
    /**
     * Navigation type: `select` (default with select boxes for month and year), `arrows`
     * (without select boxes, only navigation arrows) or `none` (no navigation at all)
     */
    navigation: 'select' | 'arrows' | 'none';
    /**
     * The way to display days that don't belong to current month: `visible` (default),
     * `hidden` (not displayed) or `collapsed` (not displayed with empty space collapsed)
     */
    outsideDays: 'visible' | 'collapsed' | 'hidden';
    /**
     * Whether to display days of the week
     */
    showWeekdays: boolean;
    /**
     * Whether to display week numbers
     */
    showWeekNumbers: boolean;
    /**
     * Date to open calendar with.
     * With default calendar we use ISO 8601: 'month' is 1=Jan ... 12=Dec.
     * If nothing or invalid date provided, calendar will open with current month.
     * Use 'navigateTo(date)' as an alternative
     */
    startDate: {
        year: number;
        month: number;
    };
    /**
     * An event fired when navigation happens and currently displayed month changes.
     * See NgbDatepickerNavigateEvent for the payload info.
     */
    navigate: EventEmitter<NgbDatepickerNavigateEvent>;
    onChange: (_: any) => void;
    onTouched: () => void;
    constructor(_keyMapService: NgbDatepickerKeyMapService, _service: NgbDatepickerService, _calendar: NgbCalendar, i18n: NgbDatepickerI18n, config: NgbDatepickerConfig, _cd: ChangeDetectorRef);
    getHeaderHeight(): number;
    getHeaderMargin(): number;
    /**
     * Navigates current view to provided date.
     * With default calendar we use ISO 8601: 'month' is 1=Jan ... 12=Dec.
     * If nothing or invalid date provided calendar will open current month.
     * Use 'startDate' input as an alternative
     */
    navigateTo(date?: {
        year: number;
        month: number;
    }): void;
    ngOnDestroy(): void;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    onDateSelect(date: NgbDate): void;
    onKeyDown(event: KeyboardEvent): void;
    onNavigateDateSelect(date: NgbDate): void;
    onNavigateEvent(event: NavigationEvent): void;
    registerOnChange(fn: (value: any) => any): void;
    registerOnTouched(fn: () => any): void;
    setDisabledState(isDisabled: boolean): void;
    showFocus(focusVisible: boolean): void;
    writeValue(value: any): void;
    private _setDates();
}
