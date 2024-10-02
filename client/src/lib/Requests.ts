import axios from "axios";

namespace Requests {
  export const URL = import.meta.env.VITE_SERVER_URL;

  export function GET(endpoint: string, headers: Record<string, string>) {
    return axios.get(URL + endpoint, { headers });
  }

  export function POST(
    endpoint: string,
    body: Record<string, any>,
    headers: Record<string, string>
  ) {
    return axios.post(URL + endpoint, body, { headers });
  }
}

export default Requests;
