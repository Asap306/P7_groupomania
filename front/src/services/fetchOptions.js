const { VITE_SERVER_ADDRESS, VITE_SERVER_PORT } = import.meta.env
const url = `http://localhost:3000/api/`

const headers = {
  Authorization: `Bearer ${localStorage.getItem("token")}`,
  "Accept": "application/json"
}

function getUrlAndHeaders() {
  return {
    url,
    headers
  }
}
function getUserInfos() {
  return JSON.parse(localStorage.getItem("user"));

}

export { getUrlAndHeaders, getUserInfos }
