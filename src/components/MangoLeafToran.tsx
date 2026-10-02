type MangoLeafToranProps = {
  className?: string
}

function MangoLeafToran({ className = '' }: MangoLeafToranProps) {
  return (
    <div className={`toran ${className}`.trim()} aria-hidden="true">
      <svg viewBox="0 0 500 150" className="toran-svg">
        {[...Array(8)].map((_, index) => {
          const x = 22 + index * 57
          const y = 78 + (index % 2 === 0 ? 0 : 10)

          return (
            <g key={index} transform={`translate(${x} ${y})`}>
              <path
                d="M18 0C52 14 63 46 18 72C-28 46 -19 14 18 0Z"
                fill="rgba(49, 88, 58, 0.2)"
                stroke="rgba(104, 31, 43, 0.45)"
                strokeWidth="1.5"
              />
              <path
                d="M18 9C40 20 42 46 18 58C-4 46 -5 20 18 9Z"
                fill="rgba(49, 88, 58, 0.45)"
                stroke="rgba(104, 31, 43, 0.35)"
                strokeWidth="1"
              />
              <path d="M18 10V68" stroke="rgba(104, 31, 43, 0.5)" strokeWidth="1.2" />
            </g>
          )
        })}
      </svg>
    </div>
  )
}

export default MangoLeafToran
