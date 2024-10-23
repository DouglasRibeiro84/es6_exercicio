class Aluno {

    #nota;

    constructor(nome, nota) {
        this.nome = nome;
        this.#nota = nota;
    }

    getNota() {
        return this.#nota;
    }

    setNota(nota) {
        this.#nota = nota;
    }

}

class Tarefas extends Aluno {
    constructor(nome, tarefas) {
        super(nome, 0)
        this.tarefas = tarefas;
    }

    calcularNota() {
        try {
            if (!Array.isArray(this.tarefas) || !this.tarefas.every(tarefa => typeof tarefa === 'number')) {
                throw new Error('As tarefas devem ser um array de números.');
            }

            const soma = this.tarefas.reduce((acumulador, tarefa) => acumulador + tarefa, 0);
            this.media = soma / this.tarefas.length;

            if (this.media > 10) {
                throw new Error('A média não pode ser maior que 10.');
            }

            this.setNota(this.media, 10);

        } catch (error) {
            console.error(`Erro ao calcular a nota do aluno: ${this.nome}, nota definada para 0`)
            this.setNota(0);
        }
    }
    aprovado() {
        return this.getNota() >= 6
    }

}

const alunos = [
    new Tarefas("João", [5, 7, 6]),
    new Tarefas("Maria", [8, 9, 7]),
    new Tarefas("Ana", [4, 5, 6]),
    new Tarefas("Pedro", [3, 4, 2]),
    new Tarefas("Lucas", [6, 6, 6]),
    new Tarefas("Inês", [null, 7, 8])
];

alunos.forEach(aluno => aluno.calcularNota());

const aprovados = alunos.filter(aluno => aluno.aprovado());
const reprovados = alunos.filter(aluno => !aluno.aprovado());

    if (aprovados.length > 0) {
        console.log("Alunos Aprovados:");
        aprovados.forEach(aluno => {
            console.log(`${aluno.nome}: ${aluno.getNota()}`);
        });
    } else {
        console.log("Nenhum aluno foi aprovado.");
    }

    if (reprovados.length > 0) {
        console.log("\nAlunos Reprovados:");
        reprovados.forEach(aluno => {
            console.log(`${aluno.nome}: ${aluno.getNota()}`);
        });
    } else {
        console.log("Nenhum aluno foi reprovado.");
    }

