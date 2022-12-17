import { Card, Container, Text, Title } from "@mantine/core"
import { useEffect, useState } from "react";
import { API, fetchCameras } from "../../api/api";

export function CamerasPage() {
  const [cameras, setCameras] = useState<API.CamerasResponse | null>(null);
  const [camerasLoaded, setCamerasLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      setCamerasLoaded(false);
      let res = await fetchCameras();
      if (res.success && res.data) {
        setCameras(res.data);
        setCamerasLoaded(true);
      }
    })();
  }, []);
  
  return <Container>
    <div>
      <Title>
        Cameras
      </Title>
      { 
        cameras ? cameras.map(camera => {
          return <Card>
            <Title order={4}>
              
              {camera.name}
            </Title>
            <Text>
              Not connected
            </Text>
          </Card>
        }) : null
      }
      
    </div>
    
  </Container>
}