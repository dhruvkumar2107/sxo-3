type KolamProps = {
  className?: string
}

function Kolam({ className = '' }: KolamProps) {
  return (
    <svg
      viewBox="0 0 220 220"
      className={className}
      role="img"
      aria-label="Traditional kolam motif"
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 112H80M140 112H200M110 20V80M110 140V200M32 32L76 76M144 76L188 32M32 188L76 144M144 144L188 188" />
        <path d="M52 110H90M130 110H168M110 52V90M110 130V168" />
        <circle cx="110" cy="110" r="18" />
        <path d="M86 110Q110 86 134 110Q110 134 86 110" />
      </g>
    </svg>
  )
}

export default Kolam
