import React, { useState } from 'react';
import BackButton from './BackButton';
import { Link } from 'react-router-dom'
/*img*/
import thumb from '../assets/ai.svg'

function SolutionPage() {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: '안녕하세요! 알고싶은 상대의 엠비티아이를 선택해주세요.' }
  ]);
  
  // 선택지를 동적으로 변경할 수 있도록 상태로 관리
  const [choices, setChoices] = useState(["ISTJ", "ISFJ", "INFJ", "INTJ", "ISTP", "ISFP", "INFP", "INTP", "ESTP", "ESFP", "ENFP", "ENTP", "ESTJ", "ESFJ", "ENFJ", "ENTJ"]);

  const addMessage = async (sender, text) => {
    const newMessages = [...messages, { sender, text }];
    setMessages(newMessages);

    if (sender === 'user') {
      const botResponse = await getAIResponse(text);
      setMessages((prevMessages) => [...prevMessages, { sender: 'bot', text: botResponse }]);
      
      // AI 응답에 따라 선택지 업데이트
      updateChoices(botResponse);
    }
  };

  const getAIResponse = async (userMessage) => {
    // 예제 AI 응답
    const responses = {
      "INTJ": "오늘 날씨에 기반하여 최고의 연애 솔루션을 드립니다!",
      "ISFJ": "오늘 날씨에 기반하여 최고의 연애 솔루션을 드립니다!",
      "INFJ": "오늘 날씨에 기반하여 최고의 연애 솔루션을 드립니다!",
      "ISTJ": "오늘 날씨에 기반하여 최고의 연애 솔루션을 드립니다!",
      "ISTP": "오늘 날씨에 기반하여 최고의 연애 솔루션을 드립니다!",
      "이상형": "ㅇㅇ"
    };
    return responses[userMessage] || "죄송합니다, 이해하지 못했습니다.";
  };

  const updateChoices = (botResponse) => {
    // AI 응답에 따라 선택지 변경
    if (botResponse === "오늘 날씨에 기반하여 최고의 연애 솔루션을 드립니다!") {
      setChoices(["이상형", "데이트 코스", "선호 연락방식","좋아하는 플러팅","싫어하는 행동"]);
    } else if (botResponse.includes("결제를 진행할까요?")) {
      setChoices(["네, 결제할게요", "아니요, 메뉴를 더 볼게요"]);
    } else {
      setChoices(["이상형", "데이트 코스", "선호 연락방식","좋아하는 플러팅","싫어하는 행동"]);
    };

    if (botResponse === "ㅇㅇ") {
      setChoices(["그래"]);
    } else if (botResponse.includes("결제를 진행할까요?")) {
      setChoices(["네, 결제할게요", "아니요, 메뉴를 더 볼게요"]);
    } else {
      setChoices(["이상형", "데이트 코스", "선호 연락방식","좋아하는 플러팅","싫어하는 행동"]);
    }
  };
  
  return (
    <div className='solution'>
      <div className='topWrap'>
        <BackButton />
        <Link to='/'>
          <h1>
            연애솔루션
          </h1>
        </Link>
      </div>
      
      <div className="chat-container">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-bubble ${msg.sender}`}>
             {msg.sender === 'bot' && <img src={thumb} alt="Bot" className="bot-image" />}
             <span>{msg.text}</span>
          </div>
        ))}
      </div>
      <div className="choices-container">
        {choices.map((choice, index) => (
          <button key={index} className="choice-bubble" onClick={() => addMessage('user', choice)}>
            {choice}
          </button>
        ))}
      </div>
    </div>
  )
}

export default SolutionPage