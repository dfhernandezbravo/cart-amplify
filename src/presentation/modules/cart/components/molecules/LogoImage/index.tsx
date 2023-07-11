import Image from "next/image";
import Link from "next/link";

const LogoImage = () => {
  return (
    <Link className="logo" href="/">
      <Image
        src={`/images/logoHeader-cart.svg`}
        alt="Easy"
        width={52}
        height={52}
        title="Easy Home"
      />
    </Link>
  );
};

export default LogoImage;
