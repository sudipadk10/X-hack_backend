import { 
    Injectable, 
    CanActivate, 
    ExecutionContext, 
    ForbiddenException, 
    SetMetadata
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  
  @Injectable()
  export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
  
    canActivate(context: ExecutionContext): boolean {
      const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
        context.getHandler(),
        context.getClass(),
      ]);
  
      if (!requiredRoles) {
        return true;
      }
  
      const { user } = context.switchToHttp().getRequest();
      
      if (requiredRoles.some((role) => user.role === role)) {
        return true;
      }
  
      throw new ForbiddenException('Insufficient permissions');
    }
  }
  
  // Usage Decorator
  export const Roles = (...roles: string[]) => 
    SetMetadata('roles', roles);