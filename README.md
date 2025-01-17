# 백오피스 프로젝트(Back-Office)

## 🍜 프로젝트 소개 🍜
⭐ Back-Office는 모바일 배달의민족 애플리케이션을 참고해서 만든 프로젝트 입니다 
⭐ Back-Office를 이용해서 식당에서 맛있는 메뉴를 선택한 다음 원하는 주소에 배달 주문신청을 할수있고 해당 식당에 리뷰을 작성할수있는 최고의 배달 애플리케이션 입니다! 

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
│    ├── 📁 migrations    
│    ├── 🛕 schema.prisma   
│   
├── 📁 src               
│    ├── 📁 constants   
│    ├── 📁 controllers  
│    ├── 📁 middlewares    
│    ├── 📁 models    
│    ├── 📁 public 
│    ├── 📁 repositories  
│    ├── 📁 routers  
│    ├── 📁 services 
│    ├── 📁 utils 
│         ├── 📁 prisma
└── 📄 app.js   

## ERD 다이어그램
🧩 https://drawsql.app/teams/first-52/diagrams/backoffice
![back_office](https://github.com/user-attachments/assets/56566abb-b9b7-4d35-a325-f6da479dffc8)

## 프로젝트 기능
### 🍔 1.음식을 주문하고 리뷰를 남길수 있습니다 리뷰를 통해 식당을 평가해주세요!

### 🍕 2.보안을 위해 JWT토큰을 이용합니다 안심하고 해당 프로젝트를 이용해주세요!

### 🥗 3.식당에 메뉴를 확인하고 장바구니에 담을수 있습니다 원하는 메뉴를 담아보세요!

### 🌮 4.주소를 등록하시면 배달이 가능합니다 맛있는 음식들을 집에서 편하게 드세요!

## 설치 및 실행 방법
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
