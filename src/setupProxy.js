import { createProxyMiddleware } from 'http-proxy-middleware';

const proxyMiddleware = createProxyMiddleware({
	target: 'http://localhost:80',
	changeOrigin: true,
	pathRewrite: {
		'^/api': '/new_voter.php',
	},
});

export default proxyMiddleware;
