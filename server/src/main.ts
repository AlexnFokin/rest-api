import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

require('dotenv').config()
import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";



async function start() {
    const PORT = process.env.PORT || 8000
    const app = await NestFactory.create(AppModule)

    const config = new DocumentBuilder()
        .setTitle('Our backend')
        .setDescription('Our backend documentation')
        .setVersion('1.0.1')
        .addTag('api')
        .build()

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('/api/docs', app, document)

    await app.listen(PORT, ()=> {
        console.log(`server start on ${PORT}...`)
    })
}

start()