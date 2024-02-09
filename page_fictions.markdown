---
layout: page
title: Ficções
permalink: /fictions/
---

Todas as histórias que andei escrevendo nos últimos anos, e que vou escrever nos próximos

<div class="fictions">   
  {%- if site.categories.fictions.size > 0 -%}    
    <ul class="fiction-list">
      {%- for fiction in site.categories.fictions -%}
      <li>
        {%- assign date_format = site.minima.date_format | default: "%b %-d, %Y" -%}
        <span class="fiction-meta">{{ fiction.date | date: date_format }}</span>
        <h3>
          <a class="fiction-link" href="{{ fiction.url | relative_url }}">
            {{ fiction.title | escape }}
          </a>
        </h3>
        {%- if site.show_excerpts -%}
          {{ fiction.excerpt }}
        {%- endif -%}
      </li>
      {%- endfor -%}
    </ul>    
  {%- endif -%}

</div>

