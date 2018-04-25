/* global google */

import React from 'react';
import { Card, CardActions } from 'material-ui/Card';
import { compose, withProps, withStateHandlers } from "recompose"
import {
    GoogleMap,
    InfoWindow,
    Marker,
    withScriptjs,
    withGoogleMap
} from "react-google-maps"
import { MarkerWithLabel } from "react-google-maps/lib/components/addons/MarkerWithLabel";
import Geocode from "react-geocode";
import Async from 'react-promise'

import PlaceIcon from '../../assets/svg/place.svg';
import StoreIcon from '../../assets/svg/store.svg';

import {
    GET_LIST,
    FlatButton,
    RefreshButton,
    showNotification
} from 'react-admin';

import dataProvider from '../../dataProvider';

Geocode.setApiKey("AIzaSyAtX1tezFjbbrMLtlpqiNEkkTByUkJQjCw");

const markerIcons = {
    station: PlaceIcon,
    store: StoreIcon,
};

const cardActionStyle = {
    zIndex: 2,
    display: 'inline-block',
    float: 'right',
};

const MapListActions = ({ resource, filters, displayedFilters, filterValues, basePath, showFilter }) => (
    <CardActions style={cardActionStyle}>
        {filters && React.cloneElement(filters, { resource, showFilter, displayedFilters, filterValues, context: 'button' }) }
        <RefreshButton onClick={this.handleClick} />
    </CardActions>
);

const MyMapComponent = compose(
    withStateHandlers(() => ({
        isOpen: {},
    }), {
        onToggleOpen: ({ isOpen }) => (markerKey) => ({
            isOpen: {
                [markerKey]: !isOpen[markerKey]
            }
        })
    }),
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAtX1tezFjbbrMLtlpqiNEkkTByUkJQjCw&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `100%` }} />,
        mapElement: <div style={{ height: `100%` }} />,
        test: (key) => (event) => {
            console.log('key', key);
        }
    }),
    withScriptjs,
    withGoogleMap
)((props) =>
    <GoogleMap
        defaultZoom={12}
        defaultCenter={{ lat: 47.21, lng: -1.56 }}
    >
        {props.isMarkerShown && props.markers && props.markers.map((marker) => {
            const key = `${marker.type}_${marker.id}`;
            return (
                <Marker
                    key={key}
                    position={{ lat: marker.lat, lng: marker.lng }}
                    icon={{
                        url: markerIcons[marker.type],
                        scaledSize: new google.maps.Size(30, 30)
                    }}
                    onClick={() => props.onToggleOpen(`${marker.type}_${marker.id}`)}
                >
                    {props.isOpen[key] && (
                        <InfoWindow onCloseClick={() => props.onToggleOpen(key)}>
                            <span>{marker.name}</span>
                        </InfoWindow>
                    )}
                </Marker>
            )
        })}
    </GoogleMap>

);

let markers = [];

const getMarkers = () => dataProvider(GET_LIST, 'map', {
    pagination: {},
    sort: {},
}).then((response) => {
    return Promise.all(response.data.map((place) => {
        const { id, name, type, location } = place;
        return Geocode.fromAddress(location.full_address).then(
            response => {
                const { lat, lng } = response.results[0].geometry.location;
                const marker = { id, lat, lng, type, name };
                return marker;
            },
            error => {
                console.error('error', error);
            }
        );
    }));
})
.then((markers) => {
    return markers.filter(x => x);
})
.catch((e) => {
    console.error(e);
    showNotification('Error retriving markers', 'warning')
});

const promise = getMarkers();

class RefreshMapButton extends React.Component {
    handleClick = () => {
        console.log('handle click');
        const { push, record, showNotification } = this.props;
        const updatedRecord = { ...record, is_approved: true };
        getMarkers()
        .then(() => {
            showNotification('Markers received');
            push('/map');
        })
        .catch((e) => {
            console.error(e);
            showNotification('Error: comment not approved', 'warning')
        });
    }

    render() {
        return <RefreshButton label="Refresh" onClick={this.handleClick} />;
    }
}


class MapList extends React.Component {
    render() {
        return (
            <div style={{
                // marginTop: "-2em",
                // marginLeft: "-2em",
                // marginRight: "2em",
                // marginBottom: "2em",
                // position: 'absolute',
                width: '100%',
                height: '100%'
            }}>
                <Async promise={promise} then={(markers) => (
                    <MyMapComponent
                        isMarkerShown={true}
                        markers={markers}
                    />
                )} />
            </div>
        );
    }
}

export default MapList;
