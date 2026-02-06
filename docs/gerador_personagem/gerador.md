---
title: Gerador de Personagem
summary: Resumo das regras básicas do jogo
authors:
    - Diego C. Sampaio
date: 2025-11-07
---

<div class="generator">

  <div id="npc-generator-root"></div>

  <label>
  Esse é o ponta pé inicial de gerador de personagens generico, focado em narrativa e opensource. No momento ele gera sexo e faixa etaria, depois escolhe 3 entre varias listas de categorias e escolhe um item de cada categoria selecionada.<br><br>

  Você pode checar a categorias disponíveis <a href="https://github.com/kriptolix/kriptolix.github.io/tree/main/docs/gerador_personagem/datasets">aqui</a>, por enquanto elas estão junto aos arquivos desse site, que é meu site pessoal, mas no futuro eu vou separa-las. O README do diretorio de categorias vai explicar melhor (em ingles) como a elas são estruturadas e com eu pretendo que elas funcionem.<br><br>

  Sugestões, adições e correções são sempre bem vindas. Eu ainda estou pensando sobre como estruturar o gerador e, pelo menos por enquanto, qualquer comentario a respeito pode ser feito me contatando direto no <a href="https://ursal.zone/@Kriptolix">Mastodon</a>. 
  </label><br><br>  

  <div class="controls">
    <label>
      Gênero
      <select id="gender">
        <option value="random">Random</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="others">Others</option>
      </select>
    </label>

    <label>
      Idade
      <select id="age">
        <option value="random">Random</option>
        <option value="child">Child</option>
        <option value="teenager">Teenager</option>
        <option value="young">Young</option>
        <option value="adult">Adult</option>
        <option value="middle_aged">Middle aged</option>
        <option value="old">Old</option>
        <option value="ancient">Ancient</option>
      </select>
    </label>

    <a
    href="#"
    id="generate"
    class="md-button md-button--primary">
    Gerar personagem
    </a>

  </div>

  <div class="output" id="output"></div>

</div>