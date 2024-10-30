import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';
import { ModalProvider, useModal } from './components/ModalContext';
import './App.css';


import CodePage from './components/CodePage';
import CommunityPage from './components/CommunityPage';
import CommunityPostPage from './components/CommunityPostPage';
import EditPostPage from './components/EditPostPage';
import FindPwdCodePage from './components/FindPwdCodePage';
import FindPwdPage from './components/FindPwdPage';
import GetMbtiPage from './components/GetMbtiPage';
import HomePage from './components/HomePage';
import IDLayout from './components/IDLayout';
import JoinCompletePage from './components/JoinCompletePage';
import JoinPage from './components/JoinPage';
import LoginPage from './components/LoginPage';
import MyPage from './components/MyPage';
import NewPostPage from './components/NewPostPage';
import NickNamePage from './components/NickNamePage';
import PwdPage from './components/PwdPage';
import RootLayout from './components/RootLayout';
import SetMbtiPage from './components/SetMbtiPage';
import SetNewPwdPage from './components/SetNewPwdPage';
import SolutionPage from './components/SolutionPage';
import NotFoundPage from './components/NotFoundPage';
import AlertModal from './components/AlertModal';

const App = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path="/" element={<RootLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path="login" element={<LoginPage />} />
                    {/* ID 관련 페이지 중첩 */}
                    <Route path="id" element={<IDLayout />}>
                        <Route path="findPwd" element={<FindPwdPage />} />
                        <Route path="findPwdCode" element={<FindPwdCodePage />} />
                        <Route path="setNewPwd" element={<SetNewPwdPage />} />
                        <Route path="join" element={<JoinPage />} />
                        <Route path="code" element={<CodePage />} />
                        <Route path="pwd" element={<PwdPage />} />
                        <Route path="nickName" element={<NickNamePage />} />
                    </Route>
                    <Route path="joinComplete" element={<JoinCompletePage />} />
                    <Route path="myPage" element={<MyPage />} />
                    <Route path="setMbti" element={<SetMbtiPage />} />
                    <Route path="getMbti" element={<GetMbtiPage />} />
                    <Route path="solution" element={<SolutionPage />} />
                    {/* Community 관련 페이지 */}
                    <Route path="community" element={<CommunityPage />} />
                    <Route path="communityPost/:postId" element={<CommunityPostPage />} /> {/* 동적 라우트 설정 */}
                    <Route path="newPost" element={<NewPostPage />} />
                    <Route path="editPost/:postId" element={<EditPostPage />} /> {/* 동적 라우트 수정 */}
                </Route>

                {/* 404 Not Found 페이지 */}
                <Route path="*" element={<NotFoundPage />} />
            </>
        )
    );

<<<<<<< HEAD
    return <RouterProvider router={router} />;
=======
  return (
    <ModalProvider>
      <RouterProvider router={router} />
      <AlertModalWrapper />
    </ModalProvider>
  );
>>>>>>> c20edb7c89749238c2c52f915ce33026387868d1
};

function AlertModalWrapper() {
  const { isModalOpen, closeModal, modalContent } = useModal();

  return (
    <AlertModal isOpen={isModalOpen} onClose={closeModal}>
      {modalContent}
    </AlertModal>
  );
}

export default App;
