import React, { useContext, useRef } from 'react'
import { View, Text, Modal, ImagePropTypes } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { LocalizationContext } from '../../../../Localization/LocalizationContext';
const GOOGLE_PLACES_API_KEY = 'AIzaSyChHCc-8IkHyZIeHzhGomiY7sBo3fLlzak'; // never save your real api key in a snack!


export const SearchLocation = (props) => {
    const searchRef = useRef(null);
    const contextType = useContext(LocalizationContext)
    const { translations, appLanguage, setAppLanguage } = contextType

    return (
        <View style={{ flex: 1, position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>

            <Modal
                transparent={true}
                visible={props.visible}
                onRequestClose={() => {
                    props.closed()
                }}>

                <View style={{ flex: 1 }}
                >
                    <GooglePlacesAutocomplete
                        ref={searchRef}
                        currentLocation
                        currentLocationLabel={translations.CURRENT_LOCATION}
                        enableHighAccuracyLocation
                        nearbyPlacesAPI='None'
                        numberOfLines={10}
                        enablePoweredByContainer={false}
                        query={{
                            key: GOOGLE_PLACES_API_KEY,
                            language: 'en', // language of the results
                            // components: 'country:pk',
                        }}
                        placeholder={translations.ENTER_LOCATION_NAME}
                        autoFocus
                        onPress={(data, details = null) => {
                            if (details.description !== "Current location") {
                                let a = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${details.place_id}&key=${GOOGLE_PLACES_API_KEY}`
                                console.log(details, "data")
                                fetch(a)
                                    .then((resp) => resp.json())
                                    .then((data) => {
                                        searchRef.current.blur
                                        props.onSelect(data, details.description)
                                    })

                            } else {
                                searchRef.current.blur
                                props.onSelect(data, details.description)
                            }

                        }}
                        onFail={error => console.error(error)}
                        styles={{
                            row: {
                                backgroundColor: "#fff"
                            }
                        }}
                        onSubmitEditing={() => {
                            // alert("done")
                            props.closed()
                        }}
                    />
                </View>

            </Modal>
        </View>
    )
}
