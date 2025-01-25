import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { RatingService } from './rating.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Roles, RolesGuard } from 'src/auth/guards/role.guard';
import { CreateRatingDto } from './dto';

@Controller('rating')
export class RatingController {
  constructor(private ratingService: RatingService) {}

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('STUDENT')
  createRating(
    @Req() req,
    @Body() createRatingDto: CreateRatingDto
  ) {
    return this.ratingService.rateTutor(req.user.id, createRatingDto);
  }

  @Get('/tutor/:tutorId')
  getTutorRatings(@Param('tutorId') tutorId: string) {
    return this.ratingService.getTutorRatings(tutorId);
  }
}
