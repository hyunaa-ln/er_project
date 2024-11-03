import React, { useState, useEffect, useCallback } from 'react';
import logo from '../assets/Logo.svg';
import searchIcon from '../assets/search.svg';
import edit from '../assets/edit.svg';
import { Link, useNavigate } from 'react-router-dom';

function CommunityPage() {
    const [activeTab, setActiveTab] = useState('tab1');
    const [posts, setPosts] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [searchResult, setSearchResult] = useState({ isActive: false, keyword: '' });
    const [page, setPage] = useState(0);
    const [isFetching, setIsFetching] = useState(false);
    const navigate = useNavigate();

    const handlePostClick = (postId) => {
        navigate(`/communityPost/${postId}`);
    };

    const fetchPosts = useCallback(
        async (page, isNewTab = false) => {
            if (activeTab !== 'tab1') return;
            setIsFetching(true);
            try {
                const response = await fetch(`http://localhost:8080/api/posts/latest?page=${page}`);
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const data = await response.json();
                setPosts((prevPosts) => (isNewTab ? data.data : [...prevPosts, ...data.data]));
                setSearchResult({ isActive: false, keyword: '' });
            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {
                setIsFetching(false);
            }
        },
        [activeTab] // `activeTab`이 바뀔 때 함수가 재생성됩니다.
    );

    const fetchPopularPosts = useCallback(async () => {
        setIsFetching(true);
        try {
            const response = await fetch(`http://localhost:8080/api/posts/popular`);
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json();
            setPosts(data.data); // 인기글은 처음에 불러온 10개만 설정
        } catch (error) {
            console.error('Error fetching popular posts:', error);
        } finally {
            setIsFetching(false);
        }
    }, []);

    useEffect(() => {
        if (activeTab === 'tab1') {
            fetchPosts(0, true);
        } else if (activeTab === 'tab2') {
            fetchPopularPosts();
        }
    }, [activeTab, fetchPosts, fetchPopularPosts]);

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop >=
                    document.documentElement.offsetHeight - 100 &&
                !isFetching
            ) {
                setPage((prevPage) => prevPage + 1);
            }
        };

        if (activeTab === 'tab1') {
            window.addEventListener('scroll', handleScroll);
        } else {
            window.removeEventListener('scroll', handleScroll);
        }

        return () => window.removeEventListener('scroll', handleScroll);
    }, [isFetching, activeTab]);

    useEffect(() => {
        if (page > 0 && activeTab === 'tab1') {
            fetchPosts(page);
        }
    }, [page, fetchPosts, activeTab]);

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/api/posts/search?keyword=${searchKeyword}&page=0`);
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json();
            setPosts(data.data);
            setSearchResult({ isActive: true, keyword: searchKeyword });
        } catch (error) {
            console.error('Error searching posts:', error);
        }
    };

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        setPage(0);
    };

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
        return `${formattedDate} ${formattedTime}`;
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

            {searchResult.isActive && <p className="search-result-text">"{searchResult.keyword}" 검색결과</p>}

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
                                <h3>
                                    {item.postTitle.length > 25
                                        ? `${item.postTitle.substring(0, 25)}...`
                                        : item.postTitle}
                                </h3>
                                <span className="category">{item.mbti}</span>
                            </div>
                            <div className="bottom_list">
                                <p className="l_name">{item.nickname}</p>
                                <p className="l_time">{formatDate(item.time)}</p>
                            </div>
                        </li>
                    ))}
                </ul>
                {isFetching && activeTab === 'tab1' && <p>Loading more posts...</p>}
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
