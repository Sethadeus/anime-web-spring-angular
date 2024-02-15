import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimeDetailComponent } from './anime-detail/anime-detail.component';

const routes: Routes = [{ 
  path: 'anime/:id', component: AnimeDetailComponent 
},];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
