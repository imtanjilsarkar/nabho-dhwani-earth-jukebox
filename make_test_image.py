"""
Generates a synthetic satellite-style test image (a swirling storm pattern)
so we can test the image -> sound pipeline without needing internet access.

Team: swap this out for a REAL NASA EIC / GIBS / worldview satellite image
of an actual hurricane before your final submission. This is just to prove
the pipeline works end-to-end right now.
"""
import numpy as np
from PIL import Image

WIDTH, HEIGHT = 400, 300


def make_storm_image(path=WIDTH, height=HEIGHT):
    W, H = WIDTH, HEIGHT
    img = np.zeros((H, W, 3), dtype=np.uint8)

    cx, cy = W * 0.55, H * 0.5  # storm "eye" off-center, like a real frame

    yy, xx = np.mgrid[0:H, 0:W]
    dx = xx - cx
    dy = yy - cy
    r = np.sqrt(dx**2 + dy**2)
    theta = np.arctan2(dy, dx)

    # Spiral bands of brightness that fade with distance from the eye,
    # loosely mimicking cloud bands spiraling into a hurricane's center.
    spiral = np.sin(theta * 3 + r * 0.06) * 0.5 + 0.5
    falloff = np.clip(1.0 - r / (min(W, H) * 0.55), 0, 1) ** 1.3
    brightness = (spiral * 0.7 + 0.3) * falloff

    # A bright, tight "eye" at the very center
    eye = np.clip(1.0 - r / 12, 0, 1) ** 2
    brightness = np.clip(brightness + eye, 0, 1)

    gray = (brightness * 255).astype(np.uint8)
    img[..., 0] = gray
    img[..., 1] = gray
    img[..., 2] = np.clip(gray.astype(int) + 15, 0, 255).astype(np.uint8)  # slight blue tint

    Image.fromarray(img, mode="RGB").save("test_image.png")
    print("Wrote test_image.png")


if __name__ == "__main__":
    make_storm_image()
