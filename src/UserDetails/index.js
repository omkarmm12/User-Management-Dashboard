const UserDetails = ({id, name, email, department, editUser, deleteUser}) => (
  <tr>
    <td>{id}</td>
    <td>{name}</td>
    <td>{email}</td>
    <td>{department || 'N/A'}</td>
    <td>
      <div className="d-flex justify-content-around">
        <div>
          <button
            className="btn btn-warning btn-sm me-2"
            onClick={() => editUser({id, name, email, department})}
          >
            Edit
          </button>
        </div>
        <div>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => deleteUser(id)}
          >
            Delete
          </button>
        </div>
      </div>
    </td>
  </tr>
)

export default UserDetails
