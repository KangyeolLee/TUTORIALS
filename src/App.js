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
          Authorization: "KakaoAK 17f6c6ec457977e41c71d0efed5ce335",
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
