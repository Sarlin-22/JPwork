function exibirForm(figure, state) {
    document.getElementById("meuForm").classList.remove("hidden");
    document.getElementById("post").classList.add("hidden");
  
    // Remover todas as classes de estado possíveis dos outros elementos
    var figures = document.querySelectorAll('figure');
    figures.forEach(function(fig) {
      fig.classList.remove('pessimo-filled', 'ruim-filled', 'regular-filled', 'bom-filled', 'otimo-filled');
    });
  
    // Adicionar a classe de estado correta ao elemento clicado
    figure.classList.add(state);
  }
  
  function enviarForm() {
    document.getElementById("text").classList.add("hidden");
    document.getElementById("btn").classList.add("hidden");
    document.getElementById("post").classList.remove("hidden");
    document.getElementById("pergunta").classList.add("hidden");
    document.getElementById("section").classList.add("hidden"); // Adiciona a classe "hidden" à div com id "section"
}
  function editarForm() {
    document.getElementById("text").classList.remove("hidden");
    document.getElementById("btn").classList.remove("hidden");
    document.getElementById("post").classList.add("hidden");
    document.getElementById("pergunta").classList.remove("hidden");
    document.getElementById("section").classList.remove("hidden"); // Remove a classe "hidden" da div com id "section"
    
      // Limpar o conteúdo do textarea
      document.getElementById("box").value = "";
    
      // Limpar a pergunta
      document.getElementById("pergunta").textContent = "#";

      
    }
    
    // Função para reiniciar o formulário
    function reiniciarForm() {
      document.getElementById("meuForm").classList.add("hidden");
      editarForm();
    }
    
    document.getElementById("edit").addEventListener("click", reiniciarForm);