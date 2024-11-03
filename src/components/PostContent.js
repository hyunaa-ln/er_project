import React, { useState, useEffect } from 'react';
import thumb from '../assets/Vector.svg';
import e_heart from '../assets/empty-heart.svg';
import f_heart from '../assets/full-heart.svg';

function PostContent({ post, isAuthor, postId, navigate }) {
    const [isLiked, setIsLiked] = useState(false); // 초기 상태 false로 설정
    const [likeCount, setLikeCount] = useState(post.likeCount);
    const [isProcessing, setIsProcessing] = useState(false);
    const [adviceContent, setAdviceContent] = useState('');

    useEffect(() => {
        // 좋아요 상태 서버에서 불러오기
        const fetchLikeStatus = async () => {
            try {
                console.log(post);
                const response = await fetch(`http://localhost:8080/api/posts/${postId}/is-liked`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                if (!response.ok) throw new Error(`Error: ${response.status}`);
                const isLiked = await response.json();
                setIsLiked(isLiked);
            } catch (err) {
                console.error('Error fetching like status:', err);
            }
        };
        fetchLikeStatus();
    }, [postId, post]);

    useEffect(() => {
        if (post.advice) {
            try {
                const parsedAdvice = JSON.parse(post.advice);
                setAdviceContent(parsedAdvice.choices[0].message.content);
            } catch (error) {
                console.warn('Advice is not in JSON format, using it as plain text');
                setAdviceContent(post.advice);
            }
        }
    }, [post.advice]);

    // 1. ISO 형식으로 직접 수정 시도
    const formatDate = (dateString) => {
        if (!dateString) return 'Invalid date';

        // ISO 형식으로 변환 시도
        const date = new Date(dateString.includes('T') ? dateString : `${dateString}T00:00:00`);

        if (isNaN(date.getTime())) return 'Invalid date';

        const formattedDate = date.toLocaleDateString('ko-KR', {
            year: '2-digit',
            month: '2-digit',
            day: '2-digit',
        });
        const formattedTime = date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });
        return `${formattedDate} ${formattedTime}`;
    };

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
                navigate('/community');
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
                    <p className="p_date">{formatDate(post.time)}</p>
                </div>
                {isAuthor && (
                    <div className="p_btnWrap">
                        <button className="p_btn p_editBtn" onClick={handleEdit}>
                            수정
                        </button>
                        <span></span>
                        <button className="p_btn p_deleteBtn" onClick={handleDelete}>
                            삭제
                        </button>
                    </div>
                )}
                <div
                    className={`p_heart ${isProcessing ? 'disabled' : ''}`}
                    onClick={toggleLike}
                    style={{ cursor: isProcessing ? 'not-allowed' : 'pointer' }}
                >
                    <img className="p_heart" src={isLiked ? f_heart : e_heart} alt="heart" />
                    <span>{likeCount}</span>
                </div>
            </div>
            <div className="mainTextWrap">
                <h2 className="postTitle">{post.postTitle}</h2>
                <p className="mainText">{post.postContent}</p>
                {adviceContent && (
                    <div className="adviceBox">
                        <strong>· </strong>
                        <span>{adviceContent}</span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PostContent;
