import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from 'src/app/app.component';
import { ConfirmationDialogComponent } from 'src/app/componentes/confirmation-dialog/confirmation-dialog.component';
import { LayoutComponent } from 'src/app/componentes/layout/layout.component';
import { NotFoundComponent } from 'src/app/componentes/not-found/not-found.component';
import { DateFormatPipe } from 'src/app/pipes/date-format.pipe';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AlvaraModule } from '../alvara/alvara.module';
import { HomeModule } from '../home/home.module';
import { LoginModule } from '../login/login.module';
import { PreferenciasModule } from '../preferencias/preferencias.module';
import { TemplateModule } from '../template/template.module';
import { UsuarioModule } from '../usuario/usuario.module';
import { TokenInterceptor } from 'src/app/interceptador/token.interceptor';
import { AlvaraService } from 'src/app/servicos/alvara.service';
import { AutenticacaoService } from 'src/app/servicos/autenticacao.service';
import { AvisosDialogService } from 'src/app/servicos/avisos-dialog.service';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    NotFoundComponent,
    DateFormatPipe,
    ConfirmationDialogComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,

    SharedModule,

    TemplateModule,
    HomeModule,
    PreferenciasModule,
    UsuarioModule,
    AlvaraModule,
    LoginModule
  ], providers: [
    AutenticacaoService,
    AlvaraService,
    AvisosDialogService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }

  ]
})
export class CoreModule { }
