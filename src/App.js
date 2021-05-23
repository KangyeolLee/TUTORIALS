import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "./Loading";
import kakaopayConfig from "./kakaopay.config";

function App() {
  const { params } = kakaopayConfig;
  // const [nextUrl, setNextUrl] = useState();

  useEffect(() => {
    const postKakaopay = async () => {
      const data = await axios.post("/v1/payment/ready", null, {
        params,
        headers: {
          Authorization: `KakaoAK ${process.env.REACT_APP_KAKAOPAY_ADMIN_KEY}`,
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      });
      console.log(data);
    };
    postKakaopay();
  }, []);

  return (
    <div className="App">
      <Loading />
    </div>
  );
}

export default App;
