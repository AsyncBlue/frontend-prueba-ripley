import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HistorialComponent } from './pages/historial/historial.component';
import { HomeComponent } from './pages/home/home.component';
import { NuevoDestinatarioComponent } from './pages/nuevo-destinatario/nuevo-destinatario.component';
import { TransferenciaComponent } from './pages/transferencia/transferencia.component';
import { TransferirComponent } from './pages/transferir/transferir.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'nuevo-destinatario',
        component: NuevoDestinatarioComponent
      },
      {
        path: 'transferir',
        component: TransferirComponent
      },
      {
        path: 'transferencia/:id',
        component: TransferenciaComponent
      },
      {
        path: 'historial',
        component: HistorialComponent
      },
      {
        path: '**',
        redirectTo: 'nuevo-destinatario'
      }
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutingModule { }