export default class Fetch {
  async fetchGet(url, params) {
    try {
      const response = await fetch(url, params);
      const data = await response.json();
      if (!response.ok) {
          throw new Error('Request finished with fail')
      }
      return data;
    } catch (e) {
      
    }
  }

  async fetchPost(url, params) {
    try {
      const response = await fetch(url, params);
      const data = await response.json();
      if (!response.ok) {
          throw new Error('Request finished with fail')
      }
      return data;
    } catch (e) {

    }
  }
  async fetchPut() {}
  async fetchDel() {}
}
