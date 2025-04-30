import { Flex, Typography } from "antd";
import { Link } from "react-router-dom";

function Logo({ width = 45 }) {
  return (
    <Link to="/">
      <Flex align="center">
        <img
          src="/src/assets/logo.png"
          alt="bookbnb logo"
          width={width}
          className="pointer-events-none select-none"
        />
        <Typography.Title
          level={1}
<<<<<<< HEAD
          className="!font-extrabold !tracking-tighter !text-[#fd514d] md:hidden lg:block"
=======
          className="!font-extrabold !tracking-tighter !text-[#fd514d] md:hidden xl:block"
>>>>>>> 24748d013c382da4d2e244a5211dc51fbd97f588
        >
          bookbnb
        </Typography.Title>
      </Flex>
    </Link>
  );
}

export default Logo;
