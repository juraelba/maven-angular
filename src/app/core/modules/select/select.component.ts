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
import { is } from 'ramda'
import { Subject } from 'rxjs';
import { debounceTime, takeUntil, tap } from 'rxjs/operators'

import { SelectOption } from '../../models/select.model';
import { StyleTypesEnum } from '@enums/styles.enum';

interface SelectInpuClickEvent {
  event: MouseEvent;
  isOpened: boolean
}

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit {
  @Input() multiple: boolean = false;
  @Input() disabled: boolean = false;
  @Input() search: boolean = false;
  @Input() allSelectedVisible: boolean = true;
  @Input() placeholder: string;
  @Input() options: SelectOption[] = [];
  @Input() borderLabel: string;
  @Input() panelOpen: boolean;
  @Input() grouping: boolean = true;
  @Input() customGrouping: boolean = false;
  @Input() valueContainerWidth: string = '100%';
  @Input() sort: boolean = true;
  @Input() isArrowIconVisible: boolean = true;

  @Output() applyChanges: EventEmitter<SelectOption[]> = new EventEmitter();
  @Output() clear: EventEmitter<undefined> = new EventEmitter();
  @Output() closeMenu: EventEmitter<null> = new EventEmitter();
  @Output() selectInpuClick: EventEmitter<SelectInpuClickEvent> = new EventEmitter();

  @ViewChild('selectContainer') selectContainer: ElementRef;

  @ContentChild('valueContainer') valueContainer: ElementRef;
  @ContentChild('dropdownHeaderContainer') dropdownHeaderContainer: ElementRef;
  @ContentChild('indicators') indicators: ElementRef;
  @ContentChild('selectInputTemplate') selectInputTemplate: ElementRef;
  @ContentChild('dropdownTemplate') dropdownTemplate: ElementRef;

  inputChange$ = new Subject<string>();
  unsubscribeAll: Subject<null> = new Subject<null>();
  selected: SelectOption[] = [];
  temporarySelected: SelectOption[] = [];
  arrowIcon: string = 'assets/images/icons/arrow-down.svg';
  isOpened: boolean = false;
  allSelected: boolean = false;
  dropdownOptions: SelectOption[] = [];
  searchValue: string = '';
  styleTypes = StyleTypesEnum;

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
    if(changes?.options?.currentValue) {
      this.setOptions(changes?.options?.currentValue || []);
    }

    if(typeof changes.panelOpen !== 'undefined') {
      this.isOpened = changes.panelOpen.currentValue;
    }
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(null);
    this.unsubscribeAll.complete();
  }

  setOptions(options: SelectOption[]): void {
    const transformedOptions = this.customGrouping ? options: this.transformOptions(options);
    const sortedOptions = this.sort ? this.sortOptionsByLabel(transformedOptions) : transformedOptions;

    this.options = [ ...sortedOptions ];
    this.dropdownOptions = [ ...sortedOptions ];
    this.selected = sortedOptions.filter(({ selected }) => selected);
    this.allSelected = this.selected.length === this.options.length;
  }

  filterOption(labelFilter: string): SelectOption[] {
    return this.options.filter(({ label, id }) => {
      const selected = this.temporarySelected.some((selectedOption) => id === selectedOption.id);

      return selected || label.toLocaleLowerCase().includes(labelFilter)
    });
  }

  transformOptions(options: SelectOption[]): SelectOption[] {
    return options.map((option) => {
      const { label } = option;
      const groupLetter = is(String, label) ? label[0].toUpperCase() : '';

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

  onClearButtonClick(event: MouseEvent): void {
    event.stopPropagation();

    this.temporarySelected = [];
    this.searchValue = '';
    this.dropdownOptions = this.updateOptionsWithSelected(this.options, []);
    this.allSelected = false;
    this.clear.emit();
  }

  onOkButtonClick(event: MouseEvent): void {
    event.stopPropagation();

    const width = this.selectContainer.nativeElement.getBoundingClientRect().width;

    this.isOpened = false;
    this.valueContainerWidth = `${ width-60 }px`;
    this.selected = [ ...this.temporarySelected ];
    const selected = this.dropdownOptions.filter(({ selected }) => selected);
  
    this.applyChanges.emit(selected);
    this.closeMenu.emit();
  }

  toggleMenuOpen(event: MouseEvent): void {
    event.stopPropagation();

    this.isOpened = !this.isOpened;

    this.selectInpuClick.emit({ event, isOpened: this.isOpened });
  
    if(this.isOpened) {
      this.dropdownOptions = this.updateOptionsWithSelected(this.options, this.selected);
    }
  }

  toggleSelectOption(event: MouseEvent, option: SelectOption): void {
    event.stopPropagation();

    if(this.multiple) {
      this.toggleMultipleSelectOption(option);
    } else {
      this.toggleSingleSelectOption(option);
    }

  }

  toggleSingleSelectOption(option: SelectOption): void {
    this.dropdownOptions = this.dropdownOptions.map((dropdownOption) => {
      const selected = dropdownOption.id === option.id ? true : false
    
      return {
        ...dropdownOption,
        selected
      }
    });
  }

  toggleMultipleSelectOption(option: SelectOption): void {
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

  isAllSelected(options: SelectOption[]): boolean {
    const selected = this.options.filter(({ selected }) => selected);

    return selected.length === options.length;
  }

  onClickOutside(): void {
    this.temporarySelected = [];
    this.isOpened = false;

    this.dropdownOptions = [ ...this.options ];
    this.allSelected = this.isAllSelected(this.options);

    this.closeMenu.emit();
  }
}