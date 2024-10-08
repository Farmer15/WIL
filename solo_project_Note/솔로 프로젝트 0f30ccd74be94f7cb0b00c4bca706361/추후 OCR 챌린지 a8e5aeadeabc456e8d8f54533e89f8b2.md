# 추후 OCR 챌린지

- 유료 API 를 사용하지 않고 인식되게 하기

### openCV 맛보기

```python
import numpy as np
import cv2 as cv

img = cv.imread("temp_image.jpg")

gray = cv.cvtColor(img, cv.COLOR_BGR2GRAY)

kernel = np.ones((2, 3), np.uint8)
gray = cv.dilate(gray, kernel, iterations=1)
gray = cv.erode(gray, kernel, iterations=2)

cv.imwrite("./" + "removed_noise.png", gray)

_, gray = cv.threshold(gray, 127, 255, cv.THRESH_BINARY)
cv.imwrite("./" + "thres.png", gray)

result = pytesseract.image_to_string(Image.open("./" + "thres.png"))

print(result.strip())
```

### tesseract 맛보기

```python

import pytesseract
from PIL import Image

pytesseract.pytesseract.tesseract_cmd = (
    r"/opt/homebrew/Cellar/tesseract/5.4.1/bin/tesseract"
)

a = Image.open("test.jpg")
result = pytesseract.image_to_string(a, lang="eng+equ")
print(result)
	
```

### EasyOCR 맛보기

```python
import easyocr

    reader = easyocr.Reader(["ko"])
    result = reader.readtext(
        output_file_path,
        detail=0,
        text_threshold=0.9,
        low_text=0.6,
    )
    print(result)
```