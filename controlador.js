 let bancoDeAlunos = JSON.parse(localStorage.getItem("alunos")) || []
 let cpfOriginalEdicao = "";

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

function carregarRelatorios(nomeBusca = "", planoSelecionado = "todos", situacaoSelecionada = "todos") {

    let listaRelatorios = document.getElementById("listaRelatorios");
    let mensagemVazia = document.getElementById("mensagemVazia");

    listaRelatorios.innerHTML = "";
    let alunosExibidos = 0;
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

        // Procurar o pagamento mais recente que já chegou
        let dataAtual = new Date();
        dataAtual.setHours(0, 0, 0, 0);

        let anoHoje = dataAtual.getFullYear();
        let mesHoje = String(dataAtual.getMonth() + 1).padStart(2, "0");
        let diaHoje = String(dataAtual.getDate()).padStart(2, "0");

        let dataHoje = anoHoje + "-" + mesHoje + "-" + diaHoje;

        let ultimoPagamento = null;

        for (let j = 0; j < bancoDePagamentos.length; j++) {

            if (bancoDePagamentos[j].cpfAlunoPagamento == aluno.cpfAluno) {

                if (bancoDePagamentos[j].dataPagamento <= dataHoje) {

                    if (ultimoPagamento == null || bancoDePagamentos[j].dataPagamento > ultimoPagamento.dataPagamento) {
                        ultimoPagamento = bancoDePagamentos[j];
                    }
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

            if (dataAtual < vencimento) {
                situacao = "Pago";
            } else {
                situacao = "Atrasado";
            }
        }
        // Filtrar pelo plano
        if (planoSelecionado != "todos" && aluno.planoAluno != planoSelecionado) {
            continue;
        }

        // Filtrar pela situação
        if (situacaoSelecionada != "todos" && situacao.toLowerCase() != situacaoSelecionada.toLowerCase()) {
            continue;
        }

        alunosExibidos++;
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
        let botaoExcluir = document.createElement("button");
        botaoExcluir.title = "Excluir aluno";
        botaoExcluir.classList.add("botao-excluir");

        let imagemExcluir = document.createElement("img");
        imagemExcluir.src = "./imagens/excluir.png";
        imagemExcluir.alt = "Excluir aluno";

        botaoExcluir.appendChild(imagemExcluir);

        botaoExcluir.onclick = function() {
            excluirAluno(aluno.cpfAluno);
        };

        colunaAcoes.appendChild(botaoExcluir);

        let botaoEditar = document.createElement("button");
        botaoEditar.title = "Editar aluno";
        botaoEditar.classList.add("botao-editar");

        let imagemEditar = document.createElement("img");
        imagemEditar.src = "./imagens/editar.png";
        imagemEditar.alt = "Editar aluno";

        botaoEditar.appendChild(imagemEditar);

        botaoEditar.onclick = function() {
            abrirEdicao(aluno.cpfAluno);
        };

        colunaAcoes.appendChild(botaoEditar);

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
    "Mostrando " + alunosExibidos + " alunos";
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

    let planoSelecionado = document.getElementById("filtroPlano").value;

    let situacaoSelecionada = document.getElementById("filtroSituacao").value;

    carregarRelatorios(nomeBusca, planoSelecionado, situacaoSelecionada);
}

let campoBusca = document.getElementById("buscarAluno");

if (campoBusca) {
    campoBusca.addEventListener("input", buscarRelatorio);
}

let campoPlano = document.getElementById("filtroPlano");

if (campoPlano) {
    campoPlano.addEventListener("change", buscarRelatorio);
}

let campoSituacao = document.getElementById("filtroSituacao");

if (campoSituacao) {
    campoSituacao.addEventListener("change", buscarRelatorio);
}

function excluirAluno(cpfAluno) {

    let confirmar = confirm("Tem certeza que deseja excluir este aluno?");

    if (confirmar) {

        bancoDeAlunos = bancoDeAlunos.filter(function(aluno) {
            return aluno.cpfAluno != cpfAluno;
        });

        bancoDePagamentos = bancoDePagamentos.filter(function(pagamento) {
            return pagamento.cpfAlunoPagamento != cpfAluno;
        });

        localStorage.setItem("alunos", JSON.stringify(bancoDeAlunos));
        localStorage.setItem("pagamentos", JSON.stringify(bancoDePagamentos));

        carregarRelatorios();

        alert("Aluno excluído com sucesso!");
    }
}

function abrirEdicao(cpfAluno) {

    for (let i = 0; i < bancoDeAlunos.length; i++) {

        if (bancoDeAlunos[i].cpfAluno == cpfAluno) {

            let aluno = bancoDeAlunos[i];

            cpfOriginalEdicao = aluno.cpfAluno;

            document.getElementById("editNomeAluno").value = aluno.nomeAluno;
            document.getElementById("editCpf").value = aluno.cpfAluno;
            document.getElementById("editTelefone").value = aluno.numeroTelefoneAluno;
            document.getElementById("editDataNascimento").value = aluno.dataNascimentoAluno;
            document.getElementById("editPlano").value = aluno.planoAluno;

            document.getElementById("modalEdicao").style.display = "flex";

            break;
        }
    }
}

let botaoCancelar = document.getElementById("btnCancelarEdicao");

if (botaoCancelar) {
    botaoCancelar.addEventListener("click", function() {
        document.getElementById("modalEdicao").style.display = "none";
    });
}

let formularioEdicao = document.getElementById("formEdicao");

if (formularioEdicao) {
    formularioEdicao.addEventListener("submit", function(event) {
        event.preventDefault();

        let nomeNovo = document.getElementById("editNomeAluno").value.trim();
        let cpfNovo = document.getElementById("editCpf").value.trim();
        let telefoneNovo = document.getElementById("editTelefone").value.trim();
        let dataNascimentoNova = document.getElementById("editDataNascimento").value;
        let planoNovo = document.getElementById("editPlano").value;

        // Verificar se o novo CPF já pertence a outro aluno
        for (let i = 0; i < bancoDeAlunos.length; i++) {
            if (bancoDeAlunos[i].cpfAluno == cpfNovo && cpfNovo != cpfOriginalEdicao) {
                alert("Este CPF já está cadastrado!");
                return;
            }
        }

        // Encontrar o aluno que está sendo editado
        for (let i = 0; i < bancoDeAlunos.length; i++) {
            if (bancoDeAlunos[i].cpfAluno == cpfOriginalEdicao) {

                let nomeAntigo = bancoDeAlunos[i].nomeAluno;

                bancoDeAlunos[i].nomeAluno = nomeNovo;
                bancoDeAlunos[i].cpfAluno = cpfNovo;
                bancoDeAlunos[i].numeroTelefoneAluno = telefoneNovo;
                bancoDeAlunos[i].dataNascimentoAluno = dataNascimentoNova;
                bancoDeAlunos[i].planoAluno = planoNovo;

                // Atualizar os pagamentos relacionados ao aluno
                for (let j = 0; j < bancoDePagamentos.length; j++) {
                    if (bancoDePagamentos[j].cpfAlunoPagamento == cpfOriginalEdicao) {
                        bancoDePagamentos[j].cpfAlunoPagamento = cpfNovo;
                        bancoDePagamentos[j].nomeAlunoPagamento = nomeNovo;
                    }
                }

                break;
            }
        }

        // Salvar as alterações no localStorage
        localStorage.setItem("alunos", JSON.stringify(bancoDeAlunos));
        localStorage.setItem("pagamentos", JSON.stringify(bancoDePagamentos));

        // Fechar o modal e atualizar os relatórios
        document.getElementById("modalEdicao").style.display = "none";

        carregarRelatorios();

        alert("Aluno atualizado com sucesso!");
    });
}