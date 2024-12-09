import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { IUserState, IUserActionByKey } from "../domain/identify-and-access-context"

const initialState: IUserState = {
  userId: "",
  name: "",
  surname: "",
  sessionToken: "",
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<IUserState>) => {
      state.name = action.payload.name
      state.surname = action.payload.surname
    },
    setUserFieldByKey: (state, action: PayloadAction<IUserActionByKey>) => {
      state[action.payload.key] = action.payload.value
    },
    clearUserFieldByKey: (state, action: PayloadAction<IUserActionByKey>) => {
      state[action.payload.key] = ""
    },
  },
})

export const { setUserData, setUserFieldByKey, clearUserFieldByKey } = userSlice.actions

export default userSlice.reducer
