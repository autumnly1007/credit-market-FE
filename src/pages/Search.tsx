import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import PageTitle from '@/components/common/PageTitle';
import Input from '@/components/common/Input';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '@/store/loadingSlice';
import { MESSAGES } from '@/constants/messages';
import ProductCard from '@/components/Product/ProductCard';
import { IProduct } from '@/interfaces/product';

const Search = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    async function getProducts() {
      try {
        dispatch(showLoading());
        const data: IProduct[] = [
          {
            productId: '1',
            productName: '직장인 신용대출',
            companyName: '우리은행',
            favorite: false,
            productTypeName: '대출',
            avgInterest: '3.4%',
            optionsInterestType: '대출',
          },
          {
            productId: '2',
            productName: '주부 신용대출',
            companyName: '국민은행',
            favorite: false,
            productTypeName: '대출',
            avgInterest: '3.4%',
            optionsInterestType: '대출',
          },
          {
            productId: '3',
            productName: '고양이 신용대출',
            companyName: '신한은행',
            favorite: false,
            productTypeName: '대출',
            avgInterest: '3.4%',
            optionsInterestType: '대출',
          },
          {
            productId: '4',
            productName: '주부 신용대출',
            companyName: '국민은행',
            favorite: false,
            productTypeName: '대출',
            avgInterest: '3.4%',
            optionsInterestType: '대출',
          },
          {
            productId: '5',
            productName: '직장인 신용대출',
            companyName: '우리은행',
            favorite: false,
            productTypeName: '대출',
            avgInterest: '3.4%',
            optionsInterestType: '대출',
          },
          {
            productId: '6',
            productName: '주부 신용대출',
            companyName: '신한은행',
            favorite: false,
            productTypeName: '대출',
            avgInterest: '3.4%',
            optionsInterestType: '대출',
          },
          {
            productId: '7',
            productName: '고양이 신용대출',
            companyName: '국민은행',
            favorite: false,
            productTypeName: '대출',
            avgInterest: '3.4%',
            optionsInterestType: '대출',
          },
          {
            productId: '8',
            productName: '대학생 신용대출',
            companyName: '제주은행',
            favorite: false,
            productTypeName: '대출',
            avgInterest: '3.4%',
            optionsInterestType: '대출',
          },
        ];
        setProducts(data);
      } catch (error) {
        alert(MESSAGES.PRODUCT.ERROR_GET_DETAIL);
      } finally {
        dispatch(hideLoading());
      }
    }
    getProducts();
  }, []);

  return (
    <StyledSearch>
      <PageTitle title="상품 검색" />
      <div className="searchArea">
        <form action="">
          <Input
            inputType="text"
            placeholder="검색어를 입력해 주세요."
            classType="text-search"
            autoFocus
          />
          <div className="selectBox">
            <select name="" id="">
              <option value="">대출종류</option>
            </select>
            <select name="" id="">
              <option value="">최소나이</option>
            </select>
            <select name="" id="">
              <option value="">대상성별</option>
            </select>
            <select name="" id="">
              <option value="">금리유형</option>
            </select>
            <select name="" id="">
              <option value="">평균금리</option>
            </select>
          </div>
        </form>
      </div>
      <ul className="productsArea">
        {products.map((product) => (
          <ProductCard key={product.productId} data={product} />
        ))}
      </ul>
    </StyledSearch>
  );
};

export default Search;

const StyledSearch = styled.div`
  padding: 0 0 0 10px;
  height: 100%;

  .searchArea {
    padding-right: 10px;
  }

  .productsArea {
    height: calc(100% - 170px);
    padding-right: 10px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
`;
