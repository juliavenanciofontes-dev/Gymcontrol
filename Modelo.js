class Aluno{
    #nomeAluno;
    #cpf;
    #numeroTelefone;
    #dataNascimento;
    constructor(nomeAluno, cpf, numeroTelefone, dataNascimento){
        this.#nomeAluno = nomeAluno;
        this.#cpf = cpf;
        this.#numeroTelefone = numeroTelefone
        this.#dataNascimento = dataNascimento;
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
}

class Pagamento{
    #nomeAlunoPagamento;
    #dataPagamento;
    #valorPagamento;
    constructor(nomeAlunoPagamento, dataPagamento, valorPagamento){
        this.#nomeAlunoPagamento = nomeAlunoPagamento;
        this.#dataPagamento = dataPagamento;
        this.#valorPagamento = valorPagamento;
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
}

class Plano{
    #nomePlano;
    #duracaoPlano;
    #valorPlano;
    constructor(nomePlano, duracaoPlano, valorPlano){
        this.#nomePlano = nomePlano;
        this.#duracaoPlano = duracaoPlano;
        this.#valorPlano = valorPlano
    }
    getNomePlano(){
        return this.#nomePlano;
    }
    setNomePlano(nomePlano){
        this.#nomePlano = nomePlano;
    }
    getDuracaoPlano(){
        return this.#duracaoPlano;
    }
    setDuracaoPlano(duracaoPlano){
        this.#duracaoPlano = duracaoPlano;
    }
    getValorPlano(){
        return this.#valorPlano;
    }
    setValorPlano(valorPlano){
        this.#valorPlano = valorPlano;
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