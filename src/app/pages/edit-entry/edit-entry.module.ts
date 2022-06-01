import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { QuillModule } from 'ngx-quill';

import { EditEntryPageRoutingModule } from './edit-entry-routing.module';
import { EditEntryPage } from './edit-entry.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditEntryPageRoutingModule,
    QuillModule.forRoot(),
  ],
  declarations: [EditEntryPage]
})
export class EditEntryPageModule { }
