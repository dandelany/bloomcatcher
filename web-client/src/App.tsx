import React, {useEffect, useState} from 'react';
import './App.css';
import {API, fetchLatest} from './api/api';

// refresh the page every 20 seconds
// todo: implement proper data refreshing
setTimeout(() => window.location.reload(), 20 * 1000);

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
      <header className="App-header">
        Bloomcatcher
      </header>
      {/*<nav>*/}
      {/*  <ul>*/}
      {/*    <li><a href="#">Latest Images</a></li>*/}
      {/*    <li><a href="#">Camera Controls</a></li>*/}
      {/*    <li><a href="#">Image Library</a></li>*/}
      {/*  </ul>*/}
      {/*</nav>*/}
      <div>
        {latest ?
          <div>
            {latest.map(camera => {
              const lastImgName = camera.latestImages[0];
              const imgUrl = `http://localhost:3939/data/images/${camera.name}/latest/${lastImgName}`;
              return <div>
                <h3>Latest from {camera.name} - {lastImgName}</h3>
                <img src={imgUrl} alt="" style={{height: '90vh'}} />
                {/*{camera.latestImages.map(imgName => {*/}
                {/*  const imgUrl = `http://localhost:3939/data/images/${camera.name}/latest/${imgName}`;*/}
                {/*  return <img src={imgUrl} alt="" width={300} />*/}
                {/*})}*/}
              </div>
            })}
          </div>
          : null
        }
      </div>
    </div>
  );
}

export default App;
