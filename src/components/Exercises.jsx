import React, { useState } from 'react'
import { supabase } from '../supabaseClient'

const qcmQuestions = [
  {
    id: 1,
    question: "QCM 1 : Définition du sinus\nQuelle est la définition du sinus d’un angle dans un triangle rectangle ?",
    options: [
      { letter: "A", text: "C’est le rapport entre le côté adjacent et l’hypoténuse" },
      { letter: "B", text: "C’est le rapport entre le côté opposé et l’hypoténuse" },
      { letter: "C", text: "C’est le rapport entre le côté opposé et le côté adjacent" },
      { letter: "D", text: "C’est l’inverse du cosinus" }
    ],
    answer: "B",
    correction: "✅ Correction : La bonne réponse est B. Le sinus d’un angle correspond à l’ordonnée du point sur le cercle trigonométrique.",
    explanations: {
      A: "❌ Explication : Cette définition correspond au cosinus.",
      C: "❌ Explication : Cette définition correspond à la tangente.",
      D: "❌ Explication : Le sinus et le cosinus ne sont pas des inverses."
    }
  },
  {
    id: 2,
    question: "QCM 2 : Définition du cosinus\nQuelle est la définition du cosinus d’un angle dans un triangle rectangle ?",
    options: [
      { letter: "A", text: "C’est le rapport entre le côté opposé et l’hypoténuse" },
      { letter: "B", text: "C’est le rapport entre le côté adjacent et l’hypoténuse" },
      { letter: "C", text: "C’est le rapport entre le côté opposé et le côté adjacent" },
      { letter: "D", text: "C’est l’inverse du sinus" }
    ],
    answer: "B",
    correction: "✅ Correction : La bonne réponse est B. Le cosinus d’un angle est le rapport entre le côté adjacent et l’hypoténuse.",
    explanations: {
      A: "❌ Explication : Cette définition correspond au sinus.",
      C: "❌ Explication : Cette définition correspond à la tangente.",
      D: "❌ Explication : Le cosinus et le sinus ne sont pas des inverses."
    }
  },
  {
    id: 3,
    question: "QCM 3 : Valeur particulière du sinus\nQuelle est la valeur de sin(90°) ?",
    options: [
      { letter: "A", text: "0" },
      { letter: "B", text: "1" },
      { letter: "C", text: "-1" },
      { letter: "D", text: "√2/2" }
    ],
    answer: "B",
    correction: "✅ Correction : La bonne réponse est B. Par définition, sin(90°) = 1.",
    explanations: {
      A: "❌ Explication : sin(0°) = 0, mais sin(90°) = 1.",
      C: "❌ Explication : Le sinus est positif pour les angles entre 0° et 180°.",
      D: "❌ Explication : √2/2 correspond à sin(45°)."
    }
  },
  {
    id: 4,
    question: "QCM 4 : Valeur particulière du cosinus\nQuelle est la valeur de cos(0°) ?",
    options: [
      { letter: "A", text: "0" },
      { letter: "B", text: "1" },
      { letter: "C", text: "-1" },
      { letter: "D", text: "√2/2" }
    ],
    answer: "B",
    correction: "✅ Correction : La bonne réponse est B. Par définition, cos(0°) = 1.",
    explanations: {
      A: "❌ Explication : cos(90°) = 0, pas cos(0°).",
      C: "❌ Explication : cos(180°) = -1, mais cos(0°) = 1.",
      D: "❌ Explication : cos(45°) = √2/2, mais ce n'est pas la valeur de cos(0°)."
    }
  },
  {
    id: 5,
    question: "QCM 5 : Relation fondamentale sinus-cosinus\nQuelle relation fondamentale lie sin²(x) et cos²(x) ?",
    options: [
      { letter: "A", text: "sin²(x) + cos²(x) = 1" },
      { letter: "B", text: "sin²(x) - cos²(x) = 1" },
      { letter: "C", text: "sin²(x) = cos²(x)" },
      { letter: "D", text: "sin(x) + cos(x) = 1" }
    ],
    answer: "A",
    correction: "✅ Correction : La bonne réponse est A. L’identité fondamentale est sin²(x) + cos²(x) = 1.",
    explanations: {
      B: "❌ Explication : Il n’y a pas de soustraction dans cette relation.",
      C: "❌ Explication : Ce n’est vrai que pour certains angles particuliers, pas en général.",
      D: "❌ Explication : L’addition du sinus et du cosinus n'est pas toujours égale à 1."
    }
  },
  {
    id: 6,
    question: "QCM 6 : Cosinus sur le cercle trigonométrique\nSur le cercle trigonométrique, le cosinus d’un angle correspond :",
    options: [
      { letter: "A", text: "À l’abscisse du point correspondant" },
      { letter: "B", text: "À l’ordonnée du point correspondant" },
      { letter: "C", text: "À la tangente du point sur le cercle" },
      { letter: "D", text: "Au rayon du cercle" }
    ],
    answer: "A",
    correction: "✅ Correction : La bonne réponse est A. Le cosinus d’un angle est la coordonnée en abscisse du point sur le cercle.",
    explanations: {
      B: "❌ Explication : L’ordonnée correspond au sinus.",
      C: "❌ Explication : La tangente est définie par le rapport sin(x)/cos(x).",
      D: "❌ Explication : Le rayon du cercle trigonométrique est toujours 1."
    }
  },
  {
    id: 7,
    question: "QCM 7 : Sinus sur le cercle trigonométrique\nSur le cercle trigonométrique, le sinus d’un angle correspond :",
    options: [
      { letter: "A", text: "À l’abscisse du point correspondant" },
      { letter: "B", text: "À l’ordonnée du point correspondant" },
      { letter: "C", text: "À la tangente du point sur le cercle" },
      { letter: "D", text: "À l’angle du rayon avec l’axe des x" }
    ],
    answer: "B",
    correction: "✅ Correction : La bonne réponse est B. Le sinus d’un angle correspond à l’ordonnée du point sur le cercle trigonométrique.",
    explanations: {
      A: "❌ Explication : L’abscisse correspond au cosinus, pas au sinus.",
      C: "❌ Explication : La tangente est définie comme sin(x) / cos(x) et ne correspond ni à l’abscisse ni à l’ordonnée.",
      D: "❌ Explication : L’angle avec l’axe des x est une mesure angulaire, pas une coordonnée."
    }
  },
  {
    id: 8,
    question: "QCM 8 : Sinus et cosinus des angles opposés\nQuelle est la bonne relation entre sin(-x) et cos(-x) ?",
    options: [
      { letter: "A", text: "sin(-x) = -sin(x) et cos(-x) = cos(x)" },
      { letter: "B", text: "sin(-x) = sin(x) et cos(-x) = -cos(x)" },
      { letter: "C", text: "sin(-x) = -sin(x) et cos(-x) = -cos(x)" },
      { letter: "D", text: "sin(-x) = cos(x) et cos(-x) = sin(x)" }
    ],
    answer: "A",
    correction: "✅ Correction : La bonne réponse est A. Le sinus est une fonction impaire (sin(-x) = -sin(x)) et le cosinus est une fonction paire (cos(-x) = cos(x)).",
    explanations: {
      B: "❌ Explication : Le sinus change de signe, mais le cosinus reste inchangé.",
      C: "❌ Explication : Le cosinus ne devient pas négatif en prenant -x.",
      D: "❌ Explication : Sinus et cosinus ne s’échangent pas directement selon cette règle."
    }
  },
  {
    id: 9,
    question: "QCM 9 : Sinus et cosinus des angles complémentaires\nQuelle est la bonne relation entre sin(90° - x) et cos(x) ?",
    options: [
      { letter: "A", text: "sin(90° - x) = cos(x)" },
      { letter: "B", text: "sin(90° - x) = -cos(x)" },
      { letter: "C", text: "sin(90° - x) = sin(x)" },
      { letter: "D", text: "sin(90° - x) = -sin(x)" }
    ],
    answer: "A",
    correction: "✅ Correction : La bonne réponse est A. On a sin(90° - x) = cos(x) et cos(90° - x) = sin(x).",
    explanations: {
      B: "❌ Explication : Il n’y a pas de signe négatif dans cette identité.",
      C: "❌ Explication : Ce serait vrai uniquement pour x = 45°, mais pas en général.",
      D: "❌ Explication : Le sinus n’est pas opposé à lui-même pour des angles complémentaires."
    }
  },
  {
    id: 10,
    question: "QCM 10 : Cosinus et sinus des angles remarquables\nQuelle est la valeur de cos(45°) ?",
    options: [
      { letter: "A", text: "1" },
      { letter: "B", text: "0" },
      { letter: "C", text: "1/2" },
      { letter: "D", text: "√2/2" }
    ],
    answer: "D",
    correction: "✅ Correction : La bonne réponse est D. cos(45°) = sin(45°) = √2/2.",
    explanations: {
      A: "❌ Explication : cos(0°) = 1, mais pas cos(45°).",
      B: "❌ Explication : cos(90°) = 0, mais cos(45°) n’est pas égal à 0.",
      C: "❌ Explication : cos(60°) = 1/2, pas cos(45°)."
    }
  }
]

function Exercises({ student }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState('')
  const [feedbackJSX, setFeedbackJSX] = useState(null)
  
  const currentQuestion = qcmQuestions[currentIndex]
  
  const recordResponse = async (questionId, response, isCorrect) => {
    try {
      const { error } = await supabase
        .from('responses')
        .insert([{
          student_name: student.firstName + ' ' + student.lastName,
          question_id: questionId,
          response,
          is_correct: isCorrect,
          answered_at: new Date().toISOString()
        }])
      if (error) {
        console.error('Erreur lors de l’enregistrement:', error)
      }
    } catch (err) {
      console.error(err)
    }
  }
  
  const handleOptionClick = async (letter) => {
    setSelectedOption(letter)
    const isCorrect = letter === currentQuestion.answer
    if (isCorrect) {
      setFeedbackJSX(
        <>
          <p style={{ color: 'green', fontWeight: 'bold', marginBottom: '5px' }}>
            ✅ Bonne réponse !
          </p>
          <p style={{ color: 'green', whiteSpace: 'pre-wrap', margin: 0 }}>
            {currentQuestion.correction}
          </p>
        </>
      )
    } else {
      setFeedbackJSX(
        <>
          <p style={{ color: 'red', fontWeight: 'bold', marginBottom: '5px' }}>
            ❌ Mauvaise réponse.
          </p>
          <p style={{ color: 'red', whiteSpace: 'pre-wrap', marginBottom: '5px' }}>
            {currentQuestion.explanations[letter]}
          </p>
          <p style={{ color: 'green', whiteSpace: 'pre-wrap', margin: 0 }}>
            {currentQuestion.correction}
          </p>
        </>
      )
    }
    await recordResponse(currentQuestion.id, letter, isCorrect)
  }
  
  const handleNext = () => {
    setSelectedOption('')
    setFeedbackJSX(null)
    setCurrentIndex((prev) => (prev + 1) % qcmQuestions.length)
  }
  
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    backgroundColor: '#f2f2f2',
    minHeight: '100vh'
  }
  
  const cardStyle = {
    background: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    padding: '25px',
    width: '100%',
    maxWidth: '600px',
    marginBottom: '30px',
    textAlign: 'center'
  }
  
  const headerStyle = {
    color: '#0066cc',
    marginBottom: '20px'
  }
  
  const questionStyle = {
    fontSize: '18px',
    marginBottom: '20px',
    whiteSpace: 'pre-wrap'
  }
  
  const optionButtonStyle = {
    padding: '12px 20px',
    margin: '8px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    background: '#0066cc',
    color: '#fff',
    fontSize: '16px'
  }
  
  const nextButtonStyle = {
    ...optionButtonStyle,
    background: '#28a745',
    marginTop: '25px'
  }
  
  const feedbackStyle = {
    marginTop: '20px',
    fontSize: '16px',
    whiteSpace: 'pre-wrap'
  }
  
  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>Exercices interactifs - QCM</h2>
      <div style={cardStyle}>
        <div style={questionStyle}>{currentQuestion.question}</div>
        <div>
          {currentQuestion.options.map((opt) => {
            const isSelected = selectedOption === opt.letter
            return (
              <button
                key={opt.letter}
                onClick={() => handleOptionClick(opt.letter)}
                style={{
                  ...optionButtonStyle,
                  background: isSelected ? '#004b99' : optionButtonStyle.background
                }}
              >
                {opt.letter}) {opt.text}
              </button>
            )
          })}
        </div>
        {selectedOption && (
          <div style={feedbackStyle}>
            {feedbackJSX}
          </div>
        )}
        <button onClick={handleNext} style={nextButtonStyle}>Suivant</button>
      </div>
    </div>
  )
}
  
export default Exercises
