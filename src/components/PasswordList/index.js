import {Component} from 'react'
import {v4} from 'uuid'
import PasswordItem from '../PasswordItem'

import './index.css'

class PasswordList extends Component {
  state = {
    count: 0,
    website: '',
    name: '',
    password: '',
    passwordList: [],
    isChecked: false,
    searchIn: '',
  }

  toggleChecked = () => {
    this.setState(prevState => ({isChecked: !prevState.isChecked}))
  }

  changeWebsite = event => {
    this.setState({website: event.target.value})
  }

  changeUsername = event => {
    this.setState({name: event.target.value})
  }

  changePassword = event => {
    this.setState({password: event.target.value})
  }

  addPassword = event => {
    event.preventDefault()
    const {website, name, password, passwordList} = this.state
    const newList = {
      id: v4(),
      website,
      name,
      password,
      isChecked: false,
    }

    if (name !== '' || website !== '' || password !== '') {
      this.setState(prevState => ({
        count: prevState.count + 1,
        passwordList: [...passwordList, newList],
        name: '',
        website: '',
        password: '',
      }))
    }
  }

  deleteListItem = id => {
    const {passwordList} = this.state
    const filteredList = passwordList.filter(each => each.id !== id)
    this.setState(prevState => ({
      passwordList: filteredList,
      count: prevState.count - 1,
    }))
  }

  searchInput = event => {
    this.setState({searchIn: event.target.value})
  }

  renderBottomContainer = () => {
    const {count, passwordList, searchIn, isChecked} = this.state
    const searchResults = passwordList.filter(each =>
      each.website.toLowerCase().includes(searchIn.toLowerCase()),
    )

    return (
      <div className="bottom-container">
        <div className="container-2">
          <div>
            <div className="counter">
              <h1 className="btm-heading">Your Passwords</h1>
              <p>{count}</p>
            </div>
          </div>
          <div className="entry-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
              alt="search"
              className="entry-image"
            />
            <input
              type="search"
              placeholder="search"
              className="input-element"
              onChange={this.searchInput}
            />
          </div>
        </div>
        <div className="checkbox">
          <input
            id="checkbox-pwd"
            type="checkbox"
            onClick={this.toggleChecked}
          />
          <label htmlFor="checkbox-pwd"> Show passwords </label>
        </div>
        <div>
          <ul className="list-container">
            {searchResults.map(each => (
              <PasswordItem
                passwordItem={each}
                deleteListItem={this.deleteListItem}
                key={each.id}
                isChecked={isChecked}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderNoPassword = () => {
    const {count} = this.state

    return (
      <div className="bottom-container">
        <div className="container-2">
          {/* with passwords data */}
          <div>
            <div className="counter">
              <h1 className="btm-heading">Your Passwords</h1>
              <p>{count}</p>
            </div>
          </div>
          <div className="entry-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
              alt="search"
              className="entry-image"
            />
            <input
              type="search"
              placeholder="search"
              className="input-element"
              onChange={this.searchInput}
            />
          </div>
        </div>
        <div className="checkbox">
          <input
            id="checkbox-pwd"
            type="checkbox"
            onClick={this.toggleChecked}
          />
          <label htmlFor="checkbox-pwd"> Show passwords </label>
        </div>
        <div className="password-cont">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
            alt="no passwords"
            className="pwd-mgr"
          />
          <p>No Passwords</p>
        </div>
      </div>
    )
  }

  render() {
    const {website, name, password, passwordList, searchIn, count} = this.state
    const searchResults = passwordList.filter(each =>
      each.website.toLowerCase().includes(searchIn.toLowerCase()),
    )

    return (
      <div className="bg-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />
        <div className="inner-container">
          <div className="entry-bg-container">
            {/* password entry form */}
            <form onSubmit={this.addPassword}>
              <h1> Add New Password </h1>
              <div className="entry-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png "
                  alt="website"
                  className="entry-image"
                />
                <input
                  type="text"
                  placeholder="Enter Website"
                  className="input-element"
                  value={website}
                  onChange={this.changeWebsite}
                />
              </div>
              <div className="entry-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png "
                  alt="username"
                  className="entry-image"
                />
                <input
                  type="text"
                  placeholder="Enter Username"
                  className="input-element"
                  value={name}
                  onChange={this.changeUsername}
                />
              </div>
              <div className="entry-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png "
                  alt="password"
                  className="entry-image"
                />
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="input-element"
                  value={password}
                  onChange={this.changePassword}
                />
              </div>
              <div className="add-btn-container">
                <button type="submit" className="add-btn">
                  Add
                </button>
              </div>
            </form>
          </div>
          <div className="pwd-mgr-img-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
              alt="password manager"
              className="pwd-mgr"
            />
          </div>
        </div>

        {/* bottom password container */}
        {count === 0 || searchResults.length === 0
          ? this.renderNoPassword()
          : this.renderBottomContainer()}
      </div>
    )
  }
}
export default PasswordList
