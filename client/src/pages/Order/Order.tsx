import React, { useState } from 'react';
import * as S from './styles';
import OrderSummary from '@/components/Order/OrderSummary';
import Title from '@/components/Shared/Title';
import OrderAddress from '@/components/Order/OrderAddress';
import OrderProducts from '@/components/Order/OrderProducts';
import OrderCoupon from '@/components/Order/OrderCoupon';
import OrderPayment from '@/components/Order/OrderPayment';
import { useParams, Redirect } from '@/lib/Router';
import { useGetOrder, useUpdateOrder } from '@/hooks/queries/order';
import { IOrder } from '@/types';
import { calculateDiscount } from '@/utils/helper';

const Order = () => {
  const { id } = useParams().params;
  const { data, isLoading, isError } = useGetOrder(+id);
  const { mutate } = useUpdateOrder();
  const [updateDefaultAddress, setUpdateDefaultAddress] = useState(false);
  const [order, setOrder] = useState<Partial<IOrder>>({
    id: +id,
    status: 'paid',
    delivery_request_message: null,
    address_id: null,
    payment_id: 1,
  });

  const updateOrder = () => {
    if (typeof order === 'object') {
      mutate({ order, updateDefaultAddress });
    }
  };

  const totalPrice =
    data?.products.reduce(
      (sum, product) => sum + product.price * product.count,
      0
    ) || 0;

  const totalClount = data?.products?.length || 0;

  const totalDiscount =
    data?.products.reduce((sum, product) => {
      return (
        sum +
        calculateDiscount({
          price: product.price,
          discount: product.discount,
        }) *
          product.count
      );
    }, 0) || 0;

  if (isError || (data && data.status !== 'created')) {
    return <Redirect to="/notfound" />;
  }

  if (isLoading || !data) {
    return <div>Loading...</div>;
  }

  return (
    <S.OrderContainer className="container">
      <S.Order>
        <S.OrderHeader>
          <Title level={4}>주문/결제</Title>
        </S.OrderHeader>
        <OrderAddress
          setOrder={setOrder}
          updateDefaultAddress={updateDefaultAddress}
          setUpdateDefaultAddress={setUpdateDefaultAddress}
        />
        <OrderProducts products={data?.products} />
        <OrderCoupon />
        <OrderPayment setOrder={setOrder} order={order} />
      </S.Order>
      <S.OrderAside>
        <OrderSummary
          totalPrice={totalPrice}
          totalDiscount={totalDiscount}
          deliveryFee={2500}
          discount={0}
          productCount={totalClount}
          updateOrder={updateOrder}
          data={data}
        />
      </S.OrderAside>

      <S.OrderFooter>
        <OrderSummary
          totalPrice={totalPrice}
          totalDiscount={totalDiscount}
          deliveryFee={2500}
          discount={0}
          productCount={totalClount}
          updateOrder={updateOrder}
          data={data}
        />
      </S.OrderFooter>
    </S.OrderContainer>
  );
};

export default Order;
