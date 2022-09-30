import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { Booking } from './booking.entity';
import { ReportResponse } from './dto/report.response';

@Injectable()
export class BookingService {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  public async available(carId: string, startDate: string, endDate: string): Promise<boolean> {
    const startDay = new Date(startDate).getDay();
    const endDay = new Date(endDate).getDay();

    if (startDay === 6 || startDay === 0 || endDay === 6 || endDay === 0) {
      return false;
    }

    const [taken] = await this.connection.manager.query(
      "SELECT * FROM booking WHERE car_id=$1 AND booking_period && daterange((LOWER(daterange($2, $3)) - interval '4 days')::date, (UPPER(daterange($2, $3)) + interval '4 days')::date) limit 1",
      [carId, startDate, endDate],
    );

    return !taken;
  }

  public async book(
    client_id: string,
    car_id: string,
    start_date: string,
    end_date: string,
    cost: number,
  ): Promise<Booking[]> {
    return this.connection.manager.query(
      'INSERT INTO booking (client_id, car_id, booking_period, cost) VALUES ($1, $2, $3, $4) RETURNING id, client_id, car_id, booking_period',
      [client_id, car_id, `[${start_date}, ${end_date})`, cost],
    );
  }

  public async report(date: string): Promise<ReportResponse> {
    const byCar = await this.connection.manager.query(
      "SELECT car_id, ceil((SUM(UPPER(daterange((date_trunc('month', $1::date))::date, (date_trunc('month', $1::date) + interval '1 month - 1 day')::date) * booking_period) - LOWER(daterange((date_trunc('month', $1::date))::date, (date_trunc('month', $1::date) + interval '1 month - 1 day')::date) * booking_period)))::decimal / ((date_trunc('month', $1::date) + interval '1 month - 1 day')::date - (date_trunc('month', $1::date))::date) * 100) as booked FROM booking GROUP BY car_id",
      [date],
    );

    const [total] = await this.connection.manager.query(
      "SELECT ceil(SUM(total_booked)::decimal / (COUNT(1) * ((date_trunc('month', $1::date) + interval '1 month - 1 day')::date - (date_trunc('month', $1::date))::date)) * 100) as total_booked from (SELECT car_id, (SUM(UPPER(daterange((date_trunc('month', $1::date))::date, (date_trunc('month', $1::date) + interval '1 month - 1 day')::date) * booking_period) - LOWER(daterange((date_trunc('month', $1::date))::date, (date_trunc('month', $1::date) + interval '1 month - 1 day')::date) * booking_period))) as total_booked FROM booking GROUP BY car_id) as sub",
      [date],
    );

    const items = byCar.map((car) => ({ carId: car.car_id, bookedTime: Number(car.booked) }));

    return { items, totalBookedTime: Number(total.total_booked) };
  }
}
