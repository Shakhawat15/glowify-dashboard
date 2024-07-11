import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import {
  ArchiveBoxIcon,
  BriefcaseIcon,
  DocumentDuplicateIcon,
  InboxIcon,
  PowerIcon,
  PresentationChartBarIcon,
  ShoppingBagIcon,
  TagIcon,
  UsersIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/solid";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Header from "../Header/Header";

export default function MasterLayout({ children }) {
  MasterLayout.propTypes = {
    children: PropTypes.node.isRequired,
  };

  const [open, setOpen] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const paths = [
      "/users",
      "/user-roles",
      "/brands",
      "/categories",
      "/products",
      "/orders",
      "/settings",
      "/menu",
    ];
    paths.forEach((path, index) => {
      if (location.pathname.startsWith(path)) {
        setOpen(index + 1);
      }
    });
  }, [location]);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <div className="flex flex-col h-screen relative">
      <Header />
      <div className="flex flex-grow overflow-hidden">
        <div className="h-full w-60 p-4 shadow-xl shadow-blue-gray-900/5">
          <List>
            <NavLink
              className={({ isActive }) =>
                `flex items-center p-2 rounded-md mt-2 transition-colors ${
                  isActive
                    ? "bg-blue-gray-100 text-blue-500"
                    : "hover:bg-blue-gray-50"
                }`
              }
              to="/"
            >
              <ListItemPrefix>
                <PresentationChartBarIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Dashboard
              </Typography>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `flex items-center p-2 rounded-md mt-2 transition-colors ${
                  isActive
                    ? "bg-blue-gray-100 text-blue-500"
                    : "hover:bg-blue-gray-50"
                }`
              }
              to="/users"
            >
              <ListItemPrefix>
                <UsersIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Users
              </Typography>
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `flex items-center p-2 rounded-md mt-2 transition-colors ${
                  isActive
                    ? "bg-blue-gray-100 text-blue-500"
                    : "hover:bg-blue-gray-50"
                }`
              }
              to="/user-roles"
            >
              <ListItemPrefix>
                <BriefcaseIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                User Roles
              </Typography>
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `flex items-center p-2 rounded-md mt-2 transition-colors ${
                  isActive
                    ? "bg-blue-gray-100 text-blue-500"
                    : "hover:bg-blue-gray-50"
                }`
              }
              to="/brands"
            >
              <ListItemPrefix>
                <TagIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Brands
              </Typography>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `flex items-center p-2 rounded-md mt-2 transition-colors ${
                  isActive
                    ? "bg-blue-gray-100 text-blue-500"
                    : "hover:bg-blue-gray-50"
                }`
              }
              to="/categories"
            >
              <ListItemPrefix>
                <ArchiveBoxIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Categories
              </Typography>
            </NavLink>
            <Accordion
              open={open === 5}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${
                    open === 5 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem className="p-0" selected={open === 5}>
                <AccordionHeader
                  onClick={() => handleOpen(5)}
                  className="border-b-0 p-3"
                >
                  <ListItemPrefix>
                    <ShoppingBagIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="mr-auto font-normal">
                    Products
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0">
                  <NavLink
                    className={({ isActive }) =>
                      `flex items-center p-2 rounded-md mt-2 transition-colors ${
                        isActive
                          ? "bg-blue-gray-100 text-blue-500"
                          : "hover:bg-blue-gray-50"
                      }`
                    }
                    to="/products"
                  >
                    <ListItemPrefix>
                      <ChevronRightIcon
                        strokeWidth={3}
                        className="h-3 w-5 mr-3"
                      />
                    </ListItemPrefix>
                    <Typography color="blue-gray" className="font-normal">
                      Product List
                    </Typography>
                  </NavLink>
                  <NavLink
                    className={({ isActive }) =>
                      `flex items-center p-2 rounded-md mt-2 transition-colors ${
                        isActive
                          ? "bg-blue-gray-100 text-blue-500"
                          : "hover:bg-blue-gray-50"
                      }`
                    }
                    to="/product-create"
                  >
                    <ListItemPrefix>
                      <ChevronRightIcon
                        strokeWidth={3}
                        className="h-3 w-5 mr-3"
                      />
                    </ListItemPrefix>
                    <Typography color="blue-gray" className="font-normal">
                      Add Product
                    </Typography>
                  </NavLink>
                </List>
              </AccordionBody>
            </Accordion>
            <NavLink
              className={({ isActive }) =>
                `flex items-center p-2 rounded-md mt-2 transition-colors ${
                  isActive
                    ? "bg-blue-gray-100 text-blue-500"
                    : "hover:bg-blue-gray-50"
                }`
              }
              to="/orders"
            >
              <ListItemPrefix>
                <InboxIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Orders
              </Typography>
            </NavLink>
            <Accordion
              open={open === 7}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${
                    open === 7 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem className="p-0" selected={open === 7}>
                <AccordionHeader
                  onClick={() => handleOpen(7)}
                  className="border-b-0 p-3"
                >
                  <ListItemPrefix>
                    <WrenchScrewdriverIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="mr-auto font-normal">
                    Settings
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0">
                  <NavLink
                    className={({ isActive }) =>
                      `flex items-center p-2 rounded-md mt-2 transition-colors ${
                        isActive
                          ? "bg-blue-gray-100 text-blue-500"
                          : "hover:bg-blue-gray-50"
                      }`
                    }
                    to="/header-setting"
                  >
                    <ListItemPrefix>
                      <ChevronRightIcon
                        strokeWidth={3}
                        className="h-3 w-5 mr-3"
                      />
                    </ListItemPrefix>
                    <Typography color="blue-gray" className="font-normal">
                      Header Setting
                    </Typography>
                  </NavLink>
                  <NavLink
                    className={({ isActive }) =>
                      `flex items-center p-2 rounded-md mt-2 transition-colors ${
                        isActive
                          ? "bg-blue-gray-100 text-blue-500"
                          : "hover:bg-blue-gray-50"
                      }`
                    }
                    to="/footer-setting"
                  >
                    <ListItemPrefix>
                      <ChevronRightIcon
                        strokeWidth={3}
                        className="h-3 w-5 mr-3"
                      />
                    </ListItemPrefix>
                    <Typography color="blue-gray" className="font-normal">
                      Footer Setting
                    </Typography>
                  </NavLink>
                </List>
              </AccordionBody>
            </Accordion>

            <Accordion
              open={open === 8}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${
                    open === 8 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem className="p-0" selected={open === 8}>
                <AccordionHeader
                  onClick={() => handleOpen(8)}
                  className="border-b-0 p-3"
                >
                  <ListItemPrefix>
                    <DocumentDuplicateIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="mr-auto font-normal">
                    Menu Builder
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0">
                  <NavLink
                    className={({ isActive }) =>
                      `flex items-center p-2 rounded-md mt-2 transition-colors ${
                        isActive
                          ? "bg-blue-gray-100 text-blue-500"
                          : "hover:bg-blue-gray-50"
                      }`
                    }
                    to="/create-menu"
                  >
                    <ListItemPrefix>
                      <ChevronRightIcon
                        strokeWidth={3}
                        className="h-3 w-5 mr-3"
                      />
                    </ListItemPrefix>
                    <Typography color="blue-gray" className="font-normal">
                      Create Menu
                    </Typography>
                  </NavLink>
                </List>
              </AccordionBody>
            </Accordion>

            <NavLink
              className={({ isActive }) =>
                `flex items-center p-2 rounded-md mt-2 transition-colors ${
                  isActive
                    ? "bg-blue-gray-100 text-blue-500"
                    : "hover:bg-blue-gray-50"
                }`
              }
              to="/logout"
            >
              <ListItemPrefix>
                <PowerIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Log Out
              </Typography>
            </NavLink>
          </List>
        </div>
        <main className="flex-grow overflow-auto p-4">{children}</main>
      </div>
    </div>
  );
}
