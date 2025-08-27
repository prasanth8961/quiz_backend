import { Controller, Get } from '@nestjs/common';

interface AppStatusResponse {
    success: boolean;
    version: string;
    message?: string;
}

@Controller()
export class AppController {
    /**
     * Root endpoint to check application status
     * @returns {AppStatusResponse} Application status
     */
    @Get()
    getStatus(): AppStatusResponse {
        return {
            success: true,
            version: '0.0.1',
            message: 'API is running successfully',
        };
    }
}
