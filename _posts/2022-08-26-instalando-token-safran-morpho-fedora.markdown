---
layout: post
title:  "Instalando o token Safran Morpho no Fedora 36"
date:   2024-02-09 11:12:18 -0300
categories: technologies
---

Este artigo visa orientar a instalação do token Safran Morpho no Fedora Worksatation 36, mas instruções gerais serão apresentadas e talvez seja possível adaptá-lo a outras distros. Também não vou tratar aqui de instalação da caideia de certificados, já que as cadeias necessárias variam de acordo com o com o tempo a instituição.

![Safran Morpho YpsID](/images/token.webp){: width="50"}

O token Safran Morpho YpsID (Sagem Orga) é um dos tokens utilizados pelos TRTs (tribunais regionais do trabalho) para acessar o sistema PJE. Pelo que sei, o token não vem como nenhuma referência para se distinguir marca e modelo, então, a maneira mais fácil de saber se este é o modelo do seu token é conecta-lo e usar o commando.

    $ lsusb

Entre os dispositivos listados deve haver algum contendo os termos “Sagem Orga”, “Morpho” e/ou “YpsID”. Uma vez confirmada a identidade do token, desconecte-o.

### DRIVERS

O primeiro passo para conseguir fazê-lo funcionar é baixar o pacote .deb que contém a versão específica da libccid com o driver do token. Essa lib é uma versão patcheada da libccid 1.4.3, por causa disso, utilizar a lib padrão não vai funcionar.

Esse pacote pode ser encontrado aqui: `https://github.com/geyslan/morpho`

Baixe a versão adequada a seu sistema. A partir de agora, vamos considerar que você está trabalhando dentro do diretório `/home/SeuUsuário/Downloads` quando nos referimos a comandos no terminal.

No caso de sistemas Debian based, o pacote pode ser instalado diretamente e suas dependências devem ser resolvidas pelo apt. No caso do Fedora, será necessário descompactar o .deb e extrair dele a libccid.

    $ ar -x libccid_1.4.3–1morpho_amd64

IMPORTANTE: Por algum motivo desconhecido, o download desse pacote tende a corromper. Caso tente descompactá-lo/instalá-lo e obtenha um erro, será preciso baixá-lo novamente.

O comando extrai o pacote criando três arquivos: `debian-binary`, `data.tar.gz` e `control.tar.gz`.

O pacote que contém os arquivos é o `data.tar.gz`, basta descompacta-lo para termos acesso ao seu conteúdo:

    $ tar -zxvf data.tar.gz

O bundle que queremos é o diretório `ifd-ypsid.bundle`, que está em `/home/SeuUsuário/Downloads/usr/lib/pcsc/drivers/ifd-ypsid.bundle/`. Vamos usá-lo mais a frente.

Como, no Fedora, não há como instalar diretamente o .deb, o que vamos fazer é instalar a versão padrão da `libccid`, também vamos precisar do daemon `pcscd`. Aqui os dois vem dentro do pacote `pcsc-lite-ccid`, mas em outras distros eles podem vir separados. Além disso, também vamos precisar do `pcsc-tools`, que contém algumas ferramentas de teste que podem vir a ser úteis. A versão do `pcsc-lite-ccid` a ser instalada deve ser a 1.4.3, para garantir que as dependências batam com as da versão patcheada.

No Fedora, há uma forma simples de se instalar um pacote antigo, usando o dnf downgrade.

    $ sudo dnf downgrade — releasever=30 pcsc-lite-ccid-1.4.30–2.fc30.x86_64

Uma vez que instalamos o pacote, temos que garantir que ele não será atualizado para versões mais novas quando o sistema se atualizar, para usamos o comando:

    $ sudo dnf — exclude=pcsc-lite pcsc-lite-libs update

e agora instalamos o pcsc-tools

    $ sudo dnf install pcsc-tools

Agora que temos a lib e as dependências instaladas, vamos substituir o bundle da lib original pelo bundle da versão patcheada.

    $ sudo rm -rf /usr/lib64/pcsc/drivers/ifd-ccid.bundle

    $ sudo cp -r /home/SeuUsuário/DownloadsContents/usr/lib64/pcsc/drivers/ifd-ypsid.bundle /usr/lib64/pcsc/drivers/

Verifique se o daemon do pcscd está rodando.

    $ sudo service pcscd status

Se, na resposta, vier ‘Active: active (running)’, será necessário parar o serviço para que possamos executar um teste direto.

    $ sudo service pcscd stop

Conecte seu token e veja se o daemon vai reconhecê-lo e carregá-lo sem erro.

    $ sudo pcscd -a -d -f

As mensagens de carga com o nome do token devem aparecer em roxo. Se nenhum erro em vermelho aparecer é porque funcionou, use `ctrl+c` para encerrar o daemon. Agora vamos passar para o reconhecimento do token no firefox.

### GERENCIADOR

Ter o token reconhecido pelo sistema é só a primeira parte do problema, para que seja possível utilizá-lo no navegador e, consequentemente, no PJE, é preciso carregar a biblioteca que intermedia isso. No link do início do texto, onde foi baixado o arquivo da lib, também há arquivos do gerenciador da SafeSign. Esse gerenciador, além de uma interface gráfica para acessar o token, alterar senha e outras opções, contém a lib necessária para o reconhecimento do token pelo navegador e pelo shodo, do qual falaremos mais a frente. Apesar de ser possível usar o arquivo do primeiro link, não tive sucesso em realizar o reconhecimento do token no navegador com a lib vinda nele, então estou utilizando a versão para Ubuntu 18.04, dessa pagina: `https://safesign.gdamericadosul.com.br/download`.

Mais uma vez, em distros Debian based é possível instalar o pacote diretamente, apesar de uma certa complicação para resolução das dependências. Na prática, porém, o gerenciador não é essencial para o funcionamento do token e a maioria das suas funções pode ser realizada também no navegador. Como seria trabalhoso tentar instalá-lo no fedora, mesmo com a página oferecendo uma versão em rpm, optei por utilizar apenas a lib, sem a instalação do gerenciador.

Escolhi a versão para Ubuntu 18.04 por ser a mais atual (3.7, no momento em que escrevo isso). O procedimento para extrair a lib é muito parecido com o anterior.

Uma vez baixado, o pacote vem no formato .rar, o descompactamos

    $ unrar -x SafeSign_IC_Standard_Linux_3.7.0.0_AET.000_ub1804_x86_64.rar

Agora descompactamos o .deb que foi gerado.

    $ ar -x SafeSign_IC_Standard_Linux_3.7.0.0_AET.000_ub1804_x86_64.deb

Descompactamos o xz gerado

    $ xz -d -v data.tar.xz

Descompactamos o tar gerado

    $ tar -xf data.tar

Dentro de usr/lib encontraremos a lib que queremos, a ‘libaetpkss.so.3.8.4’.

Antes de realizarmos a configuração no navegador, vamos primeiro baixar o shodo. Estou usando o link de download do TRT7: `https://pje.trt7.jus.br/shodo/shodo.jar`

O shodo exige o Java oracle 8 para rodar, então vamos ter que instalá-lo. Estou usando o link oficial da Oracle que, por sorte, tem uma versão rpm: `https://www.java.com/pt-BR/download/`. Baixe a versão adequada ao seu sistema.

Agora instale o java.

    $ sudo rpm -ivh jre-8u73-linux-x64.rpm

Não vai ser necessário alterar o java padrão do sistema do Openjdk para o Java Oracle, indicaremos o java que irá rodar do shodo no atalho de execução.

Para evitar o risco de deleção acidental disso tudo, e tornar todo o processo que vem a seguir mais cômodo, vamos criar um diretório oculto na home do usuário para acomodar todos os arquivos necessários.

    $ mkdir /home/SeuUsuário/.pje

E movemos os arquivos que vamos utilizar pra lá.

    $ mv shodo.jar /home/SeuUsuário/.pje/

    $ mv usr/lib/libaetpkss.so.3.8.4 /home/SeuUsuário/.pje/

### FIREFOX

Vamos configurar o firefox para reconhecer o token. Abra o firefox, digite na barra de endereço: about:preferences#privacy. Desça até o fim da página e clique no botão “dispositivos de segurança…”. Na janela que se abrir, clique sobre “NSS Internal PKCS #11 Module”. Então, na barra lateral, clique em “carregar”. Dê um nome ao módulo, “PJE” ou qualquer outra coisa. No caminho do arquivo do módulo digite `/home/SeuUsuário/.pje/libaetpkss.so.3.8.4` e clique em “ok”.

Vamos testar o reconhecimento do token. Feche o firefox, conecte o seu token, e inicie o daemon do pcscd com:

    $ sudo service pcscd start

Abra novamente o firefox e digite na barra de endereço: `about:preferences#privacy`. Desça até o fim da página e clique no botão “dispositivos de segurança…”. Na janela que se abrir, verifique que, sob o nome do módulo que você escolheu, no meu caso, “‘PJE”, há alguns itens. Vá clicando neles em sequência e veja se as informações do seu token aparecerem em algum. Se aparecerem, funcionou. Feche o firefox.

### SHODO

Para utilizar o token no pje, será necessário primeiro iniciar o shodo. Para simplificar esse processo, vamos criar um atalho. No Fedora, não há como criar atalhos na área de trabalho por padrão, então vou ter que adicionar o atalho criado a dashboard do gnome. Vou usar o nano para isso, mas qualquer editor de texto pode ser usado no lugar.

    $ nano /home/SeuUsuario/.local/share/applications/shodo.desktop

Colar o seguinte conteúdo:

~~~~~~~~
[Desktop Entry]
Version=1.0
Type=Application
Icon=/home/SeuUsuario/.pje/shodo.png
Comment=Assinador fornecido pela Justiça do Trabalho para realizar assinaturas digitais no PJe
Terminal=false
Categories=Applications;Shodo — Assinador Digital
Name=Shodo — Assinador Digital
Exec=/usr/java/jre1.8.0_341-amd64/bin/java -jar /home/SeuUsuario/.pje/shodo.jar
Encoding=UTF-8
Name[pt_BR]=Shodo local
GenericName[pt_BR]=Assinador
~~~~~~~~

Depois `crtl+o` para s para salvar, `crtl+x` para sair. Faça logout da sessão e entre novamente para visualizar o ícone. Clique no ícone e siga as instruções. Quando o firefox abrir, ele dirá que a página é insegura, clique em “avançado”, “aceitar o risco e continuar’’. Aqui, mais uma vez, é possível testar o token. O shodo vai pedir o caminho da lib de reconhecimento do token, basta usar: `/home/SeuUsuário/.pje/libaetpkss.so.3.8.4.` Agora é só ir para o pje e tentar o acesso.

**OBSERVAÇÃO**: Lembre-se de alterar o caminho `/home/SeuUsuario` com o nome do seu usuário, e caminho do diretório java, que pode variar. Também vou deixar aqui uma imagem para servir de ícone para o shodo. salve-a em `/home/SeuUsuario/.pje/`` com o nome “shodo.png”.

![Logo](/images/logo.webp){: width="50"}
