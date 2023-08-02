import { Component, ElementRef, ViewChild } from '@angular/core';
import { AlvaraService } from 'src/app/servicos/alvara.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import Chart from 'chart.js/auto'

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {


  totalDocumentos = 0;
  totalVencidos = 0;
  venceEm60dias = 0;
  venceApos60dias = 0;
  totaDocumentosSemInfo = 0;
  tipoConsulta: string = '';

  constructor(
    private service: AlvaraService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.definirDashboard();
  }


  definirDashboard() {
    this.definirTotalArquivos();
  }

  definirTotalArquivos() {

    this.service.totalArquivos()
      .subscribe({
        next: (response) => {
          this.totalDocumentos = response;
          this.qtdeVencerApos60Dias();
        },
        error: (errorResponse) => {
          this.snackBar.open("Erro ao Obter totalDocumentos!", "ERRO!", {
            duration: 2000
          });
          console.log(errorResponse);
        }
      });
  }

  definirVencidos() {

    this.service.totalArquivosVencidos()
      .subscribe({
        next: (response) => {
          this.totalVencidos = response;
          this.carregarCanvas();
        },
        error: (errorResponse) => {
          this.snackBar.open("Erro ao Obter totalVencidos!", "ERRO!", {
            duration: 2000
          });
          console.log(errorResponse);
        }
      });

  }

  definirVencerEm60Dias() {

    this.service.totalArquivosVencerEm60Dias()
      .subscribe({
        next: (response) => {
          this.venceEm60dias = response;
          this.definirSemInformacoes();
        },
        error: (errorResponse) => {
          this.snackBar.open("Erro ao Obter venceEm60dias!", "ERRO!", {
            duration: 2000
          });
          console.log(errorResponse);
        }
      });

  }

  qtdeVencerApos60Dias() {

    this.service.totalArquivosVencerApos60Dias()
      .subscribe({
        next: (response) => {
          this.venceApos60dias = response;
          this.definirVencerEm60Dias();
        },
        error: (errorResponse) => {
          this.snackBar.open("Erro ao Obter venceApos60dias!", "ERRO!", {
            duration: 2000
          });
          console.log(errorResponse);
        }
      });

  }

  definirSemInformacoes() {
    this.service.totalArquivosSemInformacoes()
      .subscribe({
        next: (response) => {
          this.totaDocumentosSemInfo = response;
          this.definirVencidos();
        },
        error: (errorResponse) => {
          this.snackBar.open("Erro ao Obter totaDocumentosSemInfo!", "ERRO!", {
            duration: 2000
          });
          console.log(errorResponse);
        }
      });
  }


  @ViewChild("canvasDash", { static: true }) canvasDash: ElementRef | undefined
  carregarCanvas() {

    new Chart(this.canvasDash?.nativeElement, {
      type: 'pie',
      data: {
        labels: [
          'Vencidos',
          'Sem data/info',
          'Vencer após 60 dias',
          'Vencer em até 60 dias'
        ],
        datasets: [{
          data: [this.totalVencidos, this.totaDocumentosSemInfo,
          this.venceApos60dias, this.venceEm60dias],
          backgroundColor: [
            'rgba(255, 0, 0)',
            'rgba(255, 165, 0)',
            'rgba(0, 0, 255)',
            'rgba(255, 203, 219)'
          ],
          borderColor: [
            'rgba(255, 0, 0)',
            'rgba(255, 165, 0)',
            'rgba(0, 0, 255)',
            'rgba(255, 203, 219)'
          ],

        }]
      },
      options: {
        responsive: true,


      }
    })



  }




}
