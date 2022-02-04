export const CommonErrors = {
    EmailExist: {
        statusCode: 409,
        message: 'Email already exists',
        error: "Conflict Error"
    },

    NotFound: {
        statusCode: 404,
        message: 'Email not exists',
        error: "NotFound Error"
    },

    Unauthorized: {
        statusCode: 401,
        message: 'Invalid credentials',
        error: "Unauthorized Error"
    },

    UserNotFound: {
        statusCode: 404,
        message: 'User not exists',
        error: "NotFound Error"
    },

    BlogNotFound: {
        statusCode: 404,
        message: 'Blog not exists',
        error: "NotFound Error"
    },

    ServerError: {
        statusCode: 500,
        message: 'Server Error',
        error: "Server Error"
    },

    NotCreatedError: {
        statusCode: 401,
        message: 'You not the owner of this blog post',
        error: "Unauthorized Error"
    }
}