import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlvaraService } from 'src/app/servicos/alvara.service';
import { Alvara } from '../../../model/alvara';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AvisosDialogService } from 'src/app/servicos/avisos-dialog.service';
import { GeralException } from 'src/app/exception/geralException';




@Component({
  selector: 'app-alvara-form',
  templateUrl: './alvara-form.component.html',
  styleUrls: ['./alvara-form.component.css']
})
export class AlvaraFormComponent implements OnInit {

  id: number = 0;
  alvara: Alvara;
  tipo_doc: any[] = [];
  listaErros: string[] = [];
  listaArquivos: File[] = [];
  listaVazia: Boolean = true;

  constructor(
    private router: Router,
    private service: AlvaraService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private avisoDialogService: AvisosDialogService

  ) {
    this.alvara = new Alvara();
  }

  ngOnInit(): void {
    this.definirComboBox();
    this.listarPorId();
  }

  listarPorId() {
    this.activatedRoute.params.subscribe(parametro => {
      if (parametro && parametro['id'] != undefined) {
        this.id = parametro['id'];
        this.service
          .obterArquivoPorId(this.id).subscribe({
            next: (resposta) => {
              this.alvara = resposta;
            },
            error: (errorResponse) => {
              this.snackBar.open("Erro ", "Erro!", {
                duration: 2000
              });
              throw new GeralException('Erro ao listar Documento pelo ID ' + errorResponse);
            }
          });
      }
    });
  }

  definirComboBox() {
    this.service
      .obterListaTipoDoc()
      .subscribe({
        next: (resposta) => {
          this.tipo_doc = resposta;
        },
        error: (errorResponse) => {
          this.snackBar.open("Erro ao definir ComboBox ", "ERRO!", {
            duration: 3000
          });
          throw new GeralException(errorResponse);
        }
      });
  }

  onSubmit() {
    this.atualizar();
  }

  atualizar() {
    if (this.alvara.cnpj_empresa) {
      let cnpjReplace = this.alvara.cnpj_empresa;
      cnpjReplace = cnpjReplace.replaceAll(".", "");
      cnpjReplace = cnpjReplace.replaceAll("/", "");
      cnpjReplace = cnpjReplace.replaceAll("-", "");
      this.alvara.cnpj_empresa = cnpjReplace;
    }
    this.service
      .atualizarArquivoPorId(this.alvara)
      .subscribe({
        next: (resposta) => {
          this.snackBar.open("SUCESSO Ao Atualizar Informações!", "SUCESSO!", {
            duration: 2000
          });
          this.router.navigate(['/alvara/lista'])
        },
        error: (errorResponse) => {
          this.snackBar.open("ERRO Ao Atualizar Informações, verifique o LOG na parte superior!", "ERRO!", {
            duration: 5000
          });
          this.listaErros = errorResponse.error.erros
        }
      });
  }

  voltarLista() {
    this.router.navigate(['/alvara/lista']);
  }

  onFileSelected(event: any) {
    this.listaArquivos = event.target.files;
    if (this.listaArquivos.length > 0) {
      this.listaVazia = false;
    }
  }

  dialogUpdateUpload() {
    if (this.listaArquivos.length > 0) {
      const msg = 'O Processo atual substituirá todas as informações desse documento, tem certeza?';
      this.avisoDialogService.openConfirmationDialog(msg)
        .then(result => {
          if (result) {
            this.onUpload();
          } else {
            this.snackBar.open("Processo Cancelado!", "Cancelado!", {
              duration: 3000
            });
          }
        });
    } else {
      this.snackBar.open("Nenhum arquivo foi selecionado!", "INFO!", {
        duration: 2000
      });
    }
  }

  onUpload() {
    const pdf = this.listaArquivos[0];
    const formData: FormData = new FormData();
    formData.append("pdf", pdf);
    this.uploadUpdate(formData);
  }

  uploadUpdate(formData: FormData) {
    this.service
      .uploadUpdatePdf(formData, this.id)
      .subscribe({
        next: (_response) => {
          this.snackBar.open("Sucesso ao Atualizar Documento", "SUCESSO!", {
            duration: 3000
          });
          this.listarPorId();
        },
        error: (errorResponse) => {
          this.snackBar.open("Erro ao realizar UPLOAD", "ERRO!", {
            duration: 3000
          });
          throw new GeralException(errorResponse);
        }
      });
  }

}
