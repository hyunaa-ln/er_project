import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // import 수정
import BackButton from './BackButton';
import thumb from '../assets/Vector.svg';
import e_heart from '../assets/empty-heart.svg';
import f_heart from '../assets/full-heart.svg';

function CommunityPostPage() {
    const { postId } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [isProcessing, setIsProcessing] = useState(false);
    const [newComment, setNewComment] = useState('');
    const [isAuthor, setIsAuthor] = useState(false);

    const adviceContent = post?.advice || '조언을 불러오지 못했습니다.';
    // 토큰에서 username 추출
    const getUsernameFromToken = () => {
        const token = localStorage.getItem('token');
        if (!token) return null;
        try {
            const decoded = jwtDecode(token); // 수정된 import 사용
            console.log(decoded); // 토큰 내용 확인
            return decoded.username; // 올바른 필드명 확인
        } catch (err) {
            console.error('Error decoding token:', err);
            return null;
        }
    };

    const toggleCommentHeart = (commentId) => {
        setComments((prevComments) =>
            prevComments.map((comment) =>
                comment.id === commentId
                    ? {
                          ...comment,
                          isLiked: !comment.isLiked,
                          likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
                      }
                    : comment
            )
        );
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
            localStorage.setItem(`like-${postId}`, !isLiked);
        } catch (err) {
            console.error('Error toggling like:', err);
        } finally {
            setIsProcessing(false);
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
                setLikeCount(postData.data.likeCount);

                // 게시물 작성자와 토큰의 사용자 비교
                const tokenUsername = getUsernameFromToken();
                setIsAuthor(postData.data.username === tokenUsername); // 작성자 확인

                setIsLiked(postData.data.isLiked || localStorage.getItem(`like-${postId}`) === 'true');

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

    const handleEdit = () => {
        navigate(`/editPost/${postId}`); // 경로가 정확한지 확인
    };

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
            <div className="mainPost">
                <div className="profileBox">
                    <img src={thumb} alt="thumb" className="main_thumb" />
                    <div className="profile">
                        <p>{post.nickname}</p>
                        <span className="badge">{post.myMbti}</span>
                    </div>
                    {isAuthor && (
                        <div className="p_btnWrap">
                            <button className="p_editBtn" onClick={handleEdit}>
                                수정
                            </button>
                            <button className="p_deleteBtn" onClick={handleDelete}>
                                삭제
                            </button>
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
                    <p className="mainText">{post.postContent}</p>
                    {adviceContent && (
                        <div className="aiAdvice">
                            <p>
                                <strong>AI의 조언!</strong> {adviceContent}
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <div className="commentsSection">
                <h3>Comments</h3>
                {comments.map((comment) => (
                    <div key={comment.id} className="comment">
                        <div className="profileBox">
                            <img src={thumb} alt="thumb" className="main_thumb" />
                            <div className="profile">
                                <p>{comment.nickname}</p>
                                <span className="badge">{comment.myMbti}</span>
                                <p className="commentContent">{comment.content}</p>
                            </div>
                        </div>
                        <div className="commentRight">
                            <div className="commentDate">
                                <p>{new Date(comment.createdDate).toLocaleDateString()}</p>
                                <p>
                                    {new Date(comment.createdDate).toLocaleTimeString([], {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <form className="commentForm" onSubmit={handleCommentSubmit}>
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

export default CommunityPostPage;
