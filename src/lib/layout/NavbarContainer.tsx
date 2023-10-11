import { Navbar, Link, Text, Avatar, Dropdown, Image } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaUser } from "react-icons/fa";

import { auth, logout } from "../../fbase/firebaseClient";

import Layout from "./Layout";

interface LinkMap {
  name: string;
  link: string;
}

const NavbarContainer = ({ children }: { children: React.ReactNode }) => {
  const { asPath } = useRouter();
  const router = useRouter();
  const [user, , ,] = useAuthState(auth);

  const navigationItems: LinkMap[] = [
    { name: "Dashboard", link: "/dashboard" },
    { name: "Geräte", link: "/devices" },
    { name: "Einstellungen", link: "/settings" },
  ];

  return (
    <Layout>
      <Navbar
        id="navbar"
        variant="sticky"
        css={{
          background: "transparent",
          backdropFilter: "saturate(1.8) blur(15px)",
          $$navbarBlur: "blur(0px)",
          $$navbarBackgroundColor: "transparent",
          $$navbarBlurBackgroundColor: "transparent",
        }}
      >
        <Navbar.Toggle showIn="xs" />
        <Navbar.Brand
          id="navbar-brand-container"
          css={{
            "@xs": {
              w: "170px",
            },
          }}
        >
          <Image
            loading="eager"
            id="navbar-brand"
            src="https://i.ibb.co/BgnybnJ/logo.png"
            alt="logo"
            width="65px"
            height="65px"
          />
          <Text id="navbar-brand-text" b color="inherit" hideIn="xs">
            Leafly
          </Text>
        </Navbar.Brand>
        <Navbar.Content
          id="navbar-content"
          enableCursorHighlight
          activeColor="success"
          hideIn="xs"
          variant="underline"
        >
          {navigationItems.map(({ name, link }) => (
            <Navbar.Link
              id={`navbar-${name}-item`}
              key={name}
              href={link}
              isActive={asPath === link}
              hideIn="xs"
            >
              {name}
            </Navbar.Link>
          ))}
        </Navbar.Content>
        <Navbar.Content
          id="navbar-content-profile"
          css={{
            "@xs": {
              w: "12%",
              jc: "flex-end",
            },
          }}
        >
          <Dropdown placement="bottom-right">
            <Navbar.Item id="navbar-avatar-item">
              <Dropdown.Trigger>
                <Avatar
                  id="navbar-avatar"
                  bordered
                  as="button"
                  color="success"
                  size="md"
                  icon={<FaUser color="white" />}
                />
              </Dropdown.Trigger>
            </Navbar.Item>
            <Dropdown.Menu
              aria-label="User menu actions"
              color="warning"
              onAction={(actionKey) => {
                if (actionKey === "logout") {
                  logout();
                  router.push("/login");
                }
              }}
            >
              <Dropdown.Item key="pofile-name">
                {user?.displayName ? user?.displayName : user?.email}
              </Dropdown.Item>
              <Dropdown.Item key="profile-settings" withDivider>
                Profileinstellung
              </Dropdown.Item>
              <Dropdown.Item key="logout" color="error">
                Ausloggen
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Content>
        <Navbar.Collapse>
          {navigationItems.map(({ name, link }) => (
            <Navbar.CollapseItem
              id={`collapse-${name}-item`}
              key={name}
              activeColor="success"
              isActive={asPath === link}
            >
              <Link
                color="inherit"
                css={{
                  minWidth: "100%",
                }}
                href={link}
              >
                {name}
              </Link>
            </Navbar.CollapseItem>
          ))}
        </Navbar.Collapse>
      </Navbar>
      {user ? children : <div />}
    </Layout>
  );
};

export default NavbarContainer;
