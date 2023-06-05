document.getElementById('reset').addEventListener('click', async () => {
  const name = document.querySelector('.nome').value;
  const newPassword = document.querySelector('.new-password').value;
  const confirmPassword = document.querySelector('.confirm-password').value;

  if (newPassword !== confirmPassword) {
      document.getElementById('message_reset').innerText = 'As senhas não conferem.';
  } else {
      const response = await fetch('http://localhost:3000/auth/reset', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              name,
              newPassword,
          }),
      });

      if (!response.ok) {
          const text = await response.text();
          document.getElementById('message_reset').innerText = 'Erro: ' + text;
          return;
      }

      const data = await response.json();
      document.getElementById('message_reset').innerText = data.message;
  }
});
