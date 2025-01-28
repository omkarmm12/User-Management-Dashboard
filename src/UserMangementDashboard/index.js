import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from '../Header'
import UserDetails from '../UserDetails'
import './index.css'

// API URL for fetching users
const API_URL = 'https://jsonplaceholder.typicode.com/users'

class UserManagement extends React.Component {
  // Initial state setup
  state = {
    users: [],
    form: {id: '', name: '', email: '', department: ''},
    editing: false,
    showModal: false,
    error: false,
    success: false,
    msg: '',
  }

  // Fetch users from the API when the component mounts
  componentDidMount() {
    this.fetchUsers()
  }

  // Display success or error messages
  showMsg = data => {
    if (data.includes('successfully')) {
      this.setState({success: true, msg: data})
      setTimeout(() => {
        this.setState({success: false})
      }, 2000)
    } else {
      this.setState({error: true, msg: data})
      setTimeout(() => {
        this.setState({error: false})
      }, 2000)
    }
  }

  // Fetch users from the API
  fetchUsers = async () => {
    try {
      const response = await fetch(API_URL)
      const data = await response.json()
      this.setState({users: data})
    } catch (error) {
      this.showMsg('Error fetching users')
    }
    this.showMsg('User fetched successfully')
  }

  // Handle form field changes
  handleChange = event => {
    const {name, value} = event.target
    this.setState(prevState => {
      const updatedForm = {...prevState.form, [name]: value}
      return {form: updatedForm}
    })
  }

  // Add a new user
  addUser = async () => {
    const {form} = this.state
    try {
      const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(form),
      }
      const response = await fetch(API_URL, options)
      const newUser = await response.json()
      this.setState(({users}) => ({
        users: [...users, newUser],
        form: {id: '', name: '', email: '', department: ''},
        showModal: false,
      }))
    } catch (error) {
      this.showMsg('Error fetching users')
    }
    this.showMsg('User successfully added')
  }

  // Set up for editing an existing user
  editUser = user => {
    this.setState({editing: true, form: user, showModal: true})
  }

  // Update an existing user
  updateUser = async () => {
    const {form} = this.state
    const {id} = form
    try {
      const options = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(form),
      }
      await fetch(`${API_URL}/${id}`, options)
      this.setState(prevState => ({
        users: prevState.users.map(user =>
          user.id === prevState.form.id ? prevState.form : user,
        ),
        form: {id: '', name: '', email: '', department: ''},
        editing: false,
        showModal: false,
      }))
    } catch (error) {
      this.showMsg('Error fetching users')
    }
    this.showMsg('User successfully updated')
  }

  // Delete a user
  deleteUser = async id => {
    try {
      const options = {
        method: 'DELETE',
      }
      await fetch(`${API_URL}/${id}`, options)
      this.setState(({users}) => ({
        users: users.filter(user => user.id !== id),
      }))
    } catch (error) {
      this.showMsg('Error fetching users')
    }
    this.showMsg('User successfully deleted')
  }

  // Toggle the modal visibility
  toggleModal = () => {
    this.setState(({showModal}) => ({
      showModal: !showModal,
      form: {id: '', name: '', email: '', department: ''},
      editing: false,
    }))
  }

  render() {
    const {users, showModal, editing, form, error, success, msg} = this.state
    return (
      <div className="container mt-2">
        <div>
          <Header />
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            {/* Button to open the modal for adding a new user */}
            <button className="btn btn-primary my-3" onClick={this.toggleModal}>
              Add New User
            </button>
          </div>
          <div className="d-flex justify-content-center">
            {/* Display error or success messages */}
            <div>{error && <p className="red-msg">{msg}</p>}</div>
            <div>{success && <p className="green-msg">{msg}</p>}</div>
          </div>
        </div>

        {/* Modal for adding or editing a user */}
        {showModal && (
          <div
            className="modal show d-block"
            style={{backgroundColor: 'rgba(0,0,0,0.5)'}}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  {/* Modal title based on editing state */}
                  <h5 className="modal-title">
                    {editing ? 'Edit User' : 'Add User'}
                  </h5>
                  <button
                    aria-label="Close"
                    type="button"
                    className="btn-close"
                    onClick={this.toggleModal}
                  />
                </div>
                <div className="modal-body">
                  {/* Form inputs for user details */}
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="form-control mb-2"
                    value={form.name}
                    onChange={this.handleChange}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="form-control mb-2"
                    value={form.email}
                    onChange={this.handleChange}
                  />
                  <input
                    type="text"
                    name="department"
                    placeholder="Department"
                    className="form-control mb-2"
                    value={form.department}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="modal-footer">
                  {/* Close button and save action (add or update user) */}
                  <button
                    className="btn btn-secondary"
                    onClick={this.toggleModal}
                  >
                    Close
                  </button>
                  {editing ? (
                    <button
                      className="btn btn-success"
                      onClick={this.updateUser}
                    >
                      Update User
                    </button>
                  ) : (
                    <button className="btn btn-primary" onClick={this.addUser}>
                      Add User
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Table displaying the users */}
        <div className="table-responsive table-container">
          <table className="table table-bordered table-striped text-center">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {users.map(user => (
                <UserDetails
                  key={user.id}
                  {...user}
                  editUser={this.editUser}
                  deleteUser={this.deleteUser}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default UserManagement
