import { Container, Text, Title } from "@mantine/core";
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { API, fetchSession } from "../../api/api";
import { baseUrl } from "../../utils";

export function SessionPage() {
  const params = useParams();
  const [session, setSession] = useState<API.SessionResponse | null>(null);
  const [sessionLoaded, setSessionLoaded] = useState(false);

  const {cameraName, sessionId} = params;

  useEffect(() => {
    (async () => {
      if(!cameraName || !sessionId) return '';

      setSessionLoaded(false);
      

      let res = await fetchSession(cameraName, sessionId);
      if (res.success && res.data) {
        setSession(res.data);
        setSessionLoaded(true);
      }
    })();
  }, []);

  const videoUrl = `${baseUrl}/data/videos/${cameraName}/raw/${sessionId}.mp4`;
  
  return <Container>
    <video width="700" height="400" controls autoPlay loop>
      <source src={videoUrl} />
    </video>
    <Title>
      {cameraName}
    </Title>
    <Title>
      {sessionId}
    </Title>
    {session?.images.map(image => {
      return <div>{image}</div>
    })}
  </Container>
}