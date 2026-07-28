from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ASSET_DIR = Path("/home/ubuntu/webdev-static-assets/me-product-catalogue")
OUTPUT = Path("/home/ubuntu/tmp/me-product-catalogue-contact-sheet.jpg")


def main() -> None:
    paths = sorted(ASSET_DIR.glob("*.jpg"))
    thumb_w, thumb_h = 300, 225
    label_h = 54
    columns = 4
    rows = (len(paths) + columns - 1) // columns
    canvas = Image.new("RGB", (columns * thumb_w, rows * (thumb_h + label_h)), "#11100E")
    draw = ImageDraw.Draw(canvas)
    font = ImageFont.load_default(size=16)

    for index, path in enumerate(paths):
        image = Image.open(path).convert("RGB").resize((thumb_w, thumb_h), Image.Resampling.LANCZOS)
        x = (index % columns) * thumb_w
        y = (index // columns) * (thumb_h + label_h)
        canvas.paste(image, (x, y))
        label = path.stem.removeprefix("me-").replace("-", " ").title()
        draw.text((x + 12, y + thumb_h + 15), label, fill="#D4B676", font=font)

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(OUTPUT, quality=91, optimize=True)
    print(OUTPUT)


if __name__ == "__main__":
    main()
