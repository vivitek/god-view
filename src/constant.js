const BASE_URL =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://api.server.vincipit.com";

const BASE_WS = BASE_URL.replace(/^http/, "ws")
const MAPBOX_API_KEY = "pk.eyJ1IjoidXNlcm5hbWV0b3RvIiwiYSI6ImNrNGJqMGd2MTBlN3Izbm9nYmV5eGJsbWwifQ.Fa5iA8LSzCU1grVeb191xA"

export {
  BASE_URL,
  BASE_WS,
  MAPBOX_API_KEY
}
