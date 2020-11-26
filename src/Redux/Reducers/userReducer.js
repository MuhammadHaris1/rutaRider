export default function reducer(
  state = {
    userDetails: null,
    activeRideData: null ,
    history: null,
    paymentDetail: null,
    emergencyNumber: null,
    schedule: null
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

    case 'FETCHING_PAYMENT_DETAIL': {
      return { ...state, fetching: true };
    }
    case 'FETCHED_PAYMENT_DETAIL': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        paymentDetail: action.payload,
      };
    }

    case 'SEND_FEEDBACK_PROCESSING': {
      return { ...state, fetching: true };
    }
    case 'SEND_FEEDBACK_PROCESSED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
      };
    }


    case 'LOGOUT_SUCCESSFULL': {
      return {
        ...state,
        userDetails: null,
        activeRideData: null ,
        history: null,
        paymentDetail: null
      };
    }

    case 'GET_NUMBERS_PROCESSING': {
      return { ...state, fetching: true };
    }
    case 'GET_NUMBERS_PROCESSED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        emergencyNumber: action.payload,
      };
    }


    case 'GET_SCHEDULE_PROCESSING': {
      return { ...state, fetching: true };
    }
    case 'GET_SCHEDULE_PROCESSED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        schedule: action.payload,
      };
    }
  }
  return state;
}