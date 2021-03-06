import { ComponentFactoryResolver, ElementRef, EventEmitter, Injector, NgZone, OnDestroy, OnInit, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { ResultTemplateContext, WindowTemplateContext } from './typeahead-window';
import { NgbTypeaheadConfig } from './typeahead-config';
/**
 * Payload of the selectItem event.
 */
export interface NgbTypeaheadSelectItemEvent {
    /**
     * An item about to be selected
     */
    item: any;
    /**
     * Function that will prevent item selection if called
     */
    preventDefault: () => void;
}
/**
 * NgbTypeahead directive provides a simple way of creating powerful typeaheads from any text input
 */
export declare class NgbTypeahead implements ControlValueAccessor, OnInit, OnDestroy {
    private _elementRef;
    private _viewContainerRef;
    private _renderer;
    private _injector;
    private _popupService;
    private results$;
    private _subscription;
    private _userInput;
    private _valueChanges;
    private _focusChanges;
    private _windowRef;
    private _zoneSubscription;
    /**
     * A flag indicating if model values should be restricted to the ones selected from the popup only.
     */
    editable: boolean;
    /**
     * A flag indicating if the first match should automatically be focused as you type.
     */
    focusFirst: boolean;
    /**
     * A function to convert a given value into string to display in the input field
     */
    inputFormatter: (value: any) => string;
    /**
     * A function to transform the provided observable text into the array of results.  Note that the "this" argument
     * is undefined so you need to explicitly bind it to a desired "this" target.
     */
    ngbTypeahead: (text: Observable<string>) => Observable<any[]>;
    /**
     * A function to format a given result before display. This function should return a formatted string without any
     * HTML markup
     */
    resultFormatter: (value: any) => string;
    /**
     * A template to override a matching result default display
     */
    resultTemplate: TemplateRef<ResultTemplateContext>;
    /**
     * A template to override the popup window default display
     */
    windowTemplate: TemplateRef<WindowTemplateContext>;
    /**
     * Show hint when an option in the result list matches.
     */
    showHint: boolean;
    /**
     * Trigger typeahead window on focus.  Automatically shows the window if the user focuses
     */
    triggerOnFocus: boolean;
    /**
     * An event emitted when a match is selected. Event payload is of type NgbTypeaheadSelectItemEvent.
     */
    selectItem: EventEmitter<NgbTypeaheadSelectItemEvent>;
    /**
     * An event emitted when the window is closed
     */
    onClose: EventEmitter<any>;
    activeDescendant: string;
    popupId: string;
    private _onTouched;
    private _onChange;
    constructor(_elementRef: ElementRef, _viewContainerRef: ViewContainerRef, _renderer: Renderer2, _injector: Injector, componentFactoryResolver: ComponentFactoryResolver, config: NgbTypeaheadConfig, ngZone: NgZone);
    ngOnInit(): void;
    ngOnDestroy(): void;
    registerOnChange(fn: (value: any) => any): void;
    registerOnTouched(fn: () => any): void;
    writeValue(value: any): void;
    setDisabledState(isDisabled: boolean): void;
    dismissPopup(): void;
    isPopupOpen(): boolean;
    handleBlur(): void;
    handleKeyDown(event: KeyboardEvent): void;
    private _openPopup();
    private _closePopup();
    private _selectResult(result);
    private _selectResultClosePopup(result);
    private _showHint();
    private _formatItemForInput(item);
    private _writeInputValue(value);
    private _subscribeToUserInput(userInput$);
    private _unsubscribeFromUserInput();
}
