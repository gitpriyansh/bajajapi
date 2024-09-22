const { handler } = require('@netlify/functions');

const backend = async (event) => {
    // Check the path
    if (event.path === '/.netlify/functions/bfhl') {
        if (event.httpMethod === 'POST') {
            const { data, file_b64 } = JSON.parse(event.body);

            // Example validation logic for the file
            const file_valid = Boolean(file_b64);
            const file_mime_type = 'doc/pdf'; // Static example
            const file_size_kb = Buffer.from(file_b64, 'base64').length / 1024; // Approximate size calculation

            // Prepare response
            const response = {
                is_success: true,
                user_id: 'john_doe_17091999',
                email: 'john@xyz.com',
                roll_number: 'ABCD123',
                numbers: data || [],
                alphabets: [],
                highest_lowercase_alphabet: [],
                file_valid: file_valid,
                file_mime_type: file_mime_type,
                file_size_kb: Math.round(file_size_kb).toString() // Round to nearest whole number
            };

            return {
                statusCode: 200,
                body: JSON.stringify(response),
            };
        } else if (event.httpMethod === 'GET') {
            // Prepare hardcoded response for the GET request
            const response = {
                operation_code: 1
            };

            return {
                statusCode: 200,
                body: JSON.stringify(response),
            };
        }
    }

    return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Not Found' }),
    };
};

exports.handler = backend;
