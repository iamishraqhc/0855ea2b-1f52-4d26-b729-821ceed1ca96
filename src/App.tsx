import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import ParkingSpot from './components/ParkingSpot';
import parkingSpotsData from './data/parkingSpots';
import Reservation from './models/Reservation';

const App: React.FC = () => {
  const [parkingSpots, setParkingSpots] = useState(parkingSpotsData);
  const [reservations, setReservations] = useState<Reservation[]>([]);

  const handleEnterGarage = () => {
    const availableSpot = parkingSpots.find((spot) => spot.state === 'available');
    if (availableSpot) {
      const updatedParkingSpots = [...parkingSpots];
      const index = updatedParkingSpots.findIndex((spot) => spot.spotId === availableSpot.spotId);
      if (index !== -1) {
        updatedParkingSpots[index].state = 'in-use';
        setParkingSpots(updatedParkingSpots);

        const licenseNumber = Math.floor(Math.random() * 1000).toString();

        const reservation = {
          spotId: availableSpot.spotId,
          licenseNumber,
          enterTimestamp: new Date().getTime(),
        };
        setReservations([ ...reservations, reservation]);
      }
    }
  };

  const handleExitGarage = (spotId: string) => {
    const updatedParkingSpots = [...parkingSpots];
    const index = updatedParkingSpots.findIndex((spot) => spot.spotId === spotId);
    if (index !== -1 && updatedParkingSpots[index].state === 'in-use') {
      updatedParkingSpots[index].state = 'available';
      setParkingSpots(updatedParkingSpots);

      const updatedReservations = reservations.map((reservation) => {
        if (reservation.spotId === spotId) {
          return { ...reservation, exitTimestamp: new Date().getTime() };
        }
        return reservation;
      });
      setReservations(updatedReservations);
    }
  };

  return (
    <Box sx={{ display: 'flex', gap: '1rem' }}>
      <Box sx={{ margin: 2 }}>
        <Button variant='contained' onClick={handleEnterGarage}>Enter Garage</Button>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
          {parkingSpots.map((spot) => (
            <ParkingSpot
              key={spot.spotId}
              spotId={spot.spotId}
              state={spot.state}
              onExit={() => handleExitGarage(spot.spotId)}
            />
          ))}
        </Box>
        <Typography sx={{ textAlign: 'center', fontSize: '24pt' }}>Reservation History Chart</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
          {parkingSpots.map((spot) => (
            <Box key={spot.spotId}>
              <Box>Spot: #{spot.spotId}</Box>
              <ul style={{ listStyleType: 'none', padding: 0, display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {reservations
                  .filter((reservation) => reservation.spotId === spot.spotId)
                  .map((reservation, index) => (
                    <li
                      key={index}
                      style={{
                        border: '1px solid',
                        borderColor: reservation.exitTimestamp ? 'green' : 'red',
                        padding: '0.5rem',
                        color: 'white',
                        marginBottom: '0.5rem',
                      }}
                    >
                      Plate Nr: {reservation.licenseNumber}
                    </li>
                  ))}
              </ul>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default App;
