import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon'
import { MatToolbarModule } from '@angular/material/toolbar'

@NgModule({
  declarations: [],
  exports: [
    MatIconModule,
    MatToolbarModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [],
})
export class MaterialModule { }
