import { Status, Wrapper } from "@googlemaps/react-wrapper";
import React, { useEffect } from "react";
import Marker from "./Marker";
import Map from "./Map";

const render = (status: Status) => {
    return <h1>{status}</h1>;
  };
  
  
const App: React.VFC = () => {

    const [markers, setMarkers] = React.useState<google.maps.LatLng[]>([]);
    const [zoom, setZoom] = React.useState(18); // initial zoom
    const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({ });

    useEffect(() => {
        // HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
            (position: GeolocationPosition) => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };

                
                setCenter(pos);
                setMarkers([pos]);
            },
            () => {
                console.warn('Location could not be set');
            }
            );
        } else {
            // Browser doesn't support Geolocation
            console.warn('Browser needs access to get geolocation');
        }
    }, []);


    return (
        <div style={{ display: "flex", height: "100%" }}>
            <Wrapper apiKey={"AIzaSyDaJ7GjeeOpguv0KPT97d4BqYECBo2qkAM"} render={render}>
                <Map
                    center={center}
                    zoom={zoom}
                    style={{ flexGrow: "1", height: "100%" }}
                >
                    {markers.map((latLng, i) => (
                        <Marker key={i} position={latLng} />
                    ))}
                </Map>
            </Wrapper>
        </div>
    );
};

export default App;
