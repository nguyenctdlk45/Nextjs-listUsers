import type { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Manifest {
  return (
    {
        "name": "bla bla",
        "short_name": "bla bla",
        "description": "Tiện lợi mua sắm hàng triệu mặt hàng, dịch vụ. Vô vàn ưu đãi freeship, mã giảm giá. Hoàn tiền 15% tối đa 600k/tháng với thẻ tín dụng TikiCARD.",
        "icons": [
            {
                "src": "https://salt.tikicdn.com/ts/upload/2f/51/80/5643672027a54bfa593300f53c91c12a.png",
                "sizes": "192x192",
                "type": "image/png",
                
            },
            {
                "src": "https://salt.tikicdn.com/ts/upload/2f/51/80/5643672027a54bfa593300f53c91c12a.png",
                "sizes": "512x512",
                "type": "image/png",
                
            }
        ],
        "theme_color": "#1A94FF",
        "background_color": "#1A94FF",
        "start_url": "/",
        "display": "standalone",
        "orientation": "portrait",
        "scope": "/"
    }
  )
}