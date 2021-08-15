import React, { VFC } from 'react';
import Portal from '@/components/Modal/Portal';
import { CloseSVG } from '@/assets/svgs';
import * as S from './styles';

interface CustomModalProps {
  children: React.ReactElement[] | React.ReactElement | string;
  toggleModal: () => void;
  className?: string;
  width?: string;
  height?: string;
  onClick?: () => void;
}

const CustomModal: VFC<CustomModalProps> = ({
  children,
  toggleModal,
  className,
  width,
  height,
  onClick,
}) => {
  return (
    <Portal>
      <S.ModalOverlay className={className} onClick={onClick}>
        <S.ModalWrapper
          width={width}
          height={height}
          onClick={(e) => e.stopPropagation()}
        >
          <S.ModalInner>
            <S.ModalCloseButton onClick={toggleModal}>
              <CloseSVG width={25} height={25} stroke="#111" />
            </S.ModalCloseButton>
            {children}
          </S.ModalInner>
        </S.ModalWrapper>
      </S.ModalOverlay>
    </Portal>
  );
};

export default CustomModal;
