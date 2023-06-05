document.addEventListener('DOMContentLoaded', function () {

  document.getElementById('login').addEventListener('click', function (event) {
    event.preventDefault();

    var emailInput = document.getElementById('username');
    var passwordInput = document.getElementById('password');
    
    if (emailInput.value.trim() === '' || passwordInput.value.trim() === '') {
      alert('Todos os campos devem ser preenchidos.');
      return;
    }

    fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nome: emailInput.value,
        senha: passwordInput.value,
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.message == 'Login bem-sucedido.') {
          window.location.href = 'paginainicial.html';
        } else {
          alert("Usuário ou Senha inválidos");
        }
      })
      .catch((error) => {
        console.error('Erro:', error);
      });
  });

});

