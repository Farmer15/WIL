# 2주차 과제 정리

# DOM (The Document Object Model)

---

- 정의 :  DOM 은 문서를 구조화 시켜서 사용자가 이 DOM 구조에 접근하여 여러가지 작업(javascript)을 가능 하게 해준다.

즉 : HTML 문서의 interface 로 웹페이지를 스크립트(javascript)나 프로그래밍 언어에서 사용할 수있게 해주는 역할을 한다 

- 꼭 javascipt 아니여도 다른 언어에서도 사용 된다

### DOM Tree

- 트리구조로 이루어지는데 다음 이미지를 보시면

![DOM tree.png](2%E1%84%8C%E1%85%AE%E1%84%8E%E1%85%A1%20%E1%84%80%E1%85%AA%E1%84%8C%E1%85%A6%20%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%85%E1%85%B5%203ed3d389780b47009bb0f09522150ddb/DOM_tree.png)

- DOM 트리는 계층 구조를 가지며 부모 노드  ,자식 노드 ,형제 노드 로 이루어져 있다.
- 각각의 독립적인 부분을 ‘노드’ 라 부르고
- 바로 상하 관계는 ‘부모 노드’, ‘자식 노드’ 라 불리며
- 좌우 관계는 ‘형제 노드’라 불린다
- 최상의 노드로 document 를 가진다

### API 란 ?

- API는 Application Programming Interface 로써 소프트웨어 프로그램 안에 존재하는 기능과 규칙의 집합
- 즉 : 웹 개발에서  API 는 앱* 을 통해 사용자의 웹페이지에서 상호작용 할 수 있게 해주는 기능들(메서드, 이벤트, property(CSS)… 등)과 또 다른 소프트웨어 , 하드웨어, 웹사이트, 서비스 등도 포함해서 전부를 일컫는다.
    - 앱* : 애플리케이션 ( application ) 의 줄임말로 웹 , 모바일 등에 설치되어 사용 되는 응용 소프트웨어를 뜻함

## 이벤트 캡쳐링, 이벤트 버블링

---

### 이벤트 캡쳐링 : 어떠한 이벤트가 발생하면 최상위 부모 노드 (Window)로 부터 이벤트가 발생한 target 까지 찾아가는 과정이다.

### 이벤트 버블링 : 어떠한 이벤트가 발생하면 이벤트 캡쳐링, 타겟팅 후 다시 최상위 부모 노드(Window)로 전파 되는 과정이다

- 즉: 같은 타입에 이벤트 타입이 부모 노드에 등록 되어 있으면 (addEventListener 로 등록한 이벤트) 그 이벤트도 발생시키다

![QKuDBRd.png](2%E1%84%8C%E1%85%AE%E1%84%8E%E1%85%A1%20%E1%84%80%E1%85%AA%E1%84%8C%E1%85%A6%20%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%85%E1%85%B5%203ed3d389780b47009bb0f09522150ddb/QKuDBRd.png)

- 보통 이 버블링을 응용 해서 **이벤트 위임**을 할 수 있게 해준다

```html
<!DOCTYPE html>
<html>
	<body>
		<ul id="food">
			<li class="pizza">pizza</li>
			<li class="hamberger">hamberger</li>
			<li class="chicken">chicken</li>
		</ul>
		<div class="chicken">chicken</div>
	<script>
		const $foods = document.getElementById('food');
		function hi(){
		console.log('hi');
		}
		#food.addEventListoner('click',hi);   // 설명*
		</script>
	</body>
</html>
```

- 설명* :  상위 <ul> 태그에 이벤트를 등록 해서 하위 <li> 에 이벤트가 발생하면 이벤트가 발생해주게 하는데(버블링) 조건이나 발생 위치를 잘 파악해야한다

### event.stopPropagation : 모든 이벤트 전파(캡쳐링/버블링)를 임의로 막을 수 있다.

```html
<html>
	<body>
	 <div id="foodBox">
			<ul id="food">
				<li class="pizza">pizza</li>                      // <li> 태그에서 이벤트 발생 시킴 
				<li class="hamberger">hamberger</li>
				<li class="chicken">chicken</li>
			</ul>
		</div>
		<div class="chicken">chicken</div>
	
	<script>
		const $foods = document.getElementById('food');
		const $pizza = document.quarySelector('.pizza');
		
		function hi(){
		console.log('hi');
		evnet.stopPropagation();
		}
		
		function hello(){
		console.log('hello');
		}
		
		$food.addEventListioner('click',hi); 
		$pizza.addEventListioner('click',hello); // 설명*
		</script>
	</body>
</html>
```

- <li> 에서 이벤트를 발생시키면 캡쳐링 과정을 거쳐 버블링 과정이 일어나는데 중간 $food 핸들러 보면 evnet.stopPropagation() 있어서 캡쳐링 과정에 이벤트가 막혀서 더이상 이벤트는 발생하지 않음

# 이벤트 위임

- 의미 : 여러개의 하위 태그를 가진 부모 태그에 하나의 이벤트를 등록해서 하위 태그에도 이벤트가 적용 되게 해주는 방식 (이벤트 버블링을 이용)

```jsx
<html>
	<body>
	 <div id="foodBox">
			<ul id="food">
				<li class="pizza">pizza</li>                      // <li> 태그에서 이벤트 발생 시킴 
				<li class="hamberger">hamburger</li>
				<li class="chicken">chicken</li>
				<li>noodle</li>
				<li>sandwitch</li>
				<li>rice</li>
				<li>...</li>
			</ul>
		</div>
	<script>
		const $foods = document.getElementById('food');
		
		function sayHi(){
		  console.log('hi');
		}
		
		$foods.addEventListoner('click', sayHi);
		</script>
	</body>
</html>
```

- 설명
    - 위 예시에서 <ㅣi> 를 클릭 할때 마다 이벤트를 발생시키고 싶은데 각각 등록하면 너무 많은 코드를 작성해야하고 또 나중에 추가 되는 <ㅣi> 의 경우 이벤트가 작동을 안할 수 가 있다 그래서 **이벤트 위임**을 이용해 상위 태그 <ul> 에 하위 태그에서 일어나길 워하는 이벤트타입을 핸들러와 함께 등록 이벤트 버블링에 의해 하위에서 이벤트를 발생 시키고 부모 태그에서 핸들러를 작동하는 것이다
- 특정 위치에서만 작동시키고 싶은 경우 : **event.target vs event.currentTarget** 을 if 조건문과 같이 사용!

## **event.target vs event.currentTarget**

- 개념
    - **event.target :** 이벤트가 발생한 위치를 나타냄  (위에 이벤트 위임때 예시에선 하위 <li> )
    - **event.currentTarget** : 이벤트핸들러가 있어 이벤트 기능이 동작하는 위치 ( 위에 이벤트 위임 예시 에선 <ul> )
    
    ```jsx
    <html>
    	<body>
    	 <div id="foodBox">
    			<ul id="food">
    				<li class="pizza">pizza</li>                     
    				<li class="hamberger">hamburger</li>
    				<li class="chicken">chicken</li>
    				<li>noodle</li>
    				<li>sandwitch</li>
    				<li>rice</li>
    				<li>...</li>
    			</ul>
    		</div>
    	<script>
    		const $foods = document.getElementById('food');
    		
    		function sayHi(event){
    		  if (event.target.textContent === "noodle"){             // 이벤트 발생에 조건을 걸어줌 
    		    console.log('hi');
    		  }
    		}
    		
    		$foods.addEventListoner('click', sayHi);
    		</script>
    	</body>
    </html>
    ```
    
    - 위 예시는 이벤트 위임 예시처럼 상위에 이벤트를 위임 시켜 하위 태그 모두에 이벤트를 발생하게 해주었고 event.target 을 이용하여 특정 태그에만 이벤트가 발생 하도록 해주었다

# 여러가지 방식의 접근 API

**각각의 메서드들은 documnet.prototype 의 프로퍼티이므로 사용 할 때 꼭 document 를 통해 호출 해햐 한다(Element의 프로퍼티로 사용되는 경우 제외)**

### 1. id 를 통한 요소 접근

- **접근 방식 : document.getElementById**
- 설명 : 인수로 전달한 id 어트리뷰트 값을 갖는 하나의 요소 노드를 탐색하여 반환한다 (잘못 써서 공통된 id를 여러개 썻을 경우 첫 번쨰 요소만 반환)
- 특징
    - 만약 존재 하지 않을 경우 ‘null’ 값이 반환 된다
    - HTML 에서 id 어트리뷰트(id 를 설정하면)를 부여하면 자동으로 id 값과 동일한 이름의 전역 변수가 암묵적으로 선언(js.script에)되고 해당 노드 객체가 할당되는 부수 효과가 있다.
        
        ```jsx
        	<!DOCTYPE html>
        <html>
        	<body>
        		<div id="foo"></div>
        	<script>
        		console.log(foo);   // <div id="foo"></div> 출력
        	</script>
        	</body>
        </html>
        ```
        
    - id 값과 동일한 이름의 전역 변수가 이미 선언되어 있으면 이 전역 변수에 노드 객체가 재할당 되지 않습니다.
        
        ```jsx
         <!DOCTYPE html>
        <html>
        	<body>
        		<div id="foo"></div>
        	<script>
        		let foo = 1;        // 이미 let 으로 'foo' 변수를 전역변수로 선언했으므로
        		console.log(foo);   // 1 출력된다 (노드에 접근 못함)
        	</script>
        	</body>
        </html>
        ```
        

### 2. 태그 이름을 이용한 요소 접근

- **접근 방식 :** **document(Element).prototype.getElementsByTagName**
- 설명 : Elements 에서 알 수 있듯이 **getElementsByTagName 메서드는 여러 개의 요소 노드 객체를 갖는 HRMLCollection(DOM 컬렉션 객체) 객체를 반환**
- **특징**
    - **getElementsByTagName 는 태그들을 이터러블 하면서 유사 배열 형태로 가져온다.**
        
        ```jsx
        <!DOCTYPE html>
        <html>
        	<body>
        		<div id="foo"></div>
        		<p></p>
        		<a></a>
        	<script>
        		const tags = document.getElementsByTagName('*'); // 모든 요소 가져올때 '*'사용
        		console.log (tage);  // [<html>,<body>,<div id='foo'>,<p>...]
        	</script>
        	</body>
        </html>
        ```
        
    - **getlementsByTagName 메서드는 2가지 방법으로 불러올 수 있다**
    - Document.prototype.getElementsByTagName  vs Element.prototypegetElementsByTagName

```html
<!DOCTYPE html>
<html>
	<body>
		<ul id="food">
			<li>pizza</li>
			<li>hamberger</li>
			<li>chicken</li>
		</ul>
		<ul>
		  <li>vaco</li>
		</ul>
	<script>
		const allLi = document.getElementsByTagName('li');  // 모든 <li>들 전부 접근해서 배열로 가져옴 [<li>,<li>,<li>,<li>]
		const $foods = document.getElementById('food');
		const foodLi = $foods.getElementsByTagName('li'); // 특정 요소안에서 <li> 에 접근하기 [<li>,<li>,<li>]
		</script>
	</body>
</html>
```

### 3. class를 통한 요소 노드 접근

- **접근 방식 : Document(Element).prototype.getElementsByClassName**
- 설명 : 여기서도 Elements 를 보시면 복수형태 이므로 해당 class 어트리뷰트 값(class 값)를 갖는 모든 요소를 배열 형태로 반환해 준다.
- 특징
    - 위에 **g**etlementsByTagName 처럼 2가지 형태를 가진다
    
           Document.prototype.getElementsByClassName  vs Element.prototypegetElementsByClassName
    
    ```html
    <!DOCTYPE html>
    <html>
    	<body>
    		<ul id="food">
    			<li class="pizza">pizza</li>
    			<li class="hamberger">hamberger</li>
    			<li class="chicken">chicken</li>
    		</ul>
    		<div class="chicken">chicken</div>
    	<script>
    		const allLi = document.getElementsByClassName('chicken');  // .chicken 을 갖는 모든 요소 접근해서 배열로 가져옴 [li.chicken, div.chicken]
    		const $foods = document.getElementById('food');
    		const foodLi = $foods.getElementsByClassName('li'); // 특정 요소안에서 .chicken 을 갖는 모든 요소를 가져옴 [li.chicken]
    		</script>
    	</body>
    </html>
    ```
    

### 4. CSS 선택자를 이용한 요소 노드 접근

- **접근 방식 :  Document(Element).prototype.querySelector**
- 설명 : 해당 css 선택자를 갖는 하나의 요소를 가져온다
- 특징
    - 인수로 전달한 css 선택자가 여러개 인 경우 첫 번쨰 요소 노드만 반환한다.
    - 인수로 전달한 css 선택자가 없는 경우 “null” 을 반환한다.
    - 인수로 전달한 css 선택자가 문법에 맞지 않을 때 ‘DOMException’ 에러가 발생한다.
        
        ```html
         <!DOCTYPE html>
        <html>
        	<body>
        		<ul id="food">
        			<li class="pizza">pizza</li>
        			<li class="hamberger">hamberger</li>
        			<li class="chicken">chicken</li>
        		</ul>
        		<div class="chicken">chicken</div>
        	<script>
        		const $pizza = document**.q**uerySelector('.pizza')  // .pizza 선택자를 가지는 요소를 하나 가져온다
        		</script>
        	</body>
        </html>
        ```
        

- **vs** **Document(Element).prototype.querySelectorAll**
    - 설명 : **querySelectorAll 은 querySelector 와는 달리 해당 css 선택자를 만족하는 모든 요소들을 NodeList 객체(유사배열, 이터러블)로 가져온다**
    - 특징
        - 인수로 전달된 css 선택자를 만족하는 요소가 없을 경우 빈 NodeList 객체를 반환한다.
        - 인수로 전달된 css 선택자가 문법에 맞지 않는 경우 DOMException 에러가 발생한다.
        
        ```html
         <!DOCTYPE html>
        <html>
        	<body>
        		<ul id="food">
        			<li class="pizza">pizza</li>
        			<li class="hamberger">hamberger</li>
        			<li class="chicken">chicken</li>
        		</ul>
        		<div class="chicken">chicken</div>
        	<script>
        		const $foods= document**.q**uerySelectorAll('ul > li')  // <ul>태그 자식태그들중 모든 <li> 태그 요소들을 파싱해서 배열로 가져온다.
        		console.log($foods);                                // [li.pizza, li.hamberger. li.chicken] 출력
        		</script>
        	</body>
        </html>
        ```
        

### 5. 다른 노드를 통한 접근

- 접근 방식 : 특정 노드에서 원하는 노드로 프로퍼티를 사용하여 접근하는 방식!!
- 프로퍼티 (택스트 노드를 포함)
    
    
    | parentNode | 부모노드 반환 |
    | --- | --- |
    | childNodes | 자식 노드들 반환 |
    | firstChild | 첫번쨰 자식 반환 |
    | lastChild | 마지막 자식 반환 |
    | nextSibling | 다음 형제 노드 반환 |
    | previousSibling | 이전 형제 노드 반환 |
- 프로퍼티 (요소 노드만)
    
    
    | parentElement | 부모 요소 노드 반환 |
    | --- | --- |
    | children | 자식 요소 노드들 반환 |
    | firstElementChild | 첫번쨰  자식 요소 반환 |
    | lastElementChild | 마지막 자식 요소 반환 |
    | nextElementSibling | 다음 형제 요소 노드 반환 |
    | previousElementSibling | 이전 형제 요소 노드 반환 |

```jsx
 <!DOCTYPE html>
<html>
	<body>
	  <div>rice</div>
		<ul id="food">
			<li class="pizza">pizza</li>
			<li class="hamberger">hamberger</li>
			<li class="chicken">chicken</li>
		</ul>
		<div>noodle</div>
	<script>
		const $foods= document**.q**uerySelect("#food");
		$foods.parentElement             // <body> 부모 요소노드 접근
		$foods.children                  // [<ㅣi>, <li>, <li>] 자식 요소 노드들 반환 
		$foods.firstElementChild         // <ㅣi>pizza</li> 노드 접근   
		$foods.lastElementChild          // <ㅣi>chicken</li> 요소 노드 접근
		$foods.nextElementSibling        //  <div>noodle</div> 요소 노드 접근
		**$foods.**previousElementSibling    //  <div>rice</div> 요소 노드 접근
	</body>
</html>
```

## +유사 배열

---

- 의미 : 배열과 유사한 형태를 가지지만 배열 메소드를 사용할 수 없는 배열을 말한다.
- 특징
    - 배열 처럼 인덱스로 접근이 가능하다
    - length 속성은 사용가능하다
    - **배열 메소드를 사용 할 수 없다**
- 배열로 변환 방식 3가지 (1주차에 정리되어 있음)
    1. Array.from (권장)
    
    ```jsx
    const headings = document.querySelectorAll(".heading");
    const realArray =Array.from(headings);             
    realArray.push("anything");                        // 배열의 메소드 사용 가능
    ```
    

1. …spread Operator

```jsx
const headings = document.querySelectorAll(".heading");
const realArray = [...headings]            // spread 했다가 다시 [ ] 로 묶어줌
realArray.push("anything");               // 배열 메소드 사용 가능 
```

1. Array.prototype (권장하지 않는다 함)

## 이벤트 핸들러 등록하는 여러 API

### 이벤트 핸들러란? 이벤트가 발생했을 때 호출될 함수가 이벤트 핸들러라고 한다.

### 1. 이벤트 핸들러 어트리뷰트 방식

- 방식 : HTML 요소에 어트리뷰트중 이벤트에 대응하는 이벤트 핸들러 어트리뷰트가 있고 형태는 ‘접두사 + 이벤트 타입’ 으로 이루어져 있어서 값으로 핸들러를 호출 하면 등록 할 수있다.

```html
<!DOCTYPE html>
<html>
<body>
	<button onclick="hi('vaco')">버튼</button>
	<script>
		fuction hi(name){
		  console.log(name);
		}
	</script>
</body>
</html>
```

- 이 어트리뷰트 방식은 오래된 코드여서 알아만 두고 넘어가도 좋을 것 같다.

### 2. 이벤트 핸들러에 프로퍼티 방식

window 객체와 Document, HTMLElement 타입의 DOM 노드 객체는 이벤트를 처리 할 수 있는 이벤트 핸들러 프로퍼티를 가지고 있다.

- 적용 방식 :  이벤트 타깃.이벤트타입에 따른 메서드 = 이벤트 핸들러 형식으로 등록 하면 된다.

```html
<!DOCTYPE html>
<html>
<body>
	<button id="btn">버튼</button>
	<script>
		const $button = document.querySelector('#btn');
		$button.onclick = function (){
		console.log('hi');
		};
	</script>
</body>
</html>
```

- 단점이 하나의 이벤트 프로퍼티에 하나의 핸들러만 넣어 줄 수 있다 ( 재선언 돼서 덮어써지기 떄문)

```html
<!DOCTYPE html>
<html>
<body>
	<button id="btn">버튼</button>
	<script>
		const $button = document.querySelector('#btn');
		$button.onclick = function (){
		console.log('hi');
		};
		$button = function (){            // 여기서 재할당 되어서 위에 이벤트 핸들러는 사라진다
		console.log('hello');
		};	
		</script>
</body>
</html>
```

### 3. addEventListener 메서드 방식

- 적용 방식 :  EventTarget.addEventListener(’eventType’, functionName [, useCapture]);

- eventType

| mousedown |   마우스 버튼을 때는 순간      | keydown | 키보드 버튼을 누르는 순간 |
| --- | --- | --- | --- |
| mouseup |  마우스 버튼을 때는 순간   | keypress   | 키보드 버튼을 누르는 순간(출력가능 키만 반응) |
| click | 왼쪽 버튼을 클릭한 순간  | keyup   | 키보드의 버튼을 눌렀다 떼는 순간 |
| dblclick  | 왼쪽 버튼을 더블클릭한 순간 | focusin | 요소에 포커스 되는 순간 |
| contextmenu | 오른쪽 버튼을 클릭한 순간 | focusout | 요소로 부터 포커스가 빠지는 순간 |
| mousemove | 마우스를 움직이는 순간   | focusin | 요소에 포커스 되는 순간(버블링 x) |
| mouseover | 마우스 포인터가 요소위로 올라온 순간 | blur |   요소로 부터 포커스가 빠지는 순간(버블링 x) |
| mouseout |  마우스 포인터가 요소에서 벗어나는 순간 | change  | 입력된 값이 바뀌는 순간 |
| mouseenter | 마우스 포인터가 요소위로 올라온 순간(버블링 x) | input  | 값이 입력되는 순간 |
| mouseleave   | 마우스 포인터가 요소에서 벗어나는 순간(버블링 x) | select | 입력 양식의 하나가 선택되는 순간 |
| scroll   | 스크롤 바가 움직일 때   | submit           | 폼을 전송하는 순간 |
| resize  | 윈도우 사이즈를 움직일 때 | DOMContentLoaded. | Dom 내용을 로드 할때  |

```html
<!DOCTYPE html>
<html>
<body>
	<button id="btn">버튼</button>
	<script>
		const $button = document.querySelector('#btn');
		
		function example (){
		  console.log('hihi')
		}
		
		$button.addEventListener('click',example);     // 버튼을 누를때 마다 'hihi' 출력 
		</script>
</body>
</html>
```

- **동일한 HTML 요소에 하나 이상의 이벤트 핸들러를 등록 할 수 있다 (다른 API ( 프로퍼티 방식, 어트리뷰트 방식)는 이벤트 핸들러를 등록 할때마다 재할당 되므로 한개씩 밖에 못 등록함)**
- 적용 방식 : EventTarget.prototype.removeEventListener 형태로 제거 할 수 있다.
- 특징
    - .addEventListener 메서드에 전달한 인수와 .removeEventListener 에 메서드 전달 인수가 일치하지 않으면 삭제 되지 않는다.
    
    ```html
    <!DOCTYPE html>
    <html>
    <body>
    	<button id="btn">버튼</button>
    	<script>
    		const $button = document.querySelector('#btn');
    		
    		function example (){
    		  console.log('hihi')
    		}
    		
    		$button.addEventListener('click',example);     // 버튼을 누를때 마다 'hihi' 출력 
    		$button.removeEventListener('click',examle);  // 이벤트 삭제 해줌
    		</script>
    </body>
    </html>
    ```
    

- 이벤트 핸들러 프로퍼티 방식($이름.onclick = 핸들러)으로 등록한 이벤트는 삭제 할 수 없다.

# 웹 페이지를 보여주기까지 과정([링크](https://developer.mozilla.org/ko/docs/Web/Performance/How_browsers_work))

---

- 간단 이미지 예시
    
    ![444.jpeg](2%E1%84%8C%E1%85%AE%E1%84%8E%E1%85%A1%20%E1%84%80%E1%85%AA%E1%84%8C%E1%85%A6%20%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%85%E1%85%B5%203ed3d389780b47009bb0f09522150ddb/444.jpeg)
    

## 탐색(Navigation)

### 1. DNS 조회

- 해당 페이지의 자원이 어디에 있나 찾는 과정 (처음 방문하는 사이트라면 DNS 조회필요)
- 호스트 이름 하나당 한번 수행( 글꼴, 스트립트, 광고 등등 서로 다른 호스트 이름이면 각각 DNS 조회 요청)

### 2. TCP 핸드세이크

- DNS 조회를 통해 IP 주소를 찾아온 후 브라우저는 서버와 **TCP 3방향 핸드세이크(SYN-SYN-ACK)**를 통해 연결을 설정

### 3-1. TLS 협상(HTTP 요청)

- 보안성을 위해 TCP 핸드세이크 연결 후에도 서버와 클라이언트 사이에 3번 이상 왕복
- 8 번이상 왕복후 HTTP에 요청!

## 응답(Response)

### 3-2.  슬로우 스타트

- 첫 응답 패킷은 14kb로 (처음 연결되면 브라우져는 초기 ***HTTP GET request***  를 요청하고 받는데 걸리는 시간 : **Time to First Byte (TTFB)**)
- 네트워크 통신 속도를 제어하는 알고리즘인 **슬로우 스타트**에 의해 정해진 것
- 혼잡을 피하기 위해서 네트워크의 용량에 적당한 전송 속도를 찾고자 점진적으로 속도를 높여나갑니다 (14kb 에서 2배 씩 커짐)

### 3-3.  혼잡제어(알고리즘)

- 하드웨어나 네트워크 상태에 따라서 제한된 용량만을 가지고 있는데 너무 빠르게 패킷을 보내면 그 패킷은 무시되는데 (누락된 확인 응답)
- 이때 ***혼잡 제어 알고리즘***은 보내진 패킷의 흐름과 확인 응답을 바탕으로 전송 속도를 결정하는 것을 나타냄

## 구문 분석(Parsing)

### 4-1. DOM 트리 구축

- HTML을 분석하여 DOM 트리를 만드는 것인데
- HTML을 토큰화(HTML 토큰은 시작 및 종료 태그 그리고 속성 이름 및 값을 포함) 하고
- 구문 분석기를 통해 HTML 토큰을 기반으로 DOM 트리를 만든다.(주의 `async`나 `defer` 가 설정이 되어있지 않은 `<script>` 태그는 렌더링을 막고, HTML의 분석을 중지시킴)

### 4-2. 프리로드 스캐너

- ***프리로드 스캐너*** 는 사용 가능한 컨텐츠를 분석하고 CSS나 Javscript, 웹 폰트 같이 우선순위가 높은 자원을 요청해줌
- 덕분에 구문 분석기가 외부 자원에 대한 참조를 기다리지 않아도 됨 (***프리로드 스캐너***가 자원을 미리 요청해서 구문 분석기가 다다를 쯤 이미 전송 받고 있거나 받은 후)
- 프리로드 스캐너가 제공하는 최적화(위의 작업) 는 블록킹을 줄여 줄수 있음

### 4-3. CSSOM 트리 구축

- DOM 트리 와 비슷하게 구축
- CSS 가 기준이고 구축이 엄청 빠르게 이루어짐

### 5-1. **Javascript (해석, 컴파일, 구문 분석 및 실행)**

- CSSOM 트리가 만들어지는 동안 프리 스캐너 덕분에 Javascript 파일 같은 다른 자원도 다운로드 되고
- 구문 분석 : 스크립트를 추상 구문 트리(추후 조사 📑)로 구문분석
- 컴파일 : 일부 추상 구문 트리를 인터프리터(추후 조사📑)로 넘겨서 메인 쓰레드에서 바이트코드가 생성 되는 과정

### 5-2. **접근성 트리 구축(Building the Accessibility Tree)**

- 브라우져에서 ***접근성 트리(AOM)***라는 것을 만드는데
- 보조 장치에서 이 트리를 이용해 내용을 분석, 해석 함
- DOM 트리가 업데이트 될 때 마다 AOM 트리도 업데이트 함

## 렌더링 (Rendering)

### 6. 렌더 트리 생성 (추후 더 조사 필요 📑)

- DOM 트리와 CSSOM 트리를 합쳐서 렌더 트리를 만드는 과정 (DOM 트리 루트부터 눈에 보이는 노드(display : none 등 안보이는 것들 제외) 를 순회하며 만듬)
- CSSOM 의 규칙에  따라 각각의 보이는 노드에 관련되 스타일을 모두 맞춰봄 각 노드의 스타일을 결정 해줌

### 7. 레이아웃 (Layout) , 리플로우

- 렌더 트리를 기반으로 각 노드의 도형 값을 계산
- 즉 : 모든 노드의 너비, 높이, 위치를 결정하는 프로세스( 페이지에서 각 객체의 크기와 위치도 계산)
- 처음 노드의 사이즈와 위치가 결정되는 것을 *레이아웃 ( 이미지 같이 아직 크기를 모르면 위치 표시 공간을 남겨둠)*
- 이후에 노드의 크기와 위치를 다시 계산하는 것은 *리플로우* (브라우저는 렌더 트리의 루트부터 시작하여 다시 순회 하는것 ) (이때 이미지 크기가 결정되어 위치 표시 공간에 표시)

### 8. 페인트(Paint)

- 말 그대로 위치 크기 등이 결정된 노드에 페인팅을 하는 것
- 텍스트, 색깔, 경계, 그림자 및 버튼이나 이미지 같은 요소를 포함하여 모든 요소의 시각적인 부분을 화면에 그리는 작업
- 레이아웃 트리의 요소를 레이어로 분리해서 (여러 작업을 한번에 할 수 있음)

## 9. 합성 (Composition)

- 위에서 문서의 각 섹션이 다른 레이어에서 그려질 때, 그 만들어진 섹션을 겹쳐놓으면 그것들이 올바른 순서로 화면에 그려지게 해주어서 정확한 렌더링을 보장해줌
- 페이지가 계속해서 자원을 로드(조사 필요📑)하면, 리플로우가 일어날 수 있습니다

## 10 상호작용(**Interactivity)(맞는지 확인 필요✅)**

- 잠깐의 상호작용 시간 동안 지연된 Javascript를 다운,  onload 이벤트가 발생할 때 코드가 실행…등의 작업이 걸리는 시간 Time to Interactive (TTI : 첫 요청부터 페이지가 상호작용할 준비가 될 때까지 얼마나 걸리는지)을 측정해서
- TTL 가 50ms 이내로 응답하면 상호작용 가능으로 보고 적용 시켜준다

> 문서 한 페이지 보는 것이 귀찮은 사람은 결코 성장할 수 없습니다.
여러분이 조사하고 있는 함수가 어떠한 파라미터를 받고, 어떠한 반환값을 돌려주는지는 기본적으로 꼼꼼히 살펴봐야 하는 부분입니다.
생각보다 많은 분들이 놓치는 부분이기도 하고, 이런 기본적인 부분에서 오는 약간의 나태함이 장기적인 시간 낭비로 이어질 수 있습니다.    (출처 : vaco)
>