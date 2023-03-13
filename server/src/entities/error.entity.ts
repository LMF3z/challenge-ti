export interface ErrorHandlerI {
  status: number;
  message: string;
  error?: Error;
  data?: [] | null;
}
