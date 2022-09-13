import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'media-search',
        pathMatch: 'full'
      },
      {
        path: 'media-search',
        loadChildren: () => import('./pages/media-search/media-search.module').then(m => m.MediaSearchModule)
      },
      {
        path: 'spot-tv',
        loadChildren: () => import('./pages/spot-tv/spot-tv.module').then(m => m.SpotTvModule)
      },
      {
        path: 'broadcast-networks',
        loadChildren: () => import('./pages/broadcast-networks/broadcast-networks.module').then(m => m.BroadcastNetworksModule)
      },
      {
        path: 'spot-radio-search',
        loadChildren: () => import('./pages/spot-radio-search/spot-radio-search.module').then(m => m.SpotRadioSearchModule)
      },
      {
        path: 'cable-networks',
        loadChildren: () => import('./pages/cable-networks/cable-networks.module').then(m => m.CableNetworksModule)
      },
      {
        path: 'national-audio',
        loadChildren: () => import('./pages/national-audio/national-audio.module').then(m => m.NationalAudioModule)
      },
      {
        path: 'digital',
        loadChildren: () => import('./pages/digital/digital.module').then(m => m.DigitalModule)
      },
      {
        path: 'magazine-search',
        loadChildren: () => import('./pages/magazine/magazine.module').then(m => m.MagazineModule)
      },
    ]
  },
  {
    path: '', component: AuthLayoutComponent,
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
