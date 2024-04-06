/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api',
                destination: 'http://localhost:5000/api'
            }
        ]
    }
};

export default nextConfig;
