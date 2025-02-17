import React from 'react'

function CircleChart({ angle, highlightFunction }) {
  const size = 300
  const center = size / 2
  const radius = size * 0.4
  const rad = (angle * Math.PI) / 180
  const x = center + radius * Math.cos(rad)
  const y = center - radius * Math.sin(rad)

  // Determine colors for dashed lines based on highlightFunction
  const sinColor = highlightFunction === 'sin' ? 'orange' : 'blue'
  const cosColor = highlightFunction === 'cos' ? 'orange' : 'blue'

  return (
    <svg width={size} height={size} style={{ border: '1px solid #ccc' }}>
      {/* Cercle trigonométrique */}
      <circle cx={center} cy={center} r={radius} fill="none" stroke="#333" strokeWidth="2" />
      {/* Axe horizontal */}
      <line x1="0" y1={center} x2={size} y2={center} stroke="#aaa" strokeDasharray="5,5" />
      {/* Axe vertical */}
      <line x1={center} y1="0" x2={center} y2={size} stroke="#aaa" strokeDasharray="5,5" />
      {/* Ligne de l'angle */}
      <line x1={center} y1={center} x2={x} y2={y} stroke="red" strokeWidth="2" />
      {/* Trait pour cosinus (horizontal) */}
      <line x1={center} y1={center} x2={x} y2={center} stroke={cosColor} strokeWidth="2" strokeDasharray="4,4" />
      {/* Trait pour sinus (vertical) */}
      <line x1={x} y1={center} x2={x} y2={y} stroke={sinColor} strokeWidth="2" strokeDasharray="4,4" />
      {/* Trait pour tangente si nécessaire */}
      {highlightFunction === 'tan' && (() => {
        const tanX = center + radius
        const tanY = center - radius * Math.tan(rad)
        return (
          <line x1={x} y1={y} x2={tanX} y2={tanY} stroke="green" strokeWidth="2" strokeDasharray="4,4" />
        )
      })()}
      {/* Point sur le cercle */}
      <circle cx={x} cy={y} r="5" fill="red" />
      {/* Affichage de l'angle */}
      <text x={center + 10} y={center - 10} fontSize="16" fill="#333">
        {angle}°
      </text>
      {/* Valeurs des axes */}
      <text x={center - 10} y={center + 20} fontSize="16" fill="#333">O</text>
      <text x={center + radius + 5} y={center + 5} fontSize="16" fill="#333">1</text>
      <text x={center - radius - 20} y={center + 5} fontSize="16" fill="#333">-1</text>
      <text x={center - 10} y={center - radius - 5} fontSize="16" fill="#333">1</text>
      <text x={center - 10} y={center + radius + 20} fontSize="16" fill="#333">-1</text>
      {/* Étiquettes des axes */}
      <text x={size - 20} y={center - 10} fontSize="16" fill="#333">X</text>
      <text x={center + 10} y="20" fontSize="16" fill="#333">Y</text>
    </svg>
  )
}

export default CircleChart
