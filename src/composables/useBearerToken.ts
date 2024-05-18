import { type IdTokenResult } from "firebase/auth";
import { useCurrentUser } from "vuefire";

import { FB_EXPIRATION_DATE } from "@/constants";
import { convertDateToMs } from "@/utils/date";

let bearerToken: string | null = null;

export function useBearerToken() {
  function getIdTokenResult(forceRefresh = false) {
    return new Promise<IdTokenResult>((resolve, reject) => {
      const user = useCurrentUser();

      try {
        user.value?.getIdTokenResult(forceRefresh).then(r => {
          bearerToken = r.token;
          // Set the token expiration date in the local storage for further use
          if (r.expirationTime) {
            window?.localStorage.setItem(
              FB_EXPIRATION_DATE,
              `${convertDateToMs(r.expirationTime)}`
            );
          }

          resolve(r);
        });
      } catch (e) {
        reject(e);
      }
    });
  }

  return {
    bearerToken,
    getIdTokenResult,
  };
}
