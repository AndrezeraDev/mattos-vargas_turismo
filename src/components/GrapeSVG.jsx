export default function GrapeSVG() {
  return (
    <svg viewBox="0 0 120 168" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* talo */}
      <path
        d="M60 44C60 28 65 18 76 8"
        stroke="#7a5a3a"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      {/* folha */}
      <path
        d="M62 30c10-16 30-20 46-12-4 18-18 28-34 24-8-2-13-6-12-12z"
        fill="#6f8f5c"
      />
      <path
        d="M66 28c12-8 26-11 38-8"
        stroke="#5a7749"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* gomos do cacho */}
      <circle cx="32" cy="62" r="15" fill="#7d2440" />
      <circle cx="60" cy="58" r="15" fill="#5a1a2f" />
      <circle cx="88" cy="62" r="15" fill="#7d2440" />
      <circle cx="46" cy="86" r="15" fill="#5a1a2f" />
      <circle cx="74" cy="86" r="15" fill="#7d2440" />
      <circle cx="32" cy="110" r="15" fill="#7d2440" />
      <circle cx="60" cy="112" r="15" fill="#5a1a2f" />
      <circle cx="88" cy="110" r="15" fill="#7d2440" />
      <circle cx="46" cy="136" r="15" fill="#7d2440" />
      <circle cx="74" cy="136" r="15" fill="#5a1a2f" />
      <circle cx="60" cy="156" r="12" fill="#7d2440" />
      {/* brilhos */}
      <circle cx="27" cy="57" r="4" fill="#fff" opacity="0.35" />
      <circle cx="55" cy="53" r="4" fill="#fff" opacity="0.25" />
      <circle cx="41" cy="81" r="4" fill="#fff" opacity="0.3" />
      <circle cx="83" cy="105" r="4" fill="#fff" opacity="0.3" />
      <circle cx="55" cy="151" r="3" fill="#fff" opacity="0.3" />
    </svg>
  );
}
