// MyComments.js
import React, { useEffect, useState } from 'react';

function MyComments() {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchMyComments = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('로그인이 필요합니다.');
                return;
            }
            try {
                const response = await fetch('http://localhost:8080/api/mypage/comments', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                setComments(data);
            } catch (error) {
                console.error('Error fetching my comments:', error);
            }
        };

        fetchMyComments();
    }, []);

    return (
        <div className="my-comments">
            <h2>내가 쓴 댓글</h2>
            <ul className="comment_list">
                {comments.map((comment) => (
                    <li key={comment.id}>
                        <p>{comment.content}</p>
                        <div className="comment_info">
                            <span className="comment_nickname">{comment.nickname}</span>
                            <span className="comment_date">{new Date(comment.createdDate).toLocaleString()}</span>
                            <span className="comment_likes">좋아요 {comment.likeCount}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MyComments;
