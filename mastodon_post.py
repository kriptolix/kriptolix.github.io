import os
import requests
import feedparser

# Variável de controle: altere manualmente quando quiser publicar
PUBLISH = True   # coloque False para não publicar

instance = os.getenv("MASTODON_INSTANCE")
token = os.getenv("MASTODON_TOKEN")
rss_url = "https://www.titulomutante.com.br/rss.xml"

if not PUBLISH:
    print("Publicação desativada. Nada será enviado.")
    exit(0)

feed = feedparser.parse(rss_url)
if not feed.entries:
    print("Nenhum item encontrado no RSS.")
    exit(0)

latest = feed.entries[0]
title = latest.title
link = latest.link
summary = latest.get("summary", "")

message = f'Novo post no blog: "{title}"\n{summary}\nLeia em: {link}'

url = f"{instance}/api/v1/statuses"
headers = {"Authorization": f"Bearer {token}"}
data = {"status": message}

resp = requests.post(url, headers=headers, data=data)

if resp.status_code == 200:
    print("Post publicado com sucesso no Mastodon!")
else:
    print("Erro ao publicar:", resp.text)