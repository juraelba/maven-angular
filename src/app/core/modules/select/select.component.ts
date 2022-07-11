import {
  Component,
  OnInit,
  Input,
  ContentChild,
  ElementRef,
  SimpleChanges,
  Output,
  EventEmitter,
  ViewChild
} from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil} from 'rxjs/operators'

import { SelectOption } from '../../models/select.model';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
  @Input() multiple: boolean = false;
  @Input() disabled: boolean = false;
  @Input() search: boolean = false;
  @Input() placeholder: string;
  @Input() options: SelectOption[] = [];
  @Input() borderLabel: string;

  @Output() applyChanges: EventEmitter<SelectOption[]> = new EventEmitter();

  @ViewChild('selectContainer') selectContainer: ElementRef;

  @ContentChild('valueContainer') valueContainer: ElementRef;
  @ContentChild('dropdownHeaderContainer') dropdownHeaderContainer: ElementRef;

  inputChange$ = new Subject<string>();
  unsubscribeAll: Subject<null> = new Subject<null>();
  selected: SelectOption[] = [];
  temporarySelected: SelectOption[] = [];
  arrowIcon: string = 'assets/images/icons/arrow-down.svg';
  isOpened: boolean = false;
  allSelected: boolean = false;
  dropdownOptions: SelectOption[] = [];

  constructor() { }

  ngOnInit(): void {
    this.setOptions(this.options);

    this.inputChange$
      .pipe(
        takeUntil(this.unsubscribeAll),
        debounceTime(500)
      )
      .subscribe((value: string) => {
        const filteredByLabel = this.filterOption(value.toLocaleLowerCase());

        this.dropdownOptions = this.updateOptionsWithSelected(filteredByLabel, this.temporarySelected);
      })
  }

  ngOnChanges(changes: SimpleChanges): void {
    const shouldUpdateOptions = changes.options && changes.options.previousValue
      && changes.options.currentValue.length !== changes.options.previousValue.length;

    if(shouldUpdateOptions) {
      this.setOptions(changes.options.currentValue);
    }
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(null);
    this.unsubscribeAll.complete();
  }

  setOptions(options: SelectOption[]): void {
    const transformedOptions = this.transformOptions(options);
    const sortedOptions = this.sortOptionsByLabel(transformedOptions);

    this.options = sortedOptions;
    this.dropdownOptions = sortedOptions;
  }

  filterOption(labelFilter: string): SelectOption[] {
    return this.options.filter(({ label }) => label.toLocaleLowerCase().includes(labelFilter));
  }

  transformOptions(options: SelectOption[]) {
    return options.map((option) => {
      const groupLetter = option.label[0].toUpperCase();

      return {
        ...option,
        selected: option.selected || false,
        groupLetter
      }
    })
  }

  sortOptionsByLabel(options: SelectOption[]) {
    return [ ...options].sort((a, b) => {
      if (a.label > b.label) {
        return 1;
      }
      if (a.label < b.label) {
        return -1;
      }

      return 0;
    })
  }

  updateOptionsWithSelected(options: SelectOption[], selectedOptions: SelectOption[]) {
    return options.map((option) => {
      const selected = selectedOptions.some(({ id }) => id === option.id);

      return {
        ...option,
        selected
      }
    });
  }

  onCancelButtonClick(event: MouseEvent): void {
    event.stopPropagation();

    this.isOpened = false;
    this.temporarySelected = [ ...this.selected ];
    this.dropdownOptions = this.updateOptionsWithSelected(this.dropdownOptions, this.selected);
  }

  onOkButtonClick(event: MouseEvent): void {
    event.stopPropagation();

    this.isOpened = false;

    this.selected = [ ...this.temporarySelected ];
    this.applyChanges.emit([ ...this.temporarySelected ]);
  }

  toggleMenuOpen(): void {
    this.isOpened = !this.isOpened;

    if(this.isOpened) {
      this.dropdownOptions = this.updateOptionsWithSelected(this.options, this.selected);
    }
  }

  toogleSelectOption(event: MouseEvent, option: SelectOption) {
    event.stopPropagation();

    this.dropdownOptions = this.dropdownOptions.map((dropdownOption) => {
      const selected = dropdownOption.id === option.id
        ? !option.selected
        : dropdownOption.selected;
    
      return {
        ...dropdownOption,
        selected
      }
    });

    this.temporarySelected = this.dropdownOptions.filter(({ selected }) => selected);
  }

  toggleSelectAll(event: MouseEvent) {
    event.stopPropagation();

    this.allSelected = !this.allSelected;

    this.temporarySelected = this.dropdownOptions.map((option) => ({ ...option, selected: this.allSelected }));
    this.dropdownOptions = [ ...this.temporarySelected ];
  }

  isNewGroupLetter(prevOption: SelectOption | undefined, currentOption: SelectOption) {
    const prevLetter = prevOption?.groupLetter;
    const currentLetter = currentOption.groupLetter;

    return prevLetter !== currentLetter;
  }

  onSearchInputClick(event: MouseEvent) {
    event.stopPropagation();
  }

  onSearchInputChange(value: string) {
    this.inputChange$.next(value)
  }

  getSelectedOptionsLabels(): string {
    return this.selected.map(({ label }) => label).join(', ');
  }
}
