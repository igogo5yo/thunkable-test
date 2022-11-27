import projectsReducer, { IProjectsState, create, showCreationForm, hideCreationForm } from "./projectsSlice";

describe("projects reducer", () => {
  const initialState: IProjectsState = {
    showCreationForm: false,
    list: []
  };

  it("should handle initial state", () => {
    expect(projectsReducer(undefined, { type: "unknown" })).toEqual({
      showCreationForm: false,
      list: []
    });
  });

  it("should handle create", () => {
    const project = { id: "test-uuid", name: "foo", date: Date.now() };
    const actual = projectsReducer(
      initialState,
      create(project)
    );

    expect(actual.list).toEqual([project]);
    expect(actual.showCreationForm).toEqual(false);
  });

  it("should handle showCreationForm", () => {
    const actual = projectsReducer(
      initialState,
      showCreationForm()
    );

    expect(actual.showCreationForm).toEqual(true);
  });

  it("should handle hideCreationForm", () => {
    const actual = projectsReducer(
      { ...initialState, showCreationForm: true },
      hideCreationForm()
    );

    expect(actual.showCreationForm).toEqual(false);
  });
});
