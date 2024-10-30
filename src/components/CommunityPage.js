import React, { useState, useEffect, useCallback } from 'react';
import logo from '../assets/Logo.svg';
import searchIcon from '../assets/search.svg';
import edit from '../assets/edit.svg';
import { Link, useNavigate } from 'react-router-dom';

function CommunityPage() {
    const [activeTab, setActiveTab] = useState('tab1');
    const [posts, setPosts] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const navigate = useNavigate();

    // 게시글 클릭 시 해당 ID로 이동
    const handlePostClick = (postId) => {
        navigate(`/communityPost/${postId}`); // 게시글 ID를 URL로 전달
    };

    // 탭 변경 시 해당 데이터를 가져옵니다.
    useEffect(() => {
        fetchPosts(0); // 첫 페이지 데이터 가져오기
    }, [activeTab]);

    // 게시글을 API로부터 가져오는 함수
    const fetchPosts = useCallback(
        async (page) => {
            try {
                const endpoint =
                    activeTab === 'tab1'
                        ? 'http://localhost:8080/api/posts/latest'
                        : 'http://localhost:8080/api/posts/popular';
                const response = await fetch(`${endpoint}?page=${page}`);

                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }

                const data = await response.json();
                setPosts(data.data); // API 응답을 상태에 저장
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        },
        [activeTab]
    );

    useEffect(() => {
        fetchPosts(0);
    }, [fetchPosts]);
    // 검색 요청 함수
    const handleSearch = async (e) => {
        e.preventDefault(); // 폼의 기본 동작 방지
        try {
            const response = await fetch(`http://localhost:8080/api/posts/search?keyword=${searchKeyword}&page=0`);

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const data = await response.json();
            setPosts(data.data); // 검색 결과를 상태에 저장
        } catch (error) {
            console.error('Error searching posts:', error);
        }
    };

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="community">
            <div className="community_header">
                <h1>
                    <img src={logo} alt="logo" />
                    응급실 커뮤니티
                </h1>
                {/* 검색 폼 */}
                <form onSubmit={handleSearch}>
                    <input
                        type="search"
                        aria-label="Search"
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                    />
                    <button type="submit">
                        <img src={searchIcon} alt="search" />
                    </button>
                </form>
            </div>

            <div className="tabs">
                <button
                    className={`tab_button ${activeTab === 'tab1' ? 'active' : ''}`}
                    onClick={() => handleTabClick('tab1')}
                >
                    최신글
                </button>
                <button
                    className={`tab_button ${activeTab === 'tab2' ? 'active' : ''}`}
                    onClick={() => handleTabClick('tab2')}
                >
                    인기글
                </button>
            </div>

            <div className="tab_content">
                <ul className="tab_list">
                    {posts.map((item, index) => (
                        <li
                            key={item.id}
                            className={activeTab === 'tab2' ? 'popular' : ''}
                            onClick={() => handlePostClick(item.id)} // 클릭 시 이동
                        >
                            {activeTab === 'tab2' && <span className="rank">{index + 1}</span>}
                            <div>
                                <h3>{item.postTitle}</h3>
                                <span className="badge">{item.mbti}</span>
                            </div>
                            <div className="bottom_list">
                                <p className="l_name">{item.nickname}</p>
                                <p className="l_time">{item.time}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="addPost">
                <Link to="/newPost">
                    <button>
                        <img src={edit} alt="edit" />
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default CommunityPage;
