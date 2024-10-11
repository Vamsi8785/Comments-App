import {formatDistanceToNow} from 'date-fns'
import './index.css'

const CommentItem = props => {
  const {commentDetails, toggleIsLiked, onClickDelete} = props
  const {id, username, comment, date, isLiked, initialClassName} =
    commentDetails
  const initial = username[0].toUpperCase()
  const liked = isLiked
    ? [
        'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png',
        'button active',
      ]
    : [
        'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png',
        'button',
      ]

  const onDeleteComment = () => {
    onClickDelete(id)
  }
  const postedTime = formatDistanceToNow(date)

  const onClickLike = () => {
    toggleIsLiked(id)
  }

  return (
    <li>
      <div className="comment-container">
        <div className={initialClassName}>
          <p className="initial">{initial}</p>
        </div>
        <div>
          <div className="username-time-container">
            <p className="username">{username}</p>
            <p className="time">{postedTime} ago</p>
          </div>
          <p className="comment">{comment}</p>
        </div>
      </div>
      <div className="buttons-container">
        <div className="like-container">
          <img src={liked[0]} alt="like" className="like-image" />
          <button onClick={onClickLike} className={liked[1]} type="button">
            Like
          </button>
        </div>
        <button
          data-testid="delete"
          className="button"
          type="button"
          onClick={onDeleteComment}
        >
          <img
            className="delete"
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
          />
        </button>
      </div>
      <hr />
    </li>
  )
}
export default CommentItem
