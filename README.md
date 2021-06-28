## 배민상회 레이아웃 클론 코딩

[배민상회](https://mart.baemin.com/) 메인 페이지 클론 코딩

### Features

- 1080px 해상도만 고려
- HTML과 CSS만 사용하여 레이아웃 위주 클론 코딩
- 메인 페이지만 구현 : 내비게이션, 링크, 버튼 등 기능 작동 X
  - 배너이미지 슬라이드 미구현
  - 더보기 페이지 이동 미구현
  - 내비게이션 각 항목 클릭 시 이벤트 미구현
  - 각 카테고리 항목 상세 페이지로 이동 미구현
  - 할인적용 항목 할인 가격 출력 미구현
  - 그 외 순수 HTML만 사용하여 컴포넌트 단위로 분리가 불가능하여 반복되는 레이아웃의 경우 일부 단축하여 구현
    - eg. 카테고리별 항목 레이아웃 일부 생략 / 개개 항목 세부 정보(가격, 수량) 일괄 적용 등
- 트랜지션/확대/반짝임 등의 사용자 인터랙션은 모두 CSS만 활용하여 구현
- 헤더 `position: fixed` 적용

### Skill Stacks

- HTML5
- CSS3

### System Directory

```
📁BAEMINS-SHOP
├── assets
      ├── img
           ├── delivery.svg
├── index.html
├── README.md
├── reset.css
└── style.css
```

### Screen Shot

![_D__coding_tutorials%20(GIT)_Vanilla_BAEMINS-SHOP_index html (1)](https://user-images.githubusercontent.com/48883344/123659296-7c194d80-d86d-11eb-91fa-ba53f56ef98a.png)

### How To Access

- `git clone` 이후 `index.html` 클릭
