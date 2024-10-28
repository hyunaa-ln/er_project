import React, { useState } from 'react';
import { Link } from 'react-router-dom';
/*img*/
import logo from '../assets/Logo.svg';
import searchIcon from '../assets/search.svg';

function CommunityPage() {
    const [activeTab, setActiveTab] = useState('tab1');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const tabContent = {
        tab1: [
            { title: "본인 김정은인데 오물풍선 보내도 될까?", mbti: "ISTJ", name: "정은짱", time: "17:00", view: "조회 0" },
            { title: "본인 김정은인데 오물풍선 보내도 될까?", mbti: "ISTJ", name: "정은짱", time: "17:00", view: "조회 0" },
            { title: "본인 김정은인데 오물풍선 보내도 될까?", mbti: "ISTJ", name: "정은짱", time: "17:00", view: "조회 0" },
            { title: "본인 김정은인데 오물풍선 보내도 될까?", mbti: "ISTJ", name: "정은짱", time: "17:00", view: "조회 0" }
        ],
        tab2: [
            { title: "안됑 >,<", mbti: "ENFP", name: "엉탐", time: "17:00", view: "조회 0" },
            { title: "안됑 >,<", mbti: "ENFP", name: "엉탐", time: "17:00", view: "조회 0" },
            { title: "안됑 >,<", mbti: "ENFP", name: "엉탐", time: "17:00", view: "조회 0" }
        ]
    };

    return (
        <div className='community'>
            <div className='community_header'>
                <h1>
                    <img src={logo} alt='logo'/>
                    응급실 커뮤니티
                </h1>
                <form> 
                    <input type="search" aria-label="Search" />
                    <button type="submit"><img src={searchIcon} alt='search'></img></button>
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
                <ul className='tab_list'>
                    {tabContent[activeTab].map((item, index) => (
                        <li key={index}>
                            <Link to='/communityPost'>
                                <div>
                                    <h3>{item.title}</h3>
                                    <span className='badge'>{item.mbti}</span>
                                </div>
                                
                                <div className='bottom_list'>
                                    <p className='l_name'>{item.name}</p>
                                    <p className='l_time'>{item.time}</p>
                                    <p className='l_view'>{item.view}</p>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default CommunityPage;
