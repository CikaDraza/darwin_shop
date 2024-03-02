import React, { useState } from 'react'
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';
import { Container, Stack } from 'react-bootstrap';
import AddressInput from '../../components/address_map/AddressInput';

const containerStyle = {
  width: '100%',
  height: '500px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

function GoogleMapContainer() {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const [solarInfo, setSolarInfo] = useState(null);
  const [coordinates, setCoordinates] = useState(center);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey
  })

  const fetchSolarInfo = async () => {
    try {
      const response = await fetch(`https://calculator-server-ae06a3f2cd24.herokuapp.com/api/solarInfo?latitude=${coordinates?.lat}&longitude=${coordinates?.lng}`);
      const data = await response.json();
      setSolarInfo(data);
    } catch (error) {
      console.error('Failed to fetch solar info:', error);
    }
  };

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(coordinates);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  const onMarkerClick = (location) => {
    if (location) {
      setCoordinates(location);
      fetchSolarInfo();
    }
  };

  const handleMapClick = (event) => {
    const latLng = event.latLng;
    if (latLng) {
      const lat = latLng.lat();
      const lng = latLng.lng();
  
      console.log('Clicked coordinates:', { lat, lng });
      setCoordinates({ lat, lng });
      onMarkerClick({ lat, lng });
    }
  };

  const handleMapUpdate = (location) => {
    setCoordinates({lat: location.latitude, lng: location.longitude});
    fetchSolarInfo();
  };

  const handleAddressSubmit = (coords) => {
    if (coords) {
      setCoordinates({lat: coords.latitude, lng: coords.longitude});
      fetchSolarInfo();
    }
  };

  return isLoaded ? (
    <Container fluid>
      <AddressInput onMapUpdate={handleMapUpdate} onAddressSubmit={handleAddressSubmit} />
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={coordinates}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={handleMapClick}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <MarkerF position={coordinates} />
      </GoogleMap>
      <Stack gap={3}>
        <div className="p-2">
          <Stack direction="horizontal" gap={3}>
            <div className="p-2">Max Array Panels Count</div>
            <div className="p-2">
              <strong>
                {solarInfo?.solarPotential?.maxArrayPanelsCount}{' pcs'}
              </strong>
            </div>
            <div className="p-2">Panel Capacity Watts</div>
            <div className="p-2">
              <strong>
                {solarInfo?.solarPotential?.panelCapacityWatts}{' w'}
              </strong>
            </div>
            <div className="p-2">Carbon Offset Factor Kg per Mwh</div>
            <div className="p-2">
              <strong>
              {solarInfo?.solarPotential?.carbonOffsetFactorKgPerMwh}{' Kg / Mwh'}
              </strong>
            </div>
          </Stack>          
        </div>
        <div className="p-2">
          <Stack direction="horizontal" gap={3}>
            <div className="p-2">Max Array Area</div>
            <div className="p-2">
              <strong>
              {solarInfo?.solarPotential?.maxArrayAreaMeters2}{' m2'}
              </strong>
            </div>
            <div className="p-2">Panel Lifetime Years</div>
            <div className="p-2">
              <strong>
              {solarInfo?.solarPotential?.panelLifetimeYears}{' years'}
              </strong>
            </div>
          </Stack>  
        </div>
        <div className="p-2">
          <Stack direction="horizontal" gap={3}>
            <div className="p-2">Panel Height Meters</div>
            <div className="p-2">
              <strong>
              {solarInfo?.solarPotential?.panelHeightMeters}{' m'}
              </strong>
            </div>
            <div className="p-2">Panel Width Meters</div>
            <div className="p-2">
              <strong>
              {solarInfo?.solarPotential?.panelWidthMeters}{' m'}
              </strong>
            </div>
          </Stack>
        </div>
      </Stack>
    </Container>
  ) : <></>
}

export default React.memo(GoogleMapContainer)