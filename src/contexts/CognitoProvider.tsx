import { createContext, useEffect, useState } from "react"
import { signOut, getCurrentUser, fetchUserAttributes } from "aws-amplify/auth";
import { Hub } from "aws-amplify/utils";

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

function CognitoProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<CognitoContextType["user"] | null>({
    username: "",
    userId: "",
  });

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const user = await getCurrentUser();
        const userAttributes = await fetchUserAttributes();
        setIsAuthenticated(true);
        setUser({
          username: user.username,
          userId: user.userId,
          name: userAttributes.name
        });
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
      }
    }

    fetchSession();
  }, []);

  useEffect(() => {
    const subscriber = Hub.listen("auth", async ({ payload: { event, data } }) => {
      switch (event) {
        case "signedIn":
          setIsAuthenticated(true);
          // eslint-disable-next-line no-case-declarations
          const userAttributes = await fetchUserAttributes();
          setUser({
            username: data.username,
            userId: data.userId,
            name: userAttributes.name
          });
          break;
        case "signedOut":
          setIsAuthenticated(false);
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