import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

import { SideNavService } from '../../../core/services/side-nav.service';
import { Menu, AccessibleMenu } from '../../../core/models/side-nav.model';
import { ObjectType, Role, Service } from '../../../core/enums/permissions.enum';
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  navData: Menu[] = [
    {
      label: "Media",
      imageIcon: '/assets/images/icons/media.svg',
      disabled: true,
      items: [
        {
          name: "media-search",
          label: 'Media Search',
          route: "/media-search",
          disabled: true,
          permissions: [Role.Any]
        },
        {
          label: "Network",
          disabled: true,
          items: [
            { name: "network-tv", label: "Broadcast Networks", route: "/broadcast-networks", disabled: true, permissions: [ObjectType.NetworkTV] },
            { name: "network-cable", label: "Cable Networks", route: "/cable-networks", disabled: true, permissions: [ObjectType.NetworkCable] },
            { name: "network-radio", label: "National Audio", route: "/national-audio", disabled: true, permissions: [ObjectType.NetworkRadio] },
          ]
        },
        {
          name: "digital",
          label: 'Digital',
          route: "/digital",
          disabled: true,
          permissions: [ObjectType.Digital]
        },
        {
          label: "Spot",
          disabled: true,
          items: [
            { name: "spot-tv", label: "Spot TV", route: "/spot-tv", disabled: true, permissions: [ObjectType.SpotTV] },
            { name: "spot-radio", label: "Spot Radio", route: "/spot-radio-search", disabled: true, permissions: [ObjectType.SpotRadio] },
            { name: "regional-cable", label: "Regional Cable", route: "/regional-cable-search", disabled: true, permissions: [ObjectType.SpotCable] },
            { name: "call-history", label: "Call History", route: "/call-history", disabled: true, permissions: [ObjectType.SpotRadio, ObjectType.SpotTV] }
          ]
        },
        {
          label: "Print",
          disabled: true,
          items: [
            { name: "magazine", label: "Magazines", route: "/magazine-search", disabled: true, permissions: [ObjectType.Magazine] },
            { name: "newspaper", label: "Newspapers", route: "/newspaper-search", disabled: true, permissions: [ObjectType.Newspaper] }
          ]
        },
        {
          name: "outdoor",
          label: 'Out-of-Home',
          route: "/outdoor-search",
          disabled: true,
          permissions: [ObjectType.OutofHome]
        },
      ]
    },
    {
      name: "owners",
      imageIcon: '/assets/images/icons/ownership.svg',
      label: 'Ownership',
      route: "/owner-search",
      disabled: true,
      permissions: [ObjectType.Owner]
    },
    {
      label: "Diversity",
      imageIcon: '/assets/images/icons/diversity.svg',
      disabled: true,
      items: [
        { name: "diverse-media", label: "Media", route: "/diverse-media-search", disabled: true, permissions: [Service.Diversity] },
        { name: "diverse-owner", label: "Owners", route: "/diverse-owner-search", disabled: true, permissions: [Service.Diversity] },
        { name: "diverse-research", label: "Research", route: "/diverse-research", disabled: true, permissions: [Service.Diversity] },
      ]
    },
    {
      label: "Markets",
      disabled: true,
      imageIcon: '/assets/images/icons/market.svg',
      items: [
        { name: "market-media", label: "Media in Market", route: "/market-media", disabled: true, permissions: [Role.Any] },
        { name: "dma-msa", label: "DMA > MSA", route: "/dma-msa", disabled: true, permissions: [Role.Any] },
        { name: "msa-dma", label: "MSA > DMA", route: "/msa-dma", disabled: true, permissions: [Role.Any] },
        { name: "dma-state", label: "DMA > State", route: "/dma-state", disabled: true, permissions: [Role.Any] },
        { name: "msa-state", label: "MSA > State", route: "/msa-state", disabled: true, permissions: [Role.Any] },
        { name: "state-dma", label: "State > DMA", route: "/state-dma", disabled: true, permissions: [Role.Any] },
        { name: "state-msa", label: "State > MSA", route: "/state-msa", disabled: true, permissions: [Role.Any] }
      ]
    },
    {
      name: "users",
      imageIcon: '/assets/images/icons/security.svg',
      label: 'Security',
      route: "/users",
      disabled: true,
      permissions: [Role.Administrator, Role.AccountServices]
    },
  ];

  config = {
    paddingAtStart: true,
    interfaceWithRoute: true,
    classname: 'sidebar',
    listBackgroundColor: `#2E4FA3`,
    fontColor: `#ffffff`,
    backgroundColor: `#2E4FA3`,
    selectedListFontColor: `#ffffff`,
    collapseOnSelect: true,
    useDividers: false,
    rtlLayout: false,
  };

  unsubscribeAll: Subject<null> = new Subject<null>();

  constructor(
    private sideNavService: SideNavService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.sideNavService.fetchMenuData()
      .pipe(
        takeUntil(this.unsubscribeAll),
        map((accessibleMenu: AccessibleMenu[]) => this.sideNavService.updateDisabledState(this.navData, accessibleMenu))
      )
      .subscribe((menu: Menu[]) => {
        this.navData = menu;
      })
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(null);
    this.unsubscribeAll.complete();
  }

  selectedItem(menu: Menu) {
    this.router.navigate([`/${ menu.route }`]);
  }
}
