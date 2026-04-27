import type { NextFunction, Request, Response } from "express";

import { ADMIN_COOKIE_NAME, verifyAdminSessionToken } from "./admin.auth.js";

const parseCookies = (cookieHeader?: string): Record<string, string> => {
  if (!cookieHeader) {
    return {};
  }

  return cookieHeader.split(";").reduce<Record<string, string>>((cookies, chunk) => {
    const [name, ...rest] = chunk.trim().split("=");

    if (!name) {
      return cookies;
    }

    cookies[name] = rest.join("=");
    return cookies;
  }, {});
};

export const getAdminSessionFromRequest = (request: Request) => {
  const cookies = parseCookies(request.headers.cookie);
  const token = cookies[ADMIN_COOKIE_NAME];

  if (!token) {
    return null;
  }

  return verifyAdminSessionToken(token);
};

export const requireAdminSession = (request: Request, response: Response, next: NextFunction): void => {
  const session = getAdminSessionFromRequest(request);

  if (!session) {
    response.status(401).json({
      message: "Debes iniciar sesion como administrador para continuar."
    });
    return;
  }

  next();
};
