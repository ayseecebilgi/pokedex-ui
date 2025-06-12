/** @type {import('next').NextConfig} */
const nextConfig = {
   async rewrites() {
       return [
           {
               source: '/api/pokemon',
               destination: 'https://cv2l64o4ml.execute-api.eu-west-2.amazonaws.com/Prod/pokemon',
           },
           {
               source: '/api/pokemon/:id',
               destination: 'https://cv2l64o4ml.execute-api.eu-west-2.amazonaws.com/Prod/pokemon/:id',
           },
       ];
   }
};


export default nextConfig;