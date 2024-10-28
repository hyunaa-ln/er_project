import React from 'react'
import { Link } from 'react-router-dom'
/*img*/
import logo from '../assets/Logo.svg'

function HomePage() {
  return (
    <div>
        <Link to='/'>
            <h1>
                <img src={logo} alt='logo'/>
                응급실
            </h1>
        </Link>

        <div className='home_wordBox'>
            <p>너에게 가지 않으려고 미친 듯 걸었던 그 무수한 길도 실은 네게로 향한 것이었다.</p>
            <p>나희덕, &lt;푸른 밤 중&gt;</p>
        </div>

        <div className='home_bestBox'>
            <h2>BEST 게시물</h2>
            <ul>
                <li><Link to=''><span>1</span>스윙스랑 싸웠는데 이유를 알겠습니다</Link></li>
                <li><Link to=''><span>2</span>스윙스랑 시진핑은 믿고 걸러라 ㅋㅋㅋ</Link></li>
                <li><Link to=''><span>3</span>트럼프 원래 정상회담할 때 이렇게 입고도 나오나요?</Link></li>
            </ul>
        </div>

        <div className='home_recentBox'>
            <h2>최근 솔루션</h2>
            <div>
                은미에게 답장을 보낼 때에는 이렇게 해볼 수 있어요:<br />
                1. "그냥"<br />
                2. "일"<br />
                3. "드라마"<br />
                4. "방금 밥"<br /> 
            </div>
        </div>
    </div>
  )
}

export default HomePage