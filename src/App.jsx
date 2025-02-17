import React, { useState } from 'react'
import CircleChart from './components/CircleChart'
import Exercises from './components/Exercises'
import StudentForm from './components/StudentForm'

function App() {
  const [view, setView] = useState('course')
  const [angle, setAngle] = useState(45)
  const [student, setStudent] = useState(null)

  const radians = (angle * Math.PI) / 180
  const sinValue = Math.sin(radians).toFixed(3)
  const cosValue = Math.cos(radians).toFixed(3)
  const tanValue = Math.tan(radians).toFixed(3)

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    backgroundColor: '#f2f2f2',
    minHeight: '100vh'
  }

  const navButtonStyle = {
    padding: '10px 20px',
    margin: '5px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    background: '#0066cc',
    color: '#fff',
    fontSize: '16px'
  }

  const activeNavButtonStyle = {
    ...navButtonStyle,
    background: '#004b99'
  }

  const cardStyle = {
    background: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    padding: '25px',
    width: '100%',
    maxWidth: '800px',
    marginBottom: '30px',
    textAlign: 'center'
  }

  const headingStyle = {
    color: '#0066cc',
    marginBottom: '20px'
  }

  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginTop: '10px'
  }

  const visualisationContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '40px',
    flexWrap: 'wrap'
  }

  const valuesStyle = {
    fontSize: '18px',
    textAlign: 'left'
  }

  if (!student) {
    return (
      <div style={containerStyle}>
        <StudentForm onStudentSubmit={setStudent} />
      </div>
    )
  }

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Application interactive de trigonométrie</h1>
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={() => setView('course')}
          style={view === 'course' ? activeNavButtonStyle : navButtonStyle}
        >
          Cours
        </button>
        <button
          onClick={() => setView('exercises')}
          style={view === 'exercises' ? activeNavButtonStyle : navButtonStyle}
        >
          Exercices
        </button>
      </div>
      {view === 'course' && (
        <>
          <div style={cardStyle}>
            <h2 style={headingStyle}>Explications progressives</h2>
            <p>
              Explorez les notions clés telles que les angles, sinus, cosinus, tangente et le cercle trigonométrique.
              Déplacez le curseur pour voir comment varient ces fonctions.
            </p>
            <div style={{ marginTop: '20px' }}>
              <label htmlFor="angleInput" style={{ fontSize: '16px' }}>
                Angle (degrés) : {angle}°
              </label>
              <br />
              <input
                id="angleInput"
                type="range"
                min="0"
                max="360"
                value={angle}
                onChange={(e) => setAngle(Number(e.target.value))}
                style={inputStyle}
              />
            </div>
          </div>
          <div style={cardStyle}>
            <h2 style={headingStyle}>Visualisation dynamique</h2>
            <div style={visualisationContainerStyle}>
              <CircleChart angle={angle} />
              <div style={valuesStyle}>
                <p>sin({angle}°) = <strong>{sinValue}</strong></p>
                <p>cos({angle}°) = <strong>{cosValue}</strong></p>
                <p>tan({angle}°) = <strong>{tanValue}</strong></p>
              </div>
            </div>
          </div>
        </>
      )}
      {view === 'exercises' && <Exercises student={student} />}
    </div>
  )
}

export default App
