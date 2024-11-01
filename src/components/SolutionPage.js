import React, { useState, useEffect } from 'react';
import BackButton from './BackButton';
import { Link } from 'react-router-dom';
import thumb from '../assets/ai.svg';

function SolutionPage() {
    const [messages, setMessages] = useState(() => {
        const savedMessages = localStorage.getItem('messages');
        return savedMessages
            ? JSON.parse(savedMessages)
            : [{ sender: 'bot', text: '안녕하세요! 알고 싶은 상대의 MBTI를 선택해주세요.' }];
    });
    useEffect(() => {
        window.scrollTo(0, document.body.scrollHeight); // 페이지 로드 시 최하단으로 이동
      }, []);

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
    const [userQuestion, setUserQuestion] = useState('');

    useEffect(() => {
        localStorage.setItem('messages', JSON.stringify(messages));
    }, [messages]);

    const addMessage = async (sender, text) => {
        const newMessages = [...messages, { sender, text }];
        setMessages(newMessages);

        if (sender === 'user') {
            if (choices.includes(text)) {
                setSelectedMbti(text);
                setMessages((prev) => [...prev, { sender: 'bot', text: '알고 싶은 내용을 자유롭게 입력해주세요!' }]);
            } else {
                setLoading(true);
                const botResponse = await askChatbot(selectedMbti, text);

                setMessages((prev) => [...prev, { sender: 'bot', text: botResponse }]);

                localStorage.setItem('latestSolution', botResponse);

                setMessages((prev) => [...prev, { sender: 'bot', text: '다시 알고 싶은 상대의 MBTI를 선택해주세요.' }]);

                setLoading(false);
                setSelectedMbti('');
                setUserQuestion('');
            }
        }
    };

    const askChatbot = async (mbti, question) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch('http://localhost:8080/chatbot/ask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ mbti, question }),
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

    const handleQuestionSubmit = () => {
        if (userQuestion.trim() && selectedMbti) {
            addMessage('user', userQuestion);
        } else {
            alert('먼저 MBTI를 선택하고 질문을 입력하세요.');
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
                {loading && (
                    <div className="loading">
                        <img src={thumb} alt="Bot" className="bot-image" />
                        <div>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                )}
            </div>

            <div className="choices-container">
                {selectedMbti === '' ? (
                    choices.map((choice, index) => (
                        <button
                            key={index}
                            className="choice-bubble"
                            onClick={() => addMessage('user', choice)}
                            disabled={loading}
                        >
                            {choice}
                        </button>
                    ))
                ) : (
                    <div className="input-container">
                        <input
                            type="text"
                            value={userQuestion}
                            onChange={(e) => setUserQuestion(e.target.value)}
                            placeholder="궁금한 내용을 입력하세요..."
                            disabled={loading}
                        />
                        <button onClick={handleQuestionSubmit} disabled={loading}>
                            질문하기
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SolutionPage;
