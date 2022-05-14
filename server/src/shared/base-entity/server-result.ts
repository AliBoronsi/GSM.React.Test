export class ServerResult<T> {
    data: T;
    success: boolean;
    message: string;

    static SuccessResult<T>(data: T): ServerResult<T> {
        return {
            success: true,
            message: null,
            data: data
        };
    }

    static FailResult<T>(message: string): ServerResult<T> {
        return {
            success: false,
            message: message,
            data: null
        };
    }
}