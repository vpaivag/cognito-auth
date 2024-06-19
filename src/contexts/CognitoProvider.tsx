import { useEffect } from "react"
import { getCurrentUser, fetchUserAttributes } from "aws-amplify/auth";
import { Hub } from "aws-amplify/utils";
import { useAtom } from "jotai";

import { isAuthenticatedAtom, userAtom } from "../atoms/session";

function useCognito() {
  const [, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
  const [, setUser] = useAtom(userAtom);

  // Permite que el usuario se mantenga autenticado al recargar la página
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const user = await getCurrentUser(); // Throw an error if the user is not authenticated
        const userAttributes = await fetchUserAttributes(); // Fetch the user attributes

        setIsAuthenticated(true);
        setUser({
          username: user.username,
          userId: user.userId,
          name: userAttributes.name,
        });
      } catch (error) {
        console.error('Error fetching user session', error);
        setIsAuthenticated(false);
        setUser(null);
      }
    };
    console.log('Fetching session');
    fetchSession();
  }, []);

  // Escucha los eventos de autenticación
  useEffect(() => {
    // @ts-expect-error No se puede inferir el tipo de la función
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
}

export { useCognito };