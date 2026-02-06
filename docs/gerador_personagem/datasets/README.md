## Directory Structure

The **datasets** are divided into *Yaml* files containing references to key characteristics. The *Yaml* files are initially divided by body part, but there are also behavior and state files, and the intention is to insert files that represent fears, goals, and to advance as far as possible in the character's subjectivity.

The **datasets** directory contains a **generic** subdirectory. This directory exists because, initially, the generator only works with characteristics that could be used in any setting. However, in the future, nothing prevents specific characteristics of certain genres or settings from being added separately. An example would be a **medieval_fantasy** directory containing fantastic races that could be added as a generation option, or a **cyberpunk** directory that adds cybernetic implants as an option.

The **generic** directory contains an **npcs** directory, where the YAML files corresponding to the logical structure that relates the characteristics to each other are located. It also contains a **pt_BR** directory where translation files are stored. The idea of ​​the **pt_BR** directory is to serve as an example for other translations. The content of the generator compiled by me so far has complete translation coverage in *pt_BR*.

## Structure of the main YAML files

The main *YAML* files, that is, those that are not translation files, are constructed as a category containing several items. The basic model is as follows:

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

**Category**: Category identifier.

**Weight**: Represents the chance of this item being chosen among all items in this category. Uses the relative weight mechanism. Unfortunately, relative weights are not very intuitive, but they are the simplest way to maintain a distribution of unequal chances without headaches.

**Selection Type**: Represents the type of selection possible for this category. Some categories allow more than one item to be selected if they are drawn a second time, while most, if drawn a second time, are simply ignored.

**Selection Required**: Indicates whether inclusion of this category is optional or not. Categories marked *required true* will always be displayed; an example of a *required true* category is **Gender**.

**ID**: Is a reserved word or phrase in English that will serve as a key to anchor translations. The **id** should not contain spaces; if it is composed of more than one word, separate them with "_".

**Text**: Is the name of the category item that will be used for display; it must also be in English and is mandatory, as it is the name that will be displayed by default if no translation is available.

## Structure of Translation YAML Files

Translation YAML files are a simplified version of the main files. They are located in a directory within **npcs** named according to the **i18n** standard representing the language to which the translation belongs (e.g., pt_BR, cz, ge, etc.). The basic model is as follows:

category:

id: translation

**Category** and **ID** serve the same function as in the main YAML files. While **translation** represents the word that will translate the **Text** of the main YAML file.

## Constraints [under construction]

**Constraints** respect relationship rules between items, whether of the same category or different categories. They are used to indicate three possible relationships:

**Allowed**: Contains an item, list of items, or category that are allowed in combination with the item in question.

**Forbidden**: Contains an item, list of items, or category that are prohibited in combination with the item in question.

Most items do not have **constraints**, but they exist to prevent impossible situations such as a character having both "flashy hairstyle" and being "bald" at the same time.