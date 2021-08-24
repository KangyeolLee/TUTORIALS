import React from 'react';
import * as S from './styles';
import { useParams, useHistory, Redirect } from '@/lib/Router';
import { useGetOrder } from '@/hooks/queries/order';
import Button from '@/components/Shared/Button';

const Paid = () => {
  const { id } = useParams().params;
  const { historyPush } = useHistory();
  const { data, isError } = useGetOrder(+id);

  if (isError || (data && data.status !== 'paid')) {
    return <Redirect to="/notfound" />;
  }
  return (
    <S.OrderPaid>
      <img src="https://media3.giphy.com/media/ek9bcKfoXU91xwrkXZ/giphy.gif" />
      <S.DoneMessage>주문이 완료 되었습니다 :)</S.DoneMessage>
      <S.SubMessage>
        주문 내역에 대한 상세사항을 메일로 받으실거에요!
      </S.SubMessage>
      <S.HiddenMessage>(메일 서버가 개발이 된다면요..!)</S.HiddenMessage>
      <S.ButtonWrapper>
        <Button
          type="button"
          color="primary"
          fullWidth={false}
          onClick={() => historyPush('/')}
        >
          메인으로 가기
        </Button>
      </S.ButtonWrapper>
    </S.OrderPaid>
  );
};

export default Paid;
