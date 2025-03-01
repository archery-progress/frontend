import { createSlice } from "@reduxjs/toolkit"
import { StructureState } from "../contracts/states.interface"
import { RootState } from "./store"

const STRUCTURE_KEY = 'structure'

export const initialStructureState: StructureState = {
  structures: null,
  currentStructure: null
}

export const structureSlice = createSlice({
  name: STRUCTURE_KEY,
  initialState: initialStructureState,
  reducers: {
    setStructures: (state, action) => {
      state.structures = action.payload
    },
    addStructure: (state, action) => {
      if (state.structures) {
        state.structures = [...state.structures, action.payload]
      } else {
        state.structures = [action.payload]
      }
    },
    setCurrentStructure: (state, action) => {
      state.currentStructure = action.payload
    }
  }
})

export const structureReducer = structureSlice.reducer
export const structureActions = structureSlice.actions

export const getStructureState = (root: RootState) => root[STRUCTURE_KEY]