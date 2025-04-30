import { useMutation } from "@tanstack/react-query";
import supabase from "../services/supabase.js";

const signupUser = async (credentials) => {
  const { email, password, username, role } = credentials;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
        role,
      },
    },
  });

  if (error) throw error;
  return data;
};

export const useSignup = (options = {}) => {
  return useMutation({
    mutationFn: signupUser,
    onSuccess: (data, variables, context) => {
      console.log("Signup successful", data);

      // Call custom success handler if provided
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    onError: (error, variables, context) => {
      // Default error handler
      console.error("Signup error:", error);

      // Call custom error handler if provided
      if (options.onError) {
        options.onError(error, variables, context);
      }
    },
  });
};

export default useSignup;
