import React, { useCallback, useEffect, useRef } from 'react';
import { useHistory, useParams } from '@/lib/Router';
import * as S from './styles';
import CategoryProducts from '@/components/CategoryProducts';
import { CategoryList } from '@/recoil/category';
import { useRecoilValue } from 'recoil';
import { ISubCategory } from '@/types';
import { LeftChevron } from '@/assets/svgs/index';

const Category = () => {
  const { categoryId = '40' } = useParams().params;
  const categories = useRecoilValue(CategoryList);
  const ref = useRef<HTMLDivElement>(null);
  const { historyPush } = useHistory();

  const sub: ISubCategory = {
    id: 0,
    title: '',
  };

  const main = categories.find((_main) => {
    return _main.subCategories.find((_sub) => {
      if (_sub.id == +categoryId) {
        sub.id = _sub.id;
        sub.title = _sub.title;
        return true;
      }
      return;
    });
  });

  const VerticalScrollClickHandler = useCallback((type: string) => {
    if (!ref.current) return;
    ref.current.scrollBy({
      left: type == 'left' ? -300 : 300,
      behavior: 'smooth',
    });
  }, []);

  const subCategoryClickHandelr = useCallback(
    (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, id: number) => {
      e.currentTarget.scrollIntoView({
        block: 'center',
        inline: 'center',
      });
      historyPush(`/category/${id}`);
    },
    []
  );

  return (
    <>
      <S.SubCategoriesWrap>
        <S.SubCategoriesTitles ref={ref}>
          <S.VerticalScroll
            className={'left'}
            onClick={() => VerticalScrollClickHandler('left')}
          >
            <LeftChevron />
          </S.VerticalScroll>
          {main?.subCategories.map((category) => (
            <span
              key={'categoryBreadCrumble' + category.id}
              className={category.id == +categoryId ? 'selected' : ''}
              onClick={(e) => subCategoryClickHandelr(e, category.id)}
            >
              {category.title}
            </span>
          ))}
          <S.VerticalScroll
            className={'right'}
            onClick={() => VerticalScrollClickHandler('right')}
          >
            <LeftChevron />
          </S.VerticalScroll>
        </S.SubCategoriesTitles>
      </S.SubCategoriesWrap>
      <S.CategoryWrapper>
        <S.CategoryHeader>{main?.title + ' > ' + sub.title}</S.CategoryHeader>
        <CategoryProducts subCategoryId={+categoryId} />
      </S.CategoryWrapper>
    </>
  );
};

export default Category;
