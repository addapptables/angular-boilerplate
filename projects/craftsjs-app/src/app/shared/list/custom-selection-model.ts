import { ICustomSelection } from '../models/custom-selection-model';
import { Subject } from 'rxjs';
import { getMultipleValuesInSingleSelectionError } from '@angular/cdk/collections';

export class CustomSelectionModel<T extends ICustomSelection<any>> {

  /** Currently-selected values. */
  private _selection = new Array<T>();

  /** Keeps track of the deselected options that haven't been emitted by the change event. */
  private _deselectedToEmit: T[] = [];

  /** Keeps track of the selected options that haven't been emitted by the change event. */
  private _selectedToEmit: T[] = [];

  /** Cache for the array value of the selected items. */
  private _selected: T[] | null;

  /** Selected values. */
  get selected(): T[] {
    if (!this._selected) {
      this._selected = Array.from(this._selection.values());
    }

    return this._selected;
  }

  /** Event emitted when the value has changed. */
  changed: Subject<SelectionChange<T>> = new Subject();

  constructor(
    private _multiple = false,
    initiallySelectedValues?: T[],
    private _emitChanges = true) {

    if (initiallySelectedValues && initiallySelectedValues.length) {
      if (_multiple) {
        initiallySelectedValues.forEach(value => this._markSelected(value));
      } else {
        this._markSelected(initiallySelectedValues[0]);
      }

      // Clear the array in order to avoid firing the change event for preselected values.
      this._selectedToEmit.length = 0;
    }
  }

  /**
   * Selects a value or an array of values.
   */
  select(...values: T[]): void {
    this._verifyValueAssignment(values);
    values.forEach(value => this._markSelected(value));
    this._emitChangeEvent();
  }

  /**
   * Deselects a value or an array of values.
   */
  deselect(...values: T[]): void {
    this._verifyValueAssignment(values);
    values.forEach(value => this._unmarkSelected(value));
    this._emitChangeEvent();
  }

  /**
   * Toggles a value between selected and deselected.
   */
  toggle(value: T): void {
    this.isSelected(value) ? this.deselect(value) : this.select(value);
  }

  /**
   * Clears all of the selected values.
   */
  clear(): void {
    this._unmarkAll();
    this._emitChangeEvent();
  }

  /**
   * Determines whether a value is selected.
   */
  isSelected(value: T): boolean {
    return this._selection.find(x => x.id === value.id) !== undefined;
  }

  /**
   * Determines whether the model does not have a value.
   */
  isEmpty(): boolean {
    return this._selection.length === 0;
  }

  /**
   * Determines whether the model has a value.
   */
  hasValue(): boolean {
    return !this.isEmpty();
  }

  /**
   * Sorts the selected values based on a predicate function.
   */
  sort(predicate?: (a: T, b: T) => number): void {
    if (this._multiple && this.selected) {
      this._selected.sort(predicate);
    }
  }

  /**
   * Gets whether multiple values can be selected.
   */
  isMultipleSelection() {
    return this._multiple;
  }

  /** Emits a change event and clears the records of selected and deselected values. */
  private _emitChangeEvent() {
    // Clear the selected values so they can be re-cached.
    this._selected = null;

    if (this._selectedToEmit.length || this._deselectedToEmit.length) {
      this.changed.next({
        source: this,
        added: this._selectedToEmit,
        removed: this._deselectedToEmit,
        allSelection: this._selection
      });

      this._deselectedToEmit = [];
      this._selectedToEmit = [];
    }
  }

  /** Selects a value. */
  private _markSelected(value: T) {
    if (!this.isSelected(value)) {
      if (!this._multiple) {
        this._unmarkAll();
      }

      this._selection.push(value);

      if (this._emitChanges) {
        this._selectedToEmit.push(value);
      }
    }
  }

  /** Deselects a value. */
  private _unmarkSelected(value: T) {
    if (this.isSelected(value)) {
      const index = this._selection.findIndex(x => x.id === value.id);
      this._selection.splice(index, 1);
      if (this._emitChanges) {
        this._deselectedToEmit.push(value);
      }
    }
  }

  /** Clears out the selected values. */
  private _unmarkAll() {
    if (!this.isEmpty()) {
      const arrayDelete = [...this._selection];
      arrayDelete.forEach(value => this._unmarkSelected(value));
    }
  }

  /**
   * Verifies the value assignment and throws an error if the specified value array is
   * including multiple values while the selection model is not supporting multiple values.
   */
  private _verifyValueAssignment(values: T[]) {
    if (values.length > 1 && !this._multiple) {
      throw getMultipleValuesInSingleSelectionError();
    }
  }
}

/**
 * Event emitted when the value of a MatSelectionModel has changed.
 * @docs-private
 */
export interface SelectionChange<T extends ICustomSelection<any>> {
  /** Model that dispatched the event. */
  source: CustomSelectionModel<T>;
  /** Options that were added to the model. */
  added: T[];

  allSelection: T[];
  /** Options that were removed from the model. */
  removed: T[];
}
