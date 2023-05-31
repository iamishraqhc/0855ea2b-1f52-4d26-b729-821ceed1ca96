import React from 'react';
import { Box } from '@mui/material';
import Reservation from '../models/Reservation';

interface ReservationHistoryProps {
  spotId: string;
  reservations: Reservation[];
}

const ReservationHistory: React.FC<ReservationHistoryProps> = ({ spotId, reservations }) => {
  return (
    <Box>
      <Box sx={{ textAlign: 'center' }}>Spot: #{spotId}</Box>
      <ul style={{ listStyleType: 'none', padding: 0, flexWrap: 'wrap', gap: '0.5rem' }}>
        {reservations
          .filter((reservation) => reservation.spotId === spotId)
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
  );
};

export default ReservationHistory;
