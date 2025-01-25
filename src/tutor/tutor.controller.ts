import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { TutorService } from './tutor.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CreateArticleDto } from './dto/create-article.dto';

@Controller('tutors')
export class TutorController {
  constructor(private tutorService: TutorService) {}

  @Get()
  async getAllTutors() {
    return this.tutorService.getAllTutors();
  }

  @Get(':id')
  async getTutorById(@Param('id') id: string) {
    return this.tutorService.getTutorById(id);
  }

  @Post('articles')
  @UseGuards(AuthGuard)
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