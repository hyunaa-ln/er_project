import { createContext, useState, useContext } from 'react';

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const openModal = (content) => {
    setModalContent(content); // 모달 콘텐츠 설정
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null); // 모달 닫을 때 콘텐츠 초기화
  };

  return (
    <ModalContext.Provider value={{ isModalOpen, openModal, closeModal, modalContent }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  return useContext(ModalContext);
}