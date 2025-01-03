import { ExecutionContext, Injectable } from '@nestjs/common'
import { JwtAuthGuard } from './jwt-auth.guard'
import { UserPayload } from './jwt.strategy'

enum UserRole {
  ADMIN = 'ADMIN',
  TRAFFIC_MANAGER = 'TRAFFIC_MANAGER',
}

@Injectable()
export class AdminGuard extends JwtAuthGuard {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest()
    const user = request.user as UserPayload

    if (user.sub.role !== UserRole.ADMIN) {
      return false
    }

    return super.canActivate(context)
  }
}
