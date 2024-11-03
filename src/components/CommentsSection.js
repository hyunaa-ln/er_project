import React, { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import Comment from './Comment';

function CommentsSection({ comments, postId, setComments }) {
    const [isProcessing, setIsProcessing] = useState(false);
    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token);

    

    const handleDelete = async (commentId) => {
        try {
            const response = await fetch(`http://localhost:8080/api/posts/${postId}/comments/${commentId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) throw new Error(`Error: ${response.status}`);
            setComments((prev) => prev.filter((comment) => comment.id !== commentId));
        } catch (err) {
            console.error('Error deleting comment:', err);
        }
    };

    return (
        <div className="commentsSection">
            {comments.map((comment) => (
                <Comment
                    key={comment.id}
                    comment={comment}
                    postId={postId}
                    token={token}
                    decoded={decoded}
                    isProcessing={isProcessing}
                    setIsProcessing={setIsProcessing}
                    handleDelete={handleDelete}
                    handleEditSubmit={() => {}}
                />
            ))}
        </div>
    );
}

export default CommentsSection;
