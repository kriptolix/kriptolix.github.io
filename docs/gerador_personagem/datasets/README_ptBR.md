## Estrutura de diretorios

Os **datasests** estão divididos em arquivos *Yaml* contendo referencias de características marcantes. Os *Yaml* estão inicialamente divididos por parte do corpo, mas também há arquivos de comportamento, de estado e a pretenção é inserir arquivos que representem medos, objetivos e ir avançando até onde for possível na subjetividade do personagem.

O diretorio **datasets** contem um subdiretorio **generic**. Esse diretorio existe porque, inicialmente, o gerador só trabalha com características que poderia ser usadas em qualquer cenario. Mas, futuramente, nada impede que características especificas de certos gêneros ou cenarios possam ser adicionadas a parte. um exemplo seria um diretorio **medieval_fantasy** que contivesse raças fantasticas que poderiam ser adicionadas como opção de geração, ou um diretorio **cyberpunk** que adicionasse implantes ciberneticos como opção. 

O diretorio **generic** contem um diretorio **npcs**, onde estão os Yaml correspondentes a estrutura logica que realciona as características entre si. Também contem um diretorio **pt_BR** no qual ficam arquivos de tradução. A idea do diretorio **pt_BR** é servir como exemplo para outras traduções. O conteudo do gerador compilado até agora por mim possui cobertura total de tradução no *pt_BR*.

## Estrutura dos arquivos Yaml principais

Os arquivos *Yaml* principais, ou seja, aquelas não são arquivos tradução, são construídos como uma categoria que contem vários itens. O modelo basico é o seguinte:

        category:  
        weight: number | none
        selection:
            type: single | multiple
            required: true | false
        traits:
            - id: item
            text: "item name"
            weight: number
            ...

**Category**: Identificador da categoria.

**Weight**: Representa a chance desse item ser escolhido entre todos os itens dessa categoria. Usa o mecanismo de pesos relativos. Infelizmente os pesos relativos são pouco intuitivos mas são a forma mais simples de manter uma distribuição de chances não igualitarias sem dor de cabeça.

**Selection Type**: Representa o tipo de seleção possível para essa categoria. Algumas categorias permitem que mais de um item seja selecionado caso sejam sorteadas uma segunda vez, enquanto a maioria, caso seja sorteada uma segunda vez, é simplesmente ignorada.

**Selection Required**: Indica se inclusão dessa categoria é opcional ou não. Categorias *required true* serão sempre apresentadas, um exemplo de categoria *required true* é **Gênero**.

**ID**: É uma palavra ou expressão reservada em ingles que vai servir como chave para ancorar traduções. O **id** não deve conter espaços, no caso dele composto por mais de uma palavra separe-as por "_".

**Text**: É o nome do item da categoria que será usado para exibição, também deve ser em ingles e é obrigatório, pois é nome que será exibido por padrão caso não haja nenhuma tradução disponível. 

## Estrutura dos arquivos Yaml de tradução

Os arquivos *Yaml* de tradução são uma versão simplificada dos arquivos principais. Eles ficam numa diretorio dentro de **npcs** noameado de acordo com o padrão **i18n** que represente o idioma ao qual a tradução pertecendo (Ex: pt_BR, cz, ge, etc..). O modelo basico é o seguinte:

        category:
            id: translation

**Category** e **ID** cumprem a mesma função que nos arquivos *Yaml* principais. Enquanto **translation** representa a palavra que vai traduzir o **Text** do arquivo *Yaml* principal.

## Constraints [em construção]

**Constraints** respesentam regras de relacionamento entre itens, seja de mesma categoria ou de categorias diferentes. Ela são usadas para indicar tres possíveis relacionamentos:

**Requires**: Contem um item, lista de item ou categoria que são necessários para que o item em questão pode ser aplicado.

**Excludes**: Contem um item, lista de item ou categoria que não podem existir em combinação com o item em questão.

A Maioria dos itens não possue **constrants**, mas elas existem para evitar situações impossíveis como um personagem possuir ao mesmo tempo "penteado espalhafatoso" e "careca".