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
      />
      <button type="submit">
        <img src={commentBtn} alt='commentBtn' />
      </button>
    </form>
  );
};

export default CommentForm;
