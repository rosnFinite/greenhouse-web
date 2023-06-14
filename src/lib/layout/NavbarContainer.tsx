import { Navbar, Link, Text, Avatar, Dropdown, Image } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";

import Layout from "./Layout";

interface LinkMap {
  name: string;
  link: string;
}

export default function NavbarContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const { asPath } = useRouter();

  const navigationItems: LinkMap[] = [
    { name: "Dashboard", link: "/dashboard" },
    { name: "Geräte", link: "/devices" },
    { name: "Einstellungen", link: "/settings" },
  ];

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => setHasMounted(true), []);

  // handles hydration error (id mismatch between server and client)
  if (!hasMounted) return null;

  return (
    <Layout>
      <Navbar variant="sticky">
        <Navbar.Toggle showIn="xs" />
        <Navbar.Brand
          css={{
            "@xs": {
              w: "170px",
            },
          }}
        >
          <Image
            src="https://i.ibb.co/BgnybnJ/logo.png"
            alt="logo"
            width="65px"
            height="65px"
          />
          <Text b color="inherit" hideIn="xs">
            LEAFLY
          </Text>
        </Navbar.Brand>
        <Navbar.Content
          enableCursorHighlight
          activeColor="success"
          hideIn="xs"
          variant="underline"
        >
          {navigationItems.map(({ name, link }) => (
            <Navbar.Link
              id={`${name}-item`}
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
          css={{
            "@xs": {
              w: "12%",
              jc: "flex-end",
            },
          }}
        >
          <Dropdown placement="bottom-right">
            <Navbar.Item>
              <Dropdown.Trigger>
                <Avatar
                  bordered
                  as="button"
                  color="success"
                  size="md"
                  icon={<FaUser color="white" />}
                />
              </Dropdown.Trigger>
            </Navbar.Item>
            <Dropdown.Menu aria-label="User menu actions" color="warning">
              <Dropdown.Item key="profile-settings">
                Profileinstellung
              </Dropdown.Item>
              <Dropdown.Item key="logout" withDivider color="error">
                Ausloggen
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Content>
        <Navbar.Collapse>
          {navigationItems.map(({ name, link }) => (
            <Navbar.CollapseItem
              id={`${name}-item`}
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
      {children}
    </Layout>
  );
}
