export class Alvara {
    selecionado: boolean = false;
    id: number = 0;
    tipo_doc: any;
    nome_arquivo: string = '';
    numero_alvara: string = '';
    nome_empresa: string = '';
    cnpj_empresa: string = '';
    data_emissao: Date | undefined;
    data_vencimento: Date | undefined;
    expira: number = 0;
    pdf: any;
    observacao: string = '';
}