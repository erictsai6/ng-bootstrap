import { Directive, Input, Output, EventEmitter, ElementRef, Renderer } from '@angular/core';
import { NgbDropdownConfig } from './dropdown-config';
/**
 * Transforms a node into a dropdown.
 */
var NgbDropdown = (function () {
    function NgbDropdown(config, _element, _renderer) {
        this._element = _element;
        this._renderer = _renderer;
        /**
         *  Defines whether or not the dropdown-menu is open initially.
         */
        this._open = false;
        /**
         *  An event fired when the dropdown is opened or closed.
         *  Event's payload equals whether dropdown is open.
         */
        this.openChange = new EventEmitter();
        this.up = config.up;
        this.autoClose = config.autoClose;
    }
    NgbDropdown.prototype.ngOnInit = function () {
        if (this._open) {
            this._registerListener();
        }
    };
    NgbDropdown.prototype.ngOnDestroy = function () { this.close(); };
    /**
     * Checks if the dropdown menu is open or not.
     */
    NgbDropdown.prototype.isOpen = function () { return this._open; };
    /**
     * Opens the dropdown menu of a given navbar or tabbed navigation.
     */
    NgbDropdown.prototype.open = function () {
        if (!this._open) {
            this._open = true;
            this._registerListener();
            this.openChange.emit(true);
        }
    };
    /**
     * Closes the dropdown menu of a given navbar or tabbed navigation.
     */
    NgbDropdown.prototype.close = function () {
        if (this._open) {
            this._open = false;
            // Removes "listenGlobal" listener
            if (this._outsideClickListener) {
                this._outsideClickListener();
            }
            this.openChange.emit(false);
        }
    };
    /**
     * Toggles the dropdown menu of a given navbar or tabbed navigation.
     */
    NgbDropdown.prototype.toggle = function () {
        if (this.isOpen()) {
            this.close();
        }
        else {
            this.open();
        }
    };
    NgbDropdown.prototype.closeFromOutsideClick = function ($event) {
        if (this.autoClose === 'always' && $event.button !== 2 && !this._isEventFromToggle($event)) {
            this.close();
        }
        if (this.autoClose === 'outsideClick' && !this._isEventFromInside($event)) {
            this.close();
        }
    };
    NgbDropdown.prototype.closeFromOutsideEsc = function () {
        if (this.autoClose) {
            this.close();
        }
    };
    Object.defineProperty(NgbDropdown.prototype, "toggleElement", {
        /**
         * @internal
         */
        set: function (toggleElement) { this._toggleElement = toggleElement; },
        enumerable: true,
        configurable: true
    });
    NgbDropdown.prototype._isEventFromToggle = function ($event) { return !!this._toggleElement && this._toggleElement.contains($event.target); };
    NgbDropdown.prototype._isEventFromInside = function ($event) { return this._element.nativeElement.contains($event.target); };
    NgbDropdown.prototype._registerListener = function () {
        var _this = this;
        this._outsideClickListener = this._renderer.listenGlobal('document', 'click', function (e) { return _this.closeFromOutsideClick(e); });
    };
    return NgbDropdown;
}());
export { NgbDropdown };
NgbDropdown.decorators = [
    { type: Directive, args: [{
                selector: '[ngbDropdown]',
                exportAs: 'ngbDropdown',
                host: {
                    '[class.dropdown]': '!up',
                    '[class.dropup]': 'up',
                    '[class.show]': 'isOpen()',
                    '(keyup.esc)': 'closeFromOutsideEsc()',
                }
            },] },
];
/** @nocollapse */
NgbDropdown.ctorParameters = function () { return [
    { type: NgbDropdownConfig, },
    { type: ElementRef, },
    { type: Renderer, },
]; };
NgbDropdown.propDecorators = {
    'up': [{ type: Input },],
    'autoClose': [{ type: Input },],
    '_open': [{ type: Input, args: ['open',] },],
    'openChange': [{ type: Output },],
};
/**
 * Allows the dropdown to be toggled via click. This directive is optional.
 */
var NgbDropdownToggle = (function () {
    function NgbDropdownToggle(dropdown, elementRef) {
        this.dropdown = dropdown;
        dropdown.toggleElement = elementRef.nativeElement;
    }
    NgbDropdownToggle.prototype.toggleOpen = function () { this.dropdown.toggle(); };
    return NgbDropdownToggle;
}());
export { NgbDropdownToggle };
NgbDropdownToggle.decorators = [
    { type: Directive, args: [{
                selector: '[ngbDropdownToggle]',
                host: {
                    'class': 'dropdown-toggle',
                    'aria-haspopup': 'true',
                    '[attr.aria-expanded]': 'dropdown.isOpen()',
                    '(click)': 'toggleOpen()'
                }
            },] },
];
/** @nocollapse */
NgbDropdownToggle.ctorParameters = function () { return [
    { type: NgbDropdown, },
    { type: ElementRef, },
]; };
//# sourceMappingURL=dropdown.js.map