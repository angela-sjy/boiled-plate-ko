import React, { useEffect} from 'react'
import axios from 'axios';

function LandingPage() {

  useEffect(() => { 
    axios.get('/api/hello') // get request를 서버에 보내는 코드
    .then(response => console.log(response.data)) //
  })

  return (
    <div>
      LandingPage
    </div>
  )
}

export default LandingPage
