import React, { useState, useEffect } from 'react';
import thumb from '../assets/Vector.svg';
import e_heart from '../assets/empty-heart.svg';
import f_heart from '../assets/full-heart.svg';

function PostContent({ post, isAuthor, postId, navigate }) {
    const [isLiked, setIsLiked] = useState(post.isLiked || localStorage.getItem(`like-${postId}`) === 'true');
    const [likeCount, setLikeCount] = useState(post.likeCount);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        // Log the advice data to check its structure
        console.log('Raw advice data:', post.advice);

        // Try parsing the advice field safely
        if (post.advice) {
            try {
                const parsedAdvice = JSON.parse(post.advice);
                setAdviceContent(parsedAdvice.choices[0].message.content);
            } catch (error) {
                console.error('Error parsing advice:', error);
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

            console.log(data);

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
                navigate('/');
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
                        <button onClick={handleEdit}>수정</button>
                        <button onClick={handleDelete}>삭제</button>
                    </div>
                )}
                <div
                    className={`p_heart ${isProcessing ? 'disabled' : ''}`}
                    onClick={toggleLike}
                    style={{ cursor: isProcessing ? 'not-allowed' : 'pointer' }}
                >
                    <img src={isLiked ? f_heart : e_heart} alt="heart" />
                    <span>{likeCount}</span>
                </div>
            </div>
            <div className="mainTextWrap">
                <p>{post.postContent}</p>
                {adviceContent && (
                    <div className="adviceBox">
                        <strong>AI의 조언!</strong> <span>{adviceContent}</span>
                    </div>
                )}
            </div>
            <div className="mainTextWrap">
                <p>{post.postContent}</p>
            </div>
        </div>
    );
}

export default PostContent;
