import { HEADER_HEIGHT } from '@/styles/globalStyle';
import styled from 'styled-components';

export const CategoryWrapper = styled.div`
  max-width: ${({ theme }) => theme.media.pc}px;
  width: 95%;
  margin: 0 auto;
`;

export const CategoryHeader = styled.div`
  font-family: BMDOHYEON;
  color: ${({ theme }) => theme.color['text-color']};
  margin: 3rem 0 2rem;
  ${({ theme }) => theme.fontSize.xl}
  @media(max-width: ${({ theme }) => theme.media.tablet}px) {
    ${({ theme }) => theme.fontSize.l}
  }
  @media (max-width: ${({ theme }) => theme.media.phone}px) {
    ${({ theme }) => theme.fontSize.m}
  }
`;

export const CardLoader = styled.div`
  background: red;
  width: 100%;
  height: 300px;
`;

export const SubCategoriesTitles = styled.div`
  max-width: ${({ theme }) => theme.media.pc}px;
  width: 95%;
  white-space: nowrap;
  overflow: scroll;
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;

  & {
    -ms-overflow-style: none;
  }
  &::-webkit-scrollbar {
    display: none;
  }

  span {
    margin-right: 1rem;
    cursor: pointer;
    color: ${({ theme }) => theme.color['text-color']};

    &.selected {
      color: ${({ theme }) => theme.color.primary};
      ${({ theme }) => theme.fontWeight.xl};
    }

    &:after {
      content: '|';
      color: ${({ theme }) => theme.color['text-color']};
      margin-left: 1rem;
    }

    &:nth-last-child(2)::after,
    &:nth-last-child(1)::after,
    &:first-child::after {
      content: '';
      margin: 0;
    }
  }
`;

export const SubCategoriesWrap = styled.div`
  position: sticky;
  top: ${HEADER_HEIGHT}rem;
  padding: 1.5rem 0;
  background: ${({ theme }) => theme.color.background};
  box-shadow: ${({ theme }) => theme.headerBoxShadow};
  z-index: 500;
  ${({ theme }) => theme.fontSize.m};
  width: 100%;

  @media (max-width: ${({ theme }) => theme.media.phone - 1}px) {
    ${({ theme }) => theme.fontSize.s};
  }
`;

export const VerticalScroll = styled.span`
  position: sticky;
  display: flex;
  padding: 1px;
  align-items: center;
  margin: 0;
  padding: 0 1rem;
  cursor: pointer;
  background: ${({ theme }) => theme.color.background};

  svg {
    width: 1rem;
    stroke-width: 50px;
    fill: ${({ theme }) => theme.color['text-color']};
    stroke: ${({ theme }) => theme.color['text-color']};
  }

  &.left {
    left: 0;
    padding-top: 2px;
  }

  &.right {
    right: -1px;
    margin-left: auto;

    svg {
      transform: rotateY(180deg);
    }
  }
`;
