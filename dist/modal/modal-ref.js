import { Injectable, ComponentRef } from '@angular/core';
import { ContentRef } from '../util/popup';
/**
 * A reference to an active (currently opened) modal. Instances of this class
 * can be injected into components passed as modal content.
 */
var NgbActiveModal = (function () {
    function NgbActiveModal() {
    }
    /**
     * Can be used to close a modal, passing an optional result.
     */
    /**
       * Can be used to close a modal, passing an optional result.
       */
    NgbActiveModal.prototype.close = /**
       * Can be used to close a modal, passing an optional result.
       */
    function (result) { };
    /**
     * Can be used to dismiss a modal, passing an optional reason.
     */
    /**
       * Can be used to dismiss a modal, passing an optional reason.
       */
    NgbActiveModal.prototype.dismiss = /**
       * Can be used to dismiss a modal, passing an optional reason.
       */
    function (reason) { };
    NgbActiveModal.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    NgbActiveModal.ctorParameters = function () { return []; };
    return NgbActiveModal;
}());
export { NgbActiveModal };
/**
 * A reference to a newly opened modal.
 */
var NgbModalRef = (function () {
    function NgbModalRef(_windowCmptRef, _contentRef, _backdropCmptRef) {
        var _this = this;
        this._windowCmptRef = _windowCmptRef;
        this._contentRef = _contentRef;
        this._backdropCmptRef = _backdropCmptRef;
        _windowCmptRef.instance.dismissEvent.subscribe(function (reason) { _this.dismiss(reason); });
        this.result = new Promise(function (resolve, reject) {
            _this._resolve = resolve;
            _this._reject = reject;
        });
        this.result.then(null, function () { });
    }
    Object.defineProperty(NgbModalRef.prototype, "componentInstance", {
        /**
         * The instance of component used as modal's content.
         * Undefined when a TemplateRef is used as modal's content.
         */
        get: /**
           * The instance of component used as modal's content.
           * Undefined when a TemplateRef is used as modal's content.
           */
        function () {
            if (this._contentRef.componentRef) {
                return this._contentRef.componentRef.instance;
            }
        },
        // only needed to keep TS1.8 compatibility
        set: 
        // only needed to keep TS1.8 compatibility
        function (instance) { },
        enumerable: true,
        configurable: true
    });
    /**
     * Can be used to close a modal, passing an optional result.
     */
    /**
       * Can be used to close a modal, passing an optional result.
       */
    NgbModalRef.prototype.close = /**
       * Can be used to close a modal, passing an optional result.
       */
    function (result) {
        if (this._windowCmptRef) {
            this._resolve(result);
            this._removeModalElements();
        }
    };
    /**
     * Can be used to dismiss a modal, passing an optional reason.
     */
    /**
       * Can be used to dismiss a modal, passing an optional reason.
       */
    NgbModalRef.prototype.dismiss = /**
       * Can be used to dismiss a modal, passing an optional reason.
       */
    function (reason) {
        if (this._windowCmptRef) {
            this._reject(reason);
            this._removeModalElements(reason);
        }
    };
    NgbModalRef.prototype._removeModalElements = function (reason) {
        var _this = this;
        var windowNativeEl = this._windowCmptRef.location.nativeElement;
        windowNativeEl.classList.remove('show');
        var delay = (reason && reason.reason === 'AUTOCLOSE') ? 0 : 250;
        setTimeout(function () {
            windowNativeEl.parentNode.removeChild(windowNativeEl);
            _this._windowCmptRef.destroy();
            if (_this._backdropCmptRef) {
                var backdropNativeEl = _this._backdropCmptRef.location.nativeElement;
                backdropNativeEl.parentNode.removeChild(backdropNativeEl);
                _this._backdropCmptRef.destroy();
            }
            if (_this._contentRef && _this._contentRef.viewRef) {
                _this._contentRef.viewRef.destroy();
            }
            _this._windowCmptRef = null;
            _this._backdropCmptRef = null;
            _this._contentRef = null;
        }, delay);
    };
    NgbModalRef.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    NgbModalRef.ctorParameters = function () { return [
        { type: ComponentRef, },
        { type: ContentRef, },
        { type: ComponentRef, },
    ]; };
    return NgbModalRef;
}());
export { NgbModalRef };
//# sourceMappingURL=modal-ref.js.map