import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import BackButton from './BackButton';
import PostContent from './PostContent';
import CommentsSection from './CommentsSection';
import CommentForm from './CommentForm';

function CommunityPostPage() {
    const { postId } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newComment, setNewComment] = useState('');
    const [isAuthor, setIsAuthor] = useState(false);

    // 토큰에서 username 추출
    const getUsernameFromToken = () => {
        const token = localStorage.getItem('token');
        if (!token) return null;
        try {
            const decoded = jwtDecode(token);
            console.log(decoded); // 토큰 내용 확인
            return decoded.username;
        } catch (err) {
            console.error('Error decoding token:', err);
            return null;
        }
    };

    useEffect(() => {
        const fetchPostAndComments = async () => {
            try {
                const postResponse = await fetch(`http://localhost:8080/api/posts/${postId}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });

                if (!postResponse.ok) throw new Error(`Error: ${postResponse.status}`);
                const postData = await postResponse.json();
                setPost(postData.data);

                // 게시물 작성자와 토큰의 사용자 비교
                const tokenUsername = getUsernameFromToken();
                setIsAuthor(postData.data.username === tokenUsername); // 작성자 확인

                const commentsResponse = await fetch(`http://localhost:8080/api/posts/${postId}/comments`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });

                if (!commentsResponse.ok) throw new Error(`Error: ${commentsResponse.status}`);
                const commentsData = await commentsResponse.json();
                setComments(commentsData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPostAndComments();
    }, [postId]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/api/posts/${postId}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ content: newComment }),
            });

            if (!response.ok) throw new Error(`Error: ${response.status}`);
            const createdComment = await response.json();
            setComments((prevComments) => [...prevComments, createdComment]);
            setNewComment('');
        } catch (err) {
            console.error('Error submitting comment:', err);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="communityPost">
            <BackButton />
            {post && (
                <PostContent
                    post={post}
                    isAuthor={isAuthor}
                    postId={postId}
                    navigate={navigate}
                />
            )}
            <CommentsSection
                comments={comments}
                postId={postId}
                setComments={setComments}
            />
            <CommentForm
                newComment={newComment}
                onCommentChange={(e) => setNewComment(e.target.value)}
                onCommentSubmit={handleCommentSubmit}
            />
        </div>
    );
}

export default CommunityPostPage;
