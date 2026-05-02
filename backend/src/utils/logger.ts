import * as fs from 'fs';
import * as path from 'path';

enum LogLevel {
  INFO = 'INFO',
  ERROR = 'ERROR',
  WARN = 'WARN',
  DEBUG = 'DEBUG'
}

class Logger {
  private logFilePath: string;
  private enableConsole: boolean;

  constructor(logFilePath: string = 'app.log', enableConsole: boolean = false) {
    this.logFilePath = path.join(process.cwd(), logFilePath);
    this.enableConsole = enableConsole;
    this.ensureLogFileExists();
  }

  private ensureLogFileExists(): void {
    const dir = path.dirname(this.logFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  private formatMessage(level: LogLevel, message: string, meta?: any): string {
    const timestamp = new Date().toISOString();
    const metaStr = meta ? ` | Meta: ${JSON.stringify(meta)}` : '';
    return `[${timestamp}] [${level}] ${message}${metaStr}\n`;
  }

  private writeLog(level: LogLevel, message: string, meta?: any): void {
    const formattedMessage = this.formatMessage(level, message, meta);
    
    // Write to file
    fs.appendFileSync(this.logFilePath, formattedMessage);
    
    // Optionally write to console (for development)
    if (this.enableConsole) {
      process.stdout.write(formattedMessage);
    }
  }

  info(message: string, meta?: any): void {
    this.writeLog(LogLevel.INFO, message, meta);
  }

  error(message: string, meta?: any): void {
    this.writeLog(LogLevel.ERROR, message, meta);
  }

  warn(message: string, meta?: any): void {
    this.writeLog(LogLevel.WARN, message, meta);
  }

  debug(message: string, meta?: any): void {
    this.writeLog(LogLevel.DEBUG, message, meta);
  }
}

// Export singleton instance
export const logger = new Logger('logs/notifications.log', true);