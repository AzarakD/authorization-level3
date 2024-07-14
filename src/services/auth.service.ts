import { API_URL } from "@/constants";
import { IAuthFormData, IUser } from "@/types";

interface IAuthResponse {
  accessToken: string;
  user: IUser;
}

class AuthService {
  async login(data: IAuthFormData): Promise<IAuthResponse> {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Request error");
    }

    const responseData: IAuthResponse = await response.json();
    return responseData;
  }

  async register(data: IAuthFormData): Promise<IAuthResponse> {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Request error");
    }

    const responseData: IAuthResponse = await response.json();
    return responseData;
  }

  async getProfile(): Promise<IUser> {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/auth/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Request error");
    }

    const responseData: IUser = await response.json();
    return responseData;
  }
}

export default new AuthService();
