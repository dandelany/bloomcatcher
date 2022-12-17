import { LoadingOverlay } from "@mantine/core";
import { useEffect, useState } from "react";

import { baseUrl } from "../../utils";
import { API, fetchLatest } from "../../api/api";


export function LatestPage() {
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

  if(!latestLoaded) return <LoadingOverlay visible={true} />;

  return latest ? (
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
  ) : null;
}