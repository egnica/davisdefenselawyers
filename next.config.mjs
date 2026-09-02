/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/drug-charges",
        destination: "/drug-crimes",
        permanent: true, // 301
      },
      {
        source: "/interference-with-an-911-call",
        destination: "/interference-with-911-call",
        permanent: true,
      },
      {
        source: "/hennepin-county-mn",
        destination: "/areas-we-serve",
        permanent: true,
      },
      {
        source: "/criminal-defense/dwi-dui/",
        destination: "/dwi-dui",
        permanent: true,
      },
      {
        source: "/areas-we-serve/chanhassen-mn",
        destination: "/areas-we-serve",
        permanent: true,
      },
      {
        source: "/areas-we-serve/bloomington-mn",
        destination: "/areas-we-serve",
        permanent: true,
      },
      {
        source: "/areas-we-serve/eden-prairie-mn",
        destination: "/locations/eden-prairie-mn",
        permanent: true,
      },
      {
        source: "/criminal-defense/theft-crimes/",
        destination: "/theft-crimes",
        permanent: true,
      },
      {
        source: "/about-us/",
        destination: "/about",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nciholasegner.s3.us-east-2.amazonaws.com",
        pathname: "/**",
      },
    ],
  },
};
export default nextConfig;
