import { appApi } from "./api-config";

const authApi = appApi.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        signUp: builder.mutation({
            query: ({ username, email, password }) => ({
                url: "/auth/sign-up",
                method: "POST",
                body: {
                    username,
                    email,
                    password,
                },
            }),
        }),

        signIn: builder.mutation({
            query: ({ username, password }) => ({
                url: "/auth/sign-in",
                method: "POST",
                body: {
                    username,
                    password,
                },
            }),
        }),

        signOut: builder.mutation({
            query: () => ({
                url: "/auth/sign-out",
                method: "POST",
            }),
        }),

        forgotPassword: builder.mutation({
            query: ({ email }) => ({
                url: "/auth/forgot-password",
                method: "POST",
                body: {
                    email,
                },
            }),
        }),

        resetPassword: builder.mutation({
            query: ({ token, password }) => ({
                url: "/auth/reset-password",
                method: "POST",
                body: {
                    token,
                    password,
                },
            }),
        }),

        refreshToken: builder.mutation({
            query: () => ({
                url: "/auth/refresh-token",
                method: "GET",
            }),
        }),
    }),
});

export const {
    useSignUpMutation,
    useSignInMutation,
    useSignOutMutation,
    useRefreshTokenMutation,
} = authApi;
