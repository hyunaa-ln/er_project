import React, { useState } from 'react';
import BackButton from './BackButton';
import CommentForm from './CommentForm';
/*img*/
import thumb from '../assets/Vector.svg';
import e_heart from '../assets/empty-heart.svg';
import f_heart from '../assets/full-heart.svg';

function CommunityPostPage() {
  const [comments, setComments] = useState([
    { username: "차은우", badge: "ISTJ", text: "외모 비결 좀 알려주세요", time: "11:30 AM", isHeartFilled: false, likes: 0 },
    { username: "Pu틴핑", badge: "ISTJ", text: "허억허 사랑해 허억허억 사랑해 ", time: "11:30 AM", isHeartFilled: false, likes: 0 },
    { username: "도람뿌", badge: "ISTJ", text: "미띤!", time: "11:30 AM", isHeartFilled: false, likes: 0 }
  ]);

  const [newComment, setNewComment] = useState("");
  const [isPostHeartFilled, setIsPostHeartFilled] = useState(false); // 게시글 하트 상태
  const [postLikes, setPostLikes] = useState(0); // 게시글 좋아요 수

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
      time: new Date().toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit', hour12: true }),
      isHeartFilled: false, // 새 댓글의 하트 상태 초기화
      likes: 0 // 새 댓글의 좋아요 수 초기화
    };

    setComments([...comments, newCommentObj]);
    setNewComment("");
  };

  const toggleCommentHeart = (index) => {
    setComments(comments.map((comment, i) => 
      i === index 
        ? { 
            ...comment, 
            isHeartFilled: !comment.isHeartFilled, 
            likes: comment.isHeartFilled ? comment.likes - 1 : comment.likes + 1 // 하트 클릭 시 좋아요 수 증가/감소
          } 
        : comment // 클릭한 댓글만 하트 상태 및 좋아요 수 토글
    ));
  };

  const togglePostHeart = () => {
    setIsPostHeartFilled(prev => {
      const newLikes = !prev ? postLikes + 1 : postLikes - 1; // 게시글 하트 클릭 시 좋아요 수 증가/감소
      setPostLikes(newLikes);
      return !prev; // 하트 상태 토글
    });
  };

  return (
    <div className='communityPost'>
      <BackButton />
      <div className='p_btnWrap'>
        <button className='p_editBtn p_btn'>수정</button>
        <span></span>
        <button className='p_deleteBtn p_btn'>삭제</button>
      </div>
      
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
          <div className='p_heart' onClick={togglePostHeart}>
            <img src={isPostHeartFilled ? f_heart : e_heart} alt='p_heart'></img>
            <span>{postLikes}</span> {/* 게시글 좋아요 수 표시 */}
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
                <div className='c_btnWrap'>
                  <button className='c_editBtn c_btn'>수정</button>
                  <span></span>
                  <button className='c_deleteBtn c_btn'>삭제</button>
                </div>
              </div>
              <p className='commentText'>{comment.text}</p>
            </div>
            <p className='c_time'>{comment.time}</p>
            <div className='c_heart' onClick={() => toggleCommentHeart(index)}>
              <img src={comment.isHeartFilled ? f_heart : e_heart} alt='c_heart'></img>
              <span>{comment.likes}</span> {/* 댓글 좋아요 수 표시 */}
            </div>
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
