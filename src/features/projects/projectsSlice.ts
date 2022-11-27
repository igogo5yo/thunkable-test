import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface IProjectItem {
  id: string;
  name: string;
  date: number;
}
export interface IProjectsState {
  showCreationForm: boolean;
  editableId?: string;
  list: IProjectItem[];
}

const initialState: IProjectsState = {
  showCreationForm: false,
  editableId: undefined,
  list: [],
};

export const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    create: (state, action: PayloadAction<IProjectItem>) => {
      state.list.unshift(action.payload);
      state.showCreationForm = false;
      state.editableId = undefined;
    },
    edit: (state, action: PayloadAction<string>) => {
      state.editableId = action.payload;
      state.showCreationForm = false;
    },
    update: (state, action: PayloadAction<IProjectItem>) => {
      state.list = state.list.map(proj => proj.id === action.payload.id ? action.payload : proj);
      state.editableId = undefined;
    },
    remove: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter(proj => proj.id !== action.payload);
    },
    showCreationForm: (state) => {
      state.showCreationForm = true;
      state.editableId = undefined;
    },
    hideCreationForm: (state) => {
      state.showCreationForm = false;
    },
  },
});

export const selectProjects = (state: RootState) => state.projects.list;
export const selectShowCreationForm = (state: RootState) => state.projects.showCreationForm;
export const selectHasProjects = (state: RootState) => Boolean(state.projects.list.length);
export const selectEditableId = (state: RootState) => state.projects.editableId;

export const { create, showCreationForm, hideCreationForm, edit, remove, update } = projectsSlice.actions;

export default projectsSlice.reducer;
