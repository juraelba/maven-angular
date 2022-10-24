import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Menu, AccessibleMenu } from '../models/side-nav.model';

@Injectable({
  providedIn: 'root',
})
export class SideNavService {
  constructor(private http: HttpClient) {}

  fetchMenuData(): Observable<AccessibleMenu[]> {
    const url = environment.api + '/menu';

    return this.http.get<AccessibleMenu[]>(url);
  }

  isAvailable(
    permissions: string[] = [],
    accessibleMenu: AccessibleMenu[]
  ): boolean {
    return permissions.length
      ? accessibleMenu.some(({ id }) => permissions.includes(id))
      : true;
  }

  updateDisabledState(menu: Menu[], accessibleMenu: AccessibleMenu[]): Menu[] {
    return menu.map(({ permissions, items, ...rest }) => {
      const isDisabled = !this.isAvailable(permissions, accessibleMenu);

      const updatedItem: Menu = {
        ...rest,
        permissions,
        disabled: isDisabled,
      };

      if (items) {
        updatedItem.items = this.updateDisabledState(items, accessibleMenu);
      }

      return updatedItem;
    });
  }
}
