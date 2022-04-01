"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = require("@nestjs/swagger");
require('dotenv').config();
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function start() {
    const PORT = process.env.PORT || 8000;
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Our backend')
        .setDescription('Our backend documentation')
        .setVersion('1.0.1')
        .addTag('api')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('/api/docs', app, document);
    await app.listen(PORT, () => {
        console.log(`server start on ${PORT}...`);
    });
}
start();
//# sourceMappingURL=main.js.map