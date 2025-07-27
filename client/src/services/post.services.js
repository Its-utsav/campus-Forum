class PostService {
  constructor() {
    this.BASE_URL = "/api";
  }
  /**
   *
   * @param {{body:string}} postData
   */
  async createPost(postData) {
    try {
      const res = await fetch(`${this.body}/api/posts`, {
        method: "POST",
        body: JSON.stringify(postData),
        credentials: "include",
        headers: {
          "Content-Type": "application-json",
        },
      });
      const resData = await res.json();
      if (!res.ok || !resData.resData) {
        throw new Error(
          resData.message || "something went wrong at create post"
        );
      }
      return resData.data;
    } catch (error) {
      console.error("error :: createPost ", error);
    }
  }

  async getAllPost() {
    try {
      const res = await fetch(`${this.body}/api/posts`, {
        method: "GET",

        credentials: "include",
        headers: {
          "Content-Type": "application-json",
        },
      });
      const resData = await res.json();
      if (!res.ok || !resData.resData) {
        throw new Error(
          resData.message || "something went wrong at get all post"
        );
      }
      return resData.data;
    } catch (error) {
      console.error("error :: getAllPost ", error);
    }
  }

  /**
   *
   * @param {string} postId
   * @returns
   */
  async getAPost(postId) {
    try {
      const res = await fetch(`${this.body}/api/posts/${postId}`, {
        method: "GET",

        credentials: "include",
        headers: {
          "Content-Type": "application-json",
        },
      });
      const resData = await res.json();
      if (!res.ok || !resData.resData) {
        throw new Error(resData.message || "something went wrong at get post");
      }
      return resData.data;
    } catch (error) {
      console.error("error :: getAPost ", error);
    }
  }

  /**
   *
   * @param {string} postId
   * @returns
   */
  async deleteAPost(postId) {
    try {
      const res = await fetch(`${this.body}/api/posts/${postId}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application-json",
        },
      });
      const resData = await res.json();
      if (!res.ok || !resData.resData) {
        throw new Error(
          resData.message || "something went while deleting post"
        );
      }
      return resData.data;
    } catch (error) {
      console.error("error :: getAPost ", error);
    }
  }
}

const postService = new PostService();
export default postService;
