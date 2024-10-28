import React, { useState } from 'react';
import BackButton from './BackButton';
import { Link } from 'react-router-dom';
import thumb from '../assets/ai.svg';

function SolutionPage() {
    const [messages, setMessages] = useState([
        { sender: 'bot', text: '안녕하세요! 알고 싶은 상대의 MBTI를 선택해주세요.' },
    ]);
    const [selectedMbti, setSelectedMbti] = useState('');
    const [loading, setLoading] = useState(false); // 로딩 상태 관리
    const [choices, setChoices] = useState([
        'ISTJ',
        'ISFJ',
        'INFJ',
        'INTJ',
        'ISTP',
        'ISFP',
        'INFP',
        'INTP',
        'ESTP',
        'ESFP',
        'ENFP',
        'ENTP',
        'ESTJ',
        'ESFJ',
        'ENFJ',
        'ENTJ',
    ]);
    const [questionTypes, setQuestionTypes] = useState([]);

    const addMessage = async (sender, text) => {
        const newMessages = [...messages, { sender, text }];
        setMessages(newMessages);

        if (sender === 'user') {
            if (choices.includes(text)) {
                setSelectedMbti(text); // 선택한 MBTI 저장
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { sender: 'bot', text: '오늘 날씨에 기반하여 최고의 연애 솔루션을 드립니다!' },
                ]);
                setQuestionTypes(['이상형', '데이트 코스', '선호하는 연락방식', '좋아하는 플러팅', '싫어하는 행동']);
            } else {
                setLoading(true); // 로딩 시작
                const botResponse = await askChatbot(selectedMbti, text); // API 호출
                setMessages((prevMessages) => [...prevMessages, { sender: 'bot', text: botResponse }]);
                setQuestionTypes([]); // 질문 완료 후 초기화
                setLoading(false); // 로딩 종료
            }
        }
    };

    const askChatbot = async (mbti, questionType) => {
        const token = localStorage.getItem('token'); // 토큰 가져오기

        try {
            const response = await fetch('http://localhost:8080/chatbot/ask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`, // 토큰 포함
                },
                body: JSON.stringify({ mbti, questionType }),
            });

            if (response.ok) {
                const data = await response.json();
                return data.choices[0].message.content; // 응답의 content 내용만 반환
            } else {
                return '질문 처리에 실패했습니다.';
            }
        } catch (error) {
            console.error('Error:', error);
            return '서버와 통신 중 오류가 발생했습니다.';
        }
    };

    return (
        <div className="solution">
            <div className="topWrap">
                <BackButton />
                <Link to="/">
                    <h1>연애솔루션</h1>
                </Link>
            </div>

            <div className="chat-container">
                {messages.map((msg, index) => (
                    <div key={index} className={`chat-bubble ${msg.sender}`}>
                        {msg.sender === 'bot' && <img src={thumb} alt="Bot" className="bot-image" />}
                        <span>{msg.text}</span>
                    </div>
                ))}
                {loading && <div className="loading">로딩 중...</div>} {/* 로딩 표시 */}
            </div>

            <div className="choices-container">
                {(questionTypes.length === 0 ? choices : questionTypes).map((choice, index) => (
                    <button
                        key={index}
                        className="choice-bubble"
                        onClick={() => addMessage('user', choice)}
                        disabled={loading} // 로딩 중에는 선택 비활성화
                    >
                        {choice}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default SolutionPage;
