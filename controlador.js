
// 1. DADOS INICIAIS E VALORES DOS PLANOS

// Recupera os alunos salvos no navegador e prepara as variáveis utilizadas na edição.
 let bancoDeAlunos = JSON.parse(localStorage.getItem("alunos")) || []
 let cpfOriginalEdicao = "";

 const valoresPlanos = {
    "Mensal": 100,
    "Trimestral": 270,
    "Semestral": 480,
    "Anual": 840
};

// função para validar o cpf
function validarCPF(cpf) {

    cpf = cpf.replace(/\D/g, "");

    if (cpf.length !== 11) {
        return false;
    }

    if (/^(\d)\1{10}$/.test(cpf)) {
        return false;
    }

    let soma = 0;

    for (let i = 0; i < 9; i++) {
        soma += Number(cpf[i]) * (10 - i);
    }

    let resto = soma % 11;
    let primeiroDigito = resto < 2 ? 0 : 11 - resto;

    soma = 0;

    for (let i = 0; i < 10; i++) {
        soma += Number(cpf[i]) * (11 - i);
    }

    resto = soma % 11;
    let segundoDigito = resto < 2 ? 0 : 11 - resto;

    return Number(cpf[9]) === primeiroDigito &&
           Number(cpf[10]) === segundoDigito;
}

// Cadastra um novo aluno, valida os campos e salva seus dados no localStorage.
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

    if (!validarCPF(cpfAluno)) {
        alert("CPF inválido!");
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


// Carrega os alunos cadastrados no campo de seleção da tela de pagamentos.
function carregarAlunos(){
    let campoAluno = document.getElementById("inpAlunoPagamento")

    for (let i = 0; i < bancoDeAlunos.length; i++) {
        let opcao = document.createElement("option")

        opcao.value = bancoDeAlunos[i].cpfAluno
        opcao.textContent = bancoDeAlunos[i].nomeAluno

        campoAluno.appendChild(opcao)
    }
}


// 2. CADASTRO E CONTROLE DE PAGAMENTOS

// Recupera os pagamentos já registrados no navegador.
let bancoDePagamentos = JSON.parse(localStorage.getItem("pagamentos")) || [];
// Registra o pagamento de um aluno após validar os dados e verificar se ele pode pagar novamente.
function cadastrarPagamento(){

    atualizarDataPagamento();

    let cpfAlunoPagamento = document.getElementById("inpAlunoPagamento").value.trim();
    let valorPagamento = Number(document.getElementById("inpValor").value.trim());
    let dataPagamento = document.getElementById("inpDataPagamento").value;
    let formaPagamento = document.getElementById("inpFormaPagamento").value;

    let nomeAlunoPagamento = "";
    let planoAluno = "";

    for (let i = 0; i < bancoDeAlunos.length; i++) {

        if (bancoDeAlunos[i].cpfAluno == cpfAlunoPagamento) {

            nomeAlunoPagamento = bancoDeAlunos[i].nomeAluno;
            planoAluno = bancoDeAlunos[i].planoAluno;

            break;
        }
    }

    if (!cpfAlunoPagamento || !valorPagamento || !dataPagamento || !formaPagamento) {
        alert("Preencha todos os campos");
        return;
    }

    if (!nomeAlunoPagamento) {
        alert("Aluno não encontrado!");
        return;
    }

    if (verificarPagamento(cpfAlunoPagamento, dataPagamento)) {
        alert("Este aluno já possui um pagamento válido para esse período!");
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
        planoPagamento: planoAluno,
        dataPagamento: pagamento.getDataPagamento(),
        valorPagamento: pagamento.getValorPagamento(),
        formaPagamento: pagamento.getFormaPagamento()

    };

    bancoDePagamentos.push(novoPagamento);

    localStorage.setItem("pagamentos", JSON.stringify(bancoDePagamentos));

    document.getElementById("inpAlunoPagamento").value = "";
    document.getElementById("inpCpfPagamento").value = "";
    document.getElementById("inpPlanoPagamento").value = "";
    document.getElementById("inpValor").value = "";
    document.getElementById("inpFormaPagamento").value = "";

    atualizarDataPagamento();

    alert("Pagamento Registrado com Sucesso");
}

// Calcula a data de vencimento com base na data do pagamento e na duração do plano.
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

// Localiza o pagamento mais recente de um aluno usando seu CPF.
function obterUltimoPagamento(cpfAluno) {

    let ultimoPagamento = null;

    for (let i = 0; i < bancoDePagamentos.length; i++) {

        if (bancoDePagamentos[i].cpfAlunoPagamento == cpfAluno) {

            if (
                ultimoPagamento == null ||
                bancoDePagamentos[i].dataPagamento > ultimoPagamento.dataPagamento
            ) {
                ultimoPagamento = bancoDePagamentos[i];
            }
        }
    }

    return ultimoPagamento;
}

// Verifica se o último plano pago pelo aluno ainda está dentro do período de validade.
function planoEstaAtivo(cpfAluno) {

    let ultimoPagamento = obterUltimoPagamento(cpfAluno);

    if (ultimoPagamento == null) {
        return false;
    }

    let planoAluno = ultimoPagamento.planoPagamento;

    // Compatibilidade com pagamentos antigos
    if (!planoAluno) {

        for (let i = 0; i < bancoDeAlunos.length; i++) {

            if (bancoDeAlunos[i].cpfAluno == cpfAluno) {
                planoAluno = bancoDeAlunos[i].planoAluno;
                break;
            }
        }
    }

    let vencimento = calcularVencimento(
        ultimoPagamento.dataPagamento,
        planoAluno
    );

    let hoje = new Date();

    hoje.setHours(0, 0, 0, 0);

    return hoje < vencimento;
}

// Impede um novo pagamento quando o aluno ainda possui um período pago válido.
function verificarPagamento(cpfAluno, novaDataPagamento) {

    let ultimoPagamento = obterUltimoPagamento(cpfAluno);

    if (ultimoPagamento == null) {
        return false;
    }

    let planoPago = ultimoPagamento.planoPagamento;

    // Compatibilidade com pagamentos antigos
    if (!planoPago) {

        for (let i = 0; i < bancoDeAlunos.length; i++) {

            if (bancoDeAlunos[i].cpfAluno == cpfAluno) {
                planoPago = bancoDeAlunos[i].planoAluno;
                break;
            }
        }
    }

    let vencimento = calcularVencimento(
        ultimoPagamento.dataPagamento,
        planoPago
    );

    let partesData = novaDataPagamento.split("-");

    let novaData = new Date(
        Number(partesData[0]),
        Number(partesData[1]) - 1,
        Number(partesData[2])
    );

    return novaData < vencimento;
}

// Preenche automaticamente CPF, plano e valor quando um aluno é selecionado.
function preencherValorPagamento() {

    let cpfAluno = document.getElementById("inpAlunoPagamento").value;

    let campoValor = document.getElementById("inpValor");
    let campoCpf = document.getElementById("inpCpfPagamento");
    let campoPlano = document.getElementById("inpPlanoPagamento");

    campoValor.value = "";
    campoCpf.value = "";
    campoPlano.value = "";

    for (let i = 0; i < bancoDeAlunos.length; i++) {

        if (bancoDeAlunos[i].cpfAluno == cpfAluno) {

            let planoAluno = bancoDeAlunos[i].planoAluno;

            campoCpf.value = bancoDeAlunos[i].cpfAluno;
            campoPlano.value = planoAluno;
            campoValor.value = valoresPlanos[planoAluno];

            break;
        }
    }
}

// Define automaticamente a data atual no campo de data do pagamento.
function atualizarDataPagamento() {

    let hoje = new Date();

    let ano = hoje.getFullYear();
    let mes = String(hoje.getMonth() + 1).padStart(2, "0");
    let dia = String(hoje.getDate()).padStart(2, "0");

    document.getElementById("inpDataPagamento").value =
        ano + "-" + mes + "-" + dia;
}



// 3. RELATÓRIOS E FILTROS

// Recupera os dados de relatórios armazenados no navegador.
let bancoDeRelatorios = JSON.parse(localStorage.getItem("relatorios")) || [];

// Monta a tabela de relatórios, calcula a arrecadação e aplica os filtros selecionados.
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

            let planoPago = ultimoPagamento.planoPagamento || aluno.planoAluno;

            let vencimento = calcularVencimento(
                ultimoPagamento.dataPagamento,
                planoPago
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

// Atualiza os dados dos alunos e pagamentos e recarrega os relatórios ao clicar no botão.
let botaoAtualizar = document.getElementById("btnAtualizar");

if (botaoAtualizar) {
    botaoAtualizar.addEventListener("click", function () {

        bancoDeAlunos = JSON.parse(localStorage.getItem("alunos")) || [];
        bancoDePagamentos = JSON.parse(localStorage.getItem("pagamentos")) || [];

        carregarRelatorios();
    });
}

// Lê os filtros da tela e solicita a atualização da tabela de relatórios.
function buscarRelatorio() {

    let nomeBusca = document.getElementById("buscarAluno").value.toLowerCase();

    let planoSelecionado = document.getElementById("filtroPlano").value;

    let situacaoSelecionada = document.getElementById("filtroSituacao").value;

    carregarRelatorios(nomeBusca, planoSelecionado, situacaoSelecionada);
}

// Configura os eventos dos campos de busca e dos filtros dos relatórios.
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

// Exclui um aluno e também remove os pagamentos associados ao CPF dele.
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

// Busca os dados do aluno, preenche o formulário de edição e controla a troca de plano.
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

            let campoPlano = document.getElementById("editPlano");

            campoPlano.disabled = planoEstaAtivo(cpfAluno);

            document.getElementById("modalEdicao").style.display = "flex";

            break;
        }
    }
}

// Configura o botão que fecha a janela de edição sem salvar alterações.
let botaoCancelar = document.getElementById("btnCancelarEdicao");

if (botaoCancelar) {
    botaoCancelar.addEventListener("click", function() {
        document.getElementById("modalEdicao").style.display = "none";
    });
}

// Configura o envio do formulário de edição, valida os dados e salva as alterações.
let formularioEdicao = document.getElementById("formEdicao");

if (formularioEdicao) {
    formularioEdicao.addEventListener("submit", function(event) {
        event.preventDefault();

        let nomeNovo = document.getElementById("editNomeAluno").value.trim();
        let cpfNovo = document.getElementById("editCpf").value.trim();
        let telefoneNovo = document.getElementById("editTelefone").value.trim();
        let dataNascimentoNova = document.getElementById("editDataNascimento").value;
        let planoNovo = document.getElementById("editPlano").value;

        // Impedir troca de plano antes do vencimento
        if (
            planoNovo != bancoDeAlunos.find(function(aluno) {
                return aluno.cpfAluno == cpfOriginalEdicao;
            }).planoAluno &&
            planoEstaAtivo(cpfOriginalEdicao)
        ) {

            alert("Não é possível trocar o plano antes do vencimento!");

            return;
        }

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

// 4. INDICADORES DA PÁGINA INICIAL

// Atualiza os números apresentados no painel inicial.
function atualizarIndicadoresInicio() {

    // Atualizar os dados com as informações salvas no navegador
    bancoDeAlunos = JSON.parse(localStorage.getItem("alunos")) || [];
    bancoDePagamentos = JSON.parse(localStorage.getItem("pagamentos")) || [];

    // Localizar os elementos do painel
    let campoAlunos = document.getElementById("indicadorAlunos");
    let campoAtivos = document.getElementById("indicadorAtivos");
    let campoAtrasados = document.getElementById("indicadorAtrasados");
    let campoArrecadado = document.getElementById("indicadorArrecadado");

    // Verificar se os indicadores existem na página
    if (!campoAlunos || !campoAtivos || !campoAtrasados || !campoArrecadado) {
        return;
    }

    let totalAtivos = 0;
    let totalAtrasados = 0;
    let totalArrecadado = 0;

    let hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    let mesAtual = hoje.getMonth() + 1;
    let anoAtual = hoje.getFullYear();

    // Calcular a arrecadação do mês atual
    for (let i = 0; i < bancoDePagamentos.length; i++) {

        let partesData = bancoDePagamentos[i].dataPagamento.split("-");

        let anoPagamento = Number(partesData[0]);
        let mesPagamento = Number(partesData[1]);

        if (mesPagamento == mesAtual && anoPagamento == anoAtual) {

            totalArrecadado += Number(bancoDePagamentos[i].valorPagamento);

        }
    }

    // Verificar a situação de cada aluno
    for (let i = 0; i < bancoDeAlunos.length; i++) {

        let aluno = bancoDeAlunos[i];

        let dataHoje =
            hoje.getFullYear() + "-" +
            String(hoje.getMonth() + 1).padStart(2, "0") + "-" +
            String(hoje.getDate()).padStart(2, "0");

        let ultimoPagamento = null;

        // Procurar o pagamento mais recente do aluno
        for (let j = 0; j < bancoDePagamentos.length; j++) {

            if (bancoDePagamentos[j].cpfAlunoPagamento == aluno.cpfAluno) {

                if (bancoDePagamentos[j].dataPagamento <= dataHoje) {

                    if (
                        ultimoPagamento == null ||
                        bancoDePagamentos[j].dataPagamento > ultimoPagamento.dataPagamento
                    ) {

                        ultimoPagamento = bancoDePagamentos[j];

                    }
                }
            }
        }

        // Verificar se o aluno possui um pagamento registrado
        if (ultimoPagamento != null) {

            let planoPago = ultimoPagamento.planoPagamento || aluno.planoAluno;

            let vencimento = calcularVencimento(
                ultimoPagamento.dataPagamento,
                planoPago
            );

            if (hoje < vencimento) {

                totalAtivos++;

            } else {

                totalAtrasados++;

            }
        }
    }

    // Mostrar os resultados no painel
    campoAlunos.textContent = bancoDeAlunos.length;

    campoAtivos.textContent = totalAtivos;

    campoAtrasados.textContent = totalAtrasados;

    campoArrecadado.textContent = totalArrecadado.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// Atualizar os indicadores sempre que a página inicial for exibida.
window.addEventListener("pageshow", atualizarIndicadoresInicio);