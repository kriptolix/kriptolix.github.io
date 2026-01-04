---
layout: post
title:  "Removendo pareamento do Logitech Powerplay no Linux"
date: 2025-12-12
categories: 
  - technologies
---
Por causa de uma imensa burrada minha fui obrigado a comprar um mouse novo, até aí tudo bem (tudo bem o caralho, mas enfim). Para minha surpresa, descobri que o Logitech Powerplay, o mousepad da Logitech que carrega o mouse por indução, do qual sou proprietário, sincroniza com um, e apenas um mouse, e mantém essa configuração até você, via software, ordenar que eles esqueçam o vínculo. 

Infelizmente não tem um botão no dispositivo para fazer isso, tem que ser via software. Aqui começa o problema, já que eu uso Linux e não existe versão do Logitech G HUB, o software da Logitech que faz isso, para Linux.

<!--more-->

Como isso foi uma tremenda dor de cabeça para resolver, resolvi escrever um post para deixar registrado o processo tanto para possível uso futuro da minha parte quanto para o resto do mundo (se alguém conseguir encontrar esse blog no meio da internet morta que vivemos hoje). Existiam dois caminhos possíveis:

* Uma instalação do windows pra isso num HD separado ou via dualboot.

* Uma Máquina virtual com o Windows instalado e USB Passthrough.

Escolhi o segundo já que dualboot é coisa de satanás. Havia várias formas de criar a VM mas, como eu andava querendo dar uma olhada no Winboat, escolhi usá-lo, principalmente porque ele tem uma versão Appimage. Como o meu sistema é imutável (Fedora Silverblue), eu queria mexer o mínimo possível.

Instalar o Winboat não é sobre instalar o Winboat, e sim sobre instalar as dependências dele e depois rodar o Appimage. Ele até funciona com o podman, que já vem instalado por padrão no Fedora, mas a função de USB Passthrough não está disponível na instalação via podman (na versão 0.9.0 do Winboat, que é a que estou usando, no futuro deve ser adicionado), então o jeito é usar docker.

Eu não vou tratar da instalação aqui, o Winboat ja tem ótimos tutoriais, vou me concentrar só nos detalhes relevantes pro SilverBlue. No caso, é preciso instalar o docker e o docker-compose layred via rpm-ostree, e instalar a versão flatpak do sdk do Open RDP, mas esse já o modo padrão como o Winboat orienta a instalar. Instalados os requisitos, basta baixar o Appimage do site do Winboat, dar permissão de execução e clicar duas vezes. O resto do processo é praticamente automático.

Uma vez que a VM esteja rodando, você pode acessá-la a partir do atalho para área de trabalho no Winboat. Dentro do windows, você vai precisar instalar o Logitech G HUB para acessar o Powerplay e fazer a remoção do pareamento. 

**Aqui vem o primeiro ponto relevante:** você vai ter de baixar uma versão específica do Logitech G HUB pois, assim que você abrir o programa ele vai apontar que o Powerplay precisa de uma atualização de firmware e não vai deixar você fazer nada antes que essa atualização ocorra.

O negócio é que a versão mais atual do Logitech G HUB (2025.9.807502 no meu caso) não consegue atualizar o firmware do Powerplay, ocorre um erro desconhecido. Para conseguir atualizar eu tive que usar uma versão mais antiga do Logitech G HUB, mas especificamente a 2021.10.8013 (obrigado Reddit) cujo link vou deixar graciosamente pra você [aqui](https://logitech-g-hub.en.uptodown.com/windows/download/4028752).

Uma vez instalada essa versão, você terá que adicionar o Powerplay ao USB Passthrough do Winboat, pra isso você tem que habilitar as configurações experimentais, senão a opção não aparece. Quando a opção estiver disponível, adicionar é tão simples quanto clicar no botão “+” e escolher o Powerplay na lista. Quando fizer isso, volte para VM e abra o Logitech G HUB como administrador, o Powerplay vai aparecer como dispositivo e pedir pela atualização de firmware. Mande atualizar. 

Aqui vem o segundo ponto relevante: Se você só esperar, o Powerplay vai sumir do Logitech G HUB depois que você clicar em atualizar. O led dele vai desligar e vai ficar parecendo que ele foi desativado. Depois de um tempo, a atualização simplesmente falha e você tem que desconectar e reconectar o Powerplay do PC para que ele volta a ficar ativo. O que acontece é que, no momento em que a atualização é iniciada, o Powerplay se torna outro dispositivo USB (obrigado fórum do Arch), para que a atualização prossiga você precisa ir para as configurações do Winboat e adicionar esse outro dispositivo também ao USB Passthrough. Não lembro o nome exato do dispositivo mas ele contém a palavra “bootload”.

Quando você fizer a adição do novo dispositivo ao USB Passthrough a atualização vai continuar e ser finalizada com sucesso. Depois disso, você pode ir às configurações do Powerplay dentro do Logitech G HUB e clicar no segundo ícone da barra lateral para acessar a zona de pareamento. A identificação do seu mouse antigo deve estar visível junto com um botão de para dessincronizar. No meu caso, ao clicar no botão, nada aconteceu. Eu tive que fechar o Logitech G HUB e abrir novamente para que eu conseguisse usar o botão, mas acabou funcionando.

Remover o pareamento vai colocar o Powerplay em modo de busca. Isso significa que o próximo mouse com um adaptador do Powerplay que for ligado sobre ele vai ser sincronizado. Aqui você já pode fechar a VM, vá nas configurações do Winboat e remova os itens do USB Passthrough por precaução. Reinicie o PC, desligue o seu mouse e desconecte o cabo. Assim que o PC reiniciar, coloque seu mouse sobre o Powerplay e ligue-o. Ele deve ser sincronizado automaticamente.
