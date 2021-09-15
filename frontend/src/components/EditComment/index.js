


const EditCommentForm = () => {
    return (
      <div className="editCommentInput">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(comment);
          }}
        >
          <textarea
            required
            value={newCommentText ? newCommentText : comment.commentText}
            onChange={(e) => setNewCommentText(e.target.value)}
          ></textarea>
          <button type="submit">Save</button>
        </form>
      </div>
    );
}


export default EditCommentForm