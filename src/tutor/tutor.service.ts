import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateArticleDto } from './dto/create-article.dto';

@Injectable()
export class TutorService {
  constructor(private prisma: PrismaService) {}

  async getAllTutors() {
    return this.prisma.profile.findMany({
      where: { user: { role: 'TUTOR' } },
      select: {
        id: true,
        fullName:true,
        subject: true,
        basePrice: true,
        description: true,
        ratings: {
          select: {
            value: true
          }
        }
      }
    });
  }

  async getTutorById(id: string) {
    return this.prisma.profile.findUnique({
      where: { userId: id },
      select: {
        id: true,
        fullName: true,
        subject: true,
        basePrice: true,
        description: true,
        ratings: {
          select: {
            value: true,
            comment: true
          }
        }
      }
    });
  }

  async createArticle(userId: string, dto: CreateArticleDto) {
    return this.prisma.article.create({
      data: {
        title: dto.title,
        content: dto.content,
        authorId: userId
      }
    });
  }

  async getTutorArticles(userId: string) {
    return this.prisma.article.findMany({
      where: { authorId: userId },
      orderBy: { createdAt: 'desc' }
    });
  }
}
