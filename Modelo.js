class Aluno{
    #nomeAluno;
    #cpf;
    #numeroTelefone;
    #dataNascimento;
    #plano
    constructor(nomeAluno, cpf, numeroTelefone, dataNascimento, plano){
        this.#nomeAluno = nomeAluno;
        this.#cpf = cpf;
        this.#numeroTelefone = numeroTelefone
        this.#dataNascimento = dataNascimento;
        this.#plano = plano;
    }

    getNomeAluno(){
        return this.#nomeAluno;
    }
    setNomeAluno(nomeAluno){
        this.#nomeAluno = nomeAluno;
    }

    getCpf(){
        return this.#cpf;
    }
    setCpf(cpf){
        this.#cpf = cpf;
    }

    getNumeroTelefone(){
        return this.#numeroTelefone;
    }
    setNumeroTelefone(numeroTelefone){
        this.#numeroTelefone = numeroTelefone;
    }

    getDataNascimento(){
        return this.#dataNascimento;
    }
    setDataNascimento(dataNascimento){
        this.#dataNascimento = dataNascimento;
    }

    getPlano(){
        return this.#plano
    }

    setPlano(plano){
        this.#plano = plano
    }
}

class Pagamento{
    #cpfAlunoPagamento;
    #nomeAlunoPagamento;
    #dataPagamento;
    #valorPagamento;
    #formaPagamento;

    constructor(cpfAlunoPagamento,nomeAlunoPagamento, dataPagamento, valorPagamento, formaPagamento){
        this.#cpfAlunoPagamento = cpfAlunoPagamento;
        this.#nomeAlunoPagamento = nomeAlunoPagamento;
        this.#dataPagamento = dataPagamento;
        this.#valorPagamento = valorPagamento;
        this.#formaPagamento = formaPagamento
    }

    getCpfAlunoPagamento(){
        return this.#cpfAlunoPagamento
    }

    setCpfAlunoPagamento(cpfAlunoPagamento){
        this.#cpfAlunoPagamento = cpfAlunoPagamento
    }

    getNomeAlunoPagamento(){
        return this.#nomeAlunoPagamento
    }

    setNomeAlunoPagamento(nomeAlunoPagamento){
        this.#nomeAlunoPagamento = nomeAlunoPagamento
    }

    getDataPagamento(){
        return this.#dataPagamento
    }

    setDataPagamento(dataPagamento){
        this.#dataPagamento = dataPagamento;
    }

    getValorPagamento(){
        return this.#valorPagamento;
    }

    setValorPagamento(valorPagamento){
        this.#valorPagamento = valorPagamento;
    }

    getFormaPagamento(){
        return this.#formaPagamento
    }

    setFormaPagamento(formaPagamento){
        this.#formaPagamento = formaPagamento
    }
}


class Relatorio{
    #alunoRelatorio
    #planoRelatorio
    #mensalidadeRelatorio
    #situacaoRelatorio
    constructor(alunoRelatorio, planoRelatorio, mensalidadeRelatorio, situacaoRelatorio){
        this.#alunoRelatorio = alunoRelatorio;
        this.#planoRelatorio = planoRelatorio;
        this.#mensalidadeRelatorio = mensalidadeRelatorio;
        this.#situacaoRelatorio = situacaoRelatorio;
    }

    getAlunoRelatorio(){
        return this.#alunoRelatorio
    }
    setAlunoRelatorio(alunoRelatorio){
        this.#alunoRelatorio = alunoRelatorio;
    }
    getPlanoRelatorio(){
        return this.#planoRelatorio
    }
    setPlanoRelatorio(planoRelatorio){
        this.#planoRelatorio = planoRelatorio;
    }
    getMensalidadeRelatorio(){
        return this.#mensalidadeRelatorio
    }
    setMensalidadeRelatorio(mensalidadeRelatorio){
        this.#mensalidadeRelatorio = mensalidadeRelatorio;
    }
    getSituacaoRelatorio(){
        return this.#situacaoRelatorio
    }
    setSituacaoRelatorio(situacaoRelatorio){
        this.#situacaoRelatorio = situacaoRelatorio;
    }
}