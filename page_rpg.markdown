---
layout: page
title: RPG
permalink: /ttrpgs/
---

Conteúdo sobre RPG de mesa, especialmente sobre criação, design, sistemas
e mecânica.

<div class="ttrpgs">
  {%- if site.categories.ttrpgs.size > 0 -%}
    <ul class="ttrpg-list">
      {%- for ttrpg in site.categories.ttrpgs -%}
      <li>
        {%- assign date_format = site.minima.date_format | default: "%b %-d, %Y" -%}
        <span class="ttrpg-meta">{{ ttrpg.date | date: date_format }}</span>
        <h3>
          <a class="ttrpg-link" href="{{ ttrpg.url | relative_url }}">
            {{ ttrpg.title | escape }}
          </a>
        </h3>
        {%- if site.show_excerpts -%}
          {{ ttrpg.excerpt }}
        {%- endif -%}
      </li>
      {%- endfor -%}
    </ul>
  {%- endif -%}

</div>
