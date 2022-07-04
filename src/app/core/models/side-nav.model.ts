export interface Menu {
  name?: string,
  label: string,
  route?: string,
  disabled?: boolean,
  id?: string,
  items?: Menu[],
  permissions?: string[],
  imageIcon?: string
}

export interface AccessibleMenu {
  id: string;
  name: string;
}
