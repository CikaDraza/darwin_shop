import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';

const AddressInput = ({ onAddressSubmit, onMapUpdate }) => {
  const [address, setAddress] = useState('');

  const handleInputChange = (e) => {
    setAddress(e.target.value);
  }; 

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
      );

      const { results } = response.data;
      
      if (results.length > 0) {
        const { geometry } = results[0];
        const { location } = geometry;
        
        const { lat, lng } = location;
        
        onAddressSubmit({ latitude: lat, longitude: lng });
        onMapUpdate({ latitude: lat, longitude: lng });
      } else {
        console.error('Adresa nije pronađena.');
      }
    } catch (error) {
      console.error('Greška prilikom pretrage adrese:', error);
    }
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="inputAddress">
          Enter the address:
        </Form.Label>
        <Form.Control
          type="text"
          value={address}
          onChange={handleInputChange}
          id="inputAddress"
          aria-describedby="addressHelpBlock"
        />
        <Form.Text id="addressHelpBlock" muted>
        your address must be in google map format eg
        Rue de Gravelone 76, 1950 Sion, Switzerland
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3">
        <Button className='ml-3' type="submit" variant="light">Find the coordinates</Button>
      </Form.Group>
    </Form>
  );
};

export default AddressInput;
