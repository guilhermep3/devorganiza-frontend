export const DottedBg = () => {

  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' className="absolute -z-10">
      <rect fill='var(--color-main-30)' width='24' height='24' />
      <defs>
        <linearGradient id='a' x1='0' x2='0' y1='0' y2='1' gradientTransform='rotate(0,0.5,0.5)'>
          <stop offset='0' stopColor='var(--background)' /><stop offset='1' stopColor='var(--background)' />
        </linearGradient>
      </defs>
      <pattern id='b' width='16' height='16' patternUnits='userSpaceOnUse'>
        <circle fill='var(--color-main-30)' cx='2' cy='2' r='2' />
      </pattern>
      <rect width='100%' height='100%' fill='url(#a)' />
      <rect width='100%' height='100%' fill='url(#b)' fillOpacity='0.2' />
    </svg>
  )
}