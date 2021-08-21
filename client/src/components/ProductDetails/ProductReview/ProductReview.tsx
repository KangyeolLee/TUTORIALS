import { RatingGetter } from '@/components/Shared/Rating';
import RatingChart from '@/components/Shared/RatingChart';
import Title from '@/components/Shared/Title';
import React, { useState } from 'react';
import * as S from '../styles';
import Button from '@/components/Shared/Button';
import useModal from '@/hooks/useModal';
import { ReviewModal } from '@/components/Shared/Modal';
import { useParams } from '@/lib/Router';
import {
  useGetProductReviewsById,
  useGetProductReviewsCount,
} from '@/hooks/queries/product';
import { nanoid } from 'nanoid';
import { dateFormat } from '@/utils/helper';
import Pagination from '@/components/Shared/Pagination';
import { useRecoilState } from 'recoil';
import { userState } from '@/recoil/user';
import { notify } from '@/components/Shared/Toastify';

// 페이지 당 리뷰 노출 개수
const LIMIT = 5;

// TODO: 임시 데이터 형식입니다 - 당연히 나중에 바뀌게쬬?
interface IProductReview {
  totalRating: number;
}

const ProductReview = ({ totalRating }: IProductReview) => {
  const { id } = useParams().params;
  const [offset, setOffset] = useState(0);
  const [isOpen, toggleModal] = useModal(false);
  const [user] = useRecoilState(userState);

  const {
    data: reviews,
    isLoading,
    error,
  } = useGetProductReviewsById(id, offset);
  const { data: count } = useGetProductReviewsCount(id);

  const handleClickReviewButton = () => {
    if (!user) {
      return notify('error', '로그인 후 작성 가능합니다.');
    }

    toggleModal();
  };

  // 이 부분에 대한 공통 화면도 만들 수 있다면 좋을 거 같네요~
  if (error) {
    return <div>{error.message}</div>;
  }

  if (isLoading || !reviews || !count) {
    return <div>loading</div>;
  }

  const handleOnClickPage = (idx: number) => {
    setOffset(+idx * LIMIT);
  };

  return (
    <S.PanelWrapper>
      <S.TopArea>
        <Title className="title" level={5}>
          상품후기 ({count.count})
        </Title>
        <Button
          size="Default"
          color="primary"
          type="button"
          onClick={handleClickReviewButton}
        >
          작성하기
        </Button>
      </S.TopArea>
      <S.RatingArea>
        <S.StarRates>
          <span className="totalRates">{totalRating}</span>
          <RatingGetter rating={totalRating} uniqueId="totalRating" />
        </S.StarRates>
        <RatingChart />
      </S.RatingArea>

      <S.UserReviewArea>
        {reviews.map((review) => {
          return (
            <S.UserReview key={review.id}>
              <S.UserReviewTitles>
                <Title className="username" level={5}>
                  {review.name}
                  <span style={{ fontWeight: 100 }}>님</span>
                </Title>
                <div className="rating-area">
                  <RatingGetter rating={review.rating} uniqueId={nanoid()} />
                  <p className="date">{dateFormat(review.createdAt)}</p>
                </div>
              </S.UserReviewTitles>

              {review.url.length !== 0 && (
                <S.ReviewImages>
                  {review.url.map((image) => (
                    <img key={nanoid()} src={image} alt="유저사진리뷰" />
                  ))}
                </S.ReviewImages>
              )}

              <S.UserDescription>{review.content}</S.UserDescription>
            </S.UserReview>
          );
        })}
      </S.UserReviewArea>

      <Pagination
        handleOnClickPage={handleOnClickPage}
        count={Math.ceil(count.count / LIMIT)}
      />

      {isOpen && <ReviewModal toggleModal={toggleModal} />}
    </S.PanelWrapper>
  );
};

export default ProductReview;
