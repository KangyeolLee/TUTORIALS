import React, { useCallback } from 'react';
import * as S from '../styles';
import { HeartSVG, CartSVG } from '@/assets/svgs';
import { NumberInput } from '@/components/Shared/Input';
import Title from '@/components/Shared/Title';
import useNumberInput from '@/hooks/useNumberInput';
import { calculateDiscount, wonFormat } from '@/utils/helper';
import { usePostCart } from '@/hooks/queries/cart';
import { useGetProductById } from '@/hooks/queries/product';
import { useParams } from '@/lib/Router';
import thumbnailsParser from '@/utils/thumbnailsParser';
import ProductThumbnails from './../ProductThumbnails/ProductThumbnails';
import { usePostOrder } from '@/hooks/queries/order';
import { useRecoilValue } from 'recoil';
import { userState } from '@/recoil/user';
import { notify } from '@/components/Shared/Toastify';
import {
  useAddBookmark,
  useDeleteBookmark,
  useGetBookmarkIds,
} from '@/hooks/queries/bookmark';
import { ResponseError } from '@/components/Shared/Error';
import { InfoSkeleton } from '@/components/Skeleton/ProductSkeleton';
import { ShoppingCartModal } from '@/components/Shared/Modal';
import useModal from '@/hooks/useModal';
import useMission from '@/hooks/useMission';

const ProductInfo = () => {
  const { id } = useParams().params;

  const { data, isLoading, error } = useGetProductById(id);
  const { mutate: cartMutate } = usePostCart();
  const { mutate: orderMutate } = usePostOrder();
  const user = useRecoilValue(userState);
  const { mutate: addMutate } = useAddBookmark();
  const { mutate: deleteMutate } = useDeleteBookmark();
  const [openModal, toggleModal] = useModal(false);
  const [missionList, setMissionList] = useMission();

  const [value, handleOnChnage, handleClickOnMinus, handleClickOnPlus] =
    useNumberInput(1);
  const onClickCart = () => {
    setMissionList('addCart', true);
    cartMutate(
      {
        count: value,
        productId: id,
      },
      {
        onSuccess() {
          setMissionList('addCart', true);
          toggleModal();
        },
      }
    );
  };

  const { data: bookmarkIdList } = useGetBookmarkIds(!!user);

  const isHeartChecked = !!bookmarkIdList?.find(
    (checkedId) => checkedId === Number(id)
  );

  const heartBtnOnClick = useCallback(() => {
    if (!user) notify('error', '???????????? ???????????????!');
    else if (isHeartChecked) {
      deleteMutate([Number(id)]);
    } else {
      addMutate(Number(id));
      setMissionList('bookmark', true);
    }
  }, [addMutate, deleteMutate, isHeartChecked, id, user, setMissionList]);

  // ??? ????????? ?????? ?????? ????????? ?????? ??? ????????? ?????? ??? ?????????~
  if (error) {
    return <ResponseError message={error.message} />;
  }

  if (isLoading || !data) {
    return <InfoSkeleton className="container" />;
  }

  const { details, thumbnails } = data;
  const { title, price, discount } = details;
  const [thumbDetails, thumbOrigins, thumbThumbnails] =
    thumbnailsParser(thumbnails);

  const realPrice = calculateDiscount({ price, discount });

  return (
    <S.ProductInfo className="container">
      <ProductThumbnails
        thumbDetails={thumbDetails}
        thumbOrigins={thumbOrigins}
        thumbThumbnails={thumbThumbnails}
      />
      <S.ProductOrder>
        <Title level={3}>{title}</Title>
        <S.ProductDetailArea>
          <S.ProductDetail>
            <Title level={5}>????????????</Title>
            {!!discount && <span className="price original">{price}??? </span>}
            <span className="detail-content">{wonFormat(realPrice)}</span>
            {!!discount && (
              <span className="price discount">{discount}% ??????</span>
            )}
          </S.ProductDetail>
          <S.ProductDetail>
            <Title level={5}>????????????</Title>
            <span className="detail-content">
              2,500??? (3?????? ?????? ????????? ??????)
            </span>
          </S.ProductDetail>
          <S.ProductDetail>
            <Title level={5}>????????????</Title>
            <span className="detail-content">?????? 2??? ??????????????????</span>
          </S.ProductDetail>
        </S.ProductDetailArea>

        <S.OrderBar>
          <p className="product-name">{title}</p>
          <div className="small-wrapper">
            <NumberInput
              type="number"
              name="price-count"
              min={1}
              handleOnChnage={handleOnChnage}
              value={value}
              handleClickOnMinus={handleClickOnMinus}
              handleClickOnPlus={handleClickOnPlus}
            />
            <p className="price">{wonFormat(realPrice)}</p>
          </div>
        </S.OrderBar>

        <S.Divider />

        <S.PriceBar>
          <Title level={5}>??? ????????????</Title>
          <span className="price-sum">{wonFormat(realPrice * value)}</span>
        </S.PriceBar>

        <S.ButtonArea>
          <button className="heart" onClick={heartBtnOnClick}>
            <HeartSVG
              className={isHeartChecked ? 'checked' : ''}
              width={25}
              height={25}
            />
          </button>
          <button onClick={onClickCart} className="cart">
            <CartSVG width={25} height={25} />
          </button>
          <button
            className="purchase"
            onClick={() =>
              orderMutate({
                products: [{ id: +id, count: value }],
                addressId: null,
                deliveryRequestMessage: '',
                status: 'created',
              })
            }
          >
            ????????????
          </button>
        </S.ButtonArea>
      </S.ProductOrder>
      {openModal && <ShoppingCartModal toggleModal={toggleModal} />}
    </S.ProductInfo>
  );
};

export default ProductInfo;
