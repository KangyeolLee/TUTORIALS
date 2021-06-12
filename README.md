# Novelist Project

- 집단지성을 활용한 독자 참여형 소설 집필 플랫폼

## Features

- web/mobile optimize
- image lazy loading

## Skill Stacks

모든 스킬 스택의 채택의 공통적인 이유는 학습 및 숙련도 향상을 기본 베이스로 합니다.

- typescript 사용

  - 타입 유추를 통한 개발 생산성 향상
  - 디버깅 용이

- nextJS create-next-app 사용

  - Server-side-Rendering 적용
  - CRA 환경보다 기본 셋팅이 더 가벼움 (cf. CRA Webpack 설정 등)
  - Routing 처리를 프레임워크단에서 자체적으로 보다 쉽게 관리
  - API를 자체 서버를 통해 보다 간편하게 구축 가능

- tailwindcss 사용

  - className 명을 통한 스타일링으로 빠른 개발 속도
  - 자바스크립트와의 코드 분리를 통한 프레임워크와 독립성

- postcss plugin

  - tailwindcss에 autoprefixer 적용

- semantic html
  - Server-Side-Rendering을 사용하는 만큼 semantic한 html 문서 작성 필요
  - header, main, footer, section, article 등의 태그를 사용하여 semantic 하게 구성

## Issue

- tailwindcss

  - 개발 생산성을 위해 도입했지만 초반 러닝커브가 있어 오히려 속도가 붙기까지 시간 소요가 있었음
  - HTML 태그 (JSX문법 내) 에 클래스명이 너무 과도하게 길어지는 느낌이 불편하게 다가옴
  - 쓰다보니 CSS in JS의 개념이 더 익숙하고 편리하다는 느낌이 듬

- next/image

  - 자체적으로 캐싱/지연로딩 등을 지원해주는 점은 매우 편리하다고 생각
  - 그러나 해당 기능을 원활하게 이용하기 위해서는 `next.config.js` 에 별도의 설정이 필요

- next
  - 어떤 디자인 패턴을 가져가는 것이 가장 효율적인지에 대한 고민이 많았음
  - 단순 next 프레임워크만의 문제는 아니며 가장 react스럽게 구조를 짜는 것에 대한 고민이 필요할 것으로 생각
