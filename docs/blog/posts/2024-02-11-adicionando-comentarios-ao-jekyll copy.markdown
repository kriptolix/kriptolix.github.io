---
layout: post
title:  "Adicionando comentários ao Jekyll"
date: 2024-02-11
categories: 
  - technologies


---

Esse blog foi criado usando [Jekyll](https://jekyllrb.com/), um gerador de sites a partir de conteúdo estático, e esta hospedado no [Github Pages](https://pages.github.com/). Eu não sabia nada sobre nenhum dos dois no momento em que iniciei minha jornada para criar um blog em pleno ano do nosso senhor de 2024. Levei dois dias entre aprender sobre o Jekyll, criar o projeto no Github Pages e migrar todo o conteúdo que eu havia postado anteriormente no Medium que, em um futuro proximo, pretendo desativar. 

<!--more-->

Sou bastante chato quando eu tenho uma visão que quero concretizar. Cheguei até a considerar criar meu
próprio tema para o Jekyll, uma vez que o cabeçalho do tema padrão não me deixava criar um titulo usando quebra de linha e, além disso, ainda o exibia pequeno demais. Acabei percebendo que não havia necessidade, duas modificações simples acabaram por me dar o layout que eu queria. Isso, somado à ativação do *excerpts*, concluiu meu trabalho técnico. Ou quase, ainda faltavam os comentários.

O Jekyll tem supor a comentários via [Disqus](https://disqus.com/), mas o Disqus tem duas coisas que me desagradam: primeiro, eu não gosto da aparência, ele tem aquele jeitão meio Windows XP que acho horroroso. Além disso, ele também exige a criação de uma conta e que se esteja logado para poder comentar. Então, a princípio, eu não ativei os comentários.

Hoje, no entanto, enquanto eu buscava um serviço do fediverso cujo servidor fosse leve para que eu pudesse conduzir uma experiência (achei um muito promissor, o GoToSocial), acabei dando de cara com um serviço de comentários baseado no Matrix, o [Cactus.chat](https://cactus.chat/). O Cactus não tem nenhuma das desvantagens do Disqus, e ainda tenha a vantagem de ser um produto com a filosofia do fediverso. Para completar, ainda tinha uma sessão com instruções de como integra-lo a vários produtos, entre eles, adivinhem? O Jekyll (e o Hugo também, para quem for de Hugo. Fica a dica).

Eu poderia só deixar o link para a página mas, para os meus compatriotas que não falam gringolês e pelo bem da sanidade mental de quem não tem a bagagem necessária para completar as lacunas do texto dos caras, eu vou escrever aqui minha própria versão.

### Pré-requisitos

Tudo que você precisa é do seu site configurado com o Jekyll e de uma conta no Matrix. Deixando bem claro, essa conta só vai ser usada para administração dos comentários, se quiser, você pode simplesmente ignorar a existência dela após concluir a configuração. Se você não possui uma conta no Matrix, pode se inscrever [aqui](https://cactus.chat/), o Matrix é gratuito.

### Registrando seu site

Com a sua conta, entre no Matrix e procure pelo `@cactusbot:cactus.chat` nos usuários. Abra um chat com ele e digite:

    register <NOME-DO-SEU-SITE>

Claro, substituindo `<NOME-DO-SEU-SITE>` por um identificador do seu site. Esse é um nome para registro do bot, ele não precisa coincidir com o seu domínio, pode ser qualquer coisa que você achar adequado.

### Embutindo o Cactus Comments

Para embutir do frontend de comentários no seu site, vamos utilizar o espaço que seria destinado ao Disqus. Para isso primeiro vamos modificar o arquivo `_config.yml` do Jekyll para ativar o que seria o Disqus adicionando as seguintes linhas:

    # Disqus Comments
    disqus:
        # Leave shortname blank to disable comments site-wide.
        # Disable comments for any post by adding `comments: false` to that post's YAML Front Matter.
        shortname: <NOME-REGISTRADO-NO-CACTUS-BOT>

Agora, vamos criar um arquivo `custom-head.html` dentro do diretório `_include` do Jekyll. Se o arquivo já existir, basta adicionar as linhas abaixo ao topo. Se você não tem um diretório `_include`, crie um na raiz do Jekyll.

    <script type="text/javascript" src="https://latest.cactus.chat/cactus.js"></script>
    <link rel="stylesheet" href="https://latest.cactus.chat/style.css" type="text/css">

Essas linhas vão carregar os js e o css necessário para mostrar a caixa de comentários. Agora, caso não exista, crie um arquivo `disqus_comments.html` dentro do diretório `_include` e cole esse conteúdo:

{% raw %}
    {%- if page.comments != false -%}

        <div id="comment-section"></div>
        <script>
        initComments({
            node: document.getElementById("comment-section"),
            defaultHomeserverUrl: "https://matrix.cactus.chat:8448",
            serverName: "cactus.chat",
            siteName: "{{ site.disqus.shortname }}",
            commentSectionId: "{{ page.url }}"
        })
        </script>
        <noscript>Please enable JavaScript to view the <a href="https://cactus.chat" rel="nofollow">comments powered by matrix.org.</a></noscript>

    {%- endif -%}
{% endraw %}
 

E *voilá*, se nada der errado, a caixa de comentários deve surgir no final de cada post. Comenta aí e me diz se funcionou :)