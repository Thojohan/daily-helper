export function reducer(state, { type, payload }) {
  switch (type) {
    case "mapStyleChange":
      return {
        ...state,
        mapStyle: payload,
      };
    case "changePosition":
      return {
        ...state,
        position: payload,
      };
    case "setDefaultPosition":
      return {
        ...state,
        position: {
          latitude: 59.90850878072872,
          longitude: 10.744399996474385,
          accuracy: 0,
        },
      };
    case "changeLocation":
      return {
        ...state,
        location: payload,
      };
    case "switchModal":
      return {
        ...state,
        showModal: !state.showModal,
        modalPath: payload,
      };
    default: {
      throw new Error("Unknown action");
    }
  }
}
