import { EventEmitter, TemplateRef, OnInit } from '@angular/core';
import { toString } from '../util/util';
/**
 * Context for the typeahead window template in case you want to override the default one
 */
export interface WindowTemplateContext {
    /**
     * Your typeahead results data model
     */
    results: any;
    /**
     * Search term from the input used to get current result
     */
    term: string;
    /**
     * Typeahead window context
     */
    context: NgbTypeaheadWindow;
}
/**
 * Context for the typeahead result template in case you want to override the default one
 */
export interface ResultTemplateContext {
    /**
     * Your typeahead result data model
     */
    result: any;
    /**
     * Search term from the input used to get current result
     */
    term: string;
}
/**
 * Context for the typeahead no results template
 */
export interface NoResultsTemplateContext {
    /**
     * Search term from the input that did not return any results
     */
    term: string;
}
export declare class NgbTypeaheadWindow implements OnInit {
    private _results;
    private _term;
    private _context;
    activeIdx: number;
    /**
     *  The id for the typeahead widnow. The id should be unique and the same
     *  as the associated typeahead's id.
     */
    id: string;
    /**
     * Flag indicating if the first row should be active initially
     */
    focusFirst: boolean;
    /**
     * Typeahead match results to be displayed. Created as get and set so the ngTemplateOutletContext is only recreated on data
     * changes.
     */
    results: any;
    /**
     * Search term used to get current results. Created as get and set so the ngTemplateOutletContext is only recreated on data
     * changes.
     */
    term: string;
    /**
     * A function used to format a given result before display. This function should return a formatted string without any
     * HTML markup
     */
    formatter: typeof toString;
    /**
     * A template to override a matching result default display
     */
    resultTemplate: TemplateRef<ResultTemplateContext>;
    /**
     * A template used to display a no results message in the dropdown window
     */
    noResultsTemplate: TemplateRef<any>;
    /**
     * A template to override a matching result default display
     */
    windowTemplate: TemplateRef<WindowTemplateContext>;
    /**
     * Event raised when user selects a particular result row
     */
    selectEvent: EventEmitter<{}>;
    activeChangeEvent: EventEmitter<{}>;
    _getWindowContext(): WindowTemplateContext;
    _getNoResultsContext(): {
        term: string;
    };
    getActive(): any;
    markActive(activeIdx: number): void;
    next(): void;
    prev(): void;
    select(item: any): void;
    ngOnInit(): void;
    private _activeChanged();
}
