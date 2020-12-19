interface Response {
    token: string;
    user: {
        name: string;
        email: string;
    }
}

export function signIn(): Promise<Response> {
    return new Promise(resolve => {
        resolve({
            token: 'mcp0001',
            user: {
                name: 'Maikon Canuto',
                email: 'maikoncanuto@gmail.com'
            }
        });
    });
}