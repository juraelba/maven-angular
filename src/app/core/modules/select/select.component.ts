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
import { debounceTime, takeUntil, tap } from 'rxjs/operators'

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
  @Input() panelOpen: boolean;
  @Input() grouping: boolean = true;
  @Input() valueContainerWidth: string = '100%';

  @Output() applyChanges: EventEmitter<SelectOption[]> = new EventEmitter();
  @Output() cancelChanges: EventEmitter<undefined> = new EventEmitter();

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
  searchValue: string = '';

  constructor() { }

  ngOnInit(): void {
    this.isOpened = this.panelOpen;
    this.setOptions(this.options);

    this.inputChange$
      .pipe(
        takeUntil(this.unsubscribeAll),
        tap((value: string) => {
          this.searchValue = value;
        }),
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

    if(changes.panelOpen?.currentValue !== changes.panelOpen?.previousValue) {
      this.isOpened = changes.panelOpen.currentValue;

      if(this.isOpened) {
        this.dropdownOptions = this.updateOptionsWithSelected(this.options, this.selected);
      }
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
    return this.options.filter(({ label, id }) => {
      const selected = this.temporarySelected.some((selectedOption) => id === selectedOption.id);

      return selected || label.toLocaleLowerCase().includes(labelFilter)
    });
  }

  transformOptions(options: SelectOption[]): SelectOption[] {
    return options.map((option) => {
      const groupLetter = option.label[0].toUpperCase();

      return {
        ...option,
        selected: option.selected || false,
        groupLetter
      }
    })
  }

  sortOptionsByLabel(options: SelectOption[]): SelectOption[] {
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

  updateOptionsWithSelected(options: SelectOption[], selectedOptions: SelectOption[]): SelectOption[] {
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


    this.cancelChanges.emit();
  }

  onOkButtonClick(event: MouseEvent): void {
    event.stopPropagation();

    const width = this.selectContainer.nativeElement.getBoundingClientRect().width;

    this.isOpened = false;
    this.valueContainerWidth = `${ width-60 }px`;
    this.selected = [ ...this.temporarySelected ];
  
    this.applyChanges.emit([ ...this.temporarySelected ]);
  }

  toggleMenuOpen(): void {
    this.isOpened = typeof this.panelOpen !== 'undefined' ? this.panelOpen : !this.isOpened;

    if(this.isOpened) {
      this.dropdownOptions = this.updateOptionsWithSelected(this.options, this.selected);
    }
  }

  toogleSelectOption(event: MouseEvent, option: SelectOption): void {
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
    this.allSelected = this.temporarySelected.length === this.dropdownOptions.length;
  }

  toggleSelectAll(event: MouseEvent): void {
    event.stopPropagation();

    this.allSelected = !this.allSelected;

    if(this.allSelected) {
      this.inputChange$.next('');
    }

    const selectedOptions = this.options.map((option) => ({ ...option, selected: this.allSelected }));

    this.temporarySelected = this.allSelected ? [ ...selectedOptions ] : [];
    this.dropdownOptions = [ ...selectedOptions ];
  }

  isNewGroupLetter(prevOption: SelectOption | undefined, currentOption: SelectOption): boolean {
    const prevLetter = prevOption?.groupLetter;
    const currentLetter = currentOption.groupLetter;

    return prevLetter !== currentLetter;
  }

  onSearchInputClick(event: MouseEvent): void {
    event.stopPropagation();
  }

  onSearchInputChange(value: string): void {
    this.inputChange$.next(value)
  }

  getSelectedOptionsLabels(): string {
    return this.selected.map(({ label }) => label).join(', ');
  }
}