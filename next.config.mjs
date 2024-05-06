/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["drive.google.com", "servicosweb.cnpq.br", "avatars.githubusercontent.com"],
  },
};

export default nextConfig;
