import React, { useEffect, useState } from "react";
import "./App.css";
import { API, fetchLatest } from "./api/api";
import { baseUrl } from "./utils";

// refresh the page every 20 seconds
// todo: implement proper data refreshing
setTimeout(() => window.location.reload(), 30 * 1000);

function App() {
  const [latest, setLatest] = useState<API.LatestResponse | null>(null);
  const [latestLoaded, setLatestLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      setLatestLoaded(false);
      let res = await fetchLatest();
      if (res.success && res.data) {
        setLatest(res.data);
        setLatestLoaded(true);
      }
    })();
  }, []);

  return (
    <div className="App">
      {/*<header className="App-header">Bloomcatcher</header>*/}

      {/*<nav>*/}
      {/*  <ul>*/}
      {/*    <li><a href="#">Latest Images</a></li>*/}
      {/*    <li><a href="#">Camera Manager</a></li>*/}
      {/*    <li><a href="#">Camera Settings</a></li>*/}
      {/*    <li><a href="#">Image Library</a></li>*/}
      {/*    <li><a href="#">Video Creation</a></li>*/}
      {/*  </ul>*/}
      {/*</nav>*/}

      <div>
        {latest ? (
          <div>
            {latest.map((camera) => {
              const lastImgName = camera.latestImages[0];
              const imgUrl = `${baseUrl}/data/images/${camera.name}/latest/${lastImgName}`;

              const imgCount = camera.latestImages.length;
              const desiredMaxImgCount = 10;
              const imgSkip = Math.ceil(imgCount / desiredMaxImgCount);

              return (
                <div>
                  <h3>
                    Latest from {camera.name} - {lastImgName}
                  </h3>
                  <img src={imgUrl} alt="" style={{ height: "90vh" }} />

                  <div>
                    {camera.latestImages
                      .filter((d, i) => i % imgSkip === 0)
                      .map((imgName) => {
                        const thumbUrl = `${baseUrl}/thumbs/300/${camera.name}/latest/${imgName}`;
                        return <img src={thumbUrl} alt="" style={{ width: "300px" }} />;
                      })}
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;
