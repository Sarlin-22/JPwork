var i = 3;

function addQuestion() {
    var form = document.getElementById('myForm');
    var questionBox = document.createElement('div');
    questionBox.className = "question-box";
    var input = document.createElement('input');
    var br1 = document.createElement('br');
    var br2 = document.createElement('br');
    var label = document.createElement('label');
    var deleteButton = document.createElement('button');

    label.textContent = 'Pergunta ' + i + ':';
    input.type = 'text';
    input.name = 'question' + i;

    deleteButton.className = 'deletar';
    deleteButton.onclick = function () { deleteQuestion(input.name) };
    deleteButton.innerHTML = "&times;";

    questionBox.appendChild(label);
    questionBox.appendChild(br1);
    questionBox.appendChild(input);
    questionBox.appendChild(deleteButton);
    questionBox.appendChild(br2);

    form.appendChild(questionBox);

    i++;
}

function deleteQuestion(questionName) {
    var questionElement = document.getElementsByName(questionName)[0];
    questionElement.parentNode.remove();
}

function submitQuestions() {
    const inputs = document.querySelectorAll('input');
    const perguntas = Array.from(inputs).map(input => input.value);

    const usuario_id = 1;
    const usuario_nome = 'gabriel';

    fetch('/api/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            perguntas: perguntas,
            usuario_id: usuario_id,
            usuario_nome: usuario_nome,
        }),
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                alert('Perguntas enviadas com sucesso!');
            } else {
                alert('Houve um erro ao enviar as perguntas.');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function mostrarPerguntas() {
    fetch('/api/perguntas')
        .then(response => response.json())
        .then(perguntas => {
            console.log('Dados retornados pela API:', perguntas);
            const perguntasContainer = document.getElementById('perguntas-container');
            perguntasContainer.innerHTML = '';

            if (Array.isArray(perguntas)) {
                perguntas.forEach((pergunta, index) => {
                    const perguntaBox = document.createElement('div');
                    perguntaBox.classList.add('storage-box');

                    const perguntaLabel = document.createElement('label');
                    perguntaLabel.textContent = `Pergunta Armazenada ${index + 1}:`;
                    perguntaBox.appendChild(perguntaLabel);

                    const perguntaElement = document.createElement('p');
                    perguntaElement.textContent = pergunta.pergunta;
                    perguntaBox.appendChild(perguntaElement);

                    const deleteButton = document.createElement('button');
                    deleteButton.classList.add('deletar');
                    deleteButton.textContent = 'X';
                    deleteButton.onclick = function () {
                        deletePergunta(pergunta.id, perguntaBox);
                    };
                    perguntaBox.appendChild(deleteButton);

                    perguntasContainer.appendChild(perguntaBox);
                });
            } else {
                console.error('perguntas não é um array:', perguntas);
            }
        })
        .catch(error => {
            console.error('Erro:', error);
        });
}

function deletePergunta(id, perguntaBox) {
    fetch('/api/pergunta/' + id, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(data => {
            if (data.id === id) {
                perguntasContainer.removeChild(perguntaBox);
            } else {
                alert('Houve um erro ao excluir a pergunta.');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}


document.addEventListener('DOMContentLoaded', function () {
    const mostrarPerguntasButton = document.getElementById('mostrar-perguntas');

    mostrarPerguntasButton.addEventListener('click', function () {
        mostrarPerguntas();
    });
});
