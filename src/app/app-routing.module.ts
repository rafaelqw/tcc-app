import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  { 
    path: 'login', 
    loadChildren: './login/login.module#LoginPageModule' 
  },
  { path: 'configuracao', 
    loadChildren: './configuracao/configuracao.module#ConfiguracaoPageModule' 
  },
  { path: 'dispositivos', 
    loadChildren: './dispositivos/dispositivos.module#DispositivosPageModule' 
  },
  { 
    path: 'sensores', 
    loadChildren: './sensores/sensores.module#SensoresPageModule' 
  },
  { 
    path: 'sensores/:id_disp', 
    loadChildren: './sensores/sensores.module#SensoresPageModule' 
  },
  { 
    path: 'sensor-detail/:id', 
    loadChildren: './sensor-detail/sensor-detail.module#SensorDetailPageModule' 
  },
  { 
    path: 'empreendimentos',
    loadChildren: './empreendimentos/empreendimentos.module#EmpreendimentosPageModule' 
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
