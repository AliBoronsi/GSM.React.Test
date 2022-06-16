export class ServerResult<T> {
    data: T;
    isError: boolean;
    message: string;
    statusCode?: number;

    static SuccessResult<T>(data: T,message?: string, statusCode?: number): ServerResult<T> {
        return {
            isError: false,
            message: message,
            data: data,
            statusCode: statusCode
        };
    }

    static FailResult<T>(message: string, statusCode?: number): ServerResult<T> {
        return {
            isError: true,
            message: message,
            data: null,
            statusCode: statusCode
        };
    }
}