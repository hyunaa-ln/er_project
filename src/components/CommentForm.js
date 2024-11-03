import React from 'react';
import commentBtn from '../assets/commentBtn.svg';

const CommentForm = ({ newComment, onCommentChange, onCommentSubmit }) => {
  return (
    <form onSubmit={onCommentSubmit} className='commentForm'>
      <input
        type="text"
        value={newComment}
        onChange={onCommentChange}
        placeholder="Comment..."
        className='commentInput'
        required
      />
      <button type="submit" disabled={!newComment.trim()}> {/* 입력값이 없으면 버튼 비활성화 */}
        <img src={commentBtn} alt='commentBtn' />
      </button>
    </form>
  );
};

export default CommentForm;
