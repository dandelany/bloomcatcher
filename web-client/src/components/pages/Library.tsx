import { LoadingOverlay, Title, Text, Container, SimpleGrid, Card, Group, Image, Badge } from "@mantine/core";
import { useEffect, useState } from "react";

import { baseUrl } from "../../utils";
import { API, fetchLatest, fetchLibrary } from "../../api/api";
import { Link } from "react-router-dom";


export function LibraryPage() {
  const [library, setLibrary] = useState<API.LibraryResponse | null>(null);
  const [libraryLoaded, setLibraryLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      setLibraryLoaded(false);
      let res = await fetchLibrary();
      if (res.success && res.data) {
        setLibrary(res.data);
        setLibraryLoaded(true);
      }
    })();
  }, []);

  if(!libraryLoaded) return <LoadingOverlay visible={true} />;

  return <div>
    {library ? library.map(camLibrary => {
      const colCount = 4;
      // const rowCount = Math.ceil(camLibrary.sessions.length / 3);
      // const rows = [];
      // for(let i=0; i+=colCount; i<camLibrary.sessions.length)  {

      // }

      return <div>
        <Title order={4}>
          {camLibrary.name}
        </Title>
        
        <SimpleGrid cols={colCount}>
          {camLibrary.sessions.map(session => {
            const thumbUrl = `${baseUrl}/thumbs/200/${camLibrary.name}/${session.dirName}/${session.thumbUrl}`;
            return (
              <Card shadow="sm" p="lg" radius="md" withBorder>
                <Card.Section>
                  <Image
                    src={thumbUrl}
                    height={160}
                    alt={session.thumbUrl}
                  />
                </Card.Section>

                <Group position="apart" mt="md">
                  <Link to={`/library/${camLibrary.name}/${session.dirName}`}>

                    <Text weight={500}>{session.name}</Text>
                  </Link>
                  {/* <Badge color="pink" variant="light">
                    On Sale
                  </Badge> */}
                </Group>

                <Text size="sm" color="dimmed" mb="xs">
                  {session.date}
                  
                </Text>

                <Text size="sm" color="dimmed">
                  {session.count} photos
                </Text>

                

                {/* <Button variant="light" color="blue" fullWidth mt="md" radius="md">
                  Book classic tour now
                </Button> */}
              </Card>
            )
            return <Container>
              <img src={thumbUrl} alt="" style={{ width: "200px" }} />

              {session.name}
              <Text c="dimmed" span ml="xs">
                {session.date}
              </Text>
            </Container>
          })}
        </SimpleGrid>
        

      </div>
    }) : null}
  </div>
}