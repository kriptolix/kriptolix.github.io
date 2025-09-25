---
layout: post
title:  "RPG Design — Motivações e Princípios"
date: 2020-06-30
categories: 
    - ttrpgs
---

A verdade é: existem milhares de sistemas por aí e, tecnicamente, não existe qualquer motivo para se perder tempo criando mais um. Infelizmente ou felizmente, o ser humano é complexo, e o motivo pelo qual fazemos as coisas não se resume a custo benefício. Esse é o primeiro de, eu espero, um sequência de textos em que vou tentar expor o processo e os motivos que me levaram a tentar criar um novo sistema de RPG. E as agruras e felicidades que surgem pelo caminho.

<!--more-->

Tenho trabalhado em um sistema de RPG, o Mono, pelos últimos dois anos e, apesar de ter desenvolvido mecânicas antes dele, creio que essa seja primeira vez em que orientei meu desenvolvimento para alcançar objetivos bem definidos.

Na última década, tive contato com uma gama enorme de jogos com as mais diferentes propostas, entre eles jogos que trabalhavam com a ideia de alta planificação, ou seja, com ideia de ter a menor quantidade de mecânica possível para cobrir a maior quantidade de situações possível. A planificação tornava os jogos mais simples, mais rápidos e, quase sempre, mais fluidos. Era algo que me interessava.

Infelizmente essa planificação tinha um custo. Para alcançá-la, via de regra, os jogos se utilizavam de um alto nível de abstração. Abstração é inerente ao RPG, mas um nível alto de abstração me incomodava por tornar certas situações estranhas ao bom senso ou pouco críveis dentro da ficção. Foi nessa época que cheguei a pergunta que motivou a criação do Mono: É possível construir um sistema totalmente planificado mantendo um nível de abstração baixo o bastante para não incomodar o bom senso?

Na época, e por muito tempo depois disso, a resposta me parecia ser “não”. E isso tem a ver com o nome do Mono, Monocerus. Eu tinha a impressão de que eu busca algo que não existia, um unicórnio ou, em grego, monocerus. Mesmo não acreditando que um dia fosse chegar perto de resolver essa contradição eu continuei tentando, pois o exercício de criatividade em si já era interessante e me divertia.

Estudei blocos que formavam os sistemas de regras que eu conhecia para tentar entender onde exatamente a planificação esbarrava, e o porque dessa barreira. Havia vários culpados, mas um deles era responsável pela quase totalidade dos problemas: A mecânica de dano/contador de vida.

Eu percebi que, tanto nas magias/poderes quanto no combate, o requerimento de um subsistema de dano tornava impossível usar a mesma lógica para resolver todas as situações no jogo e, ao mesmo tempo, levar em consideração todos os elementos que o bom senso pedia que levasse (armas, armaduras, características do combatente…).

A resposta, do topo da minha experiência quase zero como RPG designer, era óbvia: Um sistema sem mecânica de dano ou contador de vida, mas que levasse em consideração tudo que está envolvido no processo de causar e levar dano.

A essa premissa se somou outra: A mecânica tinha que ser simples. Não adiantava ter a planificação e não ofender o bom senso se levasse dez minutos para executar qualquer ação e o jogo precisasse de uma calculadora científica para ser jogado. Isso lançou o objetivo para ainda mais longe. Mas, como eu disse, eu não acreditava ser possível, então para que sonhar baixo?

Acabei estabelecendo os pilares iniciais que balizariam o desenvolvimento dali em diante:

* Planificação Máxima — Toda a resolução de conflito utilizaria uma jogada única, ou uma repetição dessa mesma jogada. Não haveria jogadas específicas ou lógica de ação diferenciada para nenhum elemento.

* Simplicidade Geral — O número de elementos, interações entre elementos e a complexidade dessas interações devem se manter no mínimo necessário.
* Baixa Intrusividade — As necessidades de rolagens. registro ou consulta a qualquer material devem ser mantida no mínimo.

* Abstração Intuitiva — A mecânica só pode abstrair elementos até o ponto em que essa abstração não se choque com o bom senso. Nenhum elemento deve funcionar de forma totalmente não intuitiva.

* Modularidade Escalar — Os elementos básicos da mecânica devem poder ser combinados para a criação de elementos mais complexos, sem deixar de respeitar os princípios anteriores.

Outras princípios menores foram se somando a essas bases durante o desenvolvimento, entre eles a ideia de uma mecânica genérica. Apesar de eu ter um cenário em mente durante o desenvolvimento, a modularidade cobria todos os elementos específicos que ele demandava, e o resto da estrutura de regras ainda era funcional o suficiente para ser usado em outros cenários.

Comecei então a procurar por referências, jogos que tivessem em sua construção alguma das ideias que eu havia escolhido. Eu precisava entender como outros haviam implementados esses requisitos para decidir a melhor forma de fazê-lo.

### Referências

A primeira pista concreta foi o Hârnmaster. Hârnmaster foi o único jogo que já encontrei onde não há absolutamente nenhum sistema de contador de vida. Quando um personagem leva dano o que ocorre é que certas penalidades são aplicadas a suas jogadas, e uma dessas jogadas é um “teste de efeito” que deve ser realizado sempre que o personagem é ferido. Se falhar nesse teste ele morre (entre outras coisas que não vem ao caso). Observe que ao receber dano se recebe penalidades e vai ficando cada vez mais difícil ter sucesso no “teste de efeito”.

A ideia era promissora, mas ainda carregava um problema: o “teste de efeito” só era realizado em situações que envolvessem dano, ou seja, era uma sub regra exclusiva para essas situações, e isso ia de encontro ao meu princípio nº 1: planificação máxima. Guardei Hârnmaster na minha gaveta de boas referências e continuei procurando.

Foi um pouco depois disso que eu conheci os dois jogos que mudariam para sempre minha maneira de ver o RPG, Psy\*Run e Apokalipse World, ambos escritos pela Meguey Baker. Psy*Run me influenciou muito no Monarcas, o cenário base para o qual imaginei o Mono, já Apokalipse World me apresentou uma série de conceito que iam embasar o trabalho dali em diante, em especial o princípio de “falhar pra frente”, a ideia de “escala fechada de sucesso”, de “jogo assimétrico” e os “rótulos”.

O conceito de jogo assimétrico, onde os NPCs e os PCs não seguem a mesma mecânica, ideia que é intrinsecamente atrelada a de escala fechada de sucesso, permitia condensar em uma jogada só as ações do personagem e as respostas do narrador. E os “rótulos” eram uma forma brilhante para substituir estruturas mecânicas por definições puramente ficcionais. Tudo isso caminhava para um jogo que “parasse menos”, ou seja, menos intrusivo.

A minha terceira grande referência foram jogos de gerenciamento de recursos, onde um grupo de personagens combinava recursos para vencer um desafio coletivo. Percebi que, em especial em combates, tratar cada inimigo de forma separada aumentava consideravelmente a necessidade de registro e não parecia trazer nenhum benefício óbvio. Então estabeleci o conceito de “desafio” para qualquer elemento do jogo que viesse a necessitar de teste, fosse individual ou coletivo, fosse instantâneo ou demorado.

Nos próximo texto vamos conversar sobre os primeiros passos concretos nessa jornada.