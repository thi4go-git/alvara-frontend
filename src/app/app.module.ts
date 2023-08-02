import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TemplateModule } from './modulos/template/template.module';
import { LayoutComponent } from './componentes/layout/layout.component';
import { AutenticacaoService } from './servicos/autenticacao.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeModule } from './modulos/home/home.module';
import { NotFoundComponent } from './componentes/not-found/not-found.component';
import { PreferenciasModule } from './modulos/preferencias/preferencias.module';
import { UsuarioModule } from './modulos/usuario/usuario.module';
import { AlvaraService } from './servicos/alvara.service';
import { AlvaraModule } from './modulos/alvara/alvara.module';
import { TokenInterceptor } from './interceptador/token.interceptor';
import { DateFormatPipe } from './pipes/date-format.pipe';
import { LoginModule } from './modulos/login/login.module';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './componentes/confirmation-dialog/confirmation-dialog.component';
import { AvisosDialogService } from './servicos/avisos-dialog.service';
import { MatIconModule } from '@angular/material/icon';




@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    NotFoundComponent,
    DateFormatPipe,
    ConfirmationDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    TemplateModule,
    HomeModule,
    PreferenciasModule,
    UsuarioModule,
    AlvaraModule,
    LoginModule,
    MatDialogModule,
    MatIconModule
  ],
  providers: [
    AutenticacaoService,
    AlvaraService,
    AvisosDialogService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
