import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  navData: any = [
    {
      label: "Media",
      imageIcon: '/assets/images/icons/media.svg',
      disabled: false,
      items: [
        {
          name: "media-search",
          label: 'Media Search',
          route: "/media-search",
          disabled: false,
          id: 0
        },
        {
          label: "Network",
          disabled: false,
          items: [
            { name: "network-tv", label: "Broadcast Networks", route: "/network-tv-search", disabled: false, id: 1 },
            { name: "network-cable", label: "Cable Networks", route: "/network-cable-search", disabled: false, id: 2 },
            { name: "network-radio", label: "National Audio", route: "/network-radio-search", disabled: false, id: 3 },
          ]
        },
        {
          name: "digital",
          label: 'Digital',
          route: "/digital-search",
          disabled: false,
          id: 4
        },
        {
          label: "Spot",
          disabled: false,
          items: [
            { name: "spot-tv", label: "Spot TV", route: "/spot-tv-search", disabled: false, id: 5 },
            { name: "spot-radio", label: "Spot Radio", route: "/spot-radio-search", disabled: false, id: 6 },
            { name: "regional-cable", label: "Regional Cable", route: "/regional-cable-search", disabled: false, id: 7 },
            { name: "call-history", label: "Call History", route: "/call-history", disabled: false, id: 8 }
          ]
        },
        {
          label: "Print",
          disabled: false,
          items: [
            { name: "magazine", label: "Magazines", route: "/magazine-search", disabled: false, id: 9 },
            { name: "newspaper", label: "Newspapers", route: "/newspaper-search", disabled: false, id: 10 }
          ]
        },
        {
          name: "outdoor",
          label: 'Out-of-Home',
          route: "/outdoor-search",
          disabled: false,
          id: 11
        },
      ]
    },
    {
      name: "owners",
      imageIcon: '/assets/images/icons/ownership.svg',
      label: 'Ownership',
      route: "/owner-search",
      disabled: false,
      id: 12
    },
    {
      label: "Diversity",
      imageIcon: '/assets/images/icons/diversity.svg',
      disabled: false,
      items: [
        { name: "diverse-media", label: "Media", route: "/diverse-media-search", disabled: false, id: 13 },
        { name: "diverse-owner", label: "Owners", route: "/diverse-owner-search", disabled: false, id: 14 },
        { name: "diverse-research", label: "Research", route: "/diverse-research", disabled: false, id: 15 },
      ]
    },
    {
      label: "Markets",
      disabled: false,
      imageIcon: '/assets/images/icons/market.svg',
      items: [
        { name: "market-media", label: "Media in Market", route: "/market-media", disabled: false, id: 16 },
        { name: "dma-msa", label: "DMA > MSA", route: "/dma-msa", disabled: false, id: 17 },
        { name: "msa-dma", label: "MSA > DMA", route: "/msa-dma", disabled: false, id: 18 },
        { name: "dma-state", label: "DMA > State", route: "/dma-state", disabled: false, id: 19 },
        { name: "msa-state", label: "MSA > State", route: "/msa-state", disabled: false, id: 20 },
        { name: "state-dma", label: "State > DMA", route: "/state-dma", disabled: false, id: 21 },
        { name: "state-msa", label: "State > MSA", route: "/state-msa", disabled: false, id: 22 }
      ]
    },
    {
      name: "users",
      imageIcon: '/assets/images/icons/user.svg',
      label: 'Security',
      route: "/users",
      disabled: false,
      id: 13
    },
  ]
  config = {
    paddingAtStart: true,
    interfaceWithRoute: true,
    classname: 'sidebar',
    listBackgroundColor: `#2E4FA3`,
    fontColor: `#ffffff`,
    backgroundColor: `#2E4FA3`,
    selectedListFontColor: `#ffffff`,
    listselectedBackgroundColor: `#ffffff`,
    highlightOnSelect: true,
    collapseOnSelect: true,
    useDividers: false,
    rtlLayout: false,
  };

  constructor() { }

  ngOnInit(): void { }

  selectedItem(event: any) {
    console.log(event);
  }
}
