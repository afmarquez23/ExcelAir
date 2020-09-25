import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'devices', loadChildren: './devices/devices.module#DevicesPageModule' },
  { path: 'subhome', loadChildren: './home/subhome/subhome.module#SubhomePageModule' },
  { path: 'measurements', loadChildren: './home/measurements/measurements.module#MeasurementsPageModule' },
  { path: 'bledevices', loadChildren: './home/bledevices/bledevices.module#BledevicesPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
