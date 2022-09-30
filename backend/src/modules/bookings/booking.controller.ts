import { Body, Controller, Get, HttpException, HttpStatus, Post, Query } from '@nestjs/common';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BookingDto } from './dto/booking.dto';
import { BookingService } from './booking.service';
import { AvailabilityResponse, AvailabilityStatus } from './dto/availability.response';
import { AvailableDto } from './dto/available.dto';
import { Booking } from './booking.entity';
import { ReportResponse } from './dto/report.response';
import { ReportDto } from './dto/report.dto';
import { calculateDuration, estimate } from './utils';

const RATE = 1000;

@ApiTags('booking')
@Controller('booking')
export class BookingController {
  constructor(private bookingService: BookingService) {}

  @Get('available')
  @ApiOkResponse({ type: AvailabilityResponse })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'Car is not available' })
  async available(@Query() availableDto: AvailableDto): Promise<AvailabilityResponse> {
    const { carId, startDate, endDate } = availableDto;

    const duration = calculateDuration(startDate, endDate);

    if (duration < 1 || duration > 29) {
      throw new HttpException('Car is not available', HttpStatus.CONFLICT);
    }

    const available = await this.bookingService.available(carId, startDate, endDate);

    if (!available) {
      throw new HttpException('Car is not available', HttpStatus.CONFLICT);
    }

    const cost = estimate(duration, RATE);

    return { status: AvailabilityStatus.AVAILABLE, cost };
  }

  @Post('book')
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'Unable to place the order' })
  @ApiOkResponse({ type: Booking })
  async book(@Body() bookingDto: BookingDto): Promise<Booking> {
    const { clientId, carId, startDate, endDate } = bookingDto;

    if (startDate === endDate) {
      throw new HttpException('Unable to place the order', HttpStatus.CONFLICT);
    }

    const duration = calculateDuration(startDate, endDate);

    if (duration < 1 || duration > 29) {
      throw new HttpException('Car is not available', HttpStatus.CONFLICT);
    }

    const cost = estimate(duration, RATE);

    const available = await this.bookingService.available(carId, startDate, endDate);

    if (!available) {
      throw new HttpException('Unable to place the order', HttpStatus.CONFLICT);
    }

    const [booking] = await this.bookingService.book(clientId, carId, startDate, endDate, cost);

    if (!booking) {
      throw new HttpException('Unable to place the order', HttpStatus.CONFLICT);
    }

    return booking;
  }

  @Get('report')
  @ApiOkResponse({ type: ReportResponse })
  async report(@Query() reportDto: ReportDto): Promise<ReportResponse> {
    const { date } = reportDto;
    return this.bookingService.report(date);
  }
}
