import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/Logo.svg';

function HomePage() {
    const [latestSolution, setLatestSolution] = useState('');
    const [popularPosts, setPopularPosts] = useState([]); // 인기 게시물 저장
    const [error, setError] = useState(''); // 오류 처리
    const [quote, setQuote] = useState(''); // 랜덤 명언 저장

    const quotes = [
        '사랑하는 것은 천국을 살짝 엿보는 것이다. -카렌 선드',
        '사랑이란 서로 마주 보는 것이 아니라, 둘이서 같은 방향을 바라보는 것이다. -생텍쥐페리',
        '사랑으로 행해진 일은 언제나 선 악을 초월한다. -프레드리히 니체',
        '사랑해서 사랑을 잃은 것은 전혀 사랑하지 않는 것보다 낫다. -알프레드 테니슨',
        '사랑을 품을 때 삶은 진정한 의미를 되찾는다. -세르반테스',
        '인생에서 가장 행복한 때는 누군가에게서 사랑받는다고 확신할 때이다. -빅토르 위고',
        '사랑에 의한 상처는 더 많이 사랑함으로써 치유된다. -헨리 데이빗 소로우',
        '사랑받고 싶다면 사랑하라. 그리고 사랑스럽게 행동하라. -벤저민 프랭클린',
        '사랑은 지배하는 것이 아니라 자유를 주는 것이다. -에리히 프롬',
        '사랑은 외투보다도 추위를 잘 막아 준다. -H.W. 롱펠로',
    ];

    useEffect(() => {
        const updateQuote = () => {
            const randomIndex = Math.floor(Math.random() * quotes.length);
            setQuote(quotes[randomIndex]);
        };

        updateQuote();
        const intervalId = setInterval(updateQuote, 30000);

        return () => clearInterval(intervalId);
    }, [quotes]);

    useEffect(() => {
        const savedSolution = localStorage.getItem('latestSolution');
        if (savedSolution) {
            setLatestSolution(savedSolution);
        }
    }, []);

    useEffect(() => {
        const fetchPopularPosts = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/posts/popular?page=0');
                if (!response.ok) {
                    throw new Error('인기 게시물을 불러오는 데 실패했습니다.');
                }
                const data = await response.json();
                setPopularPosts(data.data); // 응답 데이터 저장
            } catch (error) {
                setError(error.message);
                console.error('Error fetching popular posts:', error);
            }
        };
        fetchPopularPosts();
    }, []);

    return (
        <div>
            <Link to="/">
                <h1>
                    <img src={logo} alt="logo" />
                    응급실
                </h1>
            </Link>

            <div className="home_wordBox">
                <p>{quote}</p>
            </div>

            <div className="home_bestBox">
                <h2>BEST 게시물</h2>
                {error ? (
                    <p>{error}</p>
                ) : (
                    <ul>
                        {popularPosts.slice(0, 5).map(
                            (
                                post,
                                index // 처음 5개만 표시
                            ) => (
                                <li key={post.id}>
                                    <Link to={`/communityPost/${post.id}`}>
                                        <span>{index + 1}</span> {post.postTitle.length > 24 ? `${post.postTitle.substring(0, 24)}...` : post.postTitle}
                                    </Link>
                                </li>
                            )
                        )}
                    </ul>
                )}
            </div>

            <div className="home_recentBox">
                <h2>최근 솔루션</h2>
                <div>{latestSolution ? latestSolution : '아직 솔루션이 없습니다.'}</div>
            </div>
        </div>
    );
}

export default HomePage;
