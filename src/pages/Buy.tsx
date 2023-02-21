import React, { useEffect, useState } from 'react';
import CartItem from '@/components/Cart/CartItem';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import PageTitle from '@/components/common/PageTitle';
import { MESSAGES } from '@/constants/messages';
import { POLICIES } from '@/constants/policies';
import { ICart } from '@/interfaces/cart';
import COLORS from '@/styles/colors';
import styled from '@emotion/styled';
import { AiOutlineCheck } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { useDispatch } from 'react-redux';
import { setModal } from '@/store/modalSlice';

const Buy = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState<ICart[]>([]);
  const [isChecked, setIsChecked] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const data: ICart[] = [
      {
        cartId: '1',
        fproductName: '개발자 신용대출',
        fproductCompanyName: '우리은행',
        fproductCreditProductTypeName: '',
        favorite: true,
      },
      {
        cartId: '2',
        fproductName: '감자튀김 신용대출',
        fproductCompanyName: '신한은행',
        fproductCreditProductTypeName: '',
        favorite: false,
      },
      {
        cartId: '3',
        fproductName: '고양이 신용대출',
        fproductCompanyName: '국민은행',
        fproductCreditProductTypeName: '',
        favorite: false,
      },
      {
        cartId: '4',
        fproductName: '직장인 신용대출',
        fproductCompanyName: '우리은행',
        fproductCreditProductTypeName: '',
        favorite: false,
      },
    ];
    setCart(data);
  }, []);

  const handleCheck = () => {
    setIsChecked((prev) => !prev);
  };

  const handleClick = () => {
    if (!isChecked) {
      return dispatch(
        setModal({
          isOpen: true,
          onClickOk: () => dispatch(setModal({ isOpen: false })),
          text: MESSAGES.BUY.CHECK_POLICY,
        }),
      );
    } else {
      return dispatch(
        setModal({
          isOpen: true,
          onClickOk: handleBuy,
          onClickCancel: () => dispatch(setModal({ isOpen: false })),
          text: MESSAGES.BUY.CHECK_BUY,
        }),
      );
    }
  };

  const handleBuy = () => {
    dispatch(
      setModal({
        isOpen: true,
        onClickOk: () => {
          dispatch(setModal({ isOpen: false }));
          navigate(ROUTES.MYPAGE_BUY);
        },
        text: MESSAGES.BUY.COMPLETE_BUY,
      }),
    );
  };

  return (
    <BuyContainer>
      <PageTitle title="상품 신청" />
      <BuyContent>
        <BuyItemContainer>
          {Array.isArray(cart) ? (
            cart.map((item) => <CartItem key={item.cartId} data={item} />)
          ) : (
            <div>담으신 상품이 없습니다.</div>
          )}
        </BuyItemContainer>
        <PolicyContainer>
          <AgreeContainer>
            <Input inputType="checkbox" onChange={handleCheck} id="AllAgree" />
            <AgreeText htmlFor="AllAgree">필수 동의</AgreeText>
          </AgreeContainer>
          {POLICIES.map((item, idx) => (
            <PolicyText key={idx}>
              <AiOutlineCheck color={isChecked ? COLORS.secondary : ''} />
              {item}
            </PolicyText>
          ))}
          <FinalCheckText>
            <p>본인은 대출상품에 대한 주요내용과 비용에 대한</p>
            <p>설명을 충분히 확인했습니다.</p>
          </FinalCheckText>
        </PolicyContainer>
      </BuyContent>
      <Button width="calc(100% - 10px)" onClick={handleClick}>
        신청완료
      </Button>
    </BuyContainer>
  );
};

export default Buy;

const BuyContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 0 0 10px;
  height: 100%;
`;

const BuyContent = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100% - 149px);
  margin-bottom: 10px;
  overflow-y: auto;
  padding-right: 10px;
`;

const BuyItemContainer = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const PolicyContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin: 10px 0 0;
  padding: 1rem;
  background-color: ${COLORS.white};
  border: 1px solid ${COLORS.lightGray};
  border-radius: 10px;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
`;

const AgreeContainer = styled.div`
  display: flex;
  margin: 5px 0 8px 0;
`;

const AgreeText = styled.label`
  font-size: 14px;
  margin-left: 10px;
  font-weight: 600;
  cursor: pointer;
`;

const PolicyText = styled.p`
  font-size: 12px;
  color: ${COLORS.gray};
  display: flex;
  gap: 8px;
`;

const FinalCheckText = styled.div`
  font-size: 13px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin: 10px 0;
`;
