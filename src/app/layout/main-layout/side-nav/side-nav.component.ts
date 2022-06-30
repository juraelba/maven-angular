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
      show: false,
      items: [
        {
          name: "media-search",
          label: 'Media Search',
          route: "/media-search",
          disabled: true,
          id: 0
        },
        {
          label: "Network",
          show: false,
          items: [
            { name: "network-tv", label: "Broadcast Networks", route: "/network-tv-search", disabled: true, id: 1 },
            { name: "network-cable", label: "Cable Networks", route: "/network-cable-search", disabled: true, id: 2 },
            { name: "network-radio", label: "National Audio", route: "/network-radio-search", disabled: true, id: 3 },
          ]
        },
        {
          name: "digital",
          label: 'Digital',
          route: "/digital-search",
          disabled: true,
          id: 4
        },
        {
          label: "Spot",
          show: false,
          items: [
            { name: "spot-tv", label: "Spot TV", route: "/spot-tv-search", disabled: true, id: 5 },
            { name: "spot-radio", label: "Spot Radio", route: "/spot-radio-search", disabled: true, id: 6 },
            { name: "regional-cable", label: "Regional Cable", route: "/regional-cable-search", disabled: true, id: 7 },
            { name: "call-history", label: "Call History", route: "/call-history", disabled: true, id: 8 }
          ]
        },
        {
          label: "Print",
          show: false,
          items: [
            { name: "magazine", label: "Magazines", route: "/magazine-search", disabled: true, id: 9 },
            { name: "newspaper", label: "Newspapers", route: "/newspaper-search", disabled: true, id: 10 }
          ]
        },
        {
          name: "outdoor",
          label: 'Out-of-Home',
          route: "/outdoor-search",
          disabled: true,
          id: 11
        },
      ]
    },
    {
      name: "owners",
      imageIcon: '/assets/images/icons/ownership.svg',
      label: 'Ownership',
      route: "/owner-search",
      disabled: true,
      id: 12
    },
    {
      label: "Diversity",
      imageIcon: '/assets/images/icons/diversity.svg',
      show: false,
      items: [
        { name: "diverse-media", label: "Media", route: "/diverse-media-search", disabled: true, id: 13 },
        { name: "diverse-owner", label: "Owners", route: "/diverse-owner-search", disabled: true, id: 14 },
        { name: "diverse-research", label: "Research", route: "/diverse-research", disabled: true, id: 15 },
      ]
    },
    {
      label: "Markets", show: false, imageIcon: '/assets/images/icons/market.svg', items: [
        { name: "market-media", label: "Media in Market", route: "/market-media", disabled: true, id: 16 },
        { name: "dma-msa", label: "DMA > MSA", route: "/dma-msa", disabled: true, id: 17 },
        { name: "msa-dma", label: "MSA > DMA", route: "/msa-dma", disabled: true, id: 18 },
        { name: "dma-state", label: "DMA > State", route: "/dma-state", disabled: true, id: 19 },
        { name: "msa-state", label: "MSA > State", route: "/msa-state", disabled: true, id: 20 },
        { name: "state-dma", label: "State > DMA", route: "/state-dma", disabled: true, id: 21 },
        { name: "state-msa", label: "State > MSA", route: "/state-msa", disabled: true, id: 22 }
      ]
    },
    {
      name: "users",
      imageIcon: '/assets/images/icons/user.svg',
      label: 'Security',
      route: "/users",
      disabled: true,
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
