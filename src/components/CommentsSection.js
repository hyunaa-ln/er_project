import React, { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import Comment from './Comment';

function CommentsSection({ comments, postId, setComments }) {
    const [newComment, setNewComment] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/api/posts/${postId}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ content: newComment }),
            });

            if (!response.ok) throw new Error(`Error: ${response.status}`);
            const createdComment = await response.json();
            setComments((prev) => [...prev, createdComment]);
            setNewComment('');
        } catch (err) {
            console.error('Error submitting comment:', err);
        }
    };

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
            <h3>Comments</h3>
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
            <form onSubmit={handleCommentSubmit}>
                <input
                    type="text"
                    placeholder="Write a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <button type="submit">Post</button>
            </form>
        </div>
    );
}

export default CommentsSection;
