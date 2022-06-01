import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'entries',
    pathMatch: 'full'
  },
  {
    path: 'entries',
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/entries/entries.module').then(m => m.EntriesPageModule)
      },
      {
        path: 'new',
        loadChildren: () => import('./pages/edit-entry/edit-entry.module').then(m => m.EditEntryPageModule)
      },
      {
        path: ':entryId/edit',
        loadChildren: () => import('./pages/edit-entry/edit-entry.module').then(m => m.EditEntryPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
