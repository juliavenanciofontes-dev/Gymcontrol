 let bancoDeAlunos = JSON.parse(localStorage.getItem("alunos")) || []

    function cadastrarAluno(){
        let nomeAluno = document.getElementById("inpNomeAluno").value.trim()
        let cpfAluno = document.getElementById("inpCpf").value.trim()
        let numeroTelefoneAluno = document.getElementById("inpNumeroTelefone").value.trim()
        let dataNascimentoAluno = document.getElementById("inpDataNascimento").value
        let planoAluno = document.getElementById("inpPlano").value

        for (let i = 0; i < bancoDeAlunos.length; i++) {
            if (bancoDeAlunos[i].cpfAluno == cpfAluno) {
                alert("Este CPF já está cadastrado!")
                return
            }
            
        }

        if (!nomeAluno || !cpfAluno || !numeroTelefoneAluno || !dataNascimentoAluno || !planoAluno) {
            alert("Preencha todos os campos")
            return;
        }else{
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
    }


function carregarAlunos(){
    let campoAluno = document.getElementById("inpAluno")
    
    for (let i = 0; i < bancoDeAlunos.length; i++) {
        let opcao = document.createElement("option")

        opcao.value = bancoDeAlunos[i].cpfAluno
        opcao.textContent = bancoDeAlunos[i].nomeAluno
        
        campoAluno.appendChild(opcao)
    }
}

function cadastrarPagamento(){
    
}
