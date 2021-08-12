import React from 'react';
import Close from '@/assets/svgs/close.svg';
import * as S from './styles';
import { Links } from '../Header';

interface Props {
  isOpen?: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar = ({ ...props }: Props) => {
  const { isOpen, setIsOpen } = props;
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      <S.SideBar className={isOpen ? 'active' : ''}>
        <S.Top>
          <div>UserName</div>
          <S.IconsWrapper>
            <Links />
            <Close onClick={closeSidebar} />
          </S.IconsWrapper>
        </S.Top>
        <S.Contents>
          <S.ContentTitle>카테고리</S.ContentTitle>
          <S.Categories>
            {Object.keys(categoryList).map((mainCategory, mainIdx) => (
              <li key={'mainCategory_' + mainIdx} className="active">
                <div>{mainCategory}</div>
                <S.SubCategory>
                  {categoryList[mainCategory].map((subCategory, subIdx) => (
                    <dd key={'subCategory_' + subIdx}>{subCategory}</dd>
                  ))}
                </S.SubCategory>
              </li>
            ))}
          </S.Categories>
        </S.Contents>
      </S.SideBar>
      <S.Backdrop className="backdorp" onClick={closeSidebar}></S.Backdrop>
    </>
  );
};

export default Sidebar;

const categoryList: Record<string, string[]> = {
  '사무용품 전문관': [
    '사무용문구',
    '파일/바인더',
    '사무용지/복사지',
    '데스크정리소품',
    '보드/칠판/광고',
    '봉투/포장용품',
    '디지털/사무기기',
    '사무용가구/수납',
  ],
  '미술/화방용품': [
    '수채화',
    '유화',
    '아크릴화',
    '디자인/구성',
    '동양화/서예',
    '조소/도예/판화',
    '지류/스케치북',
    '캔버스/판넬',
    '드로잉/채색도구',
    '붓',
    '파스텔/콩테/목탄',
    '캘리그라피',
  ],
  '애니메이션/만화': [
    '캐릭터 문구',
    '카카오프렌즈',
    '핑크퐁',
    '뽀로로',
    '리락쿠마',
    '엉덩이탐정',
    '디즈니',
    '포켓몬스터',
    '짱구는 못말려',
    '헬로키티',
    'BT21',
    '마블/DC',
    '에비츄',
    '빨강머리 앤',
  ],
  '학용품/수업준비': [
    '필기용품',
    '노트',
    '메모지/수첩',
    '학용품세트',
    '파일',
    '네임스티커/명찰',
    '지구본/지도',
    '과학시간',
    '수학시간',
    '미술시간',
    '음악시간',
    '체육시간',
    '학년별 준비물',
  ],
  '필기류': [
    '펜/리필심',
    '연필',
    '샤프',
    '만년필',
    '형광펜',
    '사인펜/매직',
    '색연필',
    '붓펜/캘리그라피펜',
    '분필/보드마카',
    '지우개/수정액',
    '필통/파우치',
  ],
  '노트/메모지': [
    '유선/무선노트',
    '학습/과목노트',
    '초등학생노트',
    '노트커버/패드',
    '수첩',
    '가계부/캐쉬북',
    '일기장',
    '기록노트',
    '메모패드/리갈패드',
    '메모지/체크리스트',
    '점착메모지/포스트잇',
    '인덱스/플래그',
  ],
  '다이어리/플래너': [
    '다이어리',
    '다이어리소품',
    '스케쥴러',
    '캘린더',
    '프로젝트플래너',
  ],
  '바인더/파일': ['바인더', '파일', '클립보드/결재판'],
  '파티/이벤트': [
    '테이블웨어',
    '초/티라이트',
    '풍선',
    '파티모자/머리띠',
    '파티장식/가랜드',
    '홈파티세트',
    '꽃잎/폭죽/불꽃놀이',
    '가발/가면/안경',
    '의상/분장용품',
    '응원/페스티벌',
    '마술용품',
    '기타파티소품',
  ],

  '데코/포장용품': [
    '선물/포장용품',
    '스티커',
    '스탬프/씰링',
    '모양펀치',
    '데코테이프',
  ],

  '카드/엽서/봉투': ['카드', '엽서', '편지지', '봉투'],

  '앨범': [
    '일반포토앨범',
    '폴라로이드앨범',
    '티켓/영화앨범',
    '출산/성장앨범',
    '기타스크랩북',
  ],

  '복사용품/라벨지': ['복사용지', '출력라벨지', '전용지', '잉크/토너'],

  '보드/칠판/광고': [
    '화이트보드/게시판',
    '블랙/칼라보드/게시판',
    '칠판보드/게시판',
    '콜크보드/게시판',
    '융보드/게시판',
    '메모보드',
    '타공판/메쉬보드',
    '보드/게시판소품',
    '메뉴판',
    '쇼카드',
    '아크릴꽂이/집게',
    '아크릴사인/표지판',
    '마네킹',
  ],
};
