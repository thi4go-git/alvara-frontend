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
  status_documento: any[] = [];

  listaErros: string[] = [];
  listaArquivos: File[] = [];
  listaVazia: Boolean = true;

  mostraProgresso: boolean = false;

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
    this.definirComboBoxTIPO();
    this.definirComboBoxSTATUS();
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

  definirComboBoxTIPO() {
    this.mostraProgresso = true;
    this.service
      .obterListaTipoDoc()
      .subscribe({
        next: (resposta) => {
          this.mostraProgresso = false;
          this.tipo_doc = resposta;
        },
        error: (errorResponse) => {
          this.mostraProgresso = false;
          this.snackBar.open("Erro ao definir ComboBox TIPO ", "ERRO!", {
            duration: 3000
          });
          throw new GeralException(errorResponse);
        }
      });
  }

  definirComboBoxSTATUS() {
    this.mostraProgresso = true;
    this.service
      .obterListaStatusDocumento()
      .subscribe({
        next: (resposta) => {
          this.mostraProgresso = false;
          this.status_documento = resposta;
        },
        error: (errorResponse) => {
          this.mostraProgresso = false;
          this.snackBar.open("Erro ao definir ComboBox STATUS ", "ERRO!", {
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
    this.mostraProgresso = true;
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
        next: (_resposta) => {
          this.mostraProgresso = false;
          this.snackBar.open("SUCESSO Ao Atualizar Informações!", "SUCESSO!", {
            duration: 2000
          });
          this.router.navigate(['/alvara/lista'])
        },
        error: (errorResponse) => {
          this.mostraProgresso = false;
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
    this.mostraProgresso = true;
    if (this.listaArquivos.length > 0) {
      const msg = 'O Processo atual substituirá todas as informações desse documento, tem certeza?';
      this.avisoDialogService.openConfirmationDialog(msg)
        .then(result => {
          if (result) {
            this.mostraProgresso = false;
            this.onUpload();
          } else {
            this.mostraProgresso = false;
            this.snackBar.open("Processo Cancelado!", "Cancelado!", {
              duration: 3000
            });
          }
        });
    } else {
      this.mostraProgresso = false;
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
    this.mostraProgresso = true;
    this.service
      .uploadUpdatePdf(formData, this.id)
      .subscribe({
        next: (_response) => {
          this.mostraProgresso = false;
          this.snackBar.open("Sucesso ao Atualizar Documento", "SUCESSO!", {
            duration: 3000
          });
          this.listarPorId();
        },
        error: (errorResponse) => {
          this.mostraProgresso = false;
          this.snackBar.open("Erro ao realizar UPLOAD", "ERRO!", {
            duration: 3000
          });
          throw new GeralException(errorResponse);
        }
      });
  }

}
