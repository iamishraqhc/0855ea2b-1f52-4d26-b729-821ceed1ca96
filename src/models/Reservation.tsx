interface Reservation {
    spotId: string;
    licenseNumber: string;
    enterTimestamp: number;
    exitTimestamp?: number;
}

export default Reservation;
