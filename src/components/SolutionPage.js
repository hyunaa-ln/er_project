import React, { useState, useEffect } from 'react';
import BackButton from './BackButton';
import { Link } from 'react-router-dom';
import thumb from '../assets/ai.svg';

function SolutionPage() {
    const [messages, setMessages] = useState(() => {
        // 페이지가 로드될 때 localStorage에서 상태 복원
        const savedMessages = localStorage.getItem('messages');
        return savedMessages
            ? JSON.parse(savedMessages)
            : [{ sender: 'bot', text: '안녕하세요! 알고 싶은 상대의 MBTI를 선택해주세요.' }];
    });

    const [selectedMbti, setSelectedMbti] = useState('');
    const [loading, setLoading] = useState(false);
    const [choices] = useState([
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

    // 메시지 상태가 변경될 때마다 localStorage에 저장
    useEffect(() => {
        localStorage.setItem('messages', JSON.stringify(messages));
    }, [messages]);

    const addMessage = async (sender, text) => {
        const newMessages = [...messages, { sender, text }];
        setMessages(newMessages);

        if (sender === 'user') {
            if (choices.includes(text)) {
                setSelectedMbti(text);
                setMessages((prev) => [
                    ...prev,
                    { sender: 'bot', text: '오늘 날씨에 기반하여 최고의 연애 솔루션을 드립니다!' },
                ]);
                setQuestionTypes(['이상형', '데이트 코스', '선호하는 연락방식', '좋아하는 플러팅', '싫어하는 행동']);
            } else {
                setLoading(true);
                const botResponse = await askChatbot(selectedMbti, text);

                setMessages((prev) => [...prev, { sender: 'bot', text: botResponse }]);

                // 최신 솔루션을 localStorage에 저장
                localStorage.setItem('latestSolution', botResponse);

                // 질문 후 초기화하고 다시 MBTI 선택 메시지 추가
                setMessages((prev) => [...prev, { sender: 'bot', text: '알고 싶은 상대의 MBTI를 선택해주세요.' }]);

                setQuestionTypes([]);
                setLoading(false);
            }
        }
    };

    const askChatbot = async (mbti, questionType) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch('http://localhost:8080/chatbot/ask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ mbti, questionType }),
            });

            if (response.ok) {
                const data = await response.json();
                return data.choices[0].message.content;
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
                {loading && <div className="loading">
                    <img src={thumb} alt="Bot" className="bot-image" />
                    <div>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    </div>}
            </div>

            <div className="choices-container">
                {(questionTypes.length === 0 ? choices : questionTypes).map((choice, index) => (
                    <button
                        key={index}
                        className="choice-bubble"
                        onClick={() => addMessage('user', choice)}
                        disabled={loading}
                    >
                        {choice}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default SolutionPage;