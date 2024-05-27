/* eslint-disable */
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import DashIcon from "components/icons/DashIcon";

function SidebarLinks(props) {
  let location = useLocation();
  const { routes } = props;

  const isStudent = JSON.parse(
    JSON.parse(localStorage.getItem("userData"))?.data?.User?.role === "student"
  );
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return location.pathname.includes(routeName);
  };
  const createLinks = (routes) => {
    if (localStorage.length === 0) {
      const route = routes[0];
      const index = 0;
      const route2 = routes[routes.length - 3];
      const index2 = routes.length - 3;
      return (
        <>
          <Link key={index} to={route.layout + "/" + route.path}>
            <div className="relative mb-3 flex hover:cursor-pointer">
              <li
                className="my-[3px] flex cursor-pointer items-center px-8"
                key={index}
              >
                <span
                  className={`${
                    activeRoute(route.path) === true
                      ? "font-bold text-brand-500 dark:text-white"
                      : "font-medium text-gray-600"
                  }`}
                >
                  {route.name !== "Create Account" && route.icon
                    ? route.icon
                    : route.name !== "Create Account" && <DashIcon />}{" "}
                </span>
                <p
                  className={`leading-1 ml-4 flex ${
                    activeRoute(route.path) === true
                      ? "font-bold text-navy-700 dark:text-white"
                      : "font-medium text-gray-600"
                  }`}
                >
                  {route.name !== "Create Account" && route.name}
                </p>
              </li>
              {activeRoute(route.path) ? (
                <div className="absolute right-0 top-px h-9 w-1 rounded-lg bg-brand-500 dark:bg-brand-400" />
              ) : null}
            </div>
          </Link>
          <Link key={index2} to={route2.layout + "/" + route2.path}>
            <div className="relative mb-3 flex hover:cursor-pointer">
              <li
                className="my-[3px] flex cursor-pointer items-center px-8"
                key={index2}
              >
                <span
                  className={`${
                    activeRoute(route2.path) === true
                      ? "font-bold text-brand-500 dark:text-white"
                      : "font-medium text-gray-600"
                  }`}
                >
                  {route2.name !== "Create Account" && route2.icon
                    ? route2.icon
                    : route2.name !== "Create Account" && <DashIcon />}{" "}
                </span>
                <p
                  className={`leading-1 ml-4 flex ${
                    activeRoute(route2.path) === true
                      ? "font-bold text-navy-700 dark:text-white"
                      : "font-medium text-gray-600"
                  }`}
                >
                  {route2.name !== "Create Account" && route2.name}
                </p>
              </li>
              {activeRoute(route2.path) ? (
                <div className="absolute right-0 top-px h-9 w-1 rounded-lg bg-brand-500 dark:bg-brand-400" />
              ) : null}
            </div>
          </Link>
        </>
      );
    } else {
      return routes.map((route, index) => {
        if (
          (route.layout === "/admin" || route.layout === "/auth") &&
          index !== routes.length - 1 &&
          index !== routes.length - 2 &&
          index !== routes.length - 3 &&
          !(isStudent && index === 2)
        ) {
          return (
            <Link key={index} to={route.layout + "/" + route.path}>
              <div className="relative mb-3 flex hover:cursor-pointer">
                <li
                  className="my-[3px] flex cursor-pointer items-center px-8"
                  key={index}
                >
                  <span
                    className={`${
                      activeRoute(route.path) === true
                        ? "font-bold text-brand-500 dark:text-white"
                        : "font-medium text-gray-600"
                    }`}
                  >
                    {route.name !== "Create Account" && route.icon
                      ? route.icon
                      : route.name !== "Create Account" && <DashIcon />}{" "}
                  </span>
                  <p
                    className={`leading-1 ml-4 flex ${
                      activeRoute(route.path) === true
                        ? "font-bold text-navy-700 dark:text-white"
                        : "font-medium text-gray-600"
                    }`}
                  >
                    {route.name !== "Create Account" && route.name}
                  </p>
                </li>
                {activeRoute(route.path) ? (
                  <div className="absolute right-0 top-px h-9 w-1 rounded-lg bg-brand-500 dark:bg-brand-400" />
                ) : null}
              </div>
            </Link>
          );
        }
      });
    }
  };
  // BRAND
  return createLinks(routes);
}

export default SidebarLinks;
