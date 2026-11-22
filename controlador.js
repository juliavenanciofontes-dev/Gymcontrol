 let bancoDeAlunos = JSON.parse(localStorage.getItem("alunos")) || []

 const valoresPlanos = {
    "Mensal": 100,
    "Trimestral": 270,
    "Semestral": 480,
    "Anual": 840
};

    function cadastrarAluno(){

    let nomeAluno = document.getElementById("inpNomeAluno").value.trim()
    let cpfAluno = document.getElementById("inpCpf").value.trim()
    let numeroTelefoneAluno = document.getElementById("inpNumeroTelefone").value.trim()
    let dataNascimentoAluno = document.getElementById("inpDataNascimento").value
    let planoAluno = document.getElementById("inpPlano").value

    if (!nomeAluno || !cpfAluno || !numeroTelefoneAluno || !dataNascimentoAluno || !planoAluno) {
        alert("Preencha todos os campos")
        return;
    }

    for (let i = 0; i < bancoDeAlunos.length; i++) {

        if (bancoDeAlunos[i].cpfAluno == cpfAluno) {
            alert("Este CPF já está cadastrado!")
            return;
        }
    }

    const aluno = new Aluno(nomeAluno, cpfAluno, numeroTelefoneAluno, dataNascimentoAluno, planoAluno)

    let novoAluno = {
        nomeAluno: aluno.getNomeAluno(),
        cpfAluno: aluno.getCpf(),
        numeroTelefoneAluno: aluno.getNumeroTelefone(),
        dataNascimentoAluno: aluno.getDataNascimento(),
        planoAluno: aluno.getPlano()
    }

    bancoDeAlunos.push(novoAluno)

    localStorage.setItem("alunos", JSON.stringify(bancoDeAlunos))

    document.getElementById("inpNomeAluno").value = "";
    document.getElementById("inpCpf").value = "";
    document.getElementById("inpNumeroTelefone").value = "";
    document.getElementById("inpDataNascimento").value = "";
    document.getElementById("inpPlano").value = "";

    alert("Cadastro Realizado com Sucesso")
}


function carregarAlunos(){
    let campoAluno = document.getElementById("inpAlunoPagamento")
    
    for (let i = 0; i < bancoDeAlunos.length; i++) {
        let opcao = document.createElement("option")

        opcao.value = bancoDeAlunos[i].cpfAluno
        opcao.textContent = bancoDeAlunos[i].nomeAluno
        
        campoAluno.appendChild(opcao)
    }
}

let bancoDePagamentos = JSON.parse(localStorage.getItem("pagamentos")) || [];
function cadastrarPagamento(){
        let cpfAlunoPagamento = document.getElementById("inpAlunoPagamento").value.trim()
        let valorPagamento = Number(document.getElementById("inpValor").value.trim())
        let dataPagamento = document.getElementById("inpDataPagamento").value.trim()
        let formaPagamento = document.getElementById("inpFormaPagamento").value

        let nomeAlunoPagamento = "";

        for (let i = 0; i < bancoDeAlunos.length; i++) {

            if (bancoDeAlunos[i].cpfAluno == cpfAlunoPagamento) {
            nomeAlunoPagamento = bancoDeAlunos[i].nomeAluno;
            break;
            }

        }

        if (!cpfAlunoPagamento || !valorPagamento || !dataPagamento || !formaPagamento) {
            alert("Preencha todos os campos")
            return;
        }

        if (!nomeAlunoPagamento) {
            alert("Aluno não encontrado!")
            return;
        }

        if (verificarPagamento(cpfAlunoPagamento, dataPagamento)) {
            alert("Este aluno já possui um pagamento válido para esse período!")
            return;
        }

        const pagamento = new Pagamento(
            cpfAlunoPagamento,
            nomeAlunoPagamento,
            dataPagamento,
            valorPagamento,
            formaPagamento
        );

        let novoPagamento = {
            cpfAlunoPagamento: pagamento.getCpfAlunoPagamento(),
            nomeAlunoPagamento: pagamento.getNomeAlunoPagamento(),
            dataPagamento: pagamento.getDataPagamento(),
            valorPagamento: pagamento.getValorPagamento(),
            formaPagamento: pagamento.getFormaPagamento()
        }

        bancoDePagamentos.push(novoPagamento)

        localStorage.setItem("pagamentos", JSON.stringify(bancoDePagamentos))

        document.getElementById("inpAlunoPagamento").value = "";
        document.getElementById("inpValor").value = "";
        document.getElementById("inpDataPagamento").value = "";
        document.getElementById("inpFormaPagamento").value = "";

        alert("Pagamento Registrado com Sucesso")
    }

function calcularVencimento(dataPagamento, plano){
    
    let meses = 0

    if (plano == "Mensal") {
        meses = 1
    } else {
        if (plano == "Trimestral") {
            meses = 3
        }else{
            if (plano == "Semestral") {
                meses = 6
            }else{
                if (plano == "Anual") {
                    meses = 12
                }
            }
        }
    }

    let partesData = dataPagamento.split("-")
    let ano = Number(partesData[0])
    let mes = Number(partesData[1]) - 1
    let dia = Number(partesData[2])

    let dataVencimento = new Date(ano, mes + meses, dia)

    if (dataVencimento.getDate() != dia) {
        dataVencimento.setDate(0);
    }

    return dataVencimento;
}

function verificarPagamento(cpfAluno, novaDataPagamento) {

    let planoAluno = "";

   
    for (let i = 0; i < bancoDeAlunos.length; i++) {

        if (bancoDeAlunos[i].cpfAluno == cpfAluno) {
            planoAluno = bancoDeAlunos[i].planoAluno;
            break;
        }
    }

    
    let ultimoPagamento = "";

    for (let i = 0; i < bancoDePagamentos.length; i++) {

        if (bancoDePagamentos[i].cpfAlunoPagamento == cpfAluno) {

            if (bancoDePagamentos[i].dataPagamento > ultimoPagamento) {
                ultimoPagamento = bancoDePagamentos[i].dataPagamento;
            }
        }
    }


    if (ultimoPagamento == "") {
        return false;
    }


    let vencimento = calcularVencimento(ultimoPagamento, planoAluno);


    let partesData = novaDataPagamento.split("-");
    let novaData = new Date(
        Number(partesData[0]),
        Number(partesData[1]) - 1,
        Number(partesData[2])
    );


    if (novaData < vencimento) {
        return true;
    } else {
        return false;
    }
}

function preencherValorPagamento() {

    let cpfAluno = document.getElementById("inpAlunoPagamento").value;

    let campoValor = document.getElementById("inpValor");

    campoValor.value = "";

    for (let i = 0; i < bancoDeAlunos.length; i++) {

        if (bancoDeAlunos[i].cpfAluno == cpfAluno) {

            let planoAluno = bancoDeAlunos[i].planoAluno;

            campoValor.value = valoresPlanos[planoAluno];

            break;
        }
    }
}

let bancoDeRelatorios = JSON.parse(localStorage.getItem("relatorios")) || [];

function carregarRelatorios(nomeBusca = "") {

    let listaRelatorios = document.getElementById("listaRelatorios");
    let mensagemVazia = document.getElementById("mensagemVazia");

    listaRelatorios.innerHTML = "";
    let totalArrecadado = 0;
    let hoje = new Date();

    let mesAtual = hoje.getMonth() + 1;
    let anoAtual = hoje.getFullYear();

    for (let i = 0; i < bancoDePagamentos.length; i++) {

        let partesData = bancoDePagamentos[i].dataPagamento.split("-");

        let anoPagamento = Number(partesData[0]);
        let mesPagamento = Number(partesData[1]);

        if (mesPagamento == mesAtual && anoPagamento == anoAtual) {
            totalArrecadado += Number(bancoDePagamentos[i].valorPagamento);
        }
    }

    document.getElementById("totalArrecadado").textContent =
    totalArrecadado.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

    for (let i = 0; i < bancoDeAlunos.length; i++) {

        let aluno = bancoDeAlunos[i];

        if (!aluno.nomeAluno.toLowerCase().includes(nomeBusca)) {
            continue;
        }

        let ultimoPagamento = null;

        // Procurar o pagamento mais recente do aluno
        for (let j = 0; j < bancoDePagamentos.length; j++) {

            if (bancoDePagamentos[j].cpfAlunoPagamento == aluno.cpfAluno) {

                if (ultimoPagamento == null || bancoDePagamentos[j].dataPagamento > ultimoPagamento.dataPagamento) {
                    ultimoPagamento = bancoDePagamentos[j];
                }
            }
        }

        // Definir a situação do aluno
        let situacao = "Pendente";

        if (ultimoPagamento != null) {

            let vencimento = calcularVencimento(
                ultimoPagamento.dataPagamento,
                aluno.planoAluno
            );

            let hoje = new Date();
            hoje.setHours(0, 0, 0, 0);

            if (hoje < vencimento) {
                situacao = "Pago";
            } else {
                situacao = "Atrasado";
            }
        }

        // Criar uma linha na tabela
        let linha = document.createElement("tr");

        let colunaNome = document.createElement("td");
        colunaNome.textContent = aluno.nomeAluno;

        let colunaPlano = document.createElement("td");
        colunaPlano.textContent = aluno.planoAluno;

        let colunaMensalidade = document.createElement("td");
        colunaMensalidade.textContent = valoresPlanos[aluno.planoAluno].toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });

        let colunaSituacao = document.createElement("td");
        colunaSituacao.textContent = situacao;

        let colunaAcoes = document.createElement("td");

        // Adicionar as colunas à linha
        linha.appendChild(colunaNome);
        linha.appendChild(colunaPlano);
        linha.appendChild(colunaMensalidade);
        linha.appendChild(colunaSituacao);
        linha.appendChild(colunaAcoes);

        // Adicionar a linha à tabela
        listaRelatorios.appendChild(linha);
    }

    // Atualizar a quantidade de alunos
    document.getElementById("totalAlunos").textContent = bancoDeAlunos.length;

    // Mostrar ou esconder a mensagem de tabela vazia
    if (bancoDeAlunos.length == 0) {
        mensagemVazia.style.display = "block";
    } else {
        mensagemVazia.style.display = "none";
    }

    document.getElementById("contadorRelatorios").textContent =
        "Mostrando " + bancoDeAlunos.length + " alunos";
}

let botaoAtualizar = document.getElementById("btnAtualizar");

if (botaoAtualizar) {
    botaoAtualizar.addEventListener("click", function () {

        bancoDeAlunos = JSON.parse(localStorage.getItem("alunos")) || [];
        bancoDePagamentos = JSON.parse(localStorage.getItem("pagamentos")) || [];

        carregarRelatorios();
    });
}

function buscarRelatorio() {

    let nomeBusca = document.getElementById("buscarAluno").value.toLowerCase();

    carregarRelatorios(nomeBusca);
}

let campoBusca = document.getElementById("buscarAluno");

if (campoBusca) {
    campoBusca.addEventListener("input", buscarRelatorio);
}