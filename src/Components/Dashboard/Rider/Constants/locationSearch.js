import React from 'react'
import {View, Text, Modal, ImagePropTypes} from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
const GOOGLE_PLACES_API_KEY = 'AIzaSyChHCc-8IkHyZIeHzhGomiY7sBo3fLlzak'; // never save your real api key in a snack!


export const SearchLocation = (props) => {


    return (
        <View style={{ flex: 1, position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>

            <Modal
                transparent={true}
                visible={props.visible}
                onRequestClose={() => {
                    props.closed()
                }}>
 
                <View style={{ flex: 1, backgroundColor:'rgb(209, 210, 212)' }}
                >
                    <GooglePlacesAutocomplete
                        currentLocation
                        currentLocationLabel="Current Location"
                        enableHighAccuracyLocation
                        nearbyPlacesAPI='None'
                        numberOfLines={10}
                        enablePoweredByContainer={false}
                        query={{
                            key: GOOGLE_PLACES_API_KEY,
                            language: 'en', // language of the results
                            components: 'country:pk',
                        }}
                        placeholder="Enter Location Name"
                        autoFocus
                        onPress={(data, details = null) => {
                            if (details.description !== "Current location") {
                            let a = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${details.place_id}&key=${GOOGLE_PLACES_API_KEY}`
                            console.log(details, "data")
                            fetch(a)
                                .then((resp) => resp.json())
                                .then((data) => {
                                    props.onSelect(data, details.description)
                                })

                            } else {
                                props.onSelect(data, details.description)
                            }

                        }}
                        onFail={error => console.error(error)}
                    />
                </View>

            </Modal>
        </View>
    )
}
