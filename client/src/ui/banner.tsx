// components/Banner.tsx
import { Carousel } from "antd";
import Image from "next/image";

export const Banner = () => (
  <div className="relative h-80 w-full bg-black">
    <Carousel autoplay>
      <div>
        <Image
          className="max-h-80 min-w-full object-cover"
          src="/banner1.jpg"
          alt="Banner 1"
          width={1600}
          height={600}
          objectFit="cover"
        />
      </div>
      <div>
        <Image
          className="max-h-80 min-w-full object-cover"
          src="/banner1.jpg"
          alt="Banner 2"
          width={1600}
          height={600}
          objectFit="cover"
        />
      </div>
    </Carousel>
  </div>
);
