// CORREÇÃO: URL da API alterada para um caminho relativo com /api
const API_URL = '/api/usuarios';

// 1. (GET) Carregar todos os usuários na tabela
function carregarUsuarios() {
    fetch(API_URL)
    .then(resposta => resposta.json())
    .then(dados => {
        const tabelaCorpo = document.getElementById('tabela-corpo');
        tabelaCorpo.innerHTML = ''; 

        dados.forEach(pessoa => {
            tabelaCorpo.innerHTML += `
                <tr>
                    <td>${pessoa.id}</td>
                    <td>${pessoa.nome} ${pessoa.sobrenome}</td>
                    <td>${pessoa.email}</td>
                    <td>${pessoa.telefone}</td>
                    <td>
                        <button class="btn-acao" onclick="visualizarUsuario('${pessoa.id}')">Visualizar</button>
                        <button class="btn-acao" onclick="preencherFormularioEdicao('${pessoa.id}')">Editar</button>
                        <button class="btn-acao btn-delete" onclick="deletarUsuario('${pessoa.id}')">Apagar</button>
                    </td>
                </tr>
            `;
        });
    });
}

// 2. (DELETE) Deletar um usuário
function deletarUsuario(id) {
    if (confirm('Tem certeza que deseja deletar este usuário?')) {
        fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                alert('Usuário deletado com sucesso!');
                carregarUsuarios(); // Recarrega a lista
            }
        });
    }
}

// 3. PUT - Buscar dados do usuário e preencher o formulário de edição
function preencherFormularioEdicao(id) {
    fetch(`${API_URL}/${id}`)
    .then(response => response.json())
    .then(pessoa => {
        // Preenche todos os 10 campos
        document.getElementById('edit-id').value = pessoa.id;
        document.getElementById('edit-nome').value = pessoa.nome;
        document.getElementById('edit-sobrenome').value = pessoa.sobrenome;
        document.getElementById('edit-cpf').value = pessoa.cpf;
        document.getElementById('edit-email').value = pessoa.email;
        document.getElementById('edit-senha').value = pessoa.senha;
        document.getElementById('edit-rua').value = pessoa.rua;
        document.getElementById('edit-cep').value = pessoa.cep;
        document.getElementById('edit-cidade').value = pessoa.cidade;
        document.getElementById('edit-estado').value = pessoa.estado;
        document.getElementById('edit-telefone').value = pessoa.telefone;
        
        // Foca no formulário de edição
        window.scrollTo(0, 0); 
    });
}

// 4. PATCH Enviar os dados atualizados
function atualizarDados() {
    var id = document.getElementById('edit-id').value;
    
    // CORREÇÃO 1: Coletar TODOS os 10 campos do formulário
    var dadosEditados = {
        nome: document.getElementById('edit-nome').value,
        sobrenome: document.getElementById('edit-sobrenome').value,
        cpf: document.getElementById('edit-cpf').value, // <-- Faltava
        email: document.getElementById('edit-email').value,
        senha: document.getElementById('edit-senha').value, // <-- Faltava
        rua: document.getElementById('edit-rua').value, // <-- Faltava
        cep: document.getElementById('edit-cep').value, // <-- Faltava
        cidade: document.getElementById('edit-cidade').value, // <-- Faltava
        estado: document.getElementById('edit-estado').value, // <-- Faltava
        telefone: document.getElementById('edit-telefone').value
    };


    fetch(`${API_URL}/${id}`, {
        method: 'PATCH', // Usando PATCH para atualização parcial (ou PUT para total)
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosEditados)
    })
    .then(response => response.json())
    .then(dados => {
        alert('Usuário atualizado com sucesso!');
        
        
        document.getElementById('edit-id').value = '';
        document.getElementById('edit-nome').value = '';
        document.getElementById('edit-sobrenome').value = '';
        document.getElementById('edit-cpf').value = '';
        document.getElementById('edit-email').value = '';
        document.getElementById('edit-senha').value = '';
        document.getElementById('edit-rua').value = '';
        document.getElementById('edit-cep').value = '';
        document.getElementById('edit-cidade').value = '';
        document.getElementById('edit-estado').value = '';
        document.getElementById('edit-telefone').value = '';

        carregarUsuarios();
    });
}

// 5. (GET by ID) Visualizar dados completos do usuário
function visualizarUsuario(id) {
    fetch(`${API_URL}/${id}`)
    .then(response => response.json())
    .then(pessoa => {

        let dadosCompletos = `
            ID: ${pessoa.id}
            Nome: ${pessoa.nome} ${pessoa.sobrenome}
            CPF: ${pessoa.cpf}
            Email: ${pessoa.email}
            Telefone: ${pessoa.telefone}
            Endereço: ${pessoa.rua}, ${pessoa.cidade} - ${pessoa.estado}
            CEP: ${pessoa.cep}
        `;
        alert(dadosCompletos);
    });
}