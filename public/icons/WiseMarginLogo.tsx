interface WiseMarginLogoProps {
  size?: number;
  className?: string;
}

const validateSize = (size?: number): number => {
  // Handle edge cases: undefined, null, negative, zero, or non-numeric values
  if (typeof size !== 'number' || size <= 0 || !isFinite(size)) {
    return 48; // Default size as per requirements
  }
  return size;
};

export const WiseMarginLogo = ({ size, className }: WiseMarginLogoProps) => {
  const validatedSize = validateSize(size);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={validatedSize}
      height={validatedSize}
      viewBox="0.54 -1.84 65.20 36.70"
      preserveAspectRatio="xMidYMid meet"
      version="1.2"
      className={className}
    >
      <defs>
        <clipPath id="e92125147e">
          <path d="M 20 0 L 64 0 L 64 33 L 20 33 Z M 20 0 " />
        </clipPath>
        <clipPath id="afeb34d281">
          <path d="M 63.128906 33.296875 L 1.511719 32.070312 L 2.148438 0.148438 L 63.761719 1.375 Z M 63.128906 33.296875 " />
        </clipPath>
        <clipPath id="80de06c99d">
          <path d="M 2 0 L 32 0 L 32 33 L 2 33 Z M 2 0 " />
        </clipPath>
      </defs>
      <g id="aeb52998f5">
        <g clipRule="nonzero" clipPath="url(#e92125147e)">
          <g clipRule="nonzero" clipPath="url(#afeb34d281)">
            <path
              style={{
                stroke: 'none',
                fillRule: 'nonzero',
                fill: '#56aeff',
                fillOpacity: 1,
              }}
              d="M 40.886719 32.851562 L 63.746094 1.371094 L 40.660156 0.914062 L 33.753906 10.421875 L 35.910156 14.042969 L 42.605469 4.828125 L 56.253906 5.097656 L 41.148438 25.902344 L 25.542969 0.613281 L 20.855469 0.519531 Z M 40.886719 32.851562 "
            />
          </g>
        </g>
        <g clipRule="nonzero" clipPath="url(#80de06c99d)">
          <g clipRule="nonzero" clipPath="url(#afeb34d281)">
            <path
              style={{
                stroke: 'none',
                fillRule: 'nonzero',
                fill: '#56aeff',
                fillOpacity: 1,
              }}
              d="M 22.519531 32.488281 L 31.066406 20.71875 L 28.867188 17.15625 L 22.777344 25.539062 L 7.15625 0.246094 L 2.542969 0.15625 Z M 22.519531 32.488281 "
            />
          </g>
        </g>
      </g>
    </svg>
  );
};
