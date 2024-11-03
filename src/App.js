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
import MyPosts from './components/MyPosts';
import MyComments from './components/MyComments';
import NewPostPage from './components/NewPostPage';
import NickNamePage from './components/NickNamePage';
import PwdPage from './components/PwdPage';
import ResetMbitPage from './components/ResetMbtiPage';
import ResetPwdPage from './components/ResetPwdPage';
import RootLayout from './components/RootLayout';
import SetMbtiPage from './components/SetMbtiPage';
import SetNewPwdPage from './components/SetNewPwdPage';
import SolutionPage from './components/SolutionPage';
import AlertModal from './components/AlertModal';
import NotFoundPage from './components/NotFoundPage';
import ProtectedRoute from './components/ProtectedRoute'; // ProtectedRoute 임포트

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
                    <Route path="/my-posts" element={<MyPosts />} />
                    <Route path="/my-comments" element={<MyComments />} />
                    <Route path="setMbti" element={<SetMbtiPage />} />
                    <Route path="getMbti" element={<GetMbtiPage />} />
                    {/* 보호된 라우트 */}
                    <Route element={<ProtectedRoute />}>
                        <Route path="solution" element={<SolutionPage />} />
                        <Route path="communityPost/:postId" element={<CommunityPostPage />} />
                    </Route>
                    <Route path="community" element={<CommunityPage />} />
                    <Route path="newPost" element={<NewPostPage />} />
                    <Route path="editPost/:postId" element={<EditPostPage />} />
                    <Route path="resetMbti" element={<ResetMbitPage />} />
                    <Route path="resetPwd" element={<ResetPwdPage />} />
                </Route>

                {/* 404 Not Found 페이지 */}
                <Route path="*" element={<NotFoundPage />} />
            </>
        )
    );

    return (
        <ModalProvider>
            <RouterProvider router={router} />
            <AlertModalWrapper />
        </ModalProvider>
    );

    function AlertModalWrapper() {
        const { isModalOpen, closeModal, modalContent } = useModal();

        return (
            <AlertModal isOpen={isModalOpen} onClose={closeModal}>
                {modalContent}
            </AlertModal>
        );
    }
};

export default App;
