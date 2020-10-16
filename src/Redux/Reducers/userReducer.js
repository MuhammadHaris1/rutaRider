export default function reducer(
  state = {
    userDetails: null,
    activeRideData: null ,
    history: null
  },
  action
) {
  switch (action.type) {
    case 'LOGIN_PROCESSING': {
      return { ...state, fetching: true };
    }
    case 'LOGIN_PROCESSED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        userDetails: action.payload,
      };
    }

    case 'ADD_VEHICLE_PROCESSING': {
      return { ...state, fetching: true };
    }
    case 'ADD_VEHICLE_PROCESSED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        userDetails: action.payload,
      };
    }


    case 'FETCH_PROFILE_DATA': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        userDetails: action.payload,
      };
    }

    case 'LOGOUT_PROCESSING': {
      return { ...state };
    }
    case 'LOGOUT_PROCESSED': {
      return {
        userDetails: null,
        alerts: null,
        fetching: false,
        fetched: false,
        error: null,
        userAlerts: [],
        myOrders: [],
        cart: [],
        paymentHistory: [],
        paymentDetail: []
      };
    }

    // case 'ACTIVEPROCESSING': {
    //   return { ...state, fetching: true };
    // }
    case 'ACTIVE_VEHICLE_PROCESSED': {
      return {
        ...state,
        // fetching: false,
        // fetched: true,
        activeRideData: action.payload,
      };
    }

    case 'RIDE_COMPELETE_PROCESSED': {
      return {
        ...state,
        // fetching: false,
        // fetched: true,
        activeRideData: null,
      };
    }


    case 'GET_HISTORY_PROCESSING': {
      return { ...state, fetching: true };
    }
    case 'GET_HISTORY_PROCESSED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        history: action.payload,
      };
    }


  case 'RENDER_LOADER': {
      return {
        ...state,
        fetching: true,
        fetched: false,
      };
    }

    case 'CLEAR_PROCESSING': {
      return {
        ...state,
        fetching: false,
        fetched: true,
      };
    }

  }
  return state;
}