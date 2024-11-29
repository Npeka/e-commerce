import { Card, Button, Typography, Badge, theme } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";

const { Title } = Typography;

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  isOnSale: number;
}

const ProductCard = ({ product }: { product: Product }) => {
  const {
    token: { colorPrimary },
  } = theme.useToken();

  return (
    <Link href={`/product/${product.id}`} passHref>
      <Badge.Ribbon text={`${product.isOnSale}% OFF`} color="red">
        <Card
          hoverable
          cover={
            <Image
              className="max-h-[200px] min-h-[200px] min-w-full max-w-[200px] object-cover"
              src={product.imageUrl}
              alt={product.name}
              width={200}
              height={200}
              loading="lazy"
            />
          }
        >
          <Card.Meta title={product.name} description={product.description} />

          <Title level={4} style={{ color: colorPrimary }}>
            {product.price.toLocaleString()} VND
          </Title>

          <Button
            className="!ml-auto"
            type="primary"
            icon={<ShoppingCartOutlined />}
          >
            Add to Cart
          </Button>
        </Card>
      </Badge.Ribbon>
    </Link>
  );
};
export default ProductCard;
