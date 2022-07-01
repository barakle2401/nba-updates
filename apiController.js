import jsdom from "jsdom";
import axios from "axios";
const { JSDOM } = jsdom;

class ApiController {
  async requestDom(url) {
    const response = await axios.get(url);
    const html = await response.data;
    return new JSDOM(html);
  }
}

export default ApiController;
