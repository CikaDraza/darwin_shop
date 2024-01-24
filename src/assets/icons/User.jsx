
export default function User({ fill, loged }) {
  return (
    <div>
      {
        loged ?
        <svg width="32" height="32" viewBox="0 0 39 35" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="14.5" cy="8" r="7.5" stroke="black"/>
        <path d="M5 31.5003H14.5H23.5C25 31.5 28 32.0007 28 27.5003C28 23 25.7639 19.2643 23.5 17.0005C22 15.5006 20.0982 16.4339 18.5 17.4999C16.251 19 12.5 19 10.5 17.5003C7.37564 15.1576 5.9998 16.5003 5 17.5003C3.00018 19.5007 1 23.0003 1 27.5003C1 31.1003 3.66667 31.667 5 31.5003Z" stroke="black"/>
        <circle cx="31" cy="27" r="8" fill="#00CA2F"/>
        <path d="M27 28.5L31.5 31L35 23.5" stroke="white"/>
        </svg>
        :
        <svg width="27" height="27" viewBox="0 0 29 33" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="14.5" cy="8" r="7.5" stroke="black"/>
        <path d="M5 31.5003H14.5H23.5C25 31.5 28 32.0007 28 27.5003C28 23 25.7639 19.2643 23.5 17.0005C22 15.5006 20.0982 16.4339 18.5 17.4999C16.251 19 12.5 19 10.5 17.5003C7.37564 15.1576 5.9998 16.5003 5 17.5003C3.00018 19.5007 1 23.0003 1 27.5003C1 31.1003 3.66667 31.667 5 31.5003Z" stroke="black"/>
        </svg>
      }
    </div>
  )
}

