// Função para enviar os dados POST - CREATE
function enviarDados(event) {
    event.preventDefault(); 

    // Obter os valores dos 10 campos
    var nome = document.getElementById('nome').value;
    var sobrenome = document.getElementById('sobrenome').value;
    var cpf = document.getElementById('cpf').value;
    var email = document.getElementById('email').value;
    var senha = document.getElementById('senha').value;
    var rua = document.getElementById('rua').value;
    var cep = document.getElementById('cep').value;
    var cidade = document.getElementById('cidade').value;
    var estado = document.getElementById('estado').value;
    var telefone = document.getElementById('telefone').value;

    // Criar o objeto 'usuario'
    var usuario = {
        nome: nome,
        sobrenome: sobrenome,
        cpf: cpf,
        email: email,
        senha: senha,
        rua: rua,
        cep: cep,
        cidade: cidade,
        estado: estado,
        telefone: telefone
    };

    // CORREÇÃO: URL alterada para /api/usuarios
    fetch('/api/usuarios', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    })
    .then(resposta => resposta.json()) 
    .then(dados => {
        console.log('Usuário cadastrado:', dados);
        alert('Usuário cadastrado com sucesso!');
        
        document.querySelector('form').reset();
    })
    .catch(error => {
        console.error('Erro ao cadastrar:', error);
        alert('Erro ao cadastrar usuário.');
    });
}