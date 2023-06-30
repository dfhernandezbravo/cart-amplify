import Image from "next/image";
import Link from "next/link";

const LogoImage = () => {
  const logoURL =
    "https://easycl.vtexassets.com/assets/vtex.file-manager-graphql/images/97740859-8d6b-4562-ad02-d6fd37c14e32___bab6e437e21af76315174bd3b460d74a.svg";

  return (
    <Link className="logo" href="/">
      <Image
        src={logoURL}
        alt="Easy"
        width={60}
        height={60}
        title="Easy Home"
      />
    </Link>
  );
};

export default LogoImage;
