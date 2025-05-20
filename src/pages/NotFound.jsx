import { Button, Flex, Space, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Flex vertical align='center' justify='center' className='h-screen w-full !px-4'>
      <Typography.Title className='mb-2 !text-5xl'>404</Typography.Title>
      <Typography.Paragraph>{t('page_not_found')}</Typography.Paragraph>
      <Button type='primary' size='large' onClick={() => navigate('/')}>
        {t('go_back_home')}
      </Button>
    </Flex>
  );
}

export default NotFound;
