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
    const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({ lat: -25.344, lng: 131.036 });

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
                // @ts-ignore
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

    const onClick = (e: google.maps.MapMouseEvent) => {
        // avoid directly mutating state
        setMarkers([...markers, e.latLng!]);
    };

    const onIdle = (m: google.maps.Map) => {
        console.log("onIdle");
        setZoom(m.getZoom()!);
        setCenter(m.getCenter()!.toJSON());
    };

    const form = (
        <div
            style={{
                padding: "1rem",
                flexBasis: "250px",
                height: "100%",
                overflow: "auto",
            }}
        >
            {/* <label htmlFor="zoom">Zoom</label>
            <input
                type="number"
                id="zoom"
                name="zoom"
                value={zoom}
                onChange={(event) => setZoom(Number(event.target.value))}
            />
            <br />
            <label htmlFor="lat">Latitude</label>
            <input
                type="number"
                id="lat"
                name="lat"
                value={center.lat}
                onChange={(event) =>
                    setCenter({ ...center, lat: Number(event.target.value) })
                }
            />
            <br />
            <label htmlFor="lng">Longitude</label>
            <input
                type="number"
                id="lng"
                name="lng"
                value={center.lng}
                onChange={(event) =>
                    setCenter({ ...center, lng: Number(event.target.value) })
                }
            />
            <h3>{markers.length === 0 ? "Click on map to add markers" : "Markers"}</h3>
            {markers.map((latLng, i) => (
                <pre key={i}>{JSON.stringify(latLng.toJSON(), null, 2)}</pre>
            ))}
            <button onClick={() => setMarkers([])}>Clear</button> */}
        </div>
    );

    return (
        <div style={{ display: "flex", height: "100%" }}>
            <Wrapper apiKey={"AIzaSyDaJ7GjeeOpguv0KPT97d4BqYECBo2qkAM"} render={render}>
                <Map
                    center={center}
                    // onClick={onClick}
                    // onIdle={onIdle}
                    zoom={zoom}
                    style={{ flexGrow: "1", height: "100%" }}
                >
                    {markers.map((latLng, i) => (
                        <Marker key={i} position={latLng} />
                    ))}
                </Map>
            </Wrapper>
            {/* Basic form for controlling center and zoom of map. */}
            {/* {form} */}
        </div>
    );
};

export default App;
