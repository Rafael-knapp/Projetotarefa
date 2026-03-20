const API_URL = window.env.API_URL || 'http://localhost:3000';

async function ListarTarefas() {
    try {
        const response = await fetch(`${API_URL}/tarefas`);
        const tarefas = await response.json();
        return tarefas;
    } catch (error) {
        console.error(error);
    }
}

document.getElementById('listar').addEventListener('click', async () => {
    const tarefas = await ListarTarefas();

    const lista = document.getElementById('lista-tarefas');
    lista.innerHTML = '';

    if (!tarefas || tarefas.length === 0) {
        const item = document.createElement('li');
        item.textContent = 'Nenhuma tarefa encontrada.';
        lista.appendChild(item);
        return;
    }

    tarefas.forEach(tarefa => {
        const item = document.createElement('li');
        item.textContent = `#${tarefa.id} - ${tarefa.titulo}: ${tarefa.descricao}`;
        lista.appendChild(item);
    });
});

async function CadastrarTarefa(titulo, descricao) {
    try {
        const response = await fetch(`${API_URL}/tarefas`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ titulo, descricao })
        });
        const tarefa = await response.json();
        return tarefa;
    } catch (error) {
        console.error(error);
    }
}

document.getElementById('cadastrar').addEventListener('click', async () => {
    const titulo = document.getElementById('titulo').value;
    const descricao = document.getElementById('descricao').value;
    const tarefa = await CadastrarTarefa(titulo, descricao);
    console.log(tarefa);

    document.getElementById('titulo').value = '';
    document.getElementById('descricao').value = '';
});

async function AtualizarTarefa(id, titulo, descricao) {
    try {
        const response = await fetch(`${API_URL}/tarefas/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ titulo, descricao })
        });
        const tarefa = await response.json();
        return tarefa;
    } catch (error) {
        console.error(error);
    }
}

document.getElementById('atualizar').addEventListener('click', async () => {
    const id = document.getElementById('id').value;
    const titulo = document.getElementById('titulo').value;
    const descricao = document.getElementById('descricao').value;
    const tarefa = await AtualizarTarefa(id, titulo, descricao);
    console.log(tarefa);

    document.getElementById('id').value = '';
    document.getElementById('titulo').value = '';
    document.getElementById('descricao').value = '';
});

async function DeletarTarefa(id) {
    try {
        const response = await fetch(`${API_URL}/tarefas/${id}`, {
            method: 'DELETE'
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
    }
}

document.getElementById('deletar-btn').addEventListener('click', async () => {
    const id = document.getElementById('id-deletar').value;
    const result = await DeletarTarefa(id);
    console.log(result);

    document.getElementById('id-deletar').value = '';
});

