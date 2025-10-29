export default function MoneyIcon({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#a)">
        <path
          d="M15 17a3 3 0 0 0-3-3m0 0a3 3 0 1 0 0 6 3 3 0 1 1 0 6m0-12v-1m0 13a3 3 0 0 1-3-3m3 3v1m10 4h9v-2m-6-3h6v-2m-5-3h5v-2m-5-3h5v-2m-8-3h8V9M10 6h21V1H7v5m16 14c0-6.074-4.926-11-11-11S1 13.926 1 20s4.926 11 11 11 11-4.926 11-11"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h32v32H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}
