import React, { useState, useEffect, useRef } from 'react';
import BackButton from './BackButton';
import { Link } from 'react-router-dom';
import thumb from '../assets/ai.svg';
import commentBtn from '../assets/commentBtn.svg';

function SolutionPage() {
    const [messages, setMessages] = useState(() => {
        const savedMessages = localStorage.getItem('messages');
        return savedMessages
            ? JSON.parse(savedMessages)
            : [{ sender: 'bot', text: '안녕하세요! 알고 싶은 상대의 MBTI를 선택해주세요.' }];
    });
    const [selectedMbti, setSelectedMbti] = useState('');
    const [loading, setLoading] = useState(false);
    const [userQuestion, setUserQuestion] = useState('');

    const [choices] = useState([
        'ISTJ', 'ISFJ', 'INFJ', 'INTJ', 'ISTP', 'ISFP', 'INFP', 'INTP',
        'ESTP', 'ESFP', 'ENFP', 'ENTP', 'ESTJ', 'ESFJ', 'ENFJ', 'ENTJ'
    ]);

    const chatContainerRef = useRef(null);
    const isFirstLoad = useRef(true); // 첫 로드 상태 추적

    // 메시지가 업데이트될 때마다 최하단으로 스크롤
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollIntoView({
                behavior: isFirstLoad.current ? 'auto' : 'smooth', // 첫 로드 시 'auto' 사용
            });
            isFirstLoad.current = false; // 이후에는 smooth로 설정
        }
    }, [messages]);

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

                setMessages((prev) => [
                    ...prev,
                    { sender: 'bot', text: botResponse },
                    { sender: 'bot', text: '다시 알고 싶은 상대의 MBTI를 선택해주세요.' }
                ]);

                localStorage.setItem('latestSolution', botResponse);

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
                {/* 스크롤 이동을 위한 참조 */}
                <div ref={chatContainerRef} />
            </div>

            <div className="choices-container">
                {selectedMbti === '' ? (
                    <div className='choicesWrap'>
                        {choices.map((choice, index) => (
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
                            <img src={commentBtn} alt='commentBtn' />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SolutionPage;
