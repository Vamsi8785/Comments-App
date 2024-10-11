import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import CommentItem from '../CommentItem'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {
    commentInput: '',
    nameInput: '',
    commentList: [],
  }

  onChangeName = event => {
    this.setState({nameInput: event.target.value})
  }

  onChangeCommentText = event => {
    this.setState({commentInput: event.target.value})
  }

  onAddComment = event => {
    event.preventDefault()
    const {commentInput, nameInput} = this.state
    const initialBackgroundColorClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`
    if (commentInput !== '' && nameInput !== '') {
      const newComment = {
        id: uuidv4(),
        username: nameInput,
        comment: commentInput,
        date: new Date(),
        isLiked: false,
        initialClassName: initialBackgroundColorClassName,
      }

      this.setState(prevState => ({
        commentList: [...prevState.commentList, newComment],
        commentInput: '',
        nameInput: '',
      }))
    }
  }

  toggleIsLiked = id => {
    this.setState(prevState => ({
      commentList: prevState.commentList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  onClickDelete = id => {
    const {commentList} = this.state
    this.setState({
      commentList: commentList.filter(comment => comment.id !== id),
    })
  }

  render() {
    const {commentInput, nameInput, commentList} = this.state

    return (
      <div className="comments-app">
        <h1 className="comments-app-main-heading">Comments</h1>
        <div className="comment-textarea-bg-container">
          <form
            className="comment-textarea-container"
            onClick={this.onAddComment}
          >
            <p className="label-text">Say something about 4.0 Technologies</p>
            <input
              onChange={this.onChangeName}
              value={nameInput}
              className="name-input"
              type="text"
              placeholder="Your Name"
            />
            <textarea
              value={commentInput}
              className="text-area"
              rows={10}
              cols={50}
              placeholder="Your Comment"
              onChange={this.onChangeCommentText}
            />
            <button type="submit" className="add-comment-button">
              Add Comment
            </button>
          </form>
          <img
            className="comments-image"
            src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
            alt="comments"
          />
        </div>
        <hr />
        <p className="comment-count">
          <sparn className="count-num">{commentList.length}</sparn> Comments
        </p>
        <ul className="comments-list-container">
          {commentList.map(eachComment => (
            <CommentItem
              key={eachComment.id}
              commentDetails={eachComment}
              toggleIsLiked={this.toggleIsLiked}
              onClickDelete={this.onClickDelete}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default Comments
