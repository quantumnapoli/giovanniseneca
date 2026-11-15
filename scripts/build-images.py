#!/usr/bin/env python3
"""Ottimizza foto, copertine, immagine OG e video per il sito.

Le immagini originali arrivano dalla libreria media del vecchio sito WordPress
(percorsi elencati qui sotto). Questo script le scarica (se non ci sono già),
le ridimensiona e scrive i file WebP in src/static/img/.

Uso:  python3 -I scripts/build-images.py [cartella-cache]
Richiede: Pillow, ffmpeg (solo per il video).
"""
import json
import os
import subprocess
import sys
import urllib.request

from PIL import Image, ImageDraw

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "src", "static", "img")
CACHE = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, ".cache-originals")
BASE = "https://www.giovanniseneca.it/wp-content/uploads/"

# chiave -> (percorso sul vecchio sito, descrizione)
PHOTOS = {
    "chitarrista": "2018/07/giovanni-seneca-chitarrista.jpg",
    "battente": "2018/07/giovanni-seneca-intero.jpg",
    "tre-chitarre": "2018/07/giovanni-seneca-3-chitarre.jpg",
    "ritratto": "2018/08/giovanni-seneca-biografia-una-chitarra.jpg",
    "approdo": "2018/07/Giovanni-Seneca-Approdo-latino.jpg",
    "live-giallo": "2018/07/IMG_5830.jpg",
    "live-viola": "2018/07/IMG_5831.jpg",
    "live-bn": "2018/07/Giovanni-Seneca-bianco-nero.jpeg",
    "mani": "2018/08/fingers-on-guitar-dark.jpg",
    "quartet": "2018/07/Giovanni-Seneca-quartet-al-Festival-dei-Claustri-2017-di-Altamura.jpg",
    "quintet": "2018/07/Giovanni-seneca-rotte-mediterranee-quintet-1.jpg",
    "ovadia": "2018/07/ovadia-seneca.jpg",
    "ponte": "2018/08/giovanni-seneca-chitarra.jpg",
}
COVERS = {
    "margini-abitabili": "2024/12/Screenshot-2024-12-05-alle-15.28.21.jpg",
    "ecanes": "2014/02/copertina-ecanes-giovanni-seneca.jpg",
    "errando": "2013/06/copertina-errando-giovanni-seneca.jpg",
    "serenata-mediterranea": "2013/06/album-serenata-mediterranea-giovanni-seneca.jpg",
    "per-aspera": "2013/06/album-per-aspera-giovanni-seneca.jpg",
    "mutaforme": "2013/06/mutaforme-giovanni-seneca.jpg",
}
VIDEO = "2018/08/GiovanniSeneca-fbdown.net_.m4v"
YOUTUBE_IDS = ["4WtOIXB5dqA", "zFyvXxthKkQ", "P-4LYskJgwI", "JB21BFEyCIE", "KKYuxfCACJM"]
PHOTO_SIZES = {"s": 800, "m": 1400, "l": 2200}
COVER_SIZES = {"s": 480, "l": 960}


def fetch(rel):
    dest = os.path.join(CACHE, rel.replace("/", "_"))
    if not os.path.exists(dest):
        os.makedirs(CACHE, exist_ok=True)
        req = urllib.request.Request(BASE + rel, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=60) as r, open(dest, "wb") as f:
            f.write(r.read())
    return dest


def fetch_youtube_thumb(vid):
    """Miniatura 16:9 senza bande nere (maxres, altrimenti sd ritagliata)."""
    for name in ("maxresdefault", "sddefault", "hqdefault"):
        dest = os.path.join(CACHE, f"yt_{vid}_{name}.jpg")
        if not os.path.exists(dest):
            try:
                req = urllib.request.Request(f"https://i.ytimg.com/vi/{vid}/{name}.jpg", headers={"User-Agent": "Mozilla/5.0"})
                with urllib.request.urlopen(req, timeout=30) as r, open(dest, "wb") as f:
                    f.write(r.read())
            except Exception:
                continue
        im = Image.open(dest).convert("RGB")
        w, h = im.size
        if name in ("sddefault", "hqdefault"):  # 4:3 con bande nere sopra e sotto
            ch = round(w * 9 / 16)
            top = (h - ch) // 2
            im = im.crop((0, top, w, top + ch))
        return im
    raise RuntimeError(f"nessuna miniatura per {vid}")


def save_webp(im, path, quality):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    im.save(path, "WEBP", quality=quality, method=6)
    return os.path.getsize(path)


def main():
    manifest = {"photos": {}, "covers": {}}
    total = 0

    for key, rel in PHOTOS.items():
        im = Image.open(fetch(rel)).convert("RGB")
        w, h = im.size
        sizes = []
        for tag, target in PHOTO_SIZES.items():
            if target > w and tag != "s":
                # non ingrandire oltre l'originale; se la versione precedente è
                # molto più piccola, aggiungi una sola versione a risoluzione nativa
                if sizes and sizes[-1]["w"] < w * 0.9:
                    total += save_webp(im, f"{OUT}/photos/{key}-{tag}.webp", 78)
                    sizes.append({"tag": tag, "w": w})
                break
            tw = min(target, w)
            th = round(h * tw / w)
            total += save_webp(im.resize((tw, th), Image.LANCZOS), f"{OUT}/photos/{key}-{tag}.webp", 74)
            sizes.append({"tag": tag, "w": tw})
        manifest["photos"][key] = {"w": w, "h": h, "sizes": sizes}
        print(f"photo {key:14s} {w}x{h} -> {[s['tag'] for s in sizes]}")

    for slug, rel in COVERS.items():
        im = Image.open(fetch(rel)).convert("RGB")
        w, h = im.size
        side = min(w, h)  # alcune copertine sono 1024x1022: ritaglio quadrato
        im = im.crop(((w - side) // 2, (h - side) // 2, (w - side) // 2 + side, (h - side) // 2 + side))
        for tag, target in COVER_SIZES.items():
            t = min(target, side)
            total += save_webp(im.resize((t, t), Image.LANCZOS), f"{OUT}/covers/{slug}-{tag}.webp", 82)
        manifest["covers"][slug] = {"side": side}
        print(f"cover {slug:22s} {side}px")

    # Immagine per i social (1200x630): ritratto con sfumatura scura a sinistra
    src = Image.open(fetch(PHOTOS["chitarrista"])).convert("RGB")
    w, h = src.size
    crop_w = w
    crop_h = round(w * 630 / 1200)
    top = round((h - crop_h) * 0.25)
    og = src.crop((0, top, crop_w, top + crop_h)).resize((1200, 630), Image.LANCZOS)
    os.makedirs(OUT, exist_ok=True)
    og.save(f"{OUT}/og.jpg", "JPEG", quality=84, optimize=True)

    # Video della galleria + poster
    vid_src = fetch(VIDEO)
    vid_out = os.path.join(OUT, "video")
    os.makedirs(vid_out, exist_ok=True)
    if not os.path.exists(os.path.join(vid_out, "concerto.mp4")):
      subprocess.run(
        ["ffmpeg", "-v", "error", "-y", "-i", vid_src, "-vf", "scale=1280:-2", "-c:v", "libx264",
         "-crf", "28", "-preset", "slow", "-c:a", "aac", "-b:a", "96k", "-movflags", "+faststart",
         os.path.join(vid_out, "concerto.mp4")], check=True)
    poster = os.path.join(CACHE, "poster.jpg")
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", "3", "-i", vid_src, "-frames:v", "1", poster], check=True)
    pim = Image.open(poster).convert("RGB")
    total += save_webp(pim, os.path.join(vid_out, "concerto-poster.webp"), 78)
    manifest["video"] = {"w": pim.size[0], "h": pim.size[1]}

    for vid in YOUTUBE_IDS:
        im = fetch_youtube_thumb(vid)
        if im.size[0] > 960:
            im = im.resize((960, round(im.size[1] * 960 / im.size[0])), Image.LANCZOS)
        total += save_webp(im, os.path.join(vid_out, f"{vid}.webp"), 76)
        print(f"youtube {vid} {im.size[0]}x{im.size[1]}")

    with open(os.path.join(ROOT, "src", "photos.json"), "w") as f:
        json.dump(manifest, f, indent=1)
    print(f"\nWebP totali: {total / 1024 / 1024:.1f} MB")


if __name__ == "__main__":
    main()
