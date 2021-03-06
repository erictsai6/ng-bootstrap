import { Component, Input, Output, EventEmitter } from '@angular/core';
import { toString } from '../util/util';
var NgbTypeaheadWindow = (function () {
    function NgbTypeaheadWindow() {
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
        /**
         * Event raised when the active link changes from either hover or keyboard up/down
         */
        this.activeChangeEvent = new EventEmitter();
        this.markActive = this.markActive.bind(this);
        this.select = this.select.bind(this);
    }
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
                host: { 'class': 'dropdown-menu', 'style': 'display: block', 'role': 'listbox', '[id]': 'id' },
                template: "\n    <ng-template *ngIf=\"windowTemplate\" #customContent [ngTemplateOutlet]=\"windowTemplate\"\n      [ngOutletContext]=\"{\n          results: results,\n          term: term,\n          activeIdx: activeIdx,\n          formatter: formatter,\n          markActive: markActive,\n          select: select\n        }\">\n    </ng-template>\n    <ng-template *ngIf=\"!windowTemplate\" #defaultContent [ngTemplateOutlet]=\"windowDefault\"\n      [ngOutletContext]=\"{\n          results: results,\n          term: term,\n          activeIdx: activeIdx,\n          formatter: formatter,\n          markActive: markActive,\n          select: select\n        }\">\n    </ng-template>\n    <ng-template #rt let-result=\"result\" let-term=\"term\" let-formatter=\"formatter\">\n      <ngb-highlight [result]=\"formatter(result)\" [term]=\"term\"></ngb-highlight>\n    </ng-template>\n    <ng-template #windowDefault let-results=\"results\"\n      let-term=\"term\"\n      let-formatter=\"formatter\"\n      let-markActive=\"markActive\"\n      let-activeIdx=\"activeIdx\"\n      let-select=\"select\">\n      <ng-container *ngFor=\"let result of results\">\n        <button type=\"button\" class=\"dropdown-item\" role=\"option\"\n          [id]=\"id + '-' + idx\"\n          [class.active]=\"idx === activeIdx\"\n          (mouseenter)=\"markActive(idx)\"\n          (click)=\"select(result)\">\n            <ng-template [ngTemplateOutlet]=\"resultTemplate || rt\"\n              [ngOutletContext]=\"{result: result, term: term, formatter: formatter}\">\n            </ng-template>\n        </button>\n      </ng-container>\n    </ng-template>\n  "
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
    'windowTemplate': [{ type: Input },],
    'selectEvent': [{ type: Output, args: ['select',] },],
    'activeChangeEvent': [{ type: Output, args: ['activeChange',] },],
};
//# sourceMappingURL=typeahead-window.js.map