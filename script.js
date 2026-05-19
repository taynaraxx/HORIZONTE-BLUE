// --- SISTEMA DE LOGIN ---
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o recarregamento da página

        const email = document.getElementById('emailLogin').value;
        const senha = document.getElementById('senhaLogin').value;
        const msgErro = document.getElementById('msgErroLogin');
        const msgSucesso = document.getElementById('msgSucessoLogin');

        // Dados Fixos para validação
        if (email === "admin@horizonte.com" && senha === "123456") {
            msgErro.style.display = 'none';
            msgSucesso.textContent = "Login realizado com sucesso! Redirecionando...";
            msgSucesso.style.display = 'block';
            
            setTimeout(() => {
                window.location.href = "index.html";
            }, 2000);
        } else {
            msgSucesso.style.display = 'none';
            msgErro.textContent = "E-mail ou senha incorretos.";
            msgErro.style.display = 'block';
        }
    });
}

// --- BUSCA DE CEP (API VIACEP) ---
const campoCep = document.getElementById('cep');
if (campoCep) {
    campoCep.addEventListener('blur', function() {
        let cep = this.value.replace(/\D/g, ''); // Remove letras

        if (cep !== "") {
            // Expressão regular para validar o CEP
            let validacep = /^[0-9]{8}$/;

            if(validacep.test(cep)) {
                // Preenche com "..." enquanto busca
                document.getElementById('rua').value = "...";
                document.getElementById('bairro').value = "...";
                document.getElementById('cidade').value = "...";
                document.getElementById('estado').value = "...";

                fetch(`https://viacep.com.br/ws/${cep}/json/`)
                    .then(response => response.json())
                    .then(dados => {
                        if (!("erro" in dados)) {
                            document.getElementById('rua').value = dados.logradouro;
                            document.getElementById('bairro').value = dados.bairro;
                            document.getElementById('cidade').value = dados.localidade;
                            document.getElementById('estado').value = dados.uf;
                        } else {
                            alert("CEP não encontrado.");
                            this.value = "";
                        }
                    })
                    .catch(error => alert("Erro ao buscar o CEP."));
            } else {
                alert("Formato de CEP inválido.");
            }
        }
    });
}

// --- CADASTRO E ARMAZENAMENTO ---
const cadastroForm = document.getElementById('cadastroForm');
if (cadastroForm) {
    cadastroForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const feedback = document.getElementById('msgFeedback');
        
        // Coletando dados em um OBJECT (Bônus)
        const dadosUsuario = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            cep: document.getElementById('cep').value,
            rua: document.getElementById('rua').value,
            bairro: document.getElementById('bairro').value,
            cidade: document.getElementById('cidade').value,
            estado: document.getElementById('estado').value
        };

        // Validação simples (o 'required' do HTML já ajuda, mas JS garante)
        if (Object.values(dadosUsuario).includes("")) {
            feedback.textContent = "Por favor, preencha todos os campos corretamente.";
            feedback.style.color = "red";
        } else {
            console.log("Usuário Cadastrado:", dadosUsuario);
            feedback.textContent = "Cadastro realizado com sucesso!";
            feedback.style.color = "green";
            
            // Opcional: Limpar formulário após sucesso
            cadastroForm.reset();
        }
    });
}
