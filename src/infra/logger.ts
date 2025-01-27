import winston, { format, transports } from 'winston';
import LokiTransport from 'winston-loki';


class LoggerService {
    private logger: winston.Logger;

    constructor() {
        const loki_host = process.env.LOKI || 'http://localhost:36071'         
        this.logger = winston.createLogger({
            level: 'info', // nível de log
            format:winston.format.combine(
                winston.format.errors({ stack: true }),
                winston.format.json()
              ),
              transports: [
                // Se o ambiente for 'development', usa o LokiTransport; caso contrário, usa Console
                ...(process.env.NODE_ENV === 'development'
                  ? [
                      new LokiTransport({
                        host: loki_host,
                        json: true,
                        format: winston.format.combine(
                          winston.format.errors({ stack: true }),
                          winston.format.json()
                        ),
                        labels: { job: 'api-grpc' },
                        onConnectionError: (err) => console.error('Erro de conexão com Loki:', err),
                      }),
                    ]
                  : [
                      new winston.transports.Console({
                        format:winston.format.combine(
                            winston.format.errors({ stack: true }),
                            winston.format.json()
                        )
                      }),
                    ]),
              ],
        });

    }

    logInfo(message: string, meta?: any) {
        this.logger.info(message, meta);
    }

    logError(message: string, meta?: any) {
        this.logger.error(message, meta);
    }

    logDebug(message: string, meta?: any) {
        this.logger.debug(message, meta);
    }
}

export const logger = new LoggerService();
