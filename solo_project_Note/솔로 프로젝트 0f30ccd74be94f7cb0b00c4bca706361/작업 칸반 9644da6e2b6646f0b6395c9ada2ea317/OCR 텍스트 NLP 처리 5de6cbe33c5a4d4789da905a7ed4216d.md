# OCR 텍스트 NLP 처리

진행 상태: 완료
날짜: 2024년 9월 17일
작업 환경: 서버

# Task 개요

- OCR 해서 나온 텍스트를 NLU 과정을 거쳐서 원하는 결과값으로 잘 반환되어야 합니다.
    - spaCy 사용

# TODO

- [x]  OCR 거치고 나온 텍스트에 대해 NLU 과정을 거쳐 원하는 반환값을 만들어줍니다.

# Notes

- SpaCy 같은 경우 영어에 특화 되어 있어서 다른 한글 특화 라이브러리를 사용 **KoNLPy**
- [이미지 OCR 시켜주기](%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5%20OCR%20%E1%84%89%E1%85%B5%E1%84%8F%E1%85%A7%E1%84%8C%E1%85%AE%E1%84%80%E1%85%B5%208f47bb4bf95c4528833d2012349232d4.md)
    
    → OCR 해서 나온 LaTeX 반환값을 Text로 바꿔주어야 합니다.
    
- 해당 Text로 바꿔주는 알고리즘
    
    ```python
    cleaned = text.res.latex.split("?")[0]
      .replaceAll("}{", "/")
      .replaceAll("oplus", "")
      .replaceAll("matrix", "")
      .replaceAll("aligned", "")
      .replaceAll("quad", "")
      .replaceAll("left", "")
      .replaceAll("right", "")
      .replaceAll("}", "")
      .replaceAll("&", "")
      .split("\\")
      .map((sentense) => {
      return sentense.includes("{") ? sentense.split("{")[1] : sentense;
    })
    
    cleaned.join(" ") + "?"
    ```
    

# 관련 자료

찾아본 자료나 정리한 페이지 있으면 연결해주세요