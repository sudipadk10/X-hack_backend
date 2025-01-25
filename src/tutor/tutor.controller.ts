import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { TutorService } from './tutor.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CreateArticleDto } from './dto/create-article.dto';
import { Roles, RolesGuard } from 'src/auth/guards/role.guard';

@Controller('tutors')
export class TutorController {
  constructor(private tutorService: TutorService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getAllTutors() {
    return this.tutorService.getAllTutors();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async getTutorById(@Param('id') id: string) {
    return this.tutorService.getTutorById(id);
  }

  @Post('articles')
  @UseGuards(AuthGuard,RolesGuard)
  @Roles('TUTOR')
  async createArticle(
    @Req() req, 
    @Body() createArticleDto: CreateArticleDto
  ) {
    return this.tutorService.createArticle(req.user.id, createArticleDto);
  }

  @Get('articles')
  @UseGuards(AuthGuard)
  async getTutorArticles(@Req() req) {
    return this.tutorService.getTutorArticles(req.user.id);
  }
}