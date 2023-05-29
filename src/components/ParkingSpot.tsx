import React from 'react';
import { Box, Button } from '@mui/material';

interface ParkingSpotProps {
  spotId: string;
  state: 'available' | 'in-use' | string;
  onExit: (spotId: string) => void;
}

const ParkingSpot: React.FC<ParkingSpotProps> = ({ spotId, state, onExit }) => {
  const handleExit = () => {
    onExit(spotId);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '1rem',
        margin: '1rem',
        border: '1px solid #ccc',
      }}
    >
      <Box sx={{ marginBottom: '0.5rem' }}>Spot ID: {spotId}</Box>
      <Box
        sx={{
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          backgroundColor: state === 'available' ? 'green' : 'red',
          marginBottom: '0.5rem',
        }}
      />
      <Button variant='contained' color='primary' disabled={state === 'available'} onClick={handleExit}>
        Exit
      </Button>
    </Box>
  );
};

export default ParkingSpot;
