export interface AuthResponse {
    user: {
        id: number;
        password: string;
        name: string;
        email: string;
        profile_img?: string;
        role_id: number;
    },
    access_token: string
}
