import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
 
const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'status',
        children: [
          {
            path: '',
            loadChildren: () => import('../status/status.module').then( m => m.StatusPageModule)
          }
          // },
          // {
          //   path: ':id',
          //   loadChildren: () => import('../film-details/film-details.module').then( m => m.FilmDetailsPageModule)
          // }
        ]
      },
      {
        path: 'user',
        children: [
          {
            path: '',
            loadChildren: () => import('../user/user.module').then( m => m.UserPageModule)
          }
        ]
      },
      {
        path: 'contract',
        children: [
          {
            path: '',
            loadChildren: () => import('../contract/contract.module').then( m => m.ContractPageModule)
          }
        ]
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/contract',
    pathMatch: 'full'
  }
];
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRouterModule {}