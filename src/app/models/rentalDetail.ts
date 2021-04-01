export interface RentalDetails {
    carId:number;
    customerId:number;
    carName: string;
     customerName: string;
     companyName: string;
    rentDate: Date;
    returnDate?: Date;
    totalPrice:number;
    dailyPrice:number;
    
  }