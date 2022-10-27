export interface Menu {
  name?: string;
  label: string;
  route?: string;
  disabled?: boolean;
  id?: string;
  items?: Menu[];
  permissions?: string[];
  imageIcon?: string;
  expanded?: boolean;
  isSelected?: boolean;
  classNames?: string;
}

export interface AccessibleMenu {
  id: string;
  name: string;
}
