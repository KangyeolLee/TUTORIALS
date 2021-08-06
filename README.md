# cashbook-18
> 👉 [18팀 | 우아한 가계부](http://13.124.211.180/main) 

## 팀원
|이름|Github|
|---|---|
|이강열|[@KangyeolLee](https://github.com/KangyeolLee)   |
|이은성|[@eun-seong](https://github.com/eun-seong)|

## 🛠 Stacks

<img src="https://img.shields.io/badge/-Typescript-4075bb?&logo=TypeScript&logoColor=white"> <img src="https://img.shields.io/badge/-Babel-F9DC3E?&logo=Babel&logoColor=white"> <img src="https://img.shields.io/badge/-Webpack-8DD6F9?&logo=Webpack&logoColor=black"> <img src="https://img.shields.io/badge/-MySQL-4479A1?&logo=MySQL&logoColor=white"> <img src="https://img.shields.io/badge/-Amazon AWS-232F3E?&logo=Amazon AWS&logoColor=white"> <img src="https://img.shields.io/badge/-Express-000000?&logo=Express&logoColor=white"> <img src="https://img.shields.io/badge/-Prettier-F7B93E?&logo=Prettier&logoColor=white"> <img src="https://img.shields.io/badge/-ESLint-4B32C3?&logo=ESLint&logoColor=white"> <img src="https://img.shields.io/badge/-Sass-CC6699?&logo=Sass&logoColor=white"> <img src="https://img.shields.io/badge/-JWT-000000?&logo=JSONWebTokens&logoColor=white">


## 데모 영상
> 메인 화면

<img src="https://user-images.githubusercontent.com/49540564/128455324-98b97b51-3b56-4848-bae4-8cb816abea1e.gif">

</br>

> 달력 화면

<img src="https://user-images.githubusercontent.com/49540564/128455310-c67f23b1-7b86-4a8f-8c53-f38be611d112.gif">

</br>


> 차트 화면

<img src="https://user-images.githubusercontent.com/49540564/128455320-66617bd5-aace-48ad-be7c-5d849b7e73ec.gif">

</br>


> 유저 화면

<img src="https://user-images.githubusercontent.com/49540564/128455326-e8e02829-edd1-4efd-ac2b-b72e9d7989a3.gif">







## 디렉토리 구조

> Client
```
.
|-- dist
`-- src
    |-- Components
    |   |-- ...
    |-- Controller
    |-- Core
    |-- Model
    |-- View
    |   |-- ...
    |-- api
    |-- assets
    |-- scss
    `-- utils

```

> Server
```
.
|-- api
|   |-- middlewares
|   `-- routes
|-- config
|-- controllers
|-- entities
|-- loaders
|-- repositories
|-- services
|-- types
`-- utils

```



## `.env` 환경 파일
```
PORT=
DB_PORT=
DB_HOST=
DB_USER=
DB_PASSWORD=
DATABASE=
API_BASE=
CLIENT_API_BASE=
JWT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_SECRETS=
REDIRECT_URL=
REDIRECT_CLIENT_URL=
CORS_CLIENT=
GITHUB_AUTHORIZE=
GITHUB_ACCESS_TOKEN=
GITHUB_USER=
```

## 실행

```
$ https://github.com/woowa-techcamp-2021/cashbook-18.git

# 서버 실행
$ cd ./cashbook-18/server
$ npm install
$ npm run dev

# 클라이언트 실행
$ cd ../client
$ npm install
$ npm run start 
```
