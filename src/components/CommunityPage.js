import React, { useState, useEffect, useCallback } from 'react';
import logo from '../assets/Logo.svg';
import searchIcon from '../assets/search.svg';
import edit from '../assets/edit.svg';
import { Link, useNavigate } from 'react-router-dom';

function CommunityPage() {
    const [activeTab, setActiveTab] = useState('tab1');
    const [posts, setPosts] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [searchResult, setSearchResult] = useState({ isActive: false, keyword: '' }); // 검색 결과와 키워드 저장
    const navigate = useNavigate();

    const handlePostClick = (postId) => {
        navigate(`/communityPost/${postId}`);
    };

    useEffect(() => {
        fetchPosts(0);
    }, [activeTab]);

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
                setPosts(data.data);
                setSearchResult({ isActive: false, keyword: '' }); // 탭 변경 시 검색 결과 리셋
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        },
        [activeTab]
    );

    useEffect(() => {
        fetchPosts(0);
    }, [fetchPosts]);

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/api/posts/search?keyword=${searchKeyword}&page=0`);

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const data = await response.json();
            setPosts(data.data);
            setSearchResult({ isActive: true, keyword: searchKeyword }); // 검색 결과 상태와 키워드 설정
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

            {searchResult.isActive && (
                <p className="search-result-text">"{searchResult.keyword}" 검색결과</p>
            )} {/* 검색 결과와 키워드 표시 */}

            <div className="tab_content">
                <ul className="tab_list">
                    {posts.map((item, index) => (
                        <li
                            key={item.id}
                            className={activeTab === 'tab2' ? 'popular' : ''}
                            onClick={() => handlePostClick(item.id)}
                        >
                            {activeTab === 'tab2' && <span className="rank">{index + 1}</span>}
                            <div>
                                <h3>{item.postTitle}</h3>
                                <span className="category">{item.mbti}</span>
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
