# 3주차 과제 정리

# 클로져

---

- 펼치기
    - 개념 : 주변 상태(렉시컬 환경)에 대한 참조와 함께 묶인(포함된) 함수의 조합
    - 좀 더 상세한 설명 : 내부함수가 외부함수의 식별자를 참조(스코프 체인) + 외부함수의 생명주기가 끝나도 내부에서 외부 참조가 사라지지 않고 이어지는것을 말함
        
        ### ***렉시컬 환경 이란? : 함수가 선언된 위치에서의 주변 함수나 변수 정보들을 저장해놓는 자료 구조 (정적 스코프)***
        
        ### ***동적 스코프  : 함수가 실행될때 위치에 스코프***
        
    - 예시
        
        ```jsx
        function greeting() {
          const hi = "hello";
          function sayhi() {
            console.log(hi);      -------> hi 의 대한 참조를 상위스코프(렉시컬 스코프)에서 참조 : 클로져
          }
          
          sayhi();                 
        }
        
        greeting();               // "hello" 출력   ---> 동적 스코프 : window
        ```
        
        ```jsx
        function sum(a) {
          return funtion finalSum(b) {
            return a + b;               // 여기서 클로저!!!
          }
        }
        
        const aFive = sum(5);   // funtion finalSum(b) { return 5 + b }
        const aTen = sum(10);    // funtion finalSum(b) { return 10 + b }
        
        console.log(aFive(7);     //  12 출력
        console.log(aTen(15);     //   25 출력   
        ```
        
    - 특징
        - 함수가 만들어지는 순간 클로져가 생기는데 각각의 독립적 스코프를 가진다.
        
        ```jsx
        function sayhi() {
          let sayCount = 0;
          
          function sayHiAndCountUp() {
            sayCount++;
            console.log(sayCount);
            console.log("hi");
          }
          
          return sayHiAndCountUp;
        }
        
        const hi = sayhi(); 
        const hihi = sayhi();
        
        hi();        // 불릴때 마다 sayCount 1씩 올라감
        hi();        // sayCount : 2
        hi();        // sayCount : 3
        
        hihi();      // 독립적으로 sayCount : 1 부터 시작
        hihi();      // 독립된 sayCount : 2
        ```
        
        - 모든 함수는 생성 될때 렉시컬 환경을 참조함
        
        ```jsx
        function sayhi() }{
          let greet = "hihi";
        	function showhi() {
        	  console.log("hi");
        	}
        	
        	return {
        	  change : function () {
        	    greet = "hello";
        	  },
        	  
        	  show : showhi()
        	}	
        	
        ```
        
        - 렉시컬 환경은 실시간으로 반영된다
        
        ```jsx
        function sayhi() {
          let sayCount = 0;
          
          function sayHiAndCountUp() {
            sayCount++;
            console.log(sayCount);
            console.log("hi");
          }
          
          return sayHiAndCountUp;
        }
        
        const hi = sayhi();               ------------> 이 과정 매우매우중요  질문🙋 : 무슨 과정이 있길래 값이 저장되나요??
        
        hi();      // sayCount : 1        ------------>sayhi 에 return 값만 저장하고 실행해서 let sayCount = 0 을 거치지 않는다
        hi();      // sayCount : 2
        hi();      // sayCount : 3
        
         sayhi()();      // sayCount : 1        ----------> sayhi()를 호출 할 때마다 let sayCount = 0 을 거쳐서 계속 0으로 된다
         sayhi()();      // sayCount : 1
         sayhi()();      // sayCount : 1
        ```
        
        - 스코프 범위를 3개 가진다 (지역 범위, 포함하고 있는 범위, 전역 범위)
        
        ```jsx
        const global = "가";
        
        function func1(a) {
          return function func2(b) {
                   return function func3(c) {
                            const local = "마";
                            
                            return global + a + b + c + local;
                          }
                  }
         }
         
        console.log(func1("나")("다")("라"));      // "가나다라마" 출력 
        
        const chain = func1("나");
        const chain2 = chain("다");
        const result = chain2("라");
        
        console.log(result);           // "가나다라마" 출력
        ```
        

# 재귀함수

---

- 펼치기
    
    ### ***재귀 : 자기 자신을 호출 한다***
    
    ## 재귀 함수 호출 하는 3가지 방법
    
    ### 1. 함수의 이름으로 호출
    
    - 간단하게 선언됐거나 할당된 함수나 변수 이름을 호출하면 된다
        
        ```jsx
        function sayHi(n) {
          n === 0 ? 
          console.log("end"):(      // 삼항연산자 주의 가운데와 맨뒤엔 **"표현식"**이 와야함    
          console.log("hi"),         // 두 식을 묶을 때는 ( 식 , 식 ) 형태로 묶어 주어야 한다.
          sayHi(n-1));
        } 
        ```
        
    
    ### 2. arguments.callee( ) ——> 잘 안쓴다고 함
    
    - 설명 :  arguments 객체의 프로퍼티로 현재 실행 중인 함수를 참조하는데 쓰임!!
    - 특징
        - 이름을 알 수 없는 익명함수나 함수 이름을 찾을 수 없는 경우 유용!
    - 예시
        
        ```jsx
        function sayHi(n) {
          n === 0 ? 
          console.log("end"):(       
          console.log("hi"),
          arguments.callee(n - 1));
        }
        ```
        
    
    ### 3. 함수를 참조하는 스코프 내 변수
    
    - 설명 : 함수를 어떤 변수에 담아 그 변수명으로 호출이 가능
        
        ```jsx
        const hi = function sayHi(n) {
        						  n === 0 ? 
        						  console.log("end"):(       
        						  console.log("hi"),
        						  hi(n - 1));
        };
        
        hi(5);
        ```
        
    
    ### 주의  : 함수를 어떤 변수에 할당할 때 반환값으로 재귀시켜주어야 원하는 값을 구할 수 있다. (함수 특성)
    
    ```jsx
    _.extend = function (obj, ...sources) {
      for (const key in sources[0]) {
        obj[key] = sources[0][key];
      }
    
      if (sources.length === 1) {
        return obj;
      } else {
        sources.shift();
        return _.extend(obj, ...sources);       // 여기서 return을 빼면 함수를 할당했을때 값이 없어지므로 undefined 를 받을 수 있다.
      }
    };
    ```
    

# 실행 컨텍스트

---

- 펼치기
    - 설명 : 실행할 코드에 제공할 환경 정보들을 모아놓은 **객체** (보통 함수를 실행 할 때 생성)
    - 종류 :  VariableEnvironment, LexicalEnvironment, ThisBinding(this 바인딩)
    
    ### 1. VariableEnvironment ??
    
    - 설명 : 현재 컨텍스트 내의 식별자들에 대한 정보 + 외부 환경 정보, 선언 시점의 LexicalEnvironment 의 스냅샷으로 변경되지 않음
    - 특징
        - 실행 컨텍스트를 생성 할 때  VariableEnvironment 에 정보를 담고 LexicalEnvironment를 만들고 나머지는 LexicalEnvironment 로 작업
        - **VariableEnvironment, LexicalEnvironment** 에 내부에는 **environmentRecord 와 outer-EnvirionReference** 가 있다
    
    ### 2. LexicalEnvironment ??
    
    - 설명 : 처음  VariableEnvironment 를 복사해와서 실시간으로 반영됨
    
    ### + environmentRecord ??
    
    - 설명 : 현재 컨텍스트와 관련된 코드의 식별자 정보들이 저장됨 (함수에 지정된 식별자, 선언한 함수가 있을 경우 함수자체, var 로 선언된 식별자…등)
    - 저장 과정 : 컨텍스트 내부 전체를 처음부터 끝까지 훑어가며 순서대로 수집 (이 과정에서 호이스팅 발생!!!!!)
    
    ### + outerEnvironmentReference ??
    
    - 현재 호출 된 함수가 선언 될 당시 LexicalEnvironment 를 말함
    
    ## 주의!!!! : 함수가 선언 되거나 어디에 할당 되면 아무런 일도 없음 호출 해야지만 함수 작동!!!!
    
    ## 스택(stack)이란? 큐(queue) 란?
    
    ![스크린샷 2024-04-28 오후 2.16.07.png](3%E1%84%8C%E1%85%AE%E1%84%8E%E1%85%A1%20%E1%84%80%E1%85%AA%E1%84%8C%E1%85%A6%20%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%85%E1%85%B5%204a7cad4a74ab49ea9e90a5fbdb7b93dc/%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA_2024-04-28_%25E1%2584%258B%25E1%2585%25A9%25E1%2584%2592%25E1%2585%25AE_2.16.07.png)
    
    ### 스택(stack) : 구덩이 같은 느낌으로 출구와 입구가 일치하는 구조 (**First In, Last Out (선입후출) 방식)**
    
    - 제어순서
        - 어떤 함수 A 를 호출해서 실행 하다 내부에 다른 함수 B 가 호출되면
        - 함수 A 실행은 멈추고 그 위에 함수 실행 B 를 쌓아서 실행 한다
        - 또 다른 함수 C 가 B에 있으면
        - 다시 B를 중지하고 그 위에 C 실행 스택을 쌓아 처리한다
        - C 처리가 끝나면 —> B 실행 스택 —→ A 실행 스택 순서로 끝낸다.
    
    ### 큐(queue) : 터널 같은 느낌으로 출구와 입구가 양끝에 있는 구조 (**First In, First Out (선입선출) 방식)**
    
    - 제어순서
        - 간단하게 먼져 들어온 A 실행 큐 먼져 다 끝날때 까지 기다리고
        - 다 끝나면 그다음 B 실행 큐를 실행한다
    
    ### 변수 은닉화
    
    - 설명 : 어떤 변수를 찾는데 있어서 LexicalEnvironment 에 이미 변수를 찾았을 경우 그 보다 상위 스코프인 전역 스코프에 동일한 변수가 있어도 접근하지 못하는경우 (중간에 찾을 경우 검색을 더 진행하지 않음)

# 고차함수 (업데이트 필요)

---

- 펼치기
    - 설명 : 함수를 인자로 받거나 함수를 반환하는 함수로 2가지 조건 중 하나라도 충족한다면 고차 함수라고 할 수 있습니다 (어느 조건에도 부합하지 않은 함수 === 일반함수or 일차함수 )
        
        ```jsx
        function returnBigger(A, B, sum) {
          const sumArrayA = sum(A);
          const sumArrayB = sum(B);
          
          if (sumArrayA === sumArrayB) {
            return "크기가 같습니다"
          }
          return sumArrayA < sumArrayB ? B : A;
        }
        
        function sumArray(array) {
          let sum = 0;
          for (const value of array) {
            sum += value;
          }
          
          return sum;
        }
        
        returnBigger([1, 2, 3], [1, 2, 3, 4 ,5], sumArray)   
        ```
        
    
    ### 일급 객체( 자바스크립트의 함수는 아래 조건을 모두 갖춤)
    
    - 조건
        1. 인자로 다른 함수에 전달할 수 있다.
            
            ```jsx
            [1, 2, 3 ,4 ,5 ,6 ,7].reduce((sum, value) => {
              return sum + value
             }),)
            ```
            
        2. 반환 값으로 사용될 수 있다.
            
            ```jsx
            function sayHi() {
              return function sayHiHi() {
                console.log("hihi");
              }
             }
             
             sayHi()();
            ```
            
        3. 변수에 할당될 수 있거나 자료구조(배열, 객체 등)에 저장될 수 있다.
            
            ```jsx
            function sayHi() {
              return "hihi";
            }
            const hi = sayHi;
            
            const hihi = {
            	sayHi : function () {
                return "hihi";
              }
            };
            
            const hihihi = [0, 1 ,2, function sayHi() {
              return "hihi";
            }];
            
            hi();
            hihi.sayHi();
            hihihi[3]();
            ```
            
        4. 무명의 리터럴로 생성할 수 있다. —> 함수 이름 없이 생성가능
            
            ```jsx
            const hi = function () {~~~~} 
            ```
            

# 엄격모드란? (업데이트 필요)

---

- 펼치기
    - 기능
        - 기존에 무시되던 에러들이 throwing 됩니다.
        - 최적화 작업을 어렵게 만드는 실수들을 바로잡습니다 ( 가끔 비-엄격 모드의 동일한 코드보다 더 빨리 작동 )
        - 실수를 오류로 바꿔 놓아서 (더 큰 문제가 발생하지 않도록 방지)
        - 실수로 글로벌 변수를 생성하는 것을 불가능하게 만듭니다.
        
        ```jsx
        mistypedVaraible = 17;  // let, const ,var 없이 선언하면 오류 발생
        ```
        
        - 
    - 사용 : "use strict"; 코드를 젤 위에 넣어주면 된다 ( 전체 스크립트 또는 부분 함수에서 사용가능)

# 생성자 함수(class, prototype 업데이트 필요)

---

- 펼치기
    - 객체를 만들어주는 함수를 일컫는다 (Object, 생성자 함수, Class를 사용 ..등)
    
    ## 여러가지 생성 방법
    
    ### 1. 객체 리터럴에 의한 생성방법
    
    - 설명 : 직접 { } 안에 속성을 넣어서 만드는 방식
        
        ```jsx
        const obj = {
          name: 'subo',
          age: 29
        }
        ```
        
    
    ### 2. Object 생성자 함수
    
    - 설명 : new 연산자와 함께 Object 를 사용해서 객체를 만든다
        
        ```jsx
        const obj = new Object();
        obj.name = "subo";
        obj.age = 29;
        ```
        
    - String, Number, Boolean, Function, Array, Date, RegExp 등도 new 연산자와 만나면 생성자 함수로 쓰일 수 있다.
        
        ```jsx
        const strObj = new String("subo");
        
        const numObj = new Number(29);
        
        const boolObj = new Boolean(true);
        
        const func = new Function("x", return x * x);
        
        const arr = new Array(1, 2, 3);
        
        const dateObj = new Date();
        
        const regExp = new RegExp(/ab+c/i);
        ```
        
    
    ### 3 생성자 함수
    
    - 객체 리터럴에 문제점인 동일한 여러 객체 만들때 직접 만들어 줘야 한다는 단점에서 생성자 함수가 나오게 되었다
    - 설명 : 객체를 만들어주는 함수르 new 와 같이 써서 반복되는 객체를 손쉽게 여럽개 만들 수 있다.
        
        ```jsx
        function Constructor (name, age){
          this.name = name;
          this.age = age;
        }
        
        const instance = new Constructor();
        ```
        
    - 특징
        - 모든 함수는 생성자 함수가 될 수 있다.
        - 속성을 지정하는 코드가 없어도 암묵적으로 this 객체가 생긴다
        
        ```jsx
        function hi() {
          console.log("hi");              // 암묵적으로 this { } 생성
        }
        ```
        
        - 암묵적으로 만들어진 this 객체는 new 와 만나 생성자로 쓰이면 만들어진다.
        
        ```jsx
        function hi() {
          console.log("hi");              // 암묵적으로 this { } 생성
        }
        
        const instance = new hi();      // instance = { } ; 생성
        ```
        
        - return 값으로 객체 리터럴 형식으로 반환하면 생성자 함수로 쓰였을때 암묵적 this 객체는 무시된다
        
        ```jsx
        function hi() {
          console.log("hi");                           // 암묵적으로 this { } 생성
          return { name: "vaco" }                      // 반환값으로 객체가 들어와서 암묵적 this는 무시되고 return 객체가 쓰인다.
        }
        
        const instance = new hi();                   // instance = { name: "vaco" }
        ```
        
        - return 값으로 객체가 아닌 다른 형태의 원시 값을 반환하면 생성자로 쓰였을때 다시 암묵적 this 가 사용된다.
        
        ```jsx
        unction hi() {
          console.log("hi");                            // 암묵적으로 this { } 생성
          return 19;                                     // 반환값으로 객체가 들어와서 암묵적 this는 무시되고 return 객체가 쓰인다.
        }
        
        const instance = new hi();                   // instance = { }
        ```
        
    
    ### 4 class 이용한 생성자 함수(추후 업데이트! 필요)
    
    - 설명 : 위에 생성자 함수에서 좀 더 정리 된 경우로써 class 함수를 사용해서 생성자 함수를 만드는 것을 말함
    - 부가설명 : class 생성자 함수 안에 프로퍼티들은 constructor() 함수안에 넣어주고 메서드들은 따로 빼준다
    - 형태
        
        ```jsx
        const Name = class classFuncName (extends parentFuncName) {
          constructor () {
            super(parentProperty)
          }
          
          method () {}
          
          get Name () {}
          
          set Name () {}
        }
        ```
        
        - extends 로 부모의 속성을 상속 받을 수 있다!(super() 도 같이 써야함)
    - 예시
        
        ```jsx
        class client {
          constructor (name, age) {
            this.name = name;
            this.age = age;
          }
        }
        
        class Vipclient extends client {
          constructor (name, age, address) {
            super(name, age);
            this.address = address;
          }
           
          getname () {
            return this.name;
          }
         }
        
        const ken = new Vipclient("ken", 20, "vaco");
        ken;
        ken.getname()
        ```
        
    
    ## 인스턴스 & 상속 & 프로토타입
    
    ---
    
    - 펼치기
        
        ### 인스턴스
        
        ![스크린샷 2024-04-28 오후 6.14.15.png](3%E1%84%8C%E1%85%AE%E1%84%8E%E1%85%A1%20%E1%84%80%E1%85%AA%E1%84%8C%E1%85%A6%20%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%85%E1%85%B5%204a7cad4a74ab49ea9e90a5fbdb7b93dc/%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA_2024-04-28_%25E1%2584%258B%25E1%2585%25A9%25E1%2584%2592%25E1%2585%25AE_6.14.15.png)
        
        - 의미 : 어떤 생성자함수로 부터 복제(참조)해서 만들어지는 객체 (new + 생성자함수)
            
            ```jsx
            function sayhi() {}
            
            new sayhi();   //  생성자 함수 sayhi의 인스턴스 객체가 만들어짐  sayhi {      __proto__([[prototype]]) {  }     } 형태
            ```
            
        - 상속 : class 기반 언어에서(자바스크립트는 대부분 prototype 언어) 존재하는 말로 부모객체에 프로퍼티를 자식객체에 주는것을 말함 ( class를 이용해 생성자 만들때 사용)  ——————> 명확하지 않아 질문필요🙋
        - 프로토타입 : 생성자 함수(부모) 안에 객체 형태로 저장되어 생성자(부모)의 메서드와 속성을 인스턴스(자식)에게 참조 시켜주기 위해 사용
            
            ```jsx
            const hihi = function hi() {};
            console.dir(hihi);                  // hi {   prototype { }    }  형태로 생성자가 될 함수에 객체 안에 생성된다.
            ```
            
        - __proto___ ( [[prototype]])
            - 설명 : 생성자 함수로 만들어진 인스턴스 객체 내부에 객체 형태로 저장되고 부모(생성자함수) prototype 에 접근(참조) 할 수 있다.
            
            ```jsx
            function Hi() {
              console.log("hi")
            }
            
            const hihi = new Hi();
            console.dir(hihi);                   // hihi = Hi {  __proto__{   }   }  형태로 만들어진 인스턴스 객체 안에 만들어진다
            ```
            
            - 특징
                - **__proto__는 생략이 가능하다**(매우 중요!!!)
                
                ```jsx
                function Hi () {}
                
                Hi.title = "생성자 함수";
                Hi.prototype.title = "프로토와 던더프로토";
                
                const instance = new Hi();
                
                instance.title;               //   "프로토와 던더프로토" 출력 ---> instance(.__proto__).title 에서 (.__proto__) 생략
                
                instance.title = "인스턴스";
                
                instance.title;                        //   "인스턴스" 출력 
                
                console.dir(instance);
                ```
                
                - 각각의 객체 안에 다 title이 다 따로따로 들어가서 접근할때 주의 해야함
        - constructor
            - 설명 : 모든 프로토타입 안에 있는 프로퍼티로 프로토타입을 가지고 있는 생성자 객체를 가리킨다. (주의 무조건 만든 생성자를 가리키는게 아닐수 있다 —> 임의로 바꿔줄 수도 있어서)
            
            ```jsx
            function Hi() {
              console.log('hi');
            }
            
            new Hi();     //     Hi.__proto__.constructor -----> 위에 생성자함수 객체를 가리킴 Hi {   prototype {  }   }
            Hi.prototype.constructor.prototype.constructor.prototype.constructor.prototype.constructor. ...무한 가능 ~~!
            ```
            
            ### 프로토타입 체인
            
            - 설명 : 어떠한 메서드에 접근 하는데 있어서 찾아가는 과정을 말함
            
            ![스크린샷 2024-04-28 오후 7.30.46.png](3%E1%84%8C%E1%85%AE%E1%84%8E%E1%85%A1%20%E1%84%80%E1%85%AA%E1%84%8C%E1%85%A6%20%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%85%E1%85%B5%204a7cad4a74ab49ea9e90a5fbdb7b93dc/%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA_2024-04-28_%25E1%2584%258B%25E1%2585%25A9%25E1%2584%2592%25E1%2585%25AE_7.30.46.png)
            

# pseudocode

- 펼치기
    
    ## _.each (.forEach)
    
    ---
    
    - 역할 : 첫 번째 parameter 로 어떠한 배열을 받으면 두 번째 parameter 인 콜백함수를 적용시켜 주어야한다.
    - pseudocode
        1. .each의 첫 번째 prameter 인 배열의 각각의 요소를 가져와야 하므로 for 반복문 사용 한다.
        2. iterator 에 매개변수가 3개를 받으므로 각각의 매개변수가 무엇을 받는지 파악해서 적어준다
        3.  iterator의 첫 번째 parameter 는 배열의 요소를 받아야 하므로 array[i] 를 써준다.
        4. iterator의 두 번째 parameter 는 인덱스를 받아야 하므로 그냥 i 를 써주고
        5. iterator의 세 번째 parameter는  전체 배열을 받아야하므로 .each의 첫 번째 prameter 인  array를 적어준다
    
    ## _.slice
    
    ---
    
    - 역할 : 2개의 인자를 받아 첫 번째 인자는 시작 인덱스를 나타내고 두번째 인자는 끝나기 직전의 인덱스를 정해준다.
    - pseudocode
        1. 3개의 parameter 가 정해져 있으므로 기능만 구현해주면 된다.
        2. 첫 번째로 새로운 배열을 반환 해야하므로 빈 배열을 만들어서 선언 해줍니다.
        3. 받는 인자가 음수일 경우 해당하는 인덱스 위치로 바꿔주는 작업을 해줍니다.(삼항 연산자 사용해서 음수일 경우만 재할당)
        4. 음수일 경우 전체의 배열에서 뒤에서 부터 와야하므로 전체 길이에 서 더해주면 해당 위치가 된다
        5. 양수일 경우는 그냥 그대로
        6.  for 반복문으로 slice 의 두 번째 parameter 인 시작 인덱스부터 끝을 나타내는   slice 의 세 번째 parameter 인 종료 인덱스 까지
        7. .push 메서드로 아까 만들어준 빈 배열에 넣어주면 된다.
        8. 만든 배열 반환
    
    ## _.map
    
    ---
    
    - 역할 :  배열의 각각의 요소를 받아  parameter 로 오는 콜백함수를 적용 시켜서 새로운 배열을 반환해준다.
    - 이름 의미
        - 사상(mapping or morphisn)의 풀이는 대상의 현상이나 모양을 베끼고 본뜨고 모사하는 개념이 바로 사상이고 원본의 고유한 특징을 잃지 않는다는게 있다.
    - pseudocode
        1. 새로운 배열이 필요하므로 빈 새 배열을 선언해 줍니다.
        2. iterator 에 매개변수가 3개를 받으므로 각각의 매개변수가 무엇을 받는지 파악해서 적어준다
        3.  iterator의 첫 번째 parameter 는 배열의 요소를 받아야 하므로 array[i] 를 써준다.
        4. iterator의 두 번째 parameter 는 인덱스를 받아야 하므로 그냥 i 를 써주고
        5. iterator의 세 번째 parameter는  전체 배열을 받아야하므로 .each의 첫 번째 prameter 인  array를 적어준다
        6. iterator 의 반환값을 push 메서드로 아까 만든 빈 배열에 넣어줍니다
        7. 만든 배열 반환
    
    ### vs 객체에서 Map ???
    
    ---
    
    - 펼치기
        - 기본 의미 : 객체의 일종으로 “키 - 값” 과 넣어준 “키”의 순서도 기억한다( 모든 값은 키 또는 값으로 사용할 수 있다.—>객체는 문자열과 심볼만 가능);
        
        ```jsx
        let map = new Map();
        
        map.set("key","value");
        map.set("key2","value2");
        map.set("key3","value3");
        
        map.get("key2"); // "value2" 출력
        ```
        
        - 특징
            - 순서는 set(”key”, ”value”) 으로 넣어준 순서로 기억을 한다.
            - 키 동일성 :   SameValueZero  을 기반함 ( 0 과 -0 다르고 NaN === NaN 같다고 판별)
                
                ```jsx
                const myMap = new Map();
                myMap.set(NaN, "not a number");
                
                myMap.get(NaN);      // "not a number" 출력
                
                const otherNaN = Number("foo");     // NaN 할당 
                myMap.get(otherNaN);         // "not a number" 출력
                ```
                
                - myMap 에 미리 NaN 요소를 저장 하고 나중에 다른 곳에서 발생한 NaN 을 통해 myMap 에 접근해도 키 동일성 즉 SameValueZero에 의해 구별을 하지 못해서 같은 결과 값이 나온다.
            
            - 속성 설정할 때는 일반적인 객체에서 처럼 적용하면 작동하지 않음 → set (”key”, “value” ) 를 이용해서 추가
            
            ```jsx
            const wrongMap = new Map();
            wrongMap["bla"] = "blaa";
            wrongMap["bla2"] = "blaaa2";
            
            console.log(wrongMap); // Map { bla: 'blaa', bla2: 'blaaa2' } 객체 처럼 들어감
            ```
            
            - Map 관련 메서드
            
            | .clear ( ) | Map 의 모든 키-값을 제거 |
            | --- | --- |
            | .delete ( ) | 값이 있어서 삭제 되면 삭제 + 반환값 : true
            값이 없어서 삭제 못하면 반환값 : false |
            | .get( ) | 해당 키의 값을 얻을 수 있음 |
            | .set( ) | Map 에서 “키-값” 을 추가할 때 사용 |
            | .key( )  | 반복문에서 입력한 순서에 따라 요소의 key 를 반환 해줌 |
            | .value( ) | 반복문에서 입력한 순서에 따라 요소의 value 값을 반환 해줌 |
            | .entries( ) | 반복문에서 입력한 순서에 따라 요소의 key 와 value 값을 배열 형태로 반환해줌 |
            | .forEach( ) | 일반적인 forEach( ) 로 앞에 배열에 요소를 인수로 받는 함수 표현식 매개변수로 받아 각각 함수의 명령을 실행시켜줌 |
            - 반복문 관련 간단 예시
            
            ```jsx
            const map = new Map();
            
            for (const [key, value] of map){
              console.log(key);         // key 따로
              console.log(value);       // value 따로 사용가능
            }
            ```
            
            ### Map vs 객체 !
            
            |  | Map | Object |
            | --- | --- | --- |
            | 우발적 키 | 기본 적인 키값을 가지지 않는다 (set 으로 넣어줘야 함) | 프로토타입 있어서 주의 하지 않으면 충돌 |
            | 보안 | 사용자가 제공 하는 키 와 값에 대해 안전하게 사용가능 | 공격자가 객체의 프로토타입을 재정의하여 객체 주입공격을 받을 수 있다. |
            | 키 유형 | 모든 (함수 객체, 원시값) 것이 키가 될 수 있다. | 문자열, “Symbol” 형태만 올수 있다,  |
            | 키 순서  | 간단히 넣어준 순서로 의해 결정 된다.  | 일반적인 객체에서 키는 정렬 되어 있지만 항상 그런것은 아니며 순서가 복잡해 질 수 있다. |
            | 크기 | Map 전용 메서드  .size 로 쉽게 파악할 수 있다. | 직접 세야 한다. |
            | 성능 | 키-값의 빈번한 추가 및 제거와 관련된 상황에서는 더 자유로움 | 키-값 추가 및 제거의 대해 최적화 돼 있지 않다 |
            | Serialization and parsing | 직렬화 또는 구문 분석에 대한 기본 지원이 없다( JSON 의 인자로 replace를 사용하면 Map 에 대해 자신만의 직렬화나 구문분석을 지원하게 만들 수 있다.) | JSON.stringify()를 사용하여 Object을 JSON으로 직렬화를 기본 지원이 있다.
            JSON.parse() 를 사용하여 JSON 에서 다시 Object 로 기본 지원!  |
    
    ## _.reduce
    
    ---
    
    - 역할 : 배열의 각 요소에 대해 주어진 콜백함수를 실행하고, 하나의 결과값을 반환합니다. ([링크](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce))
    - 이름 의미
        
        ![스크린샷 2024-04-23 오후 10.12.12.png](3%E1%84%8C%E1%85%AE%E1%84%8E%E1%85%A1%20%E1%84%80%E1%85%AA%E1%84%8C%E1%85%A6%20%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%85%E1%85%B5%204a7cad4a74ab49ea9e90a5fbdb7b93dc/%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA_2024-04-23_%25E1%2584%258B%25E1%2585%25A9%25E1%2584%2592%25E1%2585%25AE_10.12.12.png)
        
    
    - pseudocode
        1. reduce 메서드에 대해 파악해야 한다( 4개의 매개변수를 갖는다 : **accumulator(전 반환값), currentValue(요소값), currentIndex(인덱스번호), array(전체 배열))**
        2. 초기값이 undefined 면 콜백 함수의 세 번째 parameter 인 accumulator(iterator 의  accumulator에 초기값을 결정함)가  array[0] 값이 되고 i = 1(currentIndex**)** 로 시작해야 하므로 삼항 연산자를 이용해 처리한다.
        3. iterator 에 1번째 매개변수는 accumulator 로 전 accumulator값을 나타내야 하므로 accumulator에 다시 재할당으로 담아서 재귀함수를 이용해서 처리한다.
        4. iterator 에 2번째 매개변수인 currentValue 는 reduce 메서드에서 array 의 요소 이므로 array[i] 로 처리 한다.
        5. reduce 에서도 array 각요소를 탐색하므로 for 반복문을 주어 탐색하고.
        6. 최종 반환값은 마지막 accumulator를 반환해주면 된다.
    
    ## _.flat
    
    ---
    
    - 역할 : 평탄화 (배열 양끝 대괄호 제거)를 해주는 역할을 한다
    - 기능 : 1개의 인자를 받는데 몇번을 평탄화 해줄건지에 대해 정해준다 (기본값 = 1)
    - pseudocode
        1. 새로 반환할 빈 배열이 필요하므로 빈 배열 하나를 선언해 준다
        2. 각각의 요소의 타입을 typeof 로 조사해서 배열이 있는지 확인해 준다
        3. 확인 결과 배열이면 평탄화를 해주어야 하기 때문에 spread operator 로 평탄화(양 끝 대괄호 제거) 를 시켜준다
        4. 이제 나온 각각의 요소들을 아까 만든 빈 배열에 보내준다 (.push)
        5. 그렇게 만들어진 배열을의 각 요소의 타입을 다시 조사해 배열이 존재하면 재귀함수의 인자로 결과로 받은 배열을 다시 넣어 작업을 이어가게 해준다.
        
         6. 배열이 없으면 만들어진 배열을 반환
        
    
    ## _.assign(_.extend)
    
    ---
    
    - 역할 :  첫 번째 객체에 객체 들을 합쳐준다. ( 첫 번째 객체를 반환)
    - 기능 :  첫 번째 객체에 다른 객체를 합쳐주는데 중복된 키가 있으면 덧씌워진다. (재할당)
    - psesudocode
        1. 첫 번째 인자를 기준으로 나머지 인자를 합해줘야 되므로
        2. 두 번째 인자에 키 값을 조사하고
        3. 일치하면 첫 번째 인자의 해당 키(일치하는 키) 값에 재할당해주고
        4. 일치하지 않으면 첫 번째 인자에 새로운 속성으로 추가시켜준다.
        5. 나머지 인자가 있을경우 재귀함수로 돌려준다
        6. 나머지 인자가 없을 경우 a 를 반환해준다. [나머지 인자 여부는 rest parameter 길이가 1이면 끝!
    
    ## _defaults
    
    ---
    
    - 역할 :  첫 번째 객체에 객체 들을 합쳐준다. ( 첫 번째 객체를 반환)
    - 기능 :  첫 번째 객체에 다른 객체를 합쳐주는데 _.extend 와는 달리 겹치는 속성은 무시 된다.
    - psesudocode
        1. 첫 번째 인자를 기준으로 나머지 인자를 합해줘야 되므로
        2. 두 번째 인자에 키 값을 조사하고
        3. 일치하면  덧씌우는 대신 그냥 버려주고
        4. 일치하지 않으면 첫 번째 인자에 새로운 속성으로 추가시켜준다.
        5. 나머지 인자가 있을경우 재귀함수로 돌려준다
        6. 나머지 인자가 없을 경우 a 를 반환해준다. [나머지 인자 여부는 rest parameter 길이가 1이면 끝!
    
    ## **_.create**
    
    ---
    
    - 기능 : 두 개의 인자를 받아서 첫번째 인자(prototype)를 가진 새로운 객체를 만들어준다. 그리고 두 번째 인자는 ***“문자열”: 값***  을 만들어준 객체에 넣어준다.
    - psesudocode
        - 새로운 객체를 만들어야 하는데 들어온 첫번째 인자의 prototype 을 가진 객체를 만들어 줘야 하므로 생성자에 접근해야 할 필요가 있어서 constructor 로 접근해주었다 (new 로 객체생성)
    
    ## _.forOwn(객체, 콜백함수(값, 키,객체))
    
    ---
    
    - 기능 : 두 개의 인자를 받는데 첫 번째 parameter 로 받는 객체를 두 번째 parameter 에 콜백함수로 각각 값, 키 , 객체 를 받게 해준다.(보이는 속성에 대해서만 접근 가능 __proto__ 접근 x)
    - psesudocode
        - 첫 번째 인자로 받은 객체에 각각의 value , key 에 접근해야 하므로 for in 반복문으로 돌려줍니다.
        - 두 번째 인자인 콜백함수 parameter 에 각각 넣어줘서 연결시켜줍니다.
        - __proto__ 에는 접근이 안되게 해야 하므로 null 을 할당해서 아예 없애줍니다
    
    ## **_.throttle**
    
    ---
    
    - 기능 : 두개의 인자를 받는데 첫 번째 인자는 콜백함수를. 두 번째 인자는 시간을 받아서 _.throttle를 실행하면 콜백함수가 최초 한번 실행되고 주어진(두번째 인자) 동안 실행 되지 않게 막아줍니다
    - psesudocode
        - 시간동안 막아야 한다 ——> 시간을 조건으로 사용해야 한다
        - 그래서 처음 시간 wait를 count 에 담고 setInterval 로  비동기 실행
        - count 를 하나씩 낮춰주는 구문을 넣고(setInterval)
        - 콜백함수가 불려올때 결과가 2개로 나뉘어야 하므로 고차함수 개념을 이용해서 return 문 안에 함수를 넣어준다
        - 그 넣어준 함수에 조건식으로 return 을 나누어 준다. (조건식은 ——> 처음 되야하고 중간은 안되야 하고 시간이 다지나면 되야 하므로 : count > 0 && count !== wait 로 구현)
    
    ## _.iteratee([func=_.identity])
    
    ---
    
    - 역할 : 콜백 함수를 만들어주는 역할을 한다. ([func=_.identity] 은 콜백으로 변화 할 값을 받는데 보통 함수가 오는데  property name 이 오면 property value 를 반환하고  배열이나 객체가 오면 true or false 를 반환한다.

> 시간과 경험, 그리고 꾸준한 노력
지금 보여드린 코드 개선작업과 같은 부분은 단시간에 이루어질 수 없고, 긴 시간과 경험이 필요한 부분입니다. 코드의 논리를 살펴보고 많은 시도들을 하며 경험을 쌓아보세요. 많은 시간이 필요하겠지만, 급하게 생각하지 말고 꾸준한 노력을 기울여보세요.                                                                                                           
                                                                                                                                                                                                                                     출처 : 바코
>