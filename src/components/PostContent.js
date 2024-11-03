import React, { useState, useEffect } from 'react';
import thumb from '../assets/Vector.svg';
import e_heart from '../assets/empty-heart.svg';
import f_heart from '../assets/full-heart.svg';

function PostContent({ post, isAuthor, postId, navigate }) {
    const [isLiked, setIsLiked] = useState(post.isLiked || localStorage.getItem(`like-${postId}`) === 'true');
    const [likeCount, setLikeCount] = useState(post.likeCount);
    const [isProcessing, setIsProcessing] = useState(false);
    const [adviceContent, setAdviceContent] = useState(''); // 상태 추가

    useEffect(() => {
        console.log('Raw advice data:', post.advice);

        if (post.advice) {
            // JSON 형식 확인: JSON 형식이면 파싱하고, 아니면 그대로 설정
            try {
                const parsedAdvice = JSON.parse(post.advice);
                setAdviceContent(parsedAdvice.choices[0].message.content);
            } catch (error) {
                console.warn('Advice is not in JSON format, using it as plain text');
                setAdviceContent(post.advice); // 단순 텍스트일 경우 그대로 사용
            }
        }
    }, [post.advice]);

    const toggleLike = async () => {
        if (isProcessing) return;
        setIsProcessing(true);

        const endpoint = isLiked
            ? `http://localhost:8080/api/posts/${postId}/unlike`
            : `http://localhost:8080/api/posts/${postId}/like`;

        try {
            const response = await fetch(endpoint, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (!response.ok) throw new Error(`Error: ${response.status}`);
            const data = await response.json();

            setIsLiked(!isLiked);
            setLikeCount(data.data.likeCount);
            localStorage.setItem(`like-${postId}`, !isLiked);
        } catch (err) {
            console.error('Error toggling like:', err);
        } finally {
            setIsProcessing(false);
        }
    };

    const handleEdit = () => navigate(`/editPost/${postId}`);

    const handleDelete = async () => {
        if (window.confirm('정말 이 게시물을 삭제하시겠습니까?')) {
            try {
                await fetch(`http://localhost:8080/api/posts/${postId}`, {
                    method: 'DELETE',
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                alert('게시물이 삭제되었습니다.');
                navigate('/community'); // 커뮤니티 페이지로 이동
            } catch (err) {
                console.error('Error deleting post:', err);
            }
        }
    };

    return (
        <div className="mainPost">
            <div className="profileBox">
                <img src={thumb} alt="thumb" className="main_thumb" />
                <div className="profile">
                    <p>{post.nickname}</p>
                    <span className="badge">{post.myMbti}</span>
                </div>
                {isAuthor && (
                    <div className="p_btnWrap">
                        <button className="p_btn p_editBtn" onClick={handleEdit}>수정</button>
                        <span></span>
                        <button className="p_btn p_deleteBtn" onClick={handleDelete}>삭제</button>
                    </div>
                )}
                <div
                    className={`p_heart ${isProcessing ? 'disabled' : ''}`}
                    onClick={toggleLike}
                    style={{ cursor: isProcessing ? 'not-allowed' : 'pointer' }}
                >
                    <img className='p_heart' src={isLiked ? f_heart : e_heart} alt="heart" />
                    <span>{likeCount}</span>
                </div>
            </div>
            <div className="mainTextWrap">
                <p className='mainText'>{post.postContent}</p>
                {adviceContent && (
                    <div className="adviceBox">
                        <strong>· </strong><span>{adviceContent}</span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PostContent;
