import React, { useState } from 'react'

function StudentForm({ onStudentSubmit }) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (firstName.trim() && lastName.trim()) {
      onStudentSubmit({ firstName, lastName })
    }
  }

  const formStyle = {
    background: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    padding: '25px',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
    margin: '20px auto'
  }

  const inputStyle = {
    padding: '10px',
    width: '90%',
    marginBottom: '15px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px'
  }

  const buttonStyle = {
    padding: '12px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    background: '#0066cc',
    color: '#fff',
    fontSize: '16px'
  }

  return (
    <form style={formStyle} onSubmit={handleSubmit}>
      <h2 style={{color: '#0066cc'}}>Bienvenue !</h2>
      <input
        type="text"
        placeholder="Prénom"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        style={inputStyle}
        required
      />
      <br />
      <input
        type="text"
        placeholder="Nom"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        style={inputStyle}
        required
      />
      <br />
      <button type="submit" style={buttonStyle}>Commencer</button>
    </form>
  )
}

export default StudentForm
