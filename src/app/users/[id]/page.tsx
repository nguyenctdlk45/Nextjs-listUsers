import Detail from "@/component/users/detail.user";

import type { Metadata, ResolvingMetadata } from "next";
import Script from "next/script";

type Props = {
  params: { id: string };
};
// link hinh anh chia se
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.id;

  // fetch data
  const res = await fetch(`http://localhost:8000/users/${id}`, {
    method: "GET",
  });
  const data = await res.json();

  return {
    title: "sjhbdahsbuhabsuhasbduh",
    description: "hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",
    metadataBase: new URL(`http://localhost:3000/users/${id}`),
    openGraph: {
      images: [
        {
          url: "https://i.pinimg.com/564x/5e/26/26/5e2626543cd5204d257225490c984070.jpg",
          width: 1200,
          height: 630,
          alt: "User profile picture",
        },
      ],
      title: data.name,
    },
  };
}
// json-ld

const DetailUserPage = async (props: any) => {
  const { params } = props;
  const res = await fetch(`http://localhost:8000/users/${params.id}`, {
    method: "GET",
  });
  const data = await res.json();
  // console.log("check>>>>>>>>", data);

  // dung JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: data.name,
    // image: product.image,
    description: data.email,
  };
  //schema thông tin san pham
  const infoItem = {
    "@context": "https://schema.org/",
    "@graph": [
      {
        "@type": ["Product", "Book"],
        name: "Tư Duy Phản Biện",
        url: "https://tiki.vn/tu-duy-phan-bien-p274802547.html?spid=2429813", // đường dẫn trực tiếp trang đến thông tin sản phẩm
        description:
          'TƯ DUY PHẢN BIỆNTư duy phản biện là chìa khóa để bạn thoát khỏi những lối mòn trong suy nghĩ, giúp bạn giải quyết các vấn đề khó khăn một cách sáng tạo và hiệu quả hơn. Cuốn sách "Tư duy phản biệ...',
        image: {
          "@id":
            "https://salt.tikicdn.com/cache/280x280/ts/product/6f/3f/58/80b2a6075864f509d332757b6bcfaac4.jpg/#primaryimage",
          "@type": "ImageObject",
          inLanguage: "vi",
          url: "https://salt.tikicdn.com/cache/280x280/ts/product/6f/3f/58/80b2a6075864f509d332757b6bcfaac4.jpg", // link hình ảnh
          contentUrl:
            "https://salt.tikicdn.com/cache/280x280/ts/product/6f/3f/58/80b2a6075864f509d332757b6bcfaac4.jpg",
          width: 800,
          height: 800,
          caption: "Tư Duy Phản Biện", // tên sản phẩm
        },
        sku: "3600518272868", // mã số sản phẩm trong kho
        mpn: "3600518272868", // mã số sp trong thương mại điện tử
        itemCondition: "https://schema.org/NewCondition",
        mainEntityOfPage: {
          "@id":
            "https://tiki.vn/tu-duy-phan-bien-p274802547.html?spid=2429813/#webpage",
        },
        brand: { "@type": "Brand", name: "1980 Books" }, //Xác định loại dữ liệu là một thương hiệu.có tên là 1980 Book
        manufacturer: { "@type": "Organization", name: "1980 Books" }, // Xác định loại dữ liệu là một tổ chức. có tên là 1980 Book
        offers: [
          {
            shippingDetails: {
              // miễn phí vận chuyển
              "@type": "OfferShippingDetails",
              shippingRate: {
                "@type": "MonetaryAmount",
                value: "0",
                currency: "VND",
              },
              deliveryTime: {
                // thời gian vận chuyển
                "@type": "ShippingDeliveryTime",
                handlingTime: {
                  "@type": "QuantitativeValue",
                  minValue: 0, //thời gian xử lý đơn hàng
                  maxValue: 1,
                  unitCode: "DAY",
                },
                transitTime: {
                  "@type": "QuantitativeValue",
                  minValue: 1,
                  maxValue: 1, // thời gian vẫn chuyển đơn hàng đến khách hàng
                  unitCode: "DAY",
                },
              },
              shippingDestination: [
                // vùng quốc gia có thể giao hàng
                {
                  "@type": "DefinedRegion",
                  addressCountry: "VN",
                  addressRegion: ["VN"],
                },
              ],
            },
            hasMerchantReturnPolicy: {
              // sách đổi trả của một nhà bán hàng
              "@type": "MerchantReturnPolicy",
              applicableCountry: "VN",
              returnPolicyCategory:
                "https://schema.org/MerchantReturnFiniteReturnWindow",
              merchantReturnDays: 7, // ngày đổi trả
              returnMethod: "https://schema.org/ReturnByMail",
              returnFees: "https://schema.org/FreeReturn",
            },
            seller: {
              //thông tin về người bán sản phẩm.
              "@type": "Organization",
              "@id": "https://tiki.vn/cua-hang/tiki-trading#organization", //Định danh duy nhất của người bán. Trong trường hợp này, đây là URL của cửa hàng trên trang web Tiki.
              name: "Tiki Trading",
              url: "https://tiki.vn/cua-hang/tiki-trading", //URL của trang cửa hàng trên trang web Tiki.
            },
            priceSpecification: {
              //thông tin về giá cả của sản phẩm.
              "@type": "UnitPriceSpecification", //đây là một thông tin giá cả với đơn vị.
              price: 54200,
              priceCurrency: "VND",
              referenceQuantity: {
                "@type": "QuantitativeValue",
                value: "1", //Giá trị của đơn vị tham chiếu, trong trường hợp này là "1" (một sản phẩm).
                unitCode: "CT", //Mã đơn vị của đơn vị tham chiếu, trong trường hợp này là "CT" (chiếc).
              },
            },
            priceValidUntil: "2024-06-15", //Ngày hết hạn của giá cả.
            availability: "https://schema.org/InStock", //Tình trạng sẵn có của sản phẩm. Trong trường hợp này, giá trị là "https://schema.org/InStock" để chỉ ra rằng sản phẩm có sẵn trong kho.
            url: "https://tiki.vn/tu-duy-phan-bien-p274802547.html?spid=2429813", //đường dẫn đến trang sản phẩm
          },
        ],
        additionalProperty: [
          {
            "@type": "PropertyValue",
            name: "Phiên bản sách",
            value: "Phiên bản thường",
          },
          {
            "@type": "PropertyValue",
            name: "Công ty phát hành",
            value: "1980 Books",
          },
          {
            "@type": "PropertyValue",
            name: "Kích thước",
            value: "<p>13 x 20</p>",
          },
          { "@type": "PropertyValue", name: "Dịch Giả", value: "Jaden Minh" },
          { "@type": "PropertyValue", name: "Loại bìa", value: "Bìa mềm" },
          { "@type": "PropertyValue", name: "Số trang", value: "172" },
          {
            "@type": "PropertyValue",
            name: "Nhà xuất bản",
            value: "Nhà Xuất Bản Thế Giới",
          },
        ],
        author: { "@type": "Person", name: "Zoe McKey" },
        workExample: {
          "@type": "Book", // loại dữ liệu
          "@id":
            "https://tiki.vn/tu-duy-phan-bien-p274802547.html?spid=2429813",
          bookFormat: "https://schema.org/Paperback", //Định dạng của sách, trong trường hợp này là "Paperback" (bìa mềm).
          inLanguage: "vi",
          isbn: "3600518272868", //Mã ISBN của sách, là một mã số duy nhất được sử dụng để xác định một cuốn sách cụ thể.
          bookEdition: 1, //phiên bản 1
        },
        pattern: "modern",
        color: "Xanh",
        material: "Nhựa",
      },
    ],
  };

  return (
    <>
      <Script
        id={params.id}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        // strategy="lazyOnload"
      />
      <div>Detail user</div>
      {params?.id}
      <Detail user={data} />
    </>
  );
};

export default DetailUserPage;
