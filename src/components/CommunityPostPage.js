import React, { useState } from 'react';
import BackButton from './BackButton';
import CommentForm from './CommentForm';
import thumb from '../assets/Vector.svg';

function CommunityPostPage() {
  const [comments, setComments] = useState([
    { username: "차은우", badge: "ISTJ", text: "외모 비결 좀 알려주세요", time: "11:30 AM" },
    { username: "Pu틴핑", badge: "ISTJ", text: "허억허억 사랑해 허억허억 사랑해 허억허억 사랑해 허억허억 사랑해 허억허억 사랑해 허억허억 사랑해 허억허억 사랑해 허억허억 사랑해 허억허억 사랑해 허억허억 사랑해 허억허억 사랑해 허억허억 사랑해 ", time: "11:30 AM" },
    { username: "도람뿌", badge: "ISTJ", text: "미띤!", time: "11:30 AM" }
  ]);

  const [newComment, setNewComment] = useState("");

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() === "") return;
  
    const newCommentObj = {
      username: "Anonymous",
      badge: "INTJ",
      text: newComment,
      time: new Date().toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit', hour12: true })
    };
  
    setComments([...comments, newCommentObj]);
    setNewComment("");
  };

  return (
    <div className='communityPost'>
      <BackButton />
      <div className='mainPost'>
        <div className='profileBox'>
          <img src={thumb} alt='thumb' className='main_thumb'></img>
          <div className='profile'>
            <div>
              <p>Kim_정은</p>
              <span className='badge'>ISTJ</span>
            </div>
            <p className='p_time'>10:25 AM</p>
          </div>
        </div>
        <div className='mainTextWrap'>
          <p className='mainText'>
            안녕하세요! 2024년에는 모솔에서 탈출하고 싶어서 응급실 앱 가입했습니다!
          </p>
          <p className='hashTag'>#고민 #모솔 #고민중독</p>
          <p className='commentNum'>답글 {comments.length}개</p>
        </div>
      </div>

      <div className='comments'>
        {comments.map((comment, index) => (
          <div className='comment' key={index}>
            <img src={thumb} alt='thumb'></img>
            <div className='commentWrap'>
              <div>
                <p>{comment.username}</p>
                <span className='badge'>{comment.badge}</span>
              </div>
              <p className='commentText'>{comment.text}</p>
            </div>
            <p className='c_time'>{comment.time}</p>
          </div>
        ))}
      </div>

      {/* CommentForm 컴포넌트를 사용 */}
      <CommentForm
        newComment={newComment}
        onCommentChange={handleCommentChange}
        onCommentSubmit={handleCommentSubmit}
      />
    </div>
  );
}

export default CommunityPostPage;
