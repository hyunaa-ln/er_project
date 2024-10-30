import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from './BackButton';
/*img*/
import check from '../assets/checkmark-sharp.svg';

function ResetMbtiPage() {
    const [choices, setChoices] = useState({
        EI: '',
        SN: '',
        TF: '',
        PJ: '',
    });

    const navigate = useNavigate();

    const handleChoice = (dimension, choice) => {
        setChoices((prevChoices) => ({
            ...prevChoices,
            [dimension]: choice,
        }));
    };

    const getMBTI = () => {
        return `${choices.EI}${choices.SN}${choices.TF}${choices.PJ}`;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (choices.EI && choices.SN && choices.TF && choices.PJ) {
            const mbti = getMBTI();
            try {
                const response = await fetch('http://localhost:8080/api/mymbti', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`, // 토큰 사용
                    },
                    body: JSON.stringify({ myMbti: mbti }),
                });

                if (response.ok) {
                    alert('MBTI 설정 완료!');
                    navigate(`/getMbti?mbti=${mbti}`); // 설정 완료 후 GetMbtiPage로 이동
                } else {
                    alert('MBTI 설정에 실패했습니다.');
                }
            } catch (error) {
                console.error('Error updating MBTI:', error);
                alert('서버와 통신 중 오류가 발생했습니다.');
            }
        } else {
            alert('모든 선택을 완료해야 합니다.');
        }
    };

    const isActive = (dimension, choice) => choices[dimension] === choice;

  return (
    <div className='resetMbti'>
        <BackButton />
        <h2>나의 MBTI 수정</h2>

        <form onSubmit={handleSubmit} className="mbitform">
                <div className="btn_wrap">
                    <div className="mbitBtn">
                        <button
                            type="button"
                            style={{ backgroundColor: isActive('EI', 'E') ? '#FFF3F3' : 'initial' }}
                            onClick={() => handleChoice('EI', 'E')}
                        >
                            E
                        </button>
                        <button
                            type="button"
                            style={{ backgroundColor: isActive('EI', 'I') ? '#FFF3F3' : 'initial' }}
                            onClick={() => handleChoice('EI', 'I')}
                        >
                            I
                        </button>
                    </div>

                    <div className="mbitBtn">
                        <button
                            type="button"
                            style={{ backgroundColor: isActive('SN', 'S') ? '#FFF3F3' : 'initial' }}
                            onClick={() => handleChoice('SN', 'S')}
                        >
                            S
                        </button>
                        <button
                            type="button"
                            style={{ backgroundColor: isActive('SN', 'N') ? '#FFF3F3' : 'initial' }}
                            onClick={() => handleChoice('SN', 'N')}
                        >
                            N
                        </button>
                    </div>

                    <div className="mbitBtn">
                        <button
                            type="button"
                            style={{ backgroundColor: isActive('TF', 'T') ? '#FFF3F3' : 'initial' }}
                            onClick={() => handleChoice('TF', 'T')}
                        >
                            T
                        </button>
                        <button
                            type="button"
                            style={{ backgroundColor: isActive('TF', 'F') ? '#FFF3F3' : 'initial' }}
                            onClick={() => handleChoice('TF', 'F')}
                        >
                            F
                        </button>
                    </div>

                    <div className="mbitBtn">
                        <button
                            type="button"
                            style={{ backgroundColor: isActive('PJ', 'P') ? '#FFF3F3' : 'initial' }}
                            onClick={() => handleChoice('PJ', 'P')}
                        >
                            P
                        </button>
                        <button
                            type="button"
                            style={{ backgroundColor: isActive('PJ', 'J') ? '#FFF3F3' : 'initial' }}
                            onClick={() => handleChoice('PJ', 'J')}
                        >
                            J
                        </button>
                    </div>
                </div>

                <div className="s_mbit">
                    <h2>
                        {getMBTI()} <img src={check} alt="check" className="check"></img>
                    </h2>
                </div>
                <div className="done">
                    <button type="submit">
                        입력완료
                    </button>
                </div>
                
            </form>
    </div>
  )
}

export default ResetMbtiPage