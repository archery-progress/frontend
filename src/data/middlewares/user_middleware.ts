import { createListenerMiddleware } from "@reduxjs/toolkit";
import { authApi } from "../api/auth_api";
import { userActions } from "../store/user_store";
import { onboardingApi } from "../api/onboarding_api";


export const userListenerMiddleware = createListenerMiddleware()

userListenerMiddleware.startListening({
  matcher: onboardingApi.endpoints.createStructure.matchFulfilled,
  effect: async (action, listenerApi) => {
    const result = await listenerApi.dispatch(
      authApi.endpoints.getAuthenticatedUser.initiate(undefined, { forceRefetch: true })
    ).unwrap()
  
    listenerApi.dispatch(userActions.updateUser(result))
    
  }
})