# NLP, NLG

날짜: 2024년 9월 10일

참고자료

---

https://www.qualtrics.com/experience-management/customer/natural-language-understanding/

https://www.qualtrics.com/experience-management/customer/natural-language-processing/

https://www.qualtrics.com/experience-management/customer/natural-language-generation/

https://www.ibm.com/topics/natural-language-processing

### NLP 란

**Natural Language Processing** 의 줄임말로 AI 또는 서비스가 머신 러닝 알고리즘을 사용하여 사람의 언어를 이해하고 통신할 수 있도록 하는 컴퓨터 과학 및 인공 지능(AI)의 하위분야 입니다. 

### NLU 란

**Natural Language Understanding** 의 줄임말로 NLP의 하위 분야로써 컴퓨터가 사람의 언어를 이해하고 해석할 수 있도록 하는 기술입니다.

### NLG 란

인공 지능에 의해 구동되는 소프트웨어 프로세스로, 정형 및 비정형 데이터에서 자연스러운 문어 또는 구어를 생성하는것을 뜻합니다.

### 데이터셋 이란

개발자가 해석하는 데 사용하는 모든 작업, 기술 또는 모델의 중추로 분석 또는 처리를 위해 함께 구성되고 저장되는 구조화된 데이터 모음을 뜻합니다.

### 코퍼스(Corpus: 몸) 란

분석할 언어 데이터의 집합을 나타내며 AI는 해당 코퍼스를 통해 학습하게 됩니다.

### 여러가지 **NLU** 기술 스택

- 텍스트
    
    https://www.nltk.org/
    
    https://spacy.io/
    
- 도형, 그래프

### 여러가지 NLG 기술 스택

### NLU 텍스트 기술 비교

**NLTK 장점** 

- 다양한 NLP 도구와 기능을 제공해서 광범위한 NLP작업을 지원합니다.
- 문서, 튜토리얼 정리가 잘 되어있어서 처음 접하는 사람이 사용하기 적합합니다.
- 다양한 코퍼스와 데이터셋을 풍부하게 포함되어 있어서 다양한 데이터를 쉽게 사용할 수 있습니다.
- 제어권을 사용자에게 주어 작업을 구체적으로 다룰 수 있게 해줍니다.

**NLTK 단점**

- **SpaCy** 와 비교 했을때 상대적으로 속도가 느리고 대량의 텍스트 처리에 있어서는 비효율 적일 수 있습니다.
- 다양한 기능과 설정을 제공하는 만큼 간단한 작업을 할 때도 복잡한 과정을 거쳐야 할 수 있습니다.

**SpaCy 장점**

- 매우 빠르고 효율적으로 동작하며 대규모 텍스트 처리에 적합한 성능을 제공해 줍니다.
- 간결하고 직관적인 API 를 제공하여 복잡한 NLP 작업도 간단한 코드로 처리 할 수 있습니다.
- 딥러닝을 지원해주어서 **PyTorch**, **TensorFlow** 와 쉽게 통합할 수 있어서 추후에 파이프라인이나 모델을 쉽게 확장 할 수 있습니다.

**SpaCy 단점**

- NLTK 에 비해 제한된 기능을 제공해서 **NLP**를 깊게 구현하기에 한계가 있습니다.
- 한정적인 코퍼스와 데이터셋을 가지고 있어서 사전 학습된 모델에 의존합니다.
- 성능 최적화가 잘 되어 있지만 세밀한 작업이나 사용자 정의가 필요한 경우 **NLTK** 비해 덜 유연할 수 있습니다.

### NLU 기술 선택 과정

위에서 **SpaCy(**👑**)** 와 **NLTK** 의 장단점을 비교했을때 아래와 같은 이유로 **SpaCy(**👑**)**를 선택하였습니다.

- 많은 수학문제 문장을 빠르게 분석해야 하므로 대규모 텍스트 처리에 적합한 **SpaCy(**👑**)** 가 좀 더 빠르며
- 전체적인 속도를 생각했을때 단순 자연어를 인식하는데 많은 시간이 소요되면 정작 문제를 풀 때 소요되는 시간까지 합쳐지면 오랜 시간이 걸리수 있기 때문에 처리가 상대적으로 빠른 **SpaCy(**👑**)** 가 더 적합합니다.
- 광범위한 코퍼스와 데이터셋 까지 필요하지 않고 특정분야 수학에 대해서만 필요하기 때문에 수학관련 모델로 학습되 **SpaCy(**👑**)** 모델이 더 적합합니다.
- 마지막으로 학습곡선 측면에서 비교했을때 여러가지 설정과 기능이 많은 **NLTK** 보다 짧은 프로젝트 기한동안 배울 수 있고 좀 더 직관적인 **SpaCy(**👑**)** 를 ****사용하는게 좀 더 적합하다고 판단하였습니다.

### NLG 관련 여러 기술 스택

https://openai.com/index/gpt-4o-and-more-tools-to-chatgpt-free/

https://t5x.readthedocs.io/en/latest/

https://textblob.readthedocs.io/en/dev/

https://huggingface.co/docs/transformers/model_doc/bert

https://huggingface.co/docs/transformers/model_doc/pegasus

**Rule-based Systems**

### NLG 기술 선택 과정

- 프로젝트가 대규모가 아니고 만들고 있는 프로젝트 특정 상 엄청 정교한 NLG 기술 까지는 필요치 않으므로 유료는 선택하지 않았습니다.
    
    https://openai.com/index/gpt-4o-and-more-tools-to-chatgpt-free/ → ❌
    
- NLU 관련해서는 이미 위에서 선택을 마쳤으므로 NLU 관련 기술에 대해서는 불필요하기 때문에 NLU 특화 기술인 **BERT** 는 선택하지 않았습니다.
    
    https://huggingface.co/docs/transformers/model_doc/bert → ❌
    
- **T5X(**👑**)** 와 **TextBlob**, **Pegasus** 를 비교했을 때
    - **TextBlob**의 경우 텍스트 분석과 감정 분석에 사용되므로 사용은 할 수 있지만 범용성에서 떨어질 수 있습니다.
    - **Pegasus**의 경우도 텍스트 요약에서 뛰어난 성능을 발휘하지만 다른 NLP 작업에 있어서는 제한적입니다.
    - **T5X(**👑**)** 경우 ****최신 모델로 유연하고 다양한 상황에 대해 조정이 용이 하고 다양한 NLP 작업을 하나의 T5X 모델로 처리할 수 있습니다.
    - 모듈화된 설계를 제공하여, 각각의 모듈들을 쉽게 교체하거나 조정할 수 있습니다.
    - 모든 NLP 작업을 텍스트 변환 문제로 처리하는 “text-to-text” 프레임워크를 사용하기 때문에 모델을 훈련하거나 튜닝할때 일관성을 유지시킬수 있습니다.
    
    위와 같은 이유들로 **T5X(**👑**)**을 사용하기로 결정하였습니다.