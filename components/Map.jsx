import {
  LoadScript,
  GoogleMap,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useContext, useState, useEffect } from "react";
import { DriveGoContext } from "../context/DriveGoContext";

const center = { lat: 9.9312, lng: 76.2673 };
const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const LIBRARIES = ["places"];

const Map = () => {
  const { pickup, dropoff, setDistance, setDuration } =
    useContext(DriveGoContext);
  const [directionsResponse, setDirectionsResponse] = useState(null);

  useEffect(() => {
    if (pickup && dropoff) {
      calculateRoute();
    }
    if (!pickup) {
      setDistance("");
      setDuration("");
    }
    if (!dropoff) {
      setDuration("");
      setDistance("");
    }
  }, [pickup, dropoff]);

  async function calculateRoute() {
    try {
      const directionsService = new google.maps.DirectionsService();
      const results = await directionsService.route({
        origin: pickup,
        destination: dropoff,
        travelMode: google.maps.TravelMode.DRIVING,
      });
      setDirectionsResponse(results);
      setDistance(results.routes[0].legs[0].distance.text);
      setDuration(results.routes[0].legs[0].duration.text);
    } catch (error) {
      alert("No Routes Available!!!");
    }
  }

  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={LIBRARIES}>
      <GoogleMap
        center={center}
        zoom={12}
        mapContainerStyle={{ width: "100%", height: "100%" }}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
      >
        {pickup && dropoff && directionsResponse && (
          <DirectionsRenderer
            directions={directionsResponse}
            options={{
              suppressMarkers: false,
              polylineOptions: {
                strokeColor: "#20262E",
                strokeWeight: 6,
                strokeOpacity: 0.9,
              },
              preserveViewport: false,
            }}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
