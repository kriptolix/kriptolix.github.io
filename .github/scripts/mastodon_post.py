import os
import requests
import feedparser


def read_last_post(file):
    if not os.path.exists(file):
        return None
    with open(file, "r") as f:
        return f.read().strip()


def write_last_post(file, value):
    with open(file, "w") as f:
        f.write(value)


STATE_FILE = ".github/last_post_sent"
RSS_FILE = "feed_rss_created.xml"

instance = os.getenv("MASTODON_INSTANCE")
token = os.getenv("MASTODON_TOKEN")

if not instance or not token:
    print("No instance ot token configured.")
    exit(0)

workspace = os.getenv("GITHUB_WORKSPACE", os.getcwd())
rss_path = os.path.join(workspace, "site", RSS_FILE)

feed = feedparser.parse(rss_path)

if not feed.entries:
    print("No items found in RSS.")
    exit(0)

latest = feed.entries[0]
post_id = getattr(latest, "id", latest.link).strip()

last_post = read_last_post(STATE_FILE)

if last_post == post_id:
    print("Post already sent previously.")
    exit(0)

title = latest.title
link = latest.link
summary = latest.get("summary", "").strip()

message = f'Novo post no blog: "{title}"\n\n{summary}\n\nLeia em: {link}'

try:
    url = f"{instance}/api/v1/statuses"
    headers = {"Authorization": f"Bearer {token}"}
    data = {"status": message}
    resp = requests.post(url, headers=headers, data=data, timeout=10)

    if resp.status_code == 200:
        write_last_post(STATE_FILE, post_id)
        print("Post successfully published on Mastodon!")
    else:
        print("Error publishing to Mastodon:", resp.status_code, resp.text)

except requests.RequestException as e:
    print("Network error while posting to Mastodon:", e)