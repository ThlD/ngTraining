import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {MaterialModule} from '../ui/material/material.module';


@NgModule({
  imports: [FormsModule, ReactiveFormsModule, MaterialModule],
  exports: [FormsModule, ReactiveFormsModule, MaterialModule],
  declarations: [],
  providers: [],
})
export class SharedModule {
}
