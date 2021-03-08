const BASE_URL =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://api.server.vincipit.com";

  const BASE_WS = BASE_URL.replace(/^https?/, "wss")

export { BASE_URL, BASE_WS }