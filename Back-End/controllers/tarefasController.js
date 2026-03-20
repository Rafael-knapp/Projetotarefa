const connection = require('../../BancoDeDados/db');

exports.listar = async (req, res) => {
    try {
        const [rows] = await connection.execute('SELECT * FROM tarefas');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao listar as tarefas' });
    }
};

exports.criar = async (req, res) => {
    const { titulo, descricao } = req.body;
    try {
        await connection.execute('INSERT INTO tarefas (titulo, descricao) VALUES (?, ?)', [titulo, descricao]);
        res.status(201).json({ message: 'Tarefa criada com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar a tarefa' });
    }
};

exports.atualizar = async (req, res) => {
    const { id } = req.params;
    const { titulo, descricao } = req.body;
    try {
        await connection.execute('UPDATE tarefas SET titulo = ?, descricao = ? WHERE id = ?', [titulo, descricao, id]);
        res.status(200).json({ message: 'Tarefa atualizada com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar a tarefa' });
    }
};

exports.deletar = async (req, res) => {
    const { id } = req.params;
    try {
        await connection.execute('DELETE FROM tarefas WHERE id = ?', [id]);
        res.status(200).json({ message: 'Tarefa deletada com sucesso' });
    } catch (error) {    
        console.error(error);
        res.status(500).json({ error: 'Erro ao deletar a tarefa' });
    }
};
