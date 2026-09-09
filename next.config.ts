import type {NextConfig} from "next";
const basePath=process.env.SITE_BASE_PATH||"";
const nextConfig:NextConfig={output:"export",assetPrefix:basePath||undefined,trailingSlash:true};
export default nextConfig;
