---
layout: post
title:  "RPG Design — Impressões"
date:   2020-06-28 11:12:18 -0300
categories: ttrpgs
---

A razão de ser desse artigo, se é que podemos chamá-lo assim, é comentar minhas impressões pessoais sobre desenvolvimento de mecânicas para jogos de RPG de mesa. Como designer amador, no curso do desenvolvimento das minhas próprias mecânicas, me deparei com um leque de elementos que pareciam não ter ancora nos conceitos, métricas ou padrões de RPG design aos quais tinha acesso.

<!--more-->

Ao contrário dos board games, onde existe farto material teórico relacionado ao funcionamento, classificação e função de mecânicas, assim como dos elementos essenciais que compõe todas elas. No RPG, a abordagem teórica se concentra muito mais na parte lúdica da experiência, se preocupando em categorizar essa experiência de um ponto de vista mais geral, sem um enfoque específicos nas mecânicas que lhe dão base.

Devido a essa aparente ausência de referenciais, e diante da minha necessidade de entender as relações de causa e efeito que eu observava empiricamente durante meu desenvolvimento, não tive escolha a não ser empreender minha própria tentativa de análise conceitual dos conjuntos de regras e mecanismos usados no RPG em geral. Esse processo acabou por me levar à algumas conclusões sobre os blocos essenciais que compõem esses sistemas de regras.

No intuito de explicitar essas conclusões, esse texto vai tentar percorrer, sob a minha ótica, todo o caminho trilhado por um jogo de RPG em desenvolvimento, com enfoque na parte mecânica desse processo. Também nos deteremos em cada etapa para teorizar, conjecturar e fazer apontamentos quando for relevante.

### Porque criar um RPG

Creio que essa seja a pergunta inaugural no caminho de qualquer pretendente a designer de RPG. A resposta para essa questão pode passar por insatisfação com os jogos disponíveis, pela desejo de criar algo novo, ou até mesmo pelo atendimento de uma demanda comercial ou de nicho.

Um cenário diferente, um enfoque sobre um novo elemento, uma adaptação de uma obra de outra mídia, são todos motivos muito comuns para iniciar um desenvolvimento de um novo jogo. Considerando que, mesmo com a imensa diversidade de temas e gêneros abordados por jogos já existentes, sempre haverá enredos e ideias inexploradas esperando para serem abordadas em um jogo.

### Porque criar um sistema de RPG

Essa questão, diferente da anterior, nem sempre surge para todos os que pretendem criar um novo jogo. As respostas para ela também são mais limitadas e, apesar do movimento indie ter popularizado a ideia de se usar um conjunto de regras específico para refletir um jogo específico, a verdade é que a capacidade de adaptação e a maleabilidade de motores de regras modernos como Fate e Apokalipse Engine tornam a criação de um sistema inteiramente novo muito menos mandatória, além de muito menos interessante no quesito esforço benefício.

Os motivos para se criar uma mecânica totalmente nova geralmente se encaixam em um de dois casos: a) O desejo de experimentar o processo criação ou b) Necessidade de implementar uma mecânica para a qual não se conhece paralelo nos jogos já existentes. Observe que no caso “b” não necessariamente o paralelo é inexistente, muitas vezes ele é apenas desconhecido para o designer.

### O que é um sistema

É interessante notar que há, por parte dos designers amadores, uma compreensão intuitiva do que é um sistema de RPG. E que muito do processo de desenvolvimento é realizado sem nenhuma preocupação com conceitos e definições teóricas de termos, ou qualquer métrica mais subjetiva. Na maioria dos casos, o desenvolvimento de mecânicas de RPG é um processo fortemente baseado no empirismo.

Considerando que o intuito desse artigo é exatamente propor algum embasamento teórico para esse processo, vamos nos deter um momento para a tentar definir “Sistema” do ponto de vista do RPG e, posteriormente, entender o porque dessas definições serem úteis para balizar o processo de designing. Para tal, um “Sistema” é um conjunto de regras interrelacionadas entre si que tem por objetivo manter coerente a resolução de conflitos em um certo ambiente ficcional.

### O que é uma regra

Definindo sistema como um coletivo, é necessário definir o que seriam seus componentes individuais para entendê-lo. Para esse propósito, é seguro dizer que uma regra é declaração explícita que rege uma certa situação ficcional. Considerando-se declarações implícitas que possam reger situações ficcionais como verdades ficcionais, e não como regras.

A diferença entre regra e verdade ficcional pode ser muito tênue e é necessário que a tenhamos clara para, num futuro desenvolvimento, evitar trabalho desnecessário. Verdades ficcionais são assumidas a priori. Por exemplo, não se precisa de regra para se assumir que pássaros voam, isso é uma verdade ficcional. De fato, caso essa premissa não seja verdadeira no espaço ficcional do jogo, será necessária uma declaração expressa, i.e. uma regra, para estabelecer isso.

Regras poderiam, no entanto, ser usadas para definir características do voo dos pássaros que não possam ser assumidas a priori, como velocidade, manobrabilidade, tempo de voo contínuo e etc. Tendo isso em mente, vamos adentrar um pouco mais na natureza das regras, e investigar a sua origem conceitual.

### Contextualizando a origem

Existem duas comparações recorrentes quando falamos de RPG: a comparação aos board games, e a comparação com a contação de histórias. Alguns creem que o RPG seria o ponto intermediário entre essas duas coisas, considerando que D&D, o primeiro RPG do mundo, se originou diretamente dos wargames. Mais precisamente, D&D começou como uma expansão de um wargame que adicionava uma certa dose de narrativa sobre as mecânicas pré existentes.

Creio pessoalmente que, apesar desse início, o RPG tem mais em comum com a contação de histórias do que com os board games. Na minha visão, o RPG está mais para uma narrativa apoiada por mecânica do que por uma mecânica colorida por uma narrativa. As diferenças entre RPG e board games são muito mais profundas do que possa parecer à primeira vista.

A grosso modo, existe uma única e significativa diferença entre o RPG e a contação de histórias: No RPG, o controle narrativo é obrigatoriamente parcial, sendo dividido entre os participantes durante todo o curso do jogo. Enquanto na contação de histórias, mesmo quando há alternância de narrador, aquele que tem o poder narrativo no momento tem controle total sobre a trama.Transformar uma contação de histórias em um RPG é, tão somente, dividir poder narrativo.

Apesar de, nos RPGs, existir a possibilidade de uma divisão mais ou menos simétrica de poder narrativo, que é o que ocorre nos chamados “jogos de narrativa compartilhada”, o mais comum é que essa divisão se dê de forma assimétrica. Esse será o ângulo adotado para continuarmos a análise da natureza das regras. Contudo, todas as conclusões apresentadas terão validade, mesmo que algum grau de ajuste, para para os jogos de narrativa compartilhada.

### A regra zero

Dentro do escopo de uma divisão assimétrica de poder narrativo teremos, na maioria dos casos, dois entes. De um lado, o ente com maior poder narrativo, que aqui trataremos por “narrador”. Do outro, o ente com menor poder narrativo, nomeado aqui como “jogador”.

Na prática, podemos considerar que a menor partícula de poder narrativo que pode ser transferida ao jogador é o poder de tomar decisões pelos personagens que controla, enquanto todos os outros elementos da narrativa ficam sob o jugo do narrador. Dessa primeira e elementar divisão de poder narrativo emana a mecânica mais básica possível de qualquer RPG, e que chamaremos aqui de regra zero: O narrador decide tudo aquilo que não for relativo a decisão de um personagem do jogador. É sobre essa regra que todas as outras são empilhadas

Observe que a regra zero já é, por si só, um sistema completamente funcional. Esse sistema primitivo nos permite a interação necessária para que aquilo que joguemos com ele possa ser chamado de RPG. Jogar dessa forma é comumente conhecido na comunidade pela expressão “jogar sem sistema”.

#### Para que servem as regras

Analisando atentamente a regra zero, torna-se possível elaborar uma definição para a função das regras num jogo de RPG. A notar, regras servem para transferir poder narrativo do narrador para o jogador. Como um complemento, deve-se notar que a regra zero faz essa transferência de forma direta, ou seja, aquilo que era decidido pelo narrador (ação de um certo personagem) passa a ser decidido pelo jogador.

Apesar disso, nas regras que se seguirem a regra zero essa transferência de poder nem sempre se dará de forma direta, sendo o caso mais comum que ela ocorra de forma indireta, ou seja, permitindo ao jogador usar sua parcela de poder para influenciar em um certo elemento narrativo ao invés de defini-lo expressamente.

#### Além da regra zero

Agora que já delineamos a natureza a função das regras e, por extrapolação, a dos sistemas de regras, talvez nos seja útil entender as diferenças básicas que existem entre quaisquer regras que possamos vir a adicionar aos nossos sistemas. Essas regras irão agrupar-ser em duas grandes categorias: Regras descritivas e regras declarativas.

As regras declarativas estabelecem ou revogam, mesmo que de forma parcial ou temporária, uma verdade ficcional. Já as regras descritivas definem limites ou pormenorizam detalhes referentes a verdades ficcionais ou a regras declarativas que exijam complemento. Essa diferença se mostrará útil no momento em que pararmos para analisar o impacto da adição de regras.

### Resolução de conflitos

Considerando as camadas passíveis de serem adicionadas sobre a regra zero durante a construção de um sistema, o mais comum é que a primeira delas seja uma mecânica impessoal de resolução de conflitos. Por definição, uma mecânica impessoal de resolução de conflitos é uma regra que permite conduzir situações de dúvida dentro da ficção a um desfecho definido por um fator ou por uma combinação de fatores.

Diferente da regra zero, aqui os elementos levados em consideração para a obtenção de um resultado são de ordem material e/ou mecânica, em oposição ao julgamento pessoal e subjetivo do narrador.

#### Fator de resolução

Todo sistema possui uma ou mais mecânicas de resolução de conflito, podendo cada uma dessas mecânicas variar em amplitude e frequência de uso. Existem três bases sobre as quais essas mecânicas podem ser construídas, que vamos chamar aqui de fator de resolução: Aleatoriedade, comparação e o gerenciamento.

A aleatoriedade é, de longe, a mais comuns das três, e a grande maioria dos jogos conhecidos se utiliza dela em algum grau. Sua principal característica é a inserção de uma medida de incerteza que tem a capacidade de gerar tensão de forma simples. Para tal, utiliza-se uma mídia, que nada mais é do que um meio físico ou virtual capaz de gerar um retorno imprevisível. Trataremos mais profundamente das mídias e de seus efeitos mais a frente.

A seguir vem a comparação. Diferente da aleatoriedade, que é passível de ser usada de forma pura na resolução de conflitos, a comparação necessita de elementos adicionais pré estabelecidos para ser aplicada, ou seja, de “características” para serem comparadas. Mas a sua menor adoção vem do fato de seus resultados serem previsíveis e imutáveis, e da sua incapacidade de gerar tensão quando usada individualmente. Um dos primeiros e mais famosos exemplos de RPGs baseados em comparação é o Amber Diceless.

Por último temos o gerenciamento, que consiste em dar o melhor uso a uma ou mais reservas de recursos disponíveis no intuito de superar os desafios que o jogo apresenta. O gerenciamento compartilha com a aleatoriedade a capacidade de ser usado de forma pura para resolução de conflitos, mas sua capacidade de gerar tensão é bastante limitada quando usado dessa forma.

É raro que uma mecânica de resolução de conflito utilize qualquer desses métodos de forma exclusiva. O mais comum é vê-los combinados em algum grau e modificados por características mecânicas de elementos ficcionais para se chegar a um certo resultado.

#### Um pouco sobre mídias

Uma mídia, no contexto das mecânicas de RPG, é qualquer acessório físico ou virtual utilizado para viabilizar uma uma certa mecânica, em especial, mecânicas de resolução de conflito. Existe um grande número de mídias disponíveis: dados, cartas, pedras de dominó, jo-ken-po, relógios, roletas, par ou ímpar, equações numéricas e etc. Cada uma delas possui particularidades matemáticas que têm grande influência sobre como a resolução de conflitos vai acontecer, e qual a “sensação” que a mesma vai passar.

Não só há uma grande variedade de mídias disponíveis, como também há muitas formas de usar uma mídia específica dentro de uma mecânica. Com toda essa variedade, a escolha da mídia, ou de um conjunto de mídias, certa para um jogo pode ser difícil. Mas é possível fazer algumas considerações gerais que podem balizar escolha baseada em quesitos. São eles.

**Estatística:** Mídias diferentes têm características matemáticas diferentes, e essas características levam a sensações diferentes quando aplicadas a resolução de conflito. Enquanto um jogo que usa um d20, e sua probabilidade linear, terá um tom mais heroico devido a aleatoriedade dos resultados, jogos que usam uma combinação de dados, como 3d6, tendem sempre a ter jogadas médias como resultados mais frequentes, e com isso costumam ter um tom mais sóbrio. Por isso, a curva estatística pode ser um fator a se levar em conta quando se está escolhendo uma mídia, ao considerar sua adequação a um certo tom.

**Acessibilidade:** A escolha de mídias pode levar em conta o quão disponíveis elas estão para o público. D6 são muito comuns e fáceis de achar, podendo inclusive ser emprestados de jogos de tabuleiro populares que o público já possua. Dados multifacetados como o d10 e o d20 são mais difíceis de encontrar, mas como são mídias de jogos muito populares ainda estarão disponíveis com alguma facilidade. Já um jogo que use um deck personalizado de cartas, uma ampulheta, uma roleta, etc. Pode dificultar o acesso do público, já que sua disponibilidade será reduzida se comparada a outras mídias.

**Sensorialidade:** Existem maneiras diferentes de parametrizar uma mesma mecânica de resolução de conflitos. Muitas vezes, apesar da matemática envolvida ser a mesma, a forma como essa matemática é apresentada pode fazer toda diferença. Usar um d20 em uma mecânica de contagem de sucessos, onde cada 4 pontos no dado serão contados como um sucesso, é muito mais difícil de processar sensorialmente para o público do que jogar 5d10 e contar os números acima de um certo valor. Diferenças matemáticas à parte, são duas abordagens que miram o mesmo alvo: contar sucessos. Mas é fácil perceber que abordagem de múltiplos dados gera muito menos atrito sensorial.

Nas próximas etapas, discutiremos outros elementos base do RPG, e vamos propor uma classificação nova baseada no conceito de “ferramenta”.