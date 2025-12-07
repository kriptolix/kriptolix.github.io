{# nav-item.html sobrescrito #}

{% set is_monocerus = page and page.url and page.url.startswith("monocerus/") %}
{% set skip_prefixes = ["category/", "tags/", "blog/archive/", "sobre/"] %}

{# Ignorar itens como categoria, tags, etc #}
{% if nav_item.url and skip_prefixes | select("startswith", nav_item.url) | list | length > 0 %}
  {% return %}
{% endif %}

{# Renomear "Início" para "Blog" fora das páginas de Monocerus #}
{% set title_override = "Blog" if not is_monocerus and nav_item.title == "Início" else nav_item.title %}

{% if nav_item.is_page %}
  <li class="md-tabs__item">
    <a href="{{ nav_item.url | url }}" class="md-tabs__link">
      {{ title_override }}
    </a>
  </li>
{% elif nav_item.children %}
  <li class="md-tabs__item">
    <details class="md-tabs__details">
      <summary class="md-tabs__summary">
        {{ title_override }}
        <span class="md-tabs__icon md-icon"></span>
      </summary>
      <ul class="md-tabs__list">
        {% for child in nav_item.children %}
          {% include "partials/nav-item.html" with context %}
        {% endfor %}
      </ul>
    </details>
  </li>
{% endif %}
