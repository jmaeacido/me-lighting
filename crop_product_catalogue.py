from pathlib import Path

from PIL import Image, ImageEnhance, ImageFilter


SOURCE_A = Path("/home/ubuntu/upload/ScreenShot2026-07-17at8.52.09pm.png")
SOURCE_B = Path("/home/ubuntu/upload/ScreenShot2026-07-17at8.52.38pm.png")
OUTPUT_DIR = Path("/home/ubuntu/webdev-static-assets/me-product-catalogue")


CROPS = [
    (SOURCE_B, "linear-led-profiles", (124, 99, 375, 286)),
    (SOURCE_B, "led-neon-flex", (400, 99, 650, 286)),
    (SOURCE_B, "dmx-pixel-led-systems", (674, 99, 891, 286)),
    (SOURCE_B, "inground-uplights", (945, 99, 1161, 261)),
    (SOURCE_B, "surface-mounted-downlights", (124, 545, 340, 706)),
    (SOURCE_B, "recessed-downlights", (400, 545, 616, 706)),
    (SOURCE_B, "track-lighting-systems", (674, 545, 891, 706)),
    (SOURCE_B, "wall-grazers-washers", (945, 545, 1161, 706)),
    (SOURCE_A, "outdoor-floodlights", (104, 39, 322, 201)),
    (SOURCE_A, "bollard-lighting", (379, 39, 596, 201)),
    (SOURCE_A, "step-marker-lights", (654, 39, 870, 201)),
    (SOURCE_A, "pendant-lighting-systems", (924, 39, 1141, 201)),
    (SOURCE_A, "architectural-feature-rings", (104, 488, 322, 650)),
    (SOURCE_A, "custom-fabrication-lighting", (388, 488, 644, 650)),
    (SOURCE_A, "ip-rated-strip-lighting", (668, 488, 885, 650)),
    (SOURCE_A, "smart-lighting-controls", (948, 488, 1176, 659)),
    (SOURCE_A, "cabinet-joinery-lighting", (104, 966, 322, 1128)),
    (SOURCE_A, "high-bay-lighting", (379, 966, 596, 1128)),
    (SOURCE_A, "led-drivers-power-systems", (654, 966, 901, 1128)),
    (SOURCE_A, "emergency-lighting-systems", (924, 966, 1141, 1128)),
]


def prepare_product_crop(source: Path, name: str, box: tuple[int, int, int, int]) -> Path:
    image = Image.open(source).convert("RGB")
    crop = image.crop(box)
    crop = ImageEnhance.Contrast(crop).enhance(1.025)
    crop = ImageEnhance.Sharpness(crop).enhance(1.12)
    crop = crop.filter(ImageFilter.UnsharpMask(radius=0.7, percent=55, threshold=3))

    canvas = Image.new("RGB", (1200, 900), "#F5F3EE")
    scale = min(1080 / crop.width, 790 / crop.height)
    crop = crop.resize(
        (max(1, round(crop.width * scale)), max(1, round(crop.height * scale))),
        Image.Resampling.LANCZOS,
    )
    x = (canvas.width - crop.width) // 2
    y = (canvas.height - crop.height) // 2
    canvas.paste(crop, (x, y))

    output = OUTPUT_DIR / f"me-{name}.jpg"
    canvas.save(output, quality=94, optimize=True, progressive=True)
    return output


def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    for source, name, box in CROPS:
        output = prepare_product_crop(source, name, box)
        print(output)


if __name__ == "__main__":
    main()
