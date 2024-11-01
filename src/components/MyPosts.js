// MyPosts.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function MyPosts() {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMyPosts = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('로그인이 필요합니다.');
                navigate('/login');
                return;
            }
            try {
                const response = await fetch('http://localhost:8080/api/mypage/posts', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                setPosts(data);
            } catch (error) {
                console.error('Error fetching my posts:', error);
            }
        };

        fetchMyPosts();
    }, [navigate]);

    const handlePostClick = (postId) => {
        navigate(`/communityPost/${postId}`);
    };

    return (
        <div className="my-posts">
            <h2>내가 쓴 글</h2>
            <ul className="tab_list">
                {posts.map((post) => (
                    <li key={post.id} onClick={() => handlePostClick(post.id)}>
                        <h3>{post.postTitle}</h3>
                        <span className="category">{post.mbti}</span>
                        <div className="bottom_list">
                            <p className="l_name">{post.nickname}</p>
                            <p className="l_time">{new Date(post.time).toLocaleString()}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MyPosts;
