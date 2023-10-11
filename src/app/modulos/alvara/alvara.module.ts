import { NgModule } from '@angular/core';
import { AlvaraRoutingModule } from './alvara-routing.module';
import { AlvaraFormComponent } from './alvara-form/alvara-form.component';
import { AlvaraListaFilterComponent } from './alvara-lista-filter/alvara-lista-filter.component';
import { SharedModule } from '../shared/shared.module';
import { CnpjFormatPipe } from 'src/app/pipes/cnpj-format.pipe';


@NgModule({
  declarations: [
    AlvaraFormComponent,
    AlvaraListaFilterComponent,
    CnpjFormatPipe
  ],
  imports: [
    SharedModule,
    AlvaraRoutingModule
  ], exports: [
    AlvaraFormComponent,
    AlvaraListaFilterComponent
  ]
})
export class AlvaraModule { }
