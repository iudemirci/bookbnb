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
          className="!font-extrabold !tracking-tighter !text-[#fd514d] md:hidden lg:block"
        >
          bookbnb
        </Typography.Title>
      </Flex>
    </Link>
  );
}

export default Logo;
