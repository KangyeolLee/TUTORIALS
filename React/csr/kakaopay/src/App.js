import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "./Loading";
import kakaopayConfig from "./kakaopay.config";

function App() {
  const { params } = kakaopayConfig;
  const [nextUrl, setNextUrl] = useState();
  const [tid, setTid] = useState();

  useEffect(() => {
    const postKakaopay = async () => {
      const data = await axios.post("/v1/payment/ready", null, {
        params,
        headers: {
          Authorization: `KakaoAK ${process.env.REACT_APP_KAKAOPAY_ADMIN_KEY}`,
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      });

      const {
        data: {
          tid,
          next_redirect_app_url,
          next_redirect_mobile_url,
          next_redirect_pc_url,
        },
      } = data;

      setNextUrl(next_redirect_app_url);
      setTid(tid);
    };
    postKakaopay();
  }, []);

  return (
    <div className="App">
      {nextUrl ? (window.location.href = nextUrl) : <Loading />}
    </div>
  );
}

export default App;
