import { Component, Input, Output, EventEmitter } from '@angular/core';
import { toString } from '../util/util';
var NgbTypeaheadWindow = (function () {
    function NgbTypeaheadWindow() {
        this._context = { results: this._results, term: this._term, context: this };
        this.activeIdx = 0;
        /**
         * Flag indicating if the first row should be active initially
         */
        this.focusFirst = true;
        /**
         * A function used to format a given result before display. This function should return a formatted string without any
         * HTML markup
         */
        this.formatter = toString;
        /**
         * Event raised when user selects a particular result row
         */
        this.selectEvent = new EventEmitter();
        this.activeChangeEvent = new EventEmitter();
    }
    Object.defineProperty(NgbTypeaheadWindow.prototype, "results", {
        /**
         * Typeahead match results to be displayed. Created as get and set so the ngOutletContext is only recreated on data
         * changes.
         */
        get: function () {
            return this._results;
        },
        set: function (value) {
            this._results = value;
            this._context.results = value;
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(NgbTypeaheadWindow.prototype, "term", {
        /**
         * Search term used to get current results. Created as get and set so the ngOutletContext is only recreated on data
         * changes.
         */
        get: function () {
            return this._term;
        },
        set: function (value) {
            this._term = value;
            this._context.term = value;
        },
        enumerable: true,
        configurable: true
    });
    ;
    NgbTypeaheadWindow.prototype._getWindowContext = function () { return this._context; };
    NgbTypeaheadWindow.prototype._getNoResultsContext = function () { return { term: this.term }; };
    NgbTypeaheadWindow.prototype.getActive = function () { return this.results[this.activeIdx]; };
    NgbTypeaheadWindow.prototype.markActive = function (activeIdx) {
        this.activeIdx = activeIdx;
        this._activeChanged();
    };
    NgbTypeaheadWindow.prototype.next = function () {
        if (this.activeIdx === this.results.length - 1) {
            this.activeIdx = this.focusFirst ? (this.activeIdx + 1) % this.results.length : -1;
        }
        else {
            this.activeIdx++;
        }
        this._activeChanged();
    };
    NgbTypeaheadWindow.prototype.prev = function () {
        if (this.activeIdx < 0) {
            this.activeIdx = this.results.length - 1;
        }
        else if (this.activeIdx === 0) {
            this.activeIdx = this.focusFirst ? this.results.length - 1 : -1;
        }
        else {
            this.activeIdx--;
        }
        this._activeChanged();
    };
    NgbTypeaheadWindow.prototype.select = function (item) { this.selectEvent.emit(item); };
    NgbTypeaheadWindow.prototype.ngOnInit = function () {
        this.activeIdx = this.focusFirst ? 0 : -1;
        this._activeChanged();
    };
    NgbTypeaheadWindow.prototype._activeChanged = function () {
        this.activeChangeEvent.emit(this.activeIdx >= 0 ? this.id + '-' + this.activeIdx : undefined);
    };
    return NgbTypeaheadWindow;
}());
export { NgbTypeaheadWindow };
NgbTypeaheadWindow.decorators = [
    { type: Component, args: [{
                selector: 'ngb-typeahead-window',
                exportAs: 'ngbTypeaheadWindow',
                host: { 'class': 's-typeahead', 'style': 'display: block;', 'role': 'listbox', '[id]': 'id' },
                template: "\n    <ng-template #rt let-result=\"result\" let-term=\"term\" let-formatter=\"formatter\">\n      <ngb-highlight [result]=\"formatter(result)\" [term]=\"term\"></ngb-highlight>\n    </ng-template>\n    <ng-template #wt let-results=\"results\" let-context=\"context\">\n      <ng-template ngFor [ngForOf]=\"results\" let-result let-idx=\"index\">\n        <button type=\"button\" class=\"dropdown-item\" role=\"option\"\n          [id]=\"id + '-' + idx\"\n          [class.active]=\"idx === activeIdx\"\n          (mouseenter)=\"context.markActive(idx)\"\n          (click)=\"context.select(result)\">\n            <ng-template [ngTemplateOutlet]=\"resultTemplate || rt\"\n            [ngOutletContext]=\"{result: result, term: term, formatter: formatter}\"></ng-template>\n        </button>\n      </ng-template>\n    </ng-template>\n    <ng-template [ngTemplateOutlet]=\"windowTemplate || wt\"\n      [ngOutletContext]=\"_getWindowContext()\">\n    </ng-template>\n    <ng-template *ngIf=\"!results || results.length === 0\"\n      [ngTemplateOutlet]=\"noResultsTemplate\"\n      [ngOutletContext]=\"_getNoResultsContext()\">\n    </ng-template>\n  "
            },] },
];
/** @nocollapse */
NgbTypeaheadWindow.ctorParameters = function () { return []; };
NgbTypeaheadWindow.propDecorators = {
    'id': [{ type: Input },],
    'focusFirst': [{ type: Input },],
    'results': [{ type: Input },],
    'term': [{ type: Input },],
    'formatter': [{ type: Input },],
    'resultTemplate': [{ type: Input },],
    'noResultsTemplate': [{ type: Input },],
    'windowTemplate': [{ type: Input },],
    'selectEvent': [{ type: Output, args: ['select',] },],
    'activeChangeEvent': [{ type: Output, args: ['activeChange',] },],
};
//# sourceMappingURL=typeahead-window.js.map