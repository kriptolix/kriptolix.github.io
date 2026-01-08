---
layout: post
title:  "Postando no Mastodon a partir do MKDocs"
date: 2026-01-08
categories: 
  - technologies
---
Toda solução nasce de uma necessidade, às vezes a necessidade é tão estúpida quanto a minha preguiça de escrever um *toot* com um resumo e um *link* para um *post* no meu *blog* (que, aliás, vê *posts* com uma frequência praticamente bissexta). Para evitar essa dor de cabeça de 30 segundos, resolvi gastar 8 horas tentando configurar o meu *blog* para fazer um *post* na minha conta do *Mastodon* sempre que eu publicar algo novo.

<!--more-->

Tenho que começar explicando porque, no meu caso, isso é mais complicado (nem tanto quanto eu imaginava, na verdade). Eu hospedo meu *blog*, feito com *MKDocs* + *Material*, no *GitHub Pages*. O *GitHub Pages* é um servidor estático, ou seja, eu não tenho como salvar nada dinamicamente nele, não posso usar um banco de dados nem modificar arquivos locais em tempo de execução. Para federar alguma coisa eu preciso de tudo isso, então não tem como federar um *blog* hospedado no *GitHub Pages*.

Dito isso, o *Mastodon* tem uma API que facilita bastante o processo de postar automaticamente. Como eu não posso federar meu *blog*, postar atualizações automaticamente é a segunda melhor opção e eu vou explicar como eu configurei o meu processo no *GitHub Pages* para fazer isso. Apesar de eu estar fazendo isso usando *MKDocs* + *Material*, o processo vai precisar de pouca adaptação para ser replicado em com qualquer outro gerador de *site* estático hospedado no *GitHub Pages*.

## Organizando a casa

Primeiro de tudo, eu vou partir do pressuposto que você já tem um *site* funcionando no *GitHub Pages*. Existem zilhões de tutoriais de como hospedar um gerador de *site* estático por lá e isso está fora do escopo deste *post*. 

De início você vai ter que garantir que o *RSS* do seu *blog* esteja funcionando, se não estiver você vai ter que colocar pra funcionar antes de qualquer coisa. No caso do *MKDocs*, gerar *RSS* exige um *plugin* à parte que você deve instalar e configurar (a documentação oficial explica direitinho como fazer). Isso é necessário porque nós vamos usar um *script* em *python* que vai pegar a última entrada do arquivo de *RSS* do seu *blog* para saber o que postar. Isso facilita as coisas uma vez que o *RSS* já vem formatado para ser distribuído e centraliza todos os *posts* do *blog*.

Cada gerador de *site* estático tem uma forma diferente de apresentar o *RSS*, você tem que descobrir como o seu faz. No caso do *MKDocs*, ele gera 4 arquivos diferentes, um `feed_rss_created` para *posts* novos, e um `feed_rss_update` para atualizações de *posts* existentes, ambos numa versão *XML* e outra *JSON*. Por razões de compatibilidade vamos usar a versão *XML* do `feed_rss_created` para alimentar o *script*, já que *XML* costuma ser o padrão para arquivos *RSS*. Em outros geradores o nome e a localização do arquivo vai variar, mas geralmente ele fica na raiz do *site* gerado e tem *RSS* no nome.

## Postando no Mastodon 

Para fazer a postagem você precisa desse *script* [aqui](https://github.com/kriptolix/kriptolix.github.io/blob/main/.github/*script*s/mastodon_post.py). Ele roda depois depois da build e publicação do *site* na *GitHub Action* que faz esse trabalho. No caso do *MKDocs*, depois de `mkdocs gh-deploy --force`. Você precisa criar um arquivo contendo esse *script* no seu repositório, ele pode ter qualquer nome e ficar em qualquer lugar mas, de agora em diante, eu vou considerar que você usou o mesmo nome que eu: `mastodon_post.py`, e que o colocou dentro de `.github/scripts/` (se esse diretório não existir, é só criar).  

As únicas coisas com as quais você tem que se preocupar nesse *script* são:

`RSS_FILE:` Onde você tem que colocar o nome do arquivo de *RSS* do seu *site*.

`STATE_FILE:` Onde você coloca o caminho para o arquivo de estado (que vou explicar abaixo).

`RSS_path:` Caso o arquivo *RSS* não fique diretamente dentro de `site` talvez tenha que mudar.

## Então, o que é "last_post_sent"? 

Considerando que esse *script* roda sempre que existe uma atualização (*commit*) no repositório que contém o *site*, e sempre vai pegar o último *post* e mandar pro *Mastodon*, é necessária alguma maneira de saber se esse *post* já foi enviado antes para evitar envios repetidos. Nem toda alteração no *site* (*commit*) vai ser um texto novo, às vezes você só adicionou uma figurinha no layout ou mudou o nome de alguma coisa. 

Pra saber isso, sempre que o *script* posta algo no *Mastodon* ela salva uma referência nesse arquivo dizendo que aquilo foi a última coisa postada. Assim, se o *site* é atualizado o *script* pega o último *post* e verifica se ele já foi postado, se tiver sido ele simplesmente não faz nada.

Você só precisa criar um arquivo chamado `last_post_sent` (assim, mesmo, sem extensão) e colocá-lo dentro do diretório `.github`. Inicialmente ele estará em branco, sem nenhum conteúdo.

## Configurando a API do *Mastodon*

Para poder postar no *Mastodon* você precisa de uma conta em um servidor, eu vou assumir que você tem uma. Pode ser tanto sua conta pessoal como uma conta criada especialmente para o seu *blog*, tanto faz.

Para poder postar automaticamente, você terá que ir até as `preferências` da conta, depois em `desenvolvimento`. Não sei se todos os servidores do *Mastodon* seguem esse mesmo caminho, e talvez as opções possam estar em inglês, mas vou usar o servidor em que eu tenho conta como base. 


Uma vez em `desenvolvimento`, você precisa clicar no botão `novo aplicativo`. Nessa tela, você vai escolher um nome para o aplicativo, por exemplo, "*Post Share*". De todos os quadradinhos de opções você só precisa que `write:statuses` esteja marcado, ele dá a permissão para criar *posts*.

Em seguida, copie o valor do terceiro campo do inicio, que no meu servidor se chama `Seu código de acesso`, vamos precisar dele depois. Pode salvar as modificações. Agora, na tela de `desenvolvimento` vai aparecer o nome do aplicativo que você escolheu a permissão que ele tem (`write:statuses`).

## Adicionando GitHub Secrets

Talvez você tenha reparado que no `mastodon_post.py` não consta nem a url do servidor do *Mastodon* nem nenhuma credencial de acesso. Lógico que não podemos deixar essas informações abertas em um arquivo publico no *GitHub* pra qualquer um ver. Então como faz? O *GitHub* permite que criemos variáveis de ambiente encriptadas chamadas *GitHub Secrets*, que só o dono do repositório consegue ver e que só o conteúdo do repositório consegue acessar.

Para criar um secret vá até o seu repositório, clique em `settings`, depois em `secrets and variables` e então em `action`. Por fim, no botão `new repository secrets`.

Vamos precisar adicionar dois deles: 

`MASTODON_INSTANCE`: que vai conter a url do servidor do *Mastodon* em que está a conta.

`MASTODON_TOKEN`: que vai conter o valor de `Seu código de acesso` que copiamos acima.

## Alterando a GitHub Action

Agora vamos alterar o arquivo da *GitHub Action*, o arquivo que faz a build e publica o seu *site*. Eu vou deixar o meu como referência [aqui](https://github.com/kriptolix/kriptolix.github.io/blob/main/.github/workflows/ci.yml), mas para cada *site* ele vai ser diferente, então é só para referência mesmo. Independente de como for o seu, as alterações a se fazer nele são as mesmas.

Primeiro, você precisa adicionar o `last_post_sent` ao `paths-ignore`. Isso faz com que, quando esse arquivo for alterado (*committed*), ela não dispare a *GitHub Action*. Sem isso, teríamos um loop infinito já que quando o *script* posta alguma coisa ele altera o `last_post_sent` e essa alteração é, depois, confirmada (*committed*) automaticamente pela *GitHub Action*. Como qualquer alteração (*commit*) ativa a *GitHub Action*, o processo se repetiria infinitamente. Para isso, adicione o trecho abaixo no `push` depois do `branches` (na dúvida, olhe como está no meu).

    paths-ignore:
          - ".github/last_post_sent"

Depois disso, precisamos adicionar as dependências do *script* *python* na instalação geral. No caso do *MKDocs*, ela já é instalado via `python pip`, então eu só adicionei abaixo:

    - run: pip install feedparser
    - run: pip install requests 

Eu tenho quase certeza que a instalação base já vem com *python*, independente do gerador de *sites* que você está usando. Então, adicionar isso ai abaixo da parte do arquivo onde seu gerador de *sites* está sendo instalado deve funcionar.

Por último, você vai precisar adicionar no final do arquivo a parte que executa o *script* *python* e confirma a alteração do `las_post_send` com:

    run: python .github/scripts/mastodon_post.py 
            env: 
              MASTODON_INSTANCE: ${{ secrets.MASTODON_INSTANCE }} 
              MASTODON_TOKEN: ${{ secrets.MASTODON_TOKEN }}
          - name: Commit last post send state
            run: |
              if [[ -f .github/last_post_sent ]]; then            
                git add .github/last_post_sent
                git diff --cached --quiet || git commit -m "chore: last post sent updated"
                git push
              fi

**Importante:** Se você, por qualquer motivo, não usou os nomes de arquivos e as localizações que eu sugeri, você tem que alterar nos arquivos pra que tudo fique correto. confira as seguintes partes estão apontando para os arquivos e locais corretos:

Em `mastodon_post.py` as variaveis:

    RSS_FILE

    STATE_FILE

    RSS_path


No seu arquivo de *GitHub Action* as linhas: 

    run: python .github/scripts/mastodon_post.py

    if [[ -f .github/last_post_sent ]]; then

    git add .github/last_post_sent

## Concluindo

Caso tudo nada dê errado, se o seu *blog* já tiver algum *post*, assim que você confirmar essas alterações o último *post* vai ser repostado automaticamente pela conta do *Mastodon* configurada.

