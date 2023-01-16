import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ConfigService} from "@nestjs/config";
import {
    DocumentBuilder,
    SwaggerDocumentOptions,
    SwaggerModule,
} from "@nestjs/swagger";
import {Logger, ValidationPipe} from "@nestjs/common";
import * as passport from "passport";
import * as session from "express-session";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(
        session({
            secret: "sessionSecret",
            saveUninitialized: false,
            cookie: {
                maxAge: 7 * 24 * 60 * 60 * 1000,
            },
        })
    );
    app.use(passport.initialize());
    app.use(passport.session());

    app.useGlobalPipes(new ValidationPipe());

    const options: SwaggerDocumentOptions = {
        deepScanRoutes: true,
    };

    const config = new DocumentBuilder()
        .addBearerAuth({
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
            in: "header",
        })
        .setTitle("Test project")
        .setDescription("Test project Documentation")
        .build();
    const document = SwaggerModule.createDocument(app, config, options);
    SwaggerModule.setup("api", app, document);

    const configService = app.get(ConfigService);
    const PORT = configService.get("PORT");

    await app.listen(PORT || 5000, () => {
        Logger.log(`Server started on PORT ${PORT}`);
    });
}

bootstrap();
