import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './create-user.dto';

@Controller('register')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @UseGuards(AuthGuard('jwt'))
  // @Get('username')
  // getUserByUsername(@Param() param) {
  //   return this.userService.getUserByUsername(param.username);
  // }
  @Post()
  registerUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.registerUser(createUserDto);
  }
}
