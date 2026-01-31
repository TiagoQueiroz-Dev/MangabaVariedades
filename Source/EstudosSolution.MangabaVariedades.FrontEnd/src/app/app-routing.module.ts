import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TelaInicialComponent } from './pages/tela-inicial/tela-inicial.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'telaInicial',
    pathMatch: 'full'
  },
  {
    path: 'telaInicial',
    component: TelaInicialComponent,
    data: {
      title: 'Tela Inicial'
    }

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
