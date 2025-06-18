export interface Customer {
  id: number;
  first_name: string;
  surname: string;
  middle_name?: string;
  dob: string;
  address: string;
  registration_date: string;
  matric_no?: boolean;
  orders: Order[];
}

export interface Order {
  id: number;
  customer_id?: number;
  order_date: string;
  menu_item: string;
  special_instructions?: string;
  payment_method: string;
  total_amount?: number;
  next_reservation?: string;
}
