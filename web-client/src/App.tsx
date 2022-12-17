import React, { useEffect, useState } from "react";
import { AppShell, Navbar, Header, MediaQuery, Burger, Text, Title, useMantineTheme, Box, Group, ActionIcon, UnstyledButton, ThemeIcon } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconGitPullRequest, IconAlertCircle, IconMessages, IconDatabase, IconAperture, IconPhoto, IconBooks, IconMovie, IconCameraOff } from '@tabler/icons';


import "./App.css";
import { APP_NAME } from "./constants";
import { API, fetchLatest } from "./api/api";
import { baseUrl } from "./utils";
import { Link, Outlet } from "react-router-dom";

// refresh the page every 20 seconds
// todo: implement proper data refreshing
// setTimeout(() => window.location.reload(), 30 * 1000);

interface NavItemProps {
  icon: React.ReactNode;
  color: string;
  label: string;
  href?: string;
}
function NavItem({ icon, color, label, href }: NavItemProps) {
  return (
    <UnstyledButton
      sx={(theme) => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
      })}
    >
      <Link to={href || ""} style={{textDecoration: 'none'}}>
        <Group>
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>

        
          <Text size="md">{label}</Text>
        
        </Group>
      </Link>
    </UnstyledButton>
  );
}

function App() {
  const theme = useMantineTheme();

  const [latest, setLatest] = useState<API.LatestResponse | null>(null);
  const [latestLoaded, setLatestLoaded] = useState(false);
  const [isMenuOpened, setMenuOpened] = useState<boolean>(false);
  // use hook for responsiveness, <MediaQuery> element not powerful enough
  const isSmall = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);

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

  const navItems = [
    { icon: <IconPhoto size={18} />, color: 'blue', label: 'Latest Images', href: '/latest' },
    { icon: <IconAperture size={18} />, color: 'teal', label: 'Camera Manager', href: '/cameras' },
    { icon: <IconBooks size={18} />, color: 'violet', label: 'Image Library', href: '/library' },
    { icon: <IconMovie size={18} />, color: 'grape', label: 'Video Assembly', href: '/video' }
  ];
  

  return (
    // <div className="App">
      <AppShell
        // layout="alt"
        padding="md"
        navbarOffsetBreakpoint="sm"
        navbar={
          // isSmall ?
          //   undefined :
            <Navbar width={{ base: 250 }} p="xs" hiddenBreakpoint="sm" hidden={!isMenuOpened}>
              <Box
                sx={(theme) => ({
                  backgroundColor: theme.colors.violet[8],
                  color: theme.colors.gray[1],
                  textShadow: `0px 1px 1px ${theme.colors.gray[7]}`,
                  paddingLeft: theme.spacing.md,
                  paddingRight: theme.spacing.md,
                  paddingTop: theme.spacing.xs,
                  paddingBottom: theme.spacing.xs,
                  borderBottom: `1px solid ${
                    theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
                  }`,
                  margin: -theme.spacing.xs
                })}
              >
                <Group position="apart">
                  <Title order={3}>
                    📸&nbsp; {APP_NAME}
                  </Title>
                </Group>
              </Box>

              <Navbar.Section mt="md" pb="md" sx={{borderBottom: `1px solid ${theme.colors.gray[2]}`}}>
                {navItems.map(item => {
                  return <NavItem {...item} key={item.label} />
                })}
              </Navbar.Section>

              <Navbar.Section mt="md">
                <IconCameraOff size={18} color={theme.colors.gray[5]}/>

                <Text span ml={4} c="dimmed">
                  No cameras connected
                </Text>
                
              </Navbar.Section>
              
            </Navbar>
        }
        header={
          isSmall ?
            <Header height={{ base: 50, md: 70 }} p="md">
              <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                <Burger
                  opened={isMenuOpened}
                  onClick={() => setMenuOpened((o) => !o)}
                  size="sm"
                  color={theme.colors.gray[6]}
                  mr="xl"
                />
                <Title order={3}>
                  {APP_NAME}
                </Title>
              </div>
            </Header>
            : undefined
        }
        styles={(theme) => ({
          main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
        })}
      >
        <Outlet />
        
      </AppShell>
    // </div>
  );
}

export default App;
