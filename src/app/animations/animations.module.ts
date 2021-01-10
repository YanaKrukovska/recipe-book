import {NgModule} from '@angular/core';
import {AnimationsComponent} from './animations.component';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule, FormsModule, SharedModule,
    RouterModule.forChild([{path: 'animations', component: AnimationsComponent}])
  ]
})
export class AnimationsModule {
}
