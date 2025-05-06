interface AuthRequest {
    user?: any;
    token?: string;
    tenantDb?: any;
    headers?: any;
    body?: any;
    params?: any;
    query?: any;
}

export default AuthRequest;