import app from "./app";
import http, { Server } from "http";
import dotenv from "dotenv";
import { AddressInfo } from "net";
dotenv.config();

const normalizePort = (val: string): number | string | false => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

const port = normalizePort(process.env.PORT || "4000");
app.set("port", port);

const errorHandler = (error: NodeJS.ErrnoException): void => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === "string" ? `pipe ${address}` : `port: ${port}`;
  switch (error.code) {
    case "EACCES":
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);

    case "EADDRINUSE":
      console.error(`${bind} is already in use`);
      process.exit(1);

    default:
      throw error;
  }
};

const server: Server = http.createServer(app);

server.on("error", errorHandler);
server.on("listening", () => {
  const address = server.address();
  const bind =
    typeof address === "string"
      ? `pipe ${address}`
      : `port: ${(address as AddressInfo).port}`;
  console.log(`Listening on ${bind}`);
});

server.listen(port);
