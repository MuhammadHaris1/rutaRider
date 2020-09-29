import axios from 'axios'
// import { NavigationActions } from 'react-navigation'
import NavigtionService from '../../Navigation/NavigationService'
import { Alert, AsyncStorage } from 'react-native'
import { API_ENDPOINT } from '../../Constant/constant'





export function login(data, fetchProfileData) {
  return function (dispatch) {
    dispatch({ type: "LOGIN_PROCESSING" });
    // const formData = new FormData();
    // formData.append("email", email),
    // formData.append("password", password),
    // console.log(`https://churppy.com/api/v1/login?email=${email}&password=${password}`)noso
    axios.post(`${API_ENDPOINT}user.php?action=login`, data)
      .then(async (response) => {
        dispatch({ type: "LOGIN_PROCESSED", payload: response.data });
        if (response.data.status === true) {
            if(response.data.data.role_id == "3"){

              try {
                await AsyncStorage.setItem('User', JSON.stringify(response.data));
                fetchProfileData(response.data)
                console.log('response.data', response.data)
                NavigtionService.navigate('Main')
                Alert.alert("Alert", response.data.message)
              } catch (error) {           
                console.log('error =>', error)
              }

            }else {
              Alert.alert("Alert", "Invalid Email/Password")
            }
        } else {
          Alert.alert("Alert", response.data.message)
        }
      })
      .catch((err) => {
        dispatch({ type: "ERROR", payload: 'An unexpected error occured!' }); dispatch({ type: "CLEAR_PROCESSING" });
      })
  }
}



export function fetchProfile(data) {
  return function(dispatch){
    dispatch({type:'FETCH_PROFILE_DATA', payload: data})
  }
}







export function signup(data) {
  return function (dispatch) {
    console.log("FORMDATA", data, `${API_ENDPOINT}user.php`)
    dispatch({ type: "LOGIN_PROCESSING" });
    axios.post(`${API_ENDPOINT}user.php`, data)
      .then((response) => {
        dispatch({ type: "LOGIN_PROCESSED", payload: response.data });
        if (response.data.status) {
          console.log("RESPONSE DATA SIGNUP", response.data)
          NavigtionService.navigate('DriverLogin')
          Alert.alert("Alert", response.data.message)
        } else {
          Alert.alert("Alert", response.data.message)
        }
      })
      .catch((err) => {
        Alert.alert("Error", "User Signup failed")
        dispatch({ type: "ERROR", payload: 'An unexpected error occured!' }); dispatch({ type: "CLEAR_PROCESSING" });
      })
  }
}

export function updateVehicle(data, userId, formData) {
  var updatedData = data

  return function (dispatch) {
    console.log("FORMDATA", data, `${API_ENDPOINT}vehicle.php`)
    dispatch({ type: "ADD_VEHICLE_PROCESSING" });
    return new Promise((resolve, reject) => {
      axios.post(`${API_ENDPOINT}vehicle.php?rider_id=${userId}`, formData)
      .then(async (response) => {
        updatedData.data.vehicle = response.data.vehicle
        resolve({status: response.data.status})

        // console.log("RESPONSE DATA ADD_VEHICLE", response.data, "response", data)
        console.log("RESPONSE DATA ADD_VEHICLE", updatedData, response.data)
        // dispatch({ type: "ADD_VEHICLE_PROCESSED", payload: updatedData });

        if (response.data.status) {
            console.log("RESPONSE DATA ADD_VEHICLE", data)
            await AsyncStorage.setItem('User', JSON.stringify(updatedData));
            dispatch({ type: "ADD_VEHICLE_PROCESSED", payload: updatedData });

          // NavigtionService.navigate('DriverLogin')
          Alert.alert("Alert", response.data.message)
        } else {
          Alert.alert("Alert", response.data.message)
        }
      })
      .catch((err) => {
        // Alert.alert("Error", "User Signup failed")
        reject(new Error(err))
        console.log("ERRR", err)
        dispatch({ type: "ERROR", payload: 'An unexpected error occured!' }); dispatch({ type: "CLEAR_PROCESSING" });
      })
    })
  }
}




export function acceptRide(data, rideReqDetails, oldLocation) {
  return function (dispatch) {
    console.log("FORMDATA", data, `${API_ENDPOINT}bookRide.php`, oldLocation)
    // dispatch({ type: "ACCEPT_RIDE_PROCESSING" });
    return new Promise((resolve, reject) => {
      axios.post(`${API_ENDPOINT}bookRide.php`, data)
      .then((response) => {
        // dispatch({ type: "ACTIVE_VEHICLE_PROCESSED", payload: response.data });
        // resolve({status: response.data.status, message: response.data.message})
        if (response.data.status) {
          // console.log("RESPONSE DATA bookRide", response.data)
          // NavigtionService.navigate('DriverLogin')
          axios.get(`${API_ENDPOINT}user.php?action=show_by_user_id&id=${rideReqDetails.user_id}`)
          .then(async(userRes) => {
            var obj = {
                    status: response.data.status,
                    message: response.data.message,
                    userData: userRes.data.data,
                    coordinate: [oldLocation, {latitude: Number(rideReqDetails.pick_latitude), longitude: Number(rideReqDetails.pick_longitude)} ],
                    status:'pending',
                    rideReqDetails: rideReqDetails
                  }

              console.log("ACTIVE_VEHICLE_PROCESSED PAYLOAD", obj, oldLocation)
              try {
                await AsyncStorage.setItem('activeRide', JSON.stringify(obj));
              } catch (error) {           
                console.log('error =>', error)
              }
              dispatch({ type: "ACTIVE_VEHICLE_PROCESSED", payload: obj});
              resolve({status: response.data.status, message: response.data.message, userData: userRes.data.data})

          })
          .catch((err) => {
            console.log("FETCHING USER DATAILD BY ID FAILED ERROR", err)
          })
          
          // Alert.alert("Alert", response.data.message)
        } else {
          Alert.alert("Alert", response.data.message)
        }
      })
      .catch((err) => {
        Alert.alert("Error", "User bookRide failed")
        reject(new Error(err))
        dispatch({ type: "ERROR", payload: 'An unexpected error occured!' }); dispatch({ type: "CLEAR_PROCESSING" });
      })
    })
  }
}



export function startRide(data, obj) {
  return function(dispatch) {
    obj.status = 'start'
    return new Promise((resolve, reject) => {
      axios.post(`${API_ENDPOINT}startRide.php`, data)
    .then(async(res) => {
      if(res.data.status) {
        obj.current_location_id = res.data.current_location_id
        try {
          await AsyncStorage.setItem('activeRide', JSON.stringify(obj));
        } catch (error) {           
          console.log('error =>', error)
        }
        dispatch({ type: "ACTIVE_VEHICLE_PROCESSED", payload: obj});
        resolve({status: res.data.status})
      }else {
        Alert.alert("Alert", res.data.message)
      }
    })
    })
  }
}


export function compeleteRide(data){
  return function(dispatch){
    return new Promise((resolve, reject) => {
      axios.post(`${API_ENDPOINT}rideCompleted.php`, data)
      .then(async(res) => {
        console.log("RES RES RES", res)
        if(res.data.status) {
          dispatch({ type: "RIDE_COMPELETE_PROCESSED", payload: ''});
          AsyncStorage.removeItem('activeRide')
          resolve({status: res.data.status})
          Alert.alert("Alert", "Ride Completed")
        }else {
          Alert.alert("Alert", res.data.message)
        }

      })
    })
  }
}


export  function getHistory(id) {
  return function(dispatch){
    var data = new FormData();
    data.append('action', 'previousBookings');
    data.append('user_id', id);
    dispatch({ type: "GET_HISTORY_PROCESSING" });
    axios.post(`${API_ENDPOINT}previousBooking.php`, data)
    .then((resposne) => {
      console.log("HISTORY GET ", resposne.data)
      if(resposne.data.status){
        dispatch({ type: "GET_HISTORY_PROCESSED", payload: resposne.data});
      }
    })
    .catch((err) => {
      dispatch({ type: "ERROR", payload: 'An unexpected error occured!' }); dispatch({ type: "CLEAR_PROCESSING" });
    })
  }
}



export function getUserDetail(id){
  return function(dispatch){
    axios.get(`${API_ENDPOINT}user.php?action=show_by_user_id&id=${id}`)
      .then(async (userRes) => {
        if (userRes.data.status) {
              try {
                await AsyncStorage.setItem('User', JSON.stringify(userRes.data));
                dispatch({ type: "LOGIN_PROCESSED", payload: userRes.data });
        // fetchProfileData(userRes.data)
                console.log('userRes.data', userRes.data)
              } catch (error) {           
                console.log('error =>', error)
              }
            
        }
      })
  }
}

export function setRideDataToAsync(data) {
  return function(dispatch) {
    dispatch({ type: "ACTIVE_VEHICLE_PROCESSED", payload: data});
  }
}


export function sendLiveLocation(data) {
  return function(dispatch){
    axios.post(`${API_ENDPOINT}updateRideLocation.php`, data)
    .then((res) => {
      console.log("RES", res)
    }).catch((err) => {
      console.log('err', err)
    })
  }
}

export function updateRide(data) {
  return function(dispatch){
    dispatch({ type: "ACTIVE_VEHICLE_PROCESSED", payload: data});
  }
}



