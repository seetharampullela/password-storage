import './index.css'

const PasswordItem = props => {
  const {passwordItem, deleteListItem, isChecked} = props
  const {id, name, website, password} = passwordItem

  const onDeleteItem = () => {
    deleteListItem(id)
  }

  return (
    <li className="list-item">
      <div className="details-bottom">
        <p>{name}</p>
        <p>{website}</p>

        {!isChecked ? (
          <p>
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
              alt="stars"
              className="star-image"
            />
          </p>
        ) : (
          <p>{password}</p>
        )}
      </div>
      <button
        type="button"
        onClick={onDeleteItem}
        className="delete-btn"
        testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-img"
        />
      </button>
    </li>
  )
}
export default PasswordItem
