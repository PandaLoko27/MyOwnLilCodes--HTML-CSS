    const textos = [
      "O rato roeu a roupa do rei de Roma",
      "A aranha arranha a rã, a rã arranha a aranha",
      "Três pratos de trigo para três tigres tristes",
      "O tempo perguntou pro tempo quanto tempo o tempo tem",
      "Sabia que a mãe do sabiá não sabia que o sabiá sabia assobiar?",
      "Bagre branco, branco bagre",
      "Farofa feita com muita farinha fofa faz uma fofoca feia",
      "Casa suja, chão sujo",
      "Se o Pedro é preto, o peito do pé do Pedro é preto",
      "Quem a paca cara compra, paca cara pagará"
    ];

    let tempoLimite = 30;
    let tempoRestante;
    let intervalo;
    let inicio;
    let textoAtual = "";
    let finalizado = false;

    function iniciarTeste() {
      textoAtual = textos[Math.floor(Math.random() * textos.length)];
      document.getElementById("textoExercicio").textContent = textoAtual;
      const entrada = document.getElementById("entradaUsuario");
      entrada.value = "";
      entrada.disabled = false;
      entrada.focus();
      finalizado = false;
      document.getElementById("resultado").textContent = "Teste iniciado! Você tem " + tempoLimite + " segundos.";
      tempoRestante = tempoLimite;
      inicio = new Date();

      intervalo = setInterval(() => {
        tempoRestante--;
        if (tempoRestante <= 0) {
          finalizarTeste();
        }
      }, 1000);
    }

    function verificarConclusao() {
      if (finalizado) return;
      const textoDigitado = document.getElementById("entradaUsuario").value.trim();
      if (textoDigitado === textoAtual) {
        finalizarTeste();
      }
    }

    function finalizarTeste() {
      if (finalizado) return;
      finalizado = true;
      clearInterval(intervalo);
      const entrada = document.getElementById("entradaUsuario");
      entrada.disabled = true;

      const fim = new Date();
      const tempoTotal = (fim - inicio) / 1000;
      const textoDigitado = entrada.value;
      const palavrasDigitadas = textoDigitado.trim().split(/\s+/).length;
      const palavrasCorretas = contarPalavrasCorretas(textoAtual, textoDigitado);
      const pormin = Math.round((palavrasDigitadas / tempoTotal) * 60);

      const resultado = `Você digitou <strong>${palavrasDigitadas}</strong> palavras em <strong>${Math.round(tempoTotal)}</strong> segundos.<br>
        Palavras por minuto (PPM): <strong>${pormin}</strong><br>
        Palavras corretas: <strong>${palavrasCorretas}</strong>`;

      document.getElementById("resultado").innerHTML = resultado;
    }

    function contarPalavrasCorretas(textoOriginal, textoUsuario) {
      const originais = textoOriginal.trim().split(/\s+/);
      const usuario = textoUsuario.trim().split(/\s+/);
      let corretas = 0;
      for (let i = 0; i < usuario.length && i < originais.length; i++) {
        if (usuario[i] === originais[i]) {
          corretas++;
        }
      }
      return corretas;
    }
