class AnswerService {
  constructor() {
    this.BASE_URL = "/api";
  }

  /**
   *
   * @param {{answerBody:string,postId:string}} param0
   * @returns
   */
  async postAnswer({ answerBody, postId }) {
    try {
      const res = await fetch(`${this.BASE_URL}/api/posts/answer/${postId}`, {
        method: "POST",
        body: JSON.stringify(answerBody),
        credentials: "include",
        headers: {
          "Content-Type": "application-json",
        },
      });
      const resData = await res.json();
      if (!res.ok || !resData.data) {
        throw new Error(
          resData.message || "something went while posting answer"
        );
      }
      return resData.data;
    } catch (error) {
      console.error("error :: postAnswer ", error);
      throw error;
    }
  }
  /**
   *
   * @param {string} postId
   */
  async getAnswer(postId) {
    try {
      const res = await fetch(`${this.BASE_URL}/api/posts/answer/${postId}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application-json",
        },
      });
      const resData = await res.json();
      if (!res.ok || !resData.data) {
        throw new Error(resData.message || "something went while get answer");
      }
      return resData.data;
    } catch (error) {
      console.error("error :: getAnswer ", error);
      throw error;
    }
  }
  /**
   *
   * @param {string} postId
   */
  async deleteAnswer(postId) {
    try {
      const res = await fetch(`${this.BASE_URL}/api/posts/answer/${postId}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application-json",
        },
      });
      const resData = await res.json();
      if (!res.ok || !resData.data) {
        throw new Error(
          resData.message || "something went while delete answer"
        );
      }
      return resData.data;
    } catch (error) {
      console.error("error :: deleteAnswer ", error);
      throw error;
    }
  }
}

const answerService = new AnswerService();
export default answerService;
