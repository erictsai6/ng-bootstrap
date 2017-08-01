import { EventEmitter, ElementRef, OnInit, OnDestroy, Renderer } from '@angular/core';
import { NgbDropdownConfig } from './dropdown-config';
/**
 * Transforms a node into a dropdown.
 */
export declare class NgbDropdown implements OnInit, OnDestroy {
    private _element;
    private _renderer;
    private _toggleElement;
    /**
     * Holds the remove listener method returned by listenGlobal
     */
    private _outsideClickListener;
    /**
     * Indicates that the dropdown should open upwards
     */
    up: boolean;
    /**
     * Indicates that dropdown should be closed when selecting one of dropdown items (click) or pressing ESC.
     */
    autoClose: 'always' | 'disabled' | 'outsideClick';
    /**
     *  Defines whether or not the dropdown-menu is open initially.
     */
    _open: boolean;
    /**
     *  An event fired when the dropdown is opened or closed.
     *  Event's payload equals whether dropdown is open.
     */
    openChange: EventEmitter<{}>;
    constructor(config: NgbDropdownConfig, _element: ElementRef, _renderer: Renderer);
    ngOnInit(): void;
    ngOnDestroy(): void;
    /**
     * Checks if the dropdown menu is open or not.
     */
    isOpen(): boolean;
    /**
     * Opens the dropdown menu of a given navbar or tabbed navigation.
     */
    open(): void;
    /**
     * Closes the dropdown menu of a given navbar or tabbed navigation.
     */
    close(): void;
    /**
     * Toggles the dropdown menu of a given navbar or tabbed navigation.
     */
    toggle(): void;
    closeFromOutsideClick($event: any): void;
    closeFromOutsideEsc(): void;
    private _isEventFromToggle($event);
    private _isEventFromInside($event);
    private _registerListener();
}
/**
 * Allows the dropdown to be toggled via click. This directive is optional.
 */
export declare class NgbDropdownToggle {
    dropdown: NgbDropdown;
    constructor(dropdown: NgbDropdown, elementRef: ElementRef);
    toggleOpen(): void;
}
