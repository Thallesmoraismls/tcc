function resumir() {
  const texto = document.getElementById("input").value;

  const stopwords = ['de', 'a', 'o', 'que', 'e', 'do', 'da', 'em', 'um', 'para', 'é', 'com', 'não', 'uma', 'os', 'no', 'se', 'na', 'por', 'mais', 'as', 'dos', 'como'];

  const frases = texto.match(/[^\.!\?]+[\.!\?]+/g) || [texto];

  const frequencia = {};
  const palavras = texto.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/);
  palavras.forEach(palavra => {
    if (!stopwords.includes(palavra)) {
      frequencia[palavra] = (frequencia[palavra] || 0) + 1;
    }
  });

  const frasePontuacao = frases.map(frase => {
    const palavrasFrase = frase.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/);
    let score = 0;
    palavrasFrase.forEach(palavra => {
      score += frequencia[palavra] || 0;
    });
    return { frase, score };
  });

  frasePontuacao.sort((a, b) => b.score - a.score);

  const topFrases = frasePontuacao.slice(0, Math.ceil(frases.length * 0.3));
  const resumo = topFrases.map(f => f.frase).join(' ');

  document.getElementById("output").innerText = resumo || "Texto muito curto ou sem conteúdo.";
}
