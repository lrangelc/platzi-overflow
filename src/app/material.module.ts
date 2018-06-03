import { NgModule } from'@angular/core';
import { MatToolbarModule } from'@angular/material/toolbar';
import { MatIconModule } from'@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatRadioModule} from '@angular/material/radio';

const modules = [
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatButtonModule,
  MatInputModule,
  MatListModule,
  MatGridListModule,
  MatRadioModule
];

@NgModule({
  imports: modules,
  exports: modules
 })

 export class MaterialModule {}