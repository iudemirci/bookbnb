import { Flex, Image, Typography } from 'antd';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

function Logo({ width = 45 }) {
  return (
    <Link to='/'>
      <Flex align='center'>
        <Image src={logo} width={width} preview={false} className='pointer-events-none select-none' />
        <Typography.Title level={1} className='!font-extrabold !tracking-tighter !text-[#fd514d] md:hidden xl:block'>
          bookbnb
        </Typography.Title>
      </Flex>
    </Link>
  );
}

export default Logo;
