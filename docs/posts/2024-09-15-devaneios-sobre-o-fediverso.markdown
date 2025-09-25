---
layout: post
title:  "Devaneios sobre o fediverso"
date: 2024-09-15
categories: 
  - technologies


---

Em maio fez dois anos que estou no Fediverso, mais especificamente, no Mastodon. Nesse tempo, ficou claro para mim que a descentralidade é o futuro da internet, assim como ficou claro que ninguém tem a menor ideia de como lidar com uma série de coisas sem uma autoridade centralizada de controle. Já tentei, algumas vezes, fomentar conversas sobre isso no Mastodon mas nunca tive muito sucesso (talvez eu tivesse mais sorte se postasse em inglês, coisas que eu detesto fazer). Hoje eu vou aproveitar esse espaço sem limite de caracteres para falar um pouco sobre o que eu acredito ser o caminho, e discutir possíveis soluções para alguns problemas.

<!--more-->

### O modelo atual

Existem dezenas de aplicações diferentes no fediverso, cada uma abordando uma faceta das redes sociais: micro textos, textos longos, foco em imagens, foco em podcasts, foco em vídeos, etc. O que quase todas essas aplicações têm em comum (com poucas exceções, como o microblog.pub) é que dependem de um backend desenhando e pensado para ser utilizado por vários usuários, seja meia dúzia ou alguns milhões, capaz de lidar com um quantidade pesada de requisições internas e externas. Isso torna essas aplicações vorazes por recursos, em especial processamento e disco.

As necessidades de hardware dessas aplicações inserem um componente de custo inescapável. Hardware tem custo. Mas não apenas isso, administrar um servidor implica em questões legais e de responsabilidade sobre o conteúdo hospedado, além de geralmente demandar um esforço de moderação caso se pretenda manter um ambiente minimamente civilizado. Considerando que toda essa responsabilidade não vem acompanhada de remuneração, chega a ser um milagre que haja quem queira assumi-la.

### O mundo ideal

Apesar do estado atual das coisas, a concepção do Fediverso tem por base uma filosofia um pouco diferente. A ideia nunca foi juntar 1.8 milhões de pessoas no mastodon.social (quantidade de usuário no momento em que escrevo esse texto), muito pelo contrário. O Mastodon, e outras aplicações do Fediverso, nasceram com ideia de crescer em um grande número de pequenos servidores, com uma quantidade pequena de usuários em cada.

Idealmente, costuma-se falar que single user instance (SUI), ou seja, em um único usuário por instância. Essa seria a situação ideal, pois a quantidade de problemas que isso resolve é enorme. Problemas legais com conteúdo recairiam imediatamente sobre o usuário que os gerou, e a moderação passaria a ser desnecessária, uma vez que cada usuário poderia decidir individualmente com quem deseja ou não se manter federado. De quebra, as exigências de hardware cairiam devido a diluição. 

(Pelo menos na teoria, na prática, devido ao foco escolhido para o desenvolvimento, aplicações como o mastodon são extremamente exigentes até mesmo para um único usuário.)

Infelizmente, o SUI é inviável, pelo menos considerando o modelo de desenvolvimento atual das aplicações. A primeira barreira é o conhecimento técnico. Manter um servidor, por mais simplificado que o processo venha a ser, ainda exige conhecimento especializado. Considerando que a reclamação maior em torno do Fediverso é a dificuldade do usuário médio para compreender o conceito de instância, esse é um impeditivo enorme. O segundo ponto é o custo. E, mais uma vez, por menor que seja esse custo, a ideia de que a internet é essencialmente gratuita, em especial as redes sociais, é muito arraigada para que o usuário médio aceite pagar para ter esse serviço.

### Mudando o Paradigma

Até existem opções para se lidar com esses problemas, mesmo mantendo o modelo atual, mas nenhuma delas é muito boa. Então, o que fazer? Talvez a resposta mais óbvia seja mudar o modelo. A arquitetura cliente-servidor que domina o Fediverso nunca vai ser amigável à descentralização, pelo menos não da forma como está. Talvez não seja possível eliminá-la por completo, mas a proporção entre as funções que cada parte exerce teria de mudar radicalmente para podermos imaginar novas possibilidades.

Hoje em dia só existe um hardware extremamente popular e que está, quase o tempo inteiro, conectado à internet: celulares. Claro, é improvável que seja possível rodar até mesmo o servidor de aplicação mais simples do Fediverso, nosso amigo microblog.pub, em um celular. Mas não é impossível imaginar alguma coisa nos moldes de um aplicativo realizando a maior parte do processamento de forma local em um celular, enquanto temos um servidor que precisa lidar basicamente com endereçamento.

Claro, temos sérios limites de espaço e processamento disponível quando entramos na seara dos dispositivos móveis, até mesmo limites de tráfego de rede. Mas considerando o nível de descentralização que é possível alcançar com eles, talvez valha a pena considerar a possibilidade. Para isso, teríamos que repensar também a forma como o conteúdo se relaciona no fediverso. Considerando que o Mastodon é o maior e mais popular dos serviços, vamos usá-lo como exemplo.

A primeira coisa que aconteceria no cenário de uma comunicação mais direta, ou seja de cliente a cliente sem intermédio de um servidor a não ser para iniciar a conexão, é que não existiria timeline local nem global. Seguir pessoas, e aqui eu quero enfatizar que não gosto do termo “seguir”, seria a única maneira de construir uma timeline. Essa não existência por si só já faz com que não se possa mais comparar esse serviço fictício ao Mastodon. Mas, por mais interessante que seja a existência de uma timeline não originada nas conexões pessoais do usuário, não é difícil imaginar isso. O funcionamento seria muito parecido ao de aplicativos de mensagens como Whatsapp e Telegram, ou mesmo do velho feed RSS.

A segunda consequência seria uma relação mais assíncrona entre origem e destino do conteúdo. Afinal, celulares ficam sem internet, a bateria acaba, acontecem acidentes. Seria necessário levar em conta o fato de que nem sempre a origem de conteúdo estaria disponível no mesmo momento em que o destino resolvesse consumir. Felizmente, a forma como o ActivityPub funciona foi pensada levando essa assincronicidade em conta e é bastante resiliente a falhas.

### A magia do P2P

Dentre todos os protocolos e serviços que têm um comportamento semelhante ao que desejamos, um se destaca: o BitTorrent. A forma como todos os clientes se comportam tanto como disponibilizadores quanto como consumidores de informação, em como a rede é resiliente a saída e entrada de nós e dependência relativamente baixa de servidores torna o BitTorrent uma opção promissora para basear uma implementação.

Fico bastante surpreso que o Fediverso sofra pouca ou nenhuma intersecção com o BitTorrent. A filosofia de ambos é muito alinhada. O BitTorrent foi criado para permitir a distribuição de informações (arquivos) de forma descentralizada, anônima, e leve. Ele permitiu a usuários comuns utilizar o hardware e a conexão ao qual já possuíam, quase que eliminando a dependência de hardware caro e capacidade técnica que eram indispensáveis caso alguém precisasse disponibilizar grande quantidade de informação antes da sua invenção.

Parece familiar?

### Conclusão

Eu não tenho a capacidade técnica necessária, pelo menos não no momento, para explorar as possíveis interações entre ActivityPub e BitTorrent, seja numa combinação direta, seja em um protocolo novo inspirado em ambos. Mas considero essa ideia um bom ponto de partida para discussões. Até porque, com um custo ligeiramente estável, a capacidade de processamento e armazenamento dos celulares, assim como sua adoção, só tendem a crescer. As últimas notícias sobre baterias nucleares, que vão permitir a dispositivos móveis ficarem ligados por décadas ininterruptamente, só vem pra confirmar essa tendência. 

Em próximos textos (se houverem), pretendo já estar munido de mais base técnica para propor o desenho de uma prova de conceito e, talvez, para executá-lo. Também pretendo discutir sobre o modelo mais flexível de abordagem de mídia utilizado pelo GoToSocial, em que micro e macro blog, estrutura de fórum e outros focos existem separadamente dentro da mesma aplicação, o que, na minha visão, é mais inteligente do que ter uma aplicação separada para cada serviço.