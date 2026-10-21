let bancoDeAlunos = []
let numeroAluno = 0

    function cadastrarAluno(){
        const nomeAluno = document.getElementById("inpNomeAluno").value.trim()
        const cpfAluno = document.getElementById("inpCpf").value.trim()
        const numeroTelefoneAluno = document.getElementById("inpNumeroTelefone").value.trim()
        const dataNascimentoAluno = document.getElementById("inpDataNascimento").value

        if (!nomeAluno || !cpfAluno || !numeroTelefoneAluno || !dataNascimentoAluno) {
            alert("Preencha todos os campos")
            return;
    }else{
    const cadastro = new Aluno(nomeAluno, cpfAluno, numeroTelefoneAluno, dataNascimentoAluno)
    bancoDeAlunos.push(cadastro)
     numeroAluno++;

    document.getElementById("inpNomeAluno").value = "";
    document.getElementById("inpCpf").value = "";
    document.getElementById("inpNumeroTelefone").value = "";
    document.getElementById("inpDataNascimento").value = "";
   
    alert("Cadastro Realizado com Sucesso")
    }   
}

let BancoDePagamentos = []
let numeroPagamento = 0
function cadastrarPagamento(){
    const nomeAlunoPagamento = document.getElementById("nomePlan").value.trim()
    const dataPagamento = document.getElementById("nomePlan").value.trim()
    const nomeAlunoPagamento = document.getElementById("nomePlan").value.trim()
}

