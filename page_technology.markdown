---
layout: page
title: Tecnologia
permalink: /technologies/
---

Conteúdo de tutorialzinho, dicas ou comentarios sobre coisas em que eu
ando trabalhando, ou só estou curioso a respeito.

<div class="technologies">
  {%- if site.categories.technologies.size > 0 -%}
    <ul class="technology-list">
      {%- for technology in site.categories.technologies -%}
      <li>
        {%- assign date_format = site.minima.date_format | default: "%b %-d, %Y" -%}
        <span class="technology-meta">{{ technology.date | date: date_format }}</span>
        <h3>
          <a class="technology-link" href="{{ technology.url | relative_url }}">
            {{ technology.title | escape }}
          </a>
        </h3>
        {%- if site.show_excerpts -%}
          {{ technology.excerpt }}
        {%- endif -%}
      </li>
      {%- endfor -%}
    </ul>
  {%- endif -%}

</div>
