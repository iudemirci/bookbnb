import { useDispatch, useSelector } from 'react-redux';
import { Button, Checkbox, Divider, Flex, Form, Input, Modal, Typography } from 'antd';
import { setIsLoginOpen, setIsSignupOpen } from '../../store/modalSlice.js';
import { useTranslation } from 'react-i18next';
import useSignup from '../../hooks/auth/useSignup.js';

function SignupModal() {
  const { t } = useTranslation();
  const isModalOpen = useSelector((state) => state.modal.isSignupOpen);
  const dispatch = useDispatch();

  const { mutate, isPending } = useSignup();
  function hideModal() {
    dispatch(setIsSignupOpen());
  }

  function onFinish(values) {
    const newValues = {
      ...values,
      role: 'user',
    };

    mutate(newValues);
  }

  function handleLoginClick() {
    dispatch(setIsSignupOpen());
    dispatch(setIsLoginOpen());
  }

  return (
    <Modal
      open={isModalOpen}
      onCancel={hideModal}
      destroyOnClose={true}
      width={450}
      footer={null}
      title={
        <Typography.Title level={4} className='text-center'>
          {t('register')}
        </Typography.Title>
      }
    >
      <Divider className='!mt-6' />

      <Flex vertical={true} justify='center' gap={12} className='!pt-4'>
        <Typography.Title level={2} className='!font-extrabold'>
          {t('welcome_to_bookbnb')}
        </Typography.Title>
        <Typography.Title level={4} type='secondary'>
          {t('create_account')}
        </Typography.Title>

        <Form
          name='signup'
          initialValues={{ remember: true }}
          autoComplete='off'
          layout='vertical'
          requiredMark={false}
          onFinish={onFinish}
        >
          <Form.Item
            name='email'
            rules={[
              {
                required: true,
                message: 'Please input your email!',
              },
              { type: 'email', message: 'Please enter a valid email address' },
            ]}
          >
            <Input size='large' placeholder='Email' status={undefined} />
          </Form.Item>

          <Form.Item
            name='username'
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input size='large' placeholder={t('username')} />
          </Form.Item>

          <Form.Item
            name='password'
            rules={[
              { required: true, message: 'Please input your password!' },
              { min: 6, message: 'Password must be at least 6 characters' },
            ]}
          >
            <Input.Password size='large' placeholder={t('password')} />
          </Form.Item>

          <Form.Item name='remember' valuePropName='checked'>
            <Checkbox>{t('remember_me')}</Checkbox>
          </Form.Item>

          <Button size='large' type='primary' className='w-full' loading={isPending} htmlType='submit'>
            {t('continue')}
          </Button>
        </Form>
        <Divider />

        <Flex gap={6} justify='center' align='center'>
          <Typography.Text type='secondary'>{t('account_have')}</Typography.Text>
          <Typography.Text onClick={handleLoginClick} className='cursor-pointer'>
            {t('login')}
          </Typography.Text>
        </Flex>
      </Flex>
    </Modal>
  );
}

export default SignupModal;
