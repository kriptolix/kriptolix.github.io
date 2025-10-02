---
title: Game Design
summary: Relato sobre decisões tomadas no design do Mono.
authors:
    - Diego C. Sampaio
date: 2025-10-1
---

Esse registro de game designing é uma tentativa de dar transparência às decisões que tomei durante o desenvolvimento do Mono. Uma vez que eu escolhi tornar o Mono um jogo aberto, eu quis dividir não só o resultado corrente (já que o resultado final nem está pronto ainda), mas também todas etapas, dramas e dúvidas que levaram a escolha de cada um dos elementos que o compõe. Eu acredito sinceramente que abrir a caixa preta do processo de desenvolvimento pode ajudar outros designers.  

## A Motivação

Tenho trabalhado no Mono pelos últimos dois anos e, apesar de ter desenvolvido mecânicas antes dele, creio que essa seja primeira vez em que orientei meu desenvolvimento para alcançar objetivos bem definidos. 

Na última década, tive contato com uma gama enorme de jogos com as mais diferentes propostas, entre eles jogos que trabalhavam com a ideia de alta planificação, ou seja, com ideia de ter a menor quantidade de mecânica possível para cobrir a maior quantidade de situações possível. A planificação tornava os jogos mais simples, mais rápidos e, quase sempre, mais fluidos. Era algo que me interessava.

Infelizmente essa planificação tinha um custo. Para alcançá-la, via de regra, os jogos se utilizavam de um alto nível de abstração. Abstração é inerente ao RPG, mas um nível alto de abstração me incomodava por tornar certas situações estranhas ao bom senso ou pouco críveis dentro da ficção. Foi nessa época que cheguei à pergunta que motivou a criação do Mono: É possível construir um sistema totalmente planificado mantendo um nível de abstração baixo o bastante para não incomodar o bom senso? 

Na época, e por muito tempo depois disso, a resposta parecia ser “não”. E isso tem a ver com o nome do Mono, Monocerus. Eu tinha a impressão de que eu buscava algo que não existia, um unicórnio ou, em grego, monocerus. Mesmo não acreditando que um dia fosse chegar perto de resolver essa contradição eu continuei tentando, pois o exercício de criatividade em si já era interessante e me divertia.

## Os pilares

Os pilares iniciais que balizariam o desenvolvimento:

**Planificação máxima** - Toda a resolução de conflito utilizaria uma jogada única, ou uma repetição dessa mesma jogada. Não haveria jogadas específicas ou lógica de ação diferenciada para nenhum elemento.

**Simplicidade de uso** - A interação mecânica dos elementos no jogo deve girar em torno de comparações, a única varável durante as ações é o numero de dados.

**Baixa intrusividade** - As necessidades de rolagens. registro ou consulta a qualquer material devem ser mantida no mínimo.

**Abstração intuitiva** - A mecânica só pode abstrair elementos até o ponto em que essa abstração não se choque com o bom senso. Nenhum elemento deve funcionar de forma totalmente não intuitiva.

**Modularidade** - Os elementos básicos da mecânica devem poder ser combinados para a criação de elementos mais complexos, sem deixar de respeitar os princípios anteriores.

Outras princípios menores foram se somando a essas bases durante o desenvolvimento, entre eles a ideia de uma mecânica genérica. Apesar de eu ter um cenário em mente durante o desenvolvimento, a modularidade cobria todos os elementos específicos que ele demandava, e o resto da estrutura de regras ainda era funcional o suficiente para ser usado em outros cenários.

Surgido de um artigo que eu li sobre a versão 2 de Dungeon World veio a ideia de um combate dinâmico em que, a cada rolagem, a situação mudasse. O que é diferente dos padrão da maioria dos RPGs em que a situação se matem basicamente a mesma até um lado chegar a zero pontos de vida.

Aém disso, em algum momento, eu percebi aquilo que eu queria do Mono: um jogo feito para proporcionar cenas emocionantes e interessantes, e não um jogo que trancasse essas cenas atrás de chances de sucesso que, na pratica, só serviam para frustrar qualquer tentativa mais ousada ou divertida.

## Referências

Psy*Run e Apokalipse World, ambos escritos pela Meguey Baker, me apresentaram uma série de conceito que iam embasar o trabalho dali em diante, em especial o princípio de “falhar pra frente”, a ideia de “escala fechada de sucesso”, de “jogo assimétrico” e os “rótulos”. Depois viria a descoberta de Blades in the Dark, jogo que mudou a minha maneira de encarar o RPG e que influenciaria pesadamente todas os elementos do Mono. 

O conceito de jogo assimétrico, onde os NPCs e os PCs não seguem a mesma mecânica, ideia que é intrinsecamente atrelada a de escala fechada de sucesso, permitia condensar em uma jogada só as ações do personagem e as respostas do narrador. E os “rótulos” eram uma forma brilhante para substituir estruturas mecânicas por definições puramente ficcionais. Tudo isso caminhava para um jogo que “parasse menos”, ou seja, menos intrusivo.

Outra grande referência foram jogos de gerenciamento de recursos, onde um grupo de personagens combinava recursos para vencer um desafio coletivo. Percebi que, em especial em combates, tratar cada inimigo de forma separada aumentava consideravelmente a necessidade de registro e não parecia trazer nenhum benefício óbvio. Então estabeleci o conceito de “desafio” para qualquer elemento do jogo que viesse a necessitar de teste, fosse individual ou coletivo, fosse instantâneo ou demorado.

Vou elencar uma lista completa de referências e das contribuições que obtive delas em um documento separado para evitar poluir esse espaço.

## Caraterísticas dos Personagens

Decidir como funcionariam as características de personagem me tomou um longo tempo. Comecei com a ideia de dividir em atributos e competências. Sendo o primeiro composto por capacidades inatas do personagem,e o segundo um misto de experiências e habilidades aprendidas. Confesso que não havia um motivo para isso a não ser familiaridade, é a divisão mais comum na maioria dos jogos. A partir daí, passei por vários formatos do que seriam atributos e competências variando em quantidade, natureza e escala, cada um deles com as suas vantagens e desvantagens. Alterava sempre que um novo problema ou possibilidade surgia.

Só cheguei a um formato definitivo quando entendi o que eu realmente queria do jogo: cenas emocionantes e interessantes que eu via em filmes, series, quadrinhos e livros. E não só cenas, mas a representação dos personagens, quase sempre arquetípicos, que executavam essas cenas. Foi ai que eu percebi que eu so precisava de dois tipos de características: aspectos de personagem e habilidades icônicas. Com essas duas características eu poderia criar variações que serviriam a propósitos específicos como o **Conceito**. 

### Aspectos

### Habilidades