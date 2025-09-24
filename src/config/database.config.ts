import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || '5115',
  database: process.env.DB_NAME || 'nest-js',
  autoLoadEntities: process.env.AUTO_LOAD === 'true' ? true : false,
  synchronize: process.env.DB_SYNC === 'true' ? true : false,
}));
