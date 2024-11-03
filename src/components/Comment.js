import React, { useState, useEffect } from 'react';
import e_heart from '../assets/empty-heart.svg';
import f_heart from '../assets/full-heart.svg';
import thumb from '../assets/Vector.svg';

function Comment({ comment, postId, token, decoded, isProcessing, setIsProcessing, handleDelete, handleEditSubmit }) {
    const [isLiked, setIsLiked] = useState(false); // 초기 상태는 false로 설정
    const [likeCount, setLikeCount] = useState(comment.likeCount);
    const [editedContent, setEditedContent] = useState(comment.content);
    const [isEditing, setIsEditing] = useState(false);

    // 댓글 좋아요 상태를 서버에서 불러오기
    useEffect(() => {
        const fetchLikeStatus = async () => {
            try {
                const response = await fetch(
                    `http://localhost:8080/api/posts/${postId}/comments/${comment.id}/is-liked`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                if (!response.ok) throw new Error(`Error: ${response.status}`);
                const isLiked = await response.json();
                setIsLiked(isLiked);
            } catch (err) {
                console.error('Error fetching like status:', err);
            }
        };
        fetchLikeStatus();
    }, [postId, comment.id, token]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
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
        return `${formattedDate}<br />${formattedTime}`;
    };

    const handleToggleLike = async () => {
        if (isProcessing) return;
        setIsProcessing(true);

        const endpoint = isLiked
            ? `http://localhost:8080/api/posts/${postId}/comments/${comment.id}/unlike`
            : `http://localhost:8080/api/posts/${postId}/comments/${comment.id}/like`;

        try {
            const response = await fetch(endpoint, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) throw new Error(`Error: ${response.status}`);

            const data = await response.json();
            setIsLiked(!isLiked);
            setLikeCount(data.likeCount);
        } catch (err) {
            console.error('Error toggling like:', err);
        } finally {
            setIsProcessing(false);
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/posts/${postId}/comments/${comment.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ content: editedContent }),
            });

            if (!response.ok) throw new Error(`Error: ${response.status}`);

            const updatedComment = await response.json();
            setEditedContent(updatedComment.content);
            setIsEditing(false);
        } catch (err) {
            console.error('Error updating comment:', err);
        }
    };

    return (
        <div className="comment">
            <img src={thumb} alt="thumb" className="comment_thumb" />
            <div className="commentBox">
                <div className="commentWrapWrap">
                    <div className="commentWrap">
                        <p>{comment.nickname}</p>
                        <span className="badge">{comment.myMbti}</span>
                        {decoded.username === comment.username && (
                            <div className="commentActions c_btnWrap">
                                {isEditing ? (
                                    <button className="c_btn c_editBtn" onClick={handleSave}>
                                        저장
                                    </button>
                                ) : (
                                    <button className="c_btn c_editBtn" onClick={handleEdit}>
                                        수정
                                    </button>
                                )}
                                <span></span>
                                <button className="c_btn c_deleteBtn" onClick={() => handleDelete(comment.id)}>
                                    삭제
                                </button>
                            </div>
                        )}
                    </div>
                    {isEditing ? (
                        <input type="text" value={editedContent} onChange={(e) => setEditedContent(e.target.value)} />
                    ) : (
                        <p className="commentContent">{editedContent}</p>
                    )}
                </div>
            </div>
            <div className="commentRight">
                <p className="c_date" dangerouslySetInnerHTML={{ __html: formatDate(comment.createdDate) }}></p>
                <div
                    className={`c_heart ${isProcessing ? 'disabled' : ''}`}
                    onClick={handleToggleLike}
                    style={{ cursor: isProcessing ? 'not-allowed' : 'pointer' }}
                >
                    <img src={isLiked ? f_heart : e_heart} alt="heart" />
                    <span>{likeCount}</span>
                </div>
            </div>
        </div>
    );
}

export default Comment;
