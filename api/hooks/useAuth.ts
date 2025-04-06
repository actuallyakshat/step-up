import queryClient from "@/lib/queryClient";
import { useAuthStore } from "@/store/auth";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { authApi, LoginPayload, RegisterPayload, setAuthToken } from "../auth";

export const useAuth = () => {
  const { login: setAuth, logout: clearAuth } = useAuthStore();

  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      setAuthToken(data.token);
      setAuth(data.user, data.token);
      router.replace("/(tabs)");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const registerMutation = useMutation({
    mutationFn: authApi.register,
    onSuccess: (data) => {
      setAuthToken(data.token);
      setAuth(data.user, data.token);
      router.replace("/(tabs)");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const logout = () => {
    setAuthToken(null);
    clearAuth();
    queryClient.clear();
    router.replace("/(auth)/login");
  };

  return {
    login: (payload: LoginPayload) => loginMutation.mutate(payload),
    register: (payload: RegisterPayload) => registerMutation.mutate(payload),
    logout,
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
    loginError: loginMutation.error,
    registerError: registerMutation.error,
  };
};
