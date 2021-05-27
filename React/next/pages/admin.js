import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import { Button } from "semantic-ui-react";

export default function admin() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);

  function checkLogin() {
    axios.get('/api/isLogin').then(res => {
      if (res.status === 200 && res.data.name) {
        setIsLogin(true)
      } else {
        router.push('/login')
      }
    })
  }
  function logout() {
    axios.get('/api/logout').then(res => {
      if (res.status === 200) {
        router.push('/')
      }
    })
  }
  useEffect(() => {
    checkLogin();
  }, [])
  return <div>hi admin! {isLogin && <Button onClick={logout} >Logout</Button>}</div>
}