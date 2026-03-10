---
layout: post
title:  "Instalando o InvokeAI no Fedora SilverBlue"
date: 2026-03-10
categories: 
  - technologies
---
Esse vai ser um post curtinho só pra me lembrar de coisas importantes que eu fiz para instalar o *InvokeAI*. Para quem é normal e não sabe que diabos é *Invoke*, ele é uma interface de uso para modelos generativos de imagem, ou seja, IA que gera imagem a partir de texto. Mais especificamente é uma interface para um modelo chamado *Stable Diffusion*, o primeiro desse tipo a ser *open source*.

<!--more-->
!!! warning 1

    Eu não vou entrar aqui na celeuma da IA (se é bom, se é mau, se é feio...), e vou fazer isso porque essa instalação é para uma experiência. Não vou monetizar nada que esse modelo gerar e ele vai ser usado na minha máquina local, o que não causa mais dano ao meio ambiente do que eu jogando *Helldivers II*.

!!! warning 2

    As definições de *open source* para modelos de IA ainda estão sendo debatidas. Estou chamando assim porque o modelo é aberto e livre para uso, diferente dos outros que existem por aí como o *DALL·E* ou o *Nano Banana*.

---

## Preparando a Toolbox

O primeiro passo é criar uma *toolbox* específica para o *Invoke*. Eu não quero ter que mexer no meu sistema base para rodar esse negócio (e nem nenhuma outra coisa). Por sorte, o *ROCm* funciona bem quando instalado na *toolbox* (sim, minha placa de vídeo é AMD, esse post vai refletir isso). O detalhe principal aqui é dar permissão à *toolbox* para acessar a placa gráfica. O comando para criar fica assim:

```bash
toolbox create invoke -- --device /dev/dri --device /dev/kfd \
  --group-add video --group-add render --security-opt seccomp=unconfined
```
```bash
toolbox enter invoke
```
---

## Instalando o ROCm e Dependências

Agora vamos instalar o *ROCm*. Inicialmente só seria necessário isso, mas alguns pacotes que vamos instalar depois no *Python venv* precisam de bibliotecas adicionais para compilar corretamente, especialmente o *pypatchmatch*, o pacote *Python* mais chato de compilar que eu ja vi na vida. Então vamos adicionar logo tudo que precisamos:

```bash
sudo dnf install rocm \
  gcc-c++ \
  pkgconf-pkg-config \
  python3-devel \
  opencv \
  opencv-devel \
  python3-opencv \
  libglib2
```
E agora os grupos:

```bash
sudo dnf group install development-tools
```

Fiz algumas instalações extras tentando resolver problemas, mas creio que o necessário foi apenas isso.

---

## Usando o AppImage ou Instalação Manual

O *InvokeAI* tem um instalador *AppImage* que funciona bem. O detalhe é que não dá para rodar clicando duas vezes; é preciso executa-lo pelo terminal de dentro da *toolbox* para ele estar no contexto de tudo que instalamos até agora..

Eu cheguei a usar o *AppImage*, mas como tive problemas depois e não entendia direito como funcionava, acabei apelando para a instalação manual (que é até bem simples, pra falar a verdade). Mas sugiro usar o *AppImage* mesmo, porque os problemas que podem acontecer depois também ocorrem na instalação manual.

## Bitsandbytes e ROCm

Mas qual é esse problema afinal? Bom, por algum motivo que só Jah, o deus dos regueiros, conhece, a instalação usa uma versão do *bitsandbytes* que não suporta *ROCm*, mesmo escolhendo a versão AMD no instalador. Ai, ao tentar executar o *Invoke*, ele gera um erro de bizarro de HIP. Para resolver eu adaptei um script de inicialização que encontrei [aqui](https://github.com/invoke-ai/InvokeAI/issues/7574#issuecomment-2665731006). Ou seja, ao invés de usar o *AppImage* como iniciador eu utilizo esse script e rodo o *Invoke* na versão web, que é a mesma coisa que o *AppImage* faz mas embutindo tudo numa janela própria como se fosse um app desktop.

Esse script deve ser colocado dentro do diretório principal onde você instalou o *InvokeAI*. Caso você vá usar-lo, tem algumas partes críticas que você deve alterar para se adequar a como o *Invoke* instala nas versões mais recentes:

```bash
VENV="invoke"   # provavelmente o valor aqui é "venv" e não "invoke"
PYTHON="python3.11"   # atualmente é "python3.12"

# start InvokeAI
export PYTORCH_ROCM_ARCH=gfx1102
export HSA_OVERRIDE_GFX_VERSION=11.0.0
...
export INVOKEAI_ROOT=~/invokeai
```

O *PYTORCH_ROCM_ARCH* é o *LLVM target name* e depende do modelo específico da sua placa de vídeo. Voce consegue descobrir usando o comando:

```bash
rocminfo | grep "LLVM target name"
```

O *HSA_OVERRIDE_GFX_VERSION* também varia conforme o hardware, mas é basicamente a parte numerica do *LLVM target name* separada por pontos, por exemplo: gfx1100 → 11.0.0.

O *INVOKEAI_ROOT* deve apontar para o diretório de instalação do *Invoke*.

Quando estiver tudo certo, basta executar o script de dentro da toolbox.

!!! note
    Eu não testei, mas acredito que depois de rodar esse script uma vez para corrigir o problema do *bitsandbytes* eu poderia voltar a usar o *AppImage* como incializador sem problemas. Você pode tentar isso se quiser. Eu não fiz porque, se vou ter que rodar via terminal de qualquer forma (lembra que ele tem que ser executado de dentro da toolbox?) eu prefiro executar logo o script. 

---

## Observações

Notei que não consigo gerar imagens maiores que **512 x 512** sem levar um erro de estouro de memória na cara, o que é estranho. Já usei o *InvokeAI* em tempos antigos com uma VGA mais modesta e conseguia gerar até **1024 x 1024**. Também não consigo usar *inpainting*, estender imagens ou usar uma imagem como referência sem erro, até adicionar as seguintes entradas ao arquivo `invokeai.yaml`:

```yaml
enable_partial_loading: true
device_working_mem_gb: 4
keep_ram_copy_of_weights: false
```

Essas entradas são sugestões da comunidade do *InvokeAI* para contornar memória insuficiente, parece que os 12GB de VRAM da minha VGA não são grande coisa nesse contexto, mas ainda não estou convencido disso. Tenho minhas dúvidas se não é algum bug nos *drivers HIP* da VGA. Infelizmente vai ficar assim porque não tenho conhecimento suficiente para investigar mais do que isso.   