import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AlvaraService } from 'src/app/servicos/alvara.service';
import { Alvara } from '../../../model/alvara';
import { MatPaginator } from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AvisosDialogService } from 'src/app/servicos/avisos-dialog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AutenticacaoService } from 'src/app/servicos/autenticacao.service';
import { GeralException } from 'src/app/exception/geralException';
import { ArquivoFilterDTO } from 'src/app/model/arquivoFilterDTO';


@Component({
  selector: 'app-alvara-lista-filter',
  templateUrl: './alvara-lista-filter.component.html',
  styleUrls: ['./alvara-lista-filter.component.css']
})
export class AlvaraListaFilterComponent implements OnInit, AfterViewInit {


  constructor(
    private service: AlvaraService,
    private snackBar: MatSnackBar,
    private avisoDialogService: AvisosDialogService,
    private router: Router,
    private authService: AutenticacaoService,
    private activatedRoute: ActivatedRoute
  ) { }

  displayedColumns: string[] = ['selecionado', 'id', 'tipo_doc', 'status_documento', 'nome_arquivo',
    'numero_alvara', 'nome_empresa',
    'cnpj_empresa', 'data_emissao', 'data_vencimento', 'expira', 'observacao', 'pdf', 'edit', 'del'];

  administrador: boolean = false;
  authorities: string[] = [];

  listaAlvaras: Alvara[] = [];
  ELEMENT_DATA: Alvara[] = [];
  mostraProgresso: boolean = false;
  dataSource: MatTableDataSource<Alvara> = new MatTableDataSource;
  totalElementos = 0;
  pagina = 0;
  tamanho = 10;
  pageSizeOptions: number[] = [this.tamanho];
  qtdeRegistros: number = 0;

  alvaraFilter: ArquivoFilterDTO = new ArquivoFilterDTO();

  mostraPaginacao: boolean = true;

  tipo_doc: any[] = [];
  status_documento: any[] = [];

  selection = new SelectionModel<Alvara>(true, []);
  listaIdSelecionados: string[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.definirComboBoxTipo();
    this.definirComboBoxStatusDocumento();
    this.authorities = this.authService.getAuthoritiesToken();
    this.administrador = this.authService.isAdmin(this.authorities);
    this.activatedRoute.params.subscribe(parametro => {
      if (parametro && parametro['tipoConsulta'] != undefined) {
        this.mostraPaginacao = false;
        this.listarPersonalizado();
      } else {
        this.alvaraFilter = new ArquivoFilterDTO();
        this.listagemComFiltros();
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  private definirComboBoxTipo() {
    this.service
      .obterListaTipoDoc()
      .subscribe({
        next: (resposta) => {
          for (let a = 0; a <= resposta.length; a = a + 1) {
            const tipo = resposta[a];
            if (tipo != undefined) {
              this.tipo_doc.push(tipo);
            }
          }
          this.tipo_doc.push('TODOS');
        },
        error: (errorResponse) => {
          this.snackBar.open("Erro ao definir ComboBox TIPO ", "ERRO!", {
            duration: 3000
          });
          throw new GeralException(errorResponse);
        }
      });
  }

  private definirComboBoxStatusDocumento() {
    this.service
      .obterListaStatusDocumento()
      .subscribe({
        next: (resposta) => {
          for (let a = 0; a <= resposta.length; a = a + 1) {
            const status = resposta[a];
            if (status != undefined) {
              this.status_documento.push(status);
            }
          }
          this.status_documento.push('TODOS');
        },
        error: (errorResponse) => {
          this.snackBar.open("Erro ao definir ComboBox STATUS", "ERRO!", {
            duration: 3000
          });
          throw new GeralException(errorResponse);
        }
      });
  }

  listagemComFiltros() {
    this.mostraProgresso = true;
    this.service.listarTodosFilterMatcher(this.pagina, this.tamanho, this.alvaraFilter)
      .subscribe({
        next: (resposta) => {
          this.listaAlvaras = resposta.content;
          this.ELEMENT_DATA = this.listaAlvaras;
          this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
          this.totalElementos = resposta.totalElements;
          this.pagina = resposta.number;
          this.qtdeRegistros = this.listaAlvaras.length;
          if (this.listaAlvaras.length == 0) {
            this.snackBar.open("Lista Vazia!", "Info!", {
              duration: 2000
            });
          }
          this.mostraProgresso = false;
        },
        error: (errorResponse) => {
          this.mostraProgresso = false;
          this.snackBar.open("Erro ao Listar com Filtros!", "ERRO!", {
            duration: 2000
          });
          throw new GeralException(errorResponse);
        }
      });
  }


  listarPersonalizado() {
    this.activatedRoute.params.subscribe(parametro => {
      let consultaParam = parametro['tipoConsulta'];
      if (parametro && consultaParam != undefined) {
        if (consultaParam == 'totalVencidos') {
          this.listarVencidosPAge();
        } else {
          if (consultaParam == 'venceEm60dias') {
            this.listarVencerEmAte60Dias();
          } else {
            if (consultaParam == 'totaDocumentosSemInfo') {
              this.listarDocumentosSemInfo();
            } else {
              if (consultaParam == 'venceApos60dias') {
                this.listarVencerApos60Dias();
              }
            }
          }
        }
      }
    });
  }




  listarVencidos() {
    this.mostraProgresso = true;
    this.service.listarVencidos(this.pagina, this.tamanho)
      .subscribe({
        next: (resposta) => {
          this.listaAlvaras = resposta.content;
          this.listaAlvaras.sort((a, b) => (a.expira < b.expira) ? -1 : 1);
          this.ELEMENT_DATA = this.listaAlvaras;
          this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
          this.totalElementos = resposta.totalElements;
          this.pagina = resposta.number;
          this.qtdeRegistros = this.listaAlvaras.length;
          if (this.listaAlvaras.length == 0) {
            this.snackBar.open("Lista Vazia!", "Info!", {
              duration: 2000
            });
          }
          this.mostraProgresso = false;
        },
        error: (responseError) => {
          this.snackBar.open("Erro ao Obter Lista!", "ERRO!", {
            duration: 2000
          });
          throw new GeralException(responseError);
        }
      });
  }


  listarVencidosPAge() {
    this.mostraProgresso = true;
    this.service.listarVencidos(this.pagina, this.tamanho)
      .subscribe({
        next: (resposta) => {
          this.listaAlvaras = resposta.content;
          this.listaAlvaras.sort((a, b) => (a.expira < b.expira) ? -1 : 1);
          this.ELEMENT_DATA = this.listaAlvaras;
          this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
          this.totalElementos = resposta.totalElements;
          this.pagina = resposta.number;
          this.qtdeRegistros = this.listaAlvaras.length;
          if (this.listaAlvaras.length == 0) {
            this.snackBar.open("Lista Vazia!", "Info!", {
              duration: 2000
            });
          }
          this.mostraProgresso = false;
        },
        error: (responseError) => {
          this.snackBar.open("Erro ao Obter Lista!", "ERRO!", {
            duration: 2000
          });
          throw new GeralException(responseError);
        }
      });
  }

  listarVencerEmAte60Dias() {
    this.mostraProgresso = true;
    this.service.listarVencerEmAte60Dias(this.pagina, this.tamanho)
      .subscribe({
        next: (resposta) => {

          this.listaAlvaras = resposta.content;
          this.listaAlvaras.sort((a, b) => (a.expira < b.expira) ? -1 : 1);
          this.ELEMENT_DATA = this.listaAlvaras;
          this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
          this.totalElementos = resposta.totalElements;
          this.pagina = resposta.number;
          this.qtdeRegistros = this.listaAlvaras.length;
          if (this.listaAlvaras.length == 0) {
            this.snackBar.open("Lista Vazia!", "Info!", {
              duration: 2000
            });
          }
          this.mostraProgresso = false;
        },
        error: (errorResponse) => {
          this.snackBar.open("Erro ao Obter Lista!", "ERRO!", {
            duration: 2000
          });
          throw new GeralException(errorResponse);
        }
      });
  }

  listarDocumentosSemInfo() {
    this.mostraProgresso = true;
    this.service.listarDocumentosSemInfo(this.pagina, this.tamanho)
      .subscribe({
        next: (resposta) => {
          this.listaAlvaras = resposta.content;
          this.listaAlvaras.sort((a, b) => (a.expira < b.expira) ? -1 : 1);
          this.ELEMENT_DATA = this.listaAlvaras;
          this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
          this.totalElementos = resposta.totalElements;
          this.pagina = resposta.number;
          this.qtdeRegistros = this.listaAlvaras.length;
          if (this.listaAlvaras.length == 0) {
            this.snackBar.open("Lista Vazia!", "Info!", {
              duration: 2000
            });
          }
          this.mostraProgresso = false;
        },
        error: (errorResponse) => {
          this.snackBar.open("Erro ao Obter Lista!", "ERRO!", {
            duration: 2000
          });
          throw new GeralException(errorResponse);
        }
      });
  }


  listarVencerApos60Dias() {
    this.mostraProgresso = true;
    this.service.listarVencerApos60Dias(this.pagina, this.tamanho)
      .subscribe({
        next: (resposta) => {
          this.listaAlvaras = resposta.content;
          this.listaAlvaras.sort((a, b) => (a.expira < b.expira) ? -1 : 1);
          this.ELEMENT_DATA = this.listaAlvaras;
          this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
          this.totalElementos = resposta.totalElements;
          this.pagina = resposta.number;
          this.qtdeRegistros = this.listaAlvaras.length;
          if (this.listaAlvaras.length == 0) {
            this.snackBar.open("Lista Vazia!", "Info!", {
              duration: 2000
            });
          }
          this.mostraProgresso = false;
        },
        error: (errorResponse) => {
          this.snackBar.open("Erro ao Obter Lista!", "ERRO!", {
            duration: 2000
          });
          throw new GeralException(errorResponse);
        }
      });

  }

  paginar(event: PageEvent) {
    this.pagina = event.pageIndex;
    this.tamanho = event.pageSize

    this.activatedRoute.params.subscribe(parametro => {
      let consultaParam = parametro['tipoConsulta'];
      if (consultaParam == undefined) {
        this.listagemComFiltros();
        console.log("Paginar listagemComFiltros");
      }

    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: Alvara): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }


  baixar(alvara: Alvara) {
    this.mostraProgresso = true;
    this.service.obterArquivoPorId(alvara.id)
      .subscribe({
        next: (resposta) => {
          var sampleArr = this.base64ToArrayBuffer(resposta.pdf);
          this.saveByteArray("ARQUIVO.pdf", sampleArr);
          if (this.listaAlvaras.length == 0) {
            this.snackBar.open("Arquivo BAIXADO!", "Info!", {
              duration: 2000
            });
          }
          this.mostraProgresso = false;
        },
        error: (errorResponse) => {
          this.snackBar.open("Erro ao BAIXAR Arquivo!", "ERRO!", {
            duration: 2000
          });
          throw new GeralException(errorResponse);
        }
      });

  }

  base64ToArrayBuffer(base64: any) {
    var binaryString = window.atob(base64);
    var binaryLen = binaryString.length;
    var bytes = new Uint8Array(binaryLen);
    for (var i = 0; i < binaryLen; i++) {
      var ascii = binaryString.charCodeAt(i);
      bytes[i] = ascii;
    }
    return bytes;
  }

  saveByteArray(reportName: any, byte: any) {
    var blob = new Blob([byte], { type: "application/pdf" });
    var link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    var fileName = reportName;
    link.download = fileName;
    link.click();
  }

  atualizar(alvara: Alvara) {
    this.router.navigate(['/alvara/form/' + alvara.id]);
  }

  dialogExlusao(alvara: Alvara) {
    this.avisoDialogService.openConfirmationDialog("Confirma a Exclusão do Documento id '"
      + alvara.id + "' ?")
      .then(result => {
        if (result) {
          this.deletar(alvara.id);
        } else {
          this.snackBar.open("EXCLUSÃO Cancelada!", "Cancelado!", {
            duration: 3000
          });
        }
      });
  }

  deletar(id: number) {
    this.service.deletarArquivoPorId(id)
      .subscribe({
        next: (_resposta) => {
          this.snackBar.open("Sucesso ao excluir Documento!", "SUCESSO!", {
            duration: 3000
          });
          this.listagemComFiltros();
        },
        error: (errorResponse) => {
          this.snackBar.open("Erro ao DELETAR Arquivo!", "ERRO!", {
            duration: 2000
          });
          throw new GeralException(errorResponse);
        }
      });
  }



  limparFiltros() {
    location.reload();
  }



  populaListaSelecionados(alvara: Alvara) {
    if (alvara.selecionado != undefined && alvara.selecionado) {
      this.listaIdSelecionados.push(alvara.id.toString());
    } else {
      const indexRemover = this.listaIdSelecionados.indexOf(alvara.id.toString());
      if (indexRemover !== -1) {
        this.listaIdSelecionados.splice(indexRemover, 1);
      }
    }
  }

  deletarSelecionados() {
    if (this.listaIdSelecionados.length > 0) {
      this.avisoDialogService.openConfirmationDialog("Confirma a exclusão de ( " + this.listaIdSelecionados.length + ' ) Documento(s)?')
        .then(result => {
          if (result) {

            this.service.deletarMultiplosByList(this.listaIdSelecionados)
              .subscribe({
                next: (_resposta) => {
                  this.snackBar.open("Sucesso ao excluir Documentos: " + this.listaIdSelecionados.length, "SUCESSO!", {
                    duration: 3000
                  });
                  this.listaIdSelecionados = [];
                  this.listagemComFiltros();
                },
                error: (errorResponse) => {
                  this.snackBar.open("Erro ao DELETAR Documentos!", "ERRO!", {
                    duration: 2000
                  });
                  throw new GeralException(errorResponse);
                }
              });

          } else {
            this.snackBar.open("Processo cancelado!", "Cancelado!", {
              duration: 3000
            });
          }
        });
    } else {
      this.snackBar.open("Não existem Documentos selecionados!", "INFO!", {
        duration: 2000
      });
    }
  }

}


