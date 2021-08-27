# 모두컴퍼니

## 배포주소

## 📌 프로젝트 소개

<p>
<img src="https://img.shields.io/github/languages/top/cksdnr3/modu-company-assignment?color=blue&logo=typescript"> </img>
<img src="https://img.shields.io/github/repo-size/cksdnr3/modu-company-assignment?color=%23&logo=Github"> </img>

</p>

### 📋 프리온보딩 코스 모두컴퍼니 기업과제

> To do List 프로젝트 TypeScript로 드래그앤드랍 및 필터 기능 구현

<br/>

<details>
    <summary><STRONG>
    📚 과제 요구사항 보기
    <STRONG></summary>

- 간단한 **투두리스트** 애플리케이션에 적합한 UI/UX를 구성할 수 있다.
- 간단한 투두리스트 애플리케이션에 적합한 데이터 구조를 정의하고 조작할 수 있다.

#### **세부 가이드**

- 투두리스트에 적합한 데이터를 구성할 수 있다
- Task 데이터 타입에 필수적으로 들어가야할 필드:

  ```jsx
  const task = {
  	id: 1
  	taskName: '자소서 쓰기',
  	status: status.ONGOING
  	createdAt: '2021-02-03'
  	updatedAt: '2021-07-07'
  }
  ```

  - id
  - 할일의 제목
  - 할일의 상태 (최소 3가지 이상의 상태)
  - 생성일
  - 업데이트일 (상태변경일)

- [x] 적절한 Header를 만든다.
- [x] 투두리스트에 적합한 기능을 구현하기 위해 **데이터를 조작**할 수 있다.
- [x] 스크롤시 Header가 사라지지 않고 화면 상단에 고정되도록 한다.
- [x] 필수적으로 추가해야할 기능: Task 목록 조회, 새로운 Task 추가, Task 삭제
- [x] 투두리스트에 적절한 애니메이션을 추가할 수 있다.

  - Drag and Drop으로 Task의 순서를 변경한다.
  - 데이터를 변경하지 않고 화면 내에서 Task의 순서만 변경되면 됨

- 필수 구현 항목에 덧붙여 필요한 **데이터 속성을 추가하여 정의**할 수 있다

- [x] 투두리스트에 적합한 기능을 구현하기 위해 데이터를 조작할 수 있다.
- [x] 최소 두가지 이상의 조건으로 Task를 필터링 (ex. 상태, 생성일, 생성자, 중요도)
- [x] Task의 상태 변경 (ex. 진행중 → 완료)

</details>

<br/>

## 구현 목록

- 투두리스트 UI - 유정님

  - 필수 요소만 넣은 미니멀한 레이아웃 구성

- 드래그앤드랍 애니메이션 - 건우님

  - onDragStart , onDragOver을 통해 구현

- 필터 기능 - 찬욱님

  - 진행상태와 중요도로 필터기능을 구현함
  - 공통적으로 사용할 수 있는 filter 함수 생성

- Task 추가, 삭제, 수정 - 건우, 유정님

<br/>

## 👨‍💻 실행 방법

### 설치

`npm install`

### 실행

`npm start`
