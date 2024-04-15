import { createContext, useEffect, useState } from "react"
import { signOut, getCurrentUser, fetchUserAttributes } from "aws-amplify/auth";
import { Hub } from "aws-amplify/utils";
import { useStore } from "@tanstack/react-store";
import { isAuthenticatedStore } from "../stores/auth";

type CognitoContextType = {
  isAuthenticated: boolean;
  user: {
    username: string;
    userId: string;
    name?: string;
  } | null;
  signOut: () => void;
}

export const CognitoContext = createContext<CognitoContextType>({
  isAuthenticated: false,
  user: {
    username: "",
    userId: "",
  },
  signOut
});

function CognitoProvider({ children }) {
  const isAuthenticated = useStore<boolean>(isAuthenticatedStore);
  const [user, setUser] = useState<CognitoContextType["user"] | null>({
    username: "",
    userId: "",
  });

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const user = await getCurrentUser();
        const userAttributes = await fetchUserAttributes();
        isAuthenticatedStore.setState(() => true);

        setUser({
          username: user.username,
          userId: user.userId,
          name: userAttributes.name
        });
      } catch (error) {
        isAuthenticatedStore.setState(() => false);
        setUser(null);
      }
    }

    fetchSession();
  }, []);

  useEffect(() => {
    const subscriber = Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signedIn":
          isAuthenticatedStore.setState(() => true);
          setUser(data);
          break;
        case "signedOut":
          isAuthenticatedStore.setState(() => false);
          setUser(null);
          break;
      }
    });

    return () => {
      subscriber();
    }
  });

  return (
    <CognitoContext.Provider value={{
      isAuthenticated,
      user,
      signOut
    }}>
      {children}
    </CognitoContext.Provider>
  );
}

export { CognitoProvider };