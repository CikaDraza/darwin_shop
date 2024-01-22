
export default function InlineIcon({ fill }) {
  return (
    <svg width="24px" height="24px" focusable="false" aria-hidden="true" viewBox="0 0 24 24">
      <path d="M3 14h4v-4H3v4zm0 5h4v-4H3v4zM3 9h4V5H3v4zm5 5h13v-4H8v4zm0 5h13v-4H8v4zM8 5v4h13V5H8z" fill={fill ? fill : "#BDBDBD"}></path>
    </svg>
  )
}

