## 목차
1. [프로젝트 소개](#-프로젝트-소개-)
2. [팀원](#팀원)
3. [기술 스택](#기술-스택)
4. [폴더 구조](#폴더-구조)
5. [ERD 다이어그램](#erd-다이어그램)
6. [프로젝트 기능](#프로젝트-기능)
7. [설치 및 실행 방법](#-설치-및-실행-방법)
8. [협업 및 회고](#협업-및-회고)

---

## 🍜 프로젝트 소개 🍜
⭐ Back-Office는 모바일 배달의민족 애플리케이션을 참고해서 만든 프로젝트 입니다 
⭐ Back-Office를 이용해서 식당에서 맛있는 메뉴를 선택한 다음 원하는 주소에 배달 주문신청을 할수있고 해당 식당에 리뷰를 작성할수있는 최고의 배달 애플리케이션 입니다

## 팀원
🫅김지웅(팀장)  
🤴정찬식(부팀장)  
🤴박찬우(부팀장)  
🧑‍🍳김동환  
🧑‍🍳유대원  
🧑‍🍳윤예원  
🧑‍🍳김용우  
🧑‍🍳박재상

## 기술 스택
🗄️Node.js  
💻Express  
🛕Prisma  
📁GIT  
📦GITHUB  
🛠️AWS  
🐬MYSQL

## 폴더 구조
📦 BACK-OFFICE  
├── 📁 node_modules  
├── 📁 order-turn payment  
├── 📁 prisma  
│   ├── 📁 migrations  
│   └── 🛕 schema.prisma  
├── 📁 src  
│   ├── 📁 constants  
│   ├── 📁 controllers  
│   ├── 📁 middlewares  
│   ├── 📁 models  
│   ├── 📁 public  
│   ├── 📁 repositories  
│   ├── 📁 routers  
│   ├── 📁 services  
│   └── 📁 utils  
│       └── 📁 prisma  
└── 📄 app.js  

## ERD 다이어그램
🧩 https://drawsql.app/teams/first-52/diagrams/backoffice  
![back_office](https://github.com/user-attachments/assets/56566abb-b9b7-4d35-a325-f6da479dffc8)

## 프로젝트 기능
### 🍔 1.음식을 주문하고 리뷰를 남길수 있습니다 리뷰를 통해 식당을 평가해주세요!
### 🍕 2.보안을 위해 JWT토큰을 이용합니다 안심하고 해당 프로젝트를 이용해주세요!
### 🥗 3.식당에 메뉴를 확인하고 장바구니에 담을수 있습니다 원하는 메뉴를 담아보세요!
### 🌮 4.주소를 등록하시면 배달이 가능합니다 맛있는 음식들을 집에서 편하게 드세요!

## ✏️ 설치 및 실행 방법
### 1.레포지토리 클론
git clone git@github.com:zera1004/Back-Office.git

### 2.패키지 설치
npm install

### 3.환경 변수 설정
.env 파일 생성 후, 아래 항목 설정  
DATABASE_URL=mysql://<username>:<password>@<host>:<port>/<database>  
JWT_SECRET=<your_jwt_secret>

### 4.데이터베이스 설정
npx prisma migrate dev --name <마이그레이션 이름>

### 5.서버 실행
npm run dev

## 🤝 협업 및 회고
### 협업 과정
- 백오피스(배달어플) 기획 및 와이어프레임 설계
- SQLdraw ,figma를 사용하여 ERD 설계 및 테이블 스키마 작성
- 역할 분담 후 브랜치를 생성해 PR 기반 협업
- Insomnia를 활용한 주요 기능 테스트
- pico.css 를 사용해 프론트 생성 
- 최종 풀 리퀘스트 후 테스트 진행

### 회고
백오피스(배달어플) 프로젝트를 여러사람들과 기획, 개발, 실행까지 다같이 함으로써 어떻게 의견을 나눠야하는지 꺠달았고 협동에 중요성을 느낄 수 있었습니다. 또한 담당 튜터님에 도움을 받아 문제를 빠르게 해결하고 프로젝트에 좀더 집중해서 효율적으로 작업할 수 있었습니다.

성공: 팀원들과의 회의를 한후 역할을 분배하고 역할을 수행함으로써 책임감을 기를수 있었고 프로젝트를 완성하면서 좋은 경험이 되었습니다  
아쉬운 점: 아직 프론트에 대한 지식이 부족해 시간을 많이 잡아먹었습니다 그로인해 jest를 사용한 테스트를 하지 못해 아쉬웠습니다  
배운 점: 초기에 설계 방향과 설정 그리고 팀원들과의 의사소통이 얼마나 중요한지 깨달았습니다
