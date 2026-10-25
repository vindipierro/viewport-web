from PIL import Image, ImageDraw

SIZE = 1024
SUPERSAMPLE = 4
CANVAS = SIZE * SUPERSAMPLE
SCALE = CANVAS / 128


def pts(values):
    return [(round(x * SCALE), round(y * SCALE)) for x, y in values]


def make_mark(path, primary):
    image = Image.new("RGBA", (CANVAS, CANVAS), (0, 0, 0, 0))
    draw = ImageDraw.Draw(image)
    blue = (47, 107, 255, 255)

    draw.polygon(pts([(16, 46), (16, 18), (50, 18), (50, 28), (26, 28), (26, 46)]), fill=primary)
    draw.polygon(pts([(78, 110), (78, 100), (102, 100), (102, 76), (112, 76), (112, 110)]), fill=primary)

    width = round(18 * SCALE)
    draw.line(pts([(36, 33), (60, 94)]), fill=primary, width=width)
    draw.line(pts([(88, 33), (64, 94)]), fill=blue, width=width)

    image = image.resize((SIZE, SIZE), Image.Resampling.LANCZOS)
    image.save(path, "PNG", optimize=True)


make_mark("public/viewport-mark.png", (13, 26, 47, 255))
make_mark("public/viewport-mark-reverse.png", (247, 249, 253, 255))
