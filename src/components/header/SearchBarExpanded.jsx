import { useSearchParams } from 'react-router-dom';
import { Col, DatePicker, Typography, Row, Input, Divider, Flex, InputNumber, Button, Form } from 'antd';
import { memo, useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { lowerCase } from 'lodash';
import dayjs from 'dayjs';
import { Icon } from '@iconify/react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import i18n, { t } from 'i18next';

import HeaderTabs from './HeaderTabs.jsx';

import { SMOOTH } from '../../config/motionConfig.js';
import { setExpanded } from '../../store/appSlice.js';
import Counter from '../Counter.jsx';

const today = dayjs();
const threeDaysLater = dayjs().add(3, 'day');

// form items memoized
const MemoizedDatePicker = memo(({ open, onOpenChange }) => {
  return (
    <Form.Item name='date' className='!mb-0 !min-h-0'>
      <DatePicker.RangePicker
        open={open}
        onOpenChange={onOpenChange}
        placeholder={[today.format('MMM DD'), threeDaysLater.format('MMM DD')]}
        size='small'
        variant='borderless'
        format='MMM DD'
        suffixIcon={null}
        seperator={<Divider type='vertical' className='!mx-1 !h-10' />}
        className='custom-rangepicker !max-w-[200px] !p-0 !font-bold'
      />
    </Form.Item>
  );
});

const MemoizedGuestInput = memo(({ form }) => {
  return (
    <Form.Item name='guests' className='!mb-0'>
      <Counter form={form} />
    </Form.Item>
  );
});

function SearchBarExpanded({ containerRef }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const inputNumberRef = useRef(null);
  const expanded = useSelector((state) => state.app.expanded);
  const [form] = Form.useForm();

  const params = useMemo(() => Object.fromEntries(searchParams.entries()), [searchParams]);

  const initialValues = useMemo(() => {
    const fromValue = params.from ? dayjs(params.from) : today;
    const toValue = params.to ? dayjs(params.to) : threeDaysLater;

    return {
      date: [fromValue, toValue],
      guests: +params.guests || 1,
      query: params.query || '',
    };
  }, [params]);

  const handleSearchColClick = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleOpenChange = useCallback((status) => {
    setOpen(status);
  }, []);

  const handleDateColClick = useCallback(() => {
    setOpen(true);
  }, []);

  const handleGuestSelect = useCallback(() => {
    if (inputNumberRef.current) {
      inputNumberRef.current.focus();
    }
  }, []);

  // on finish form
  const onFinish = useCallback(
    (values) => {
      const { query, date, guests } = values;
      let newParams = {};

      if (query) {
        newParams.query = lowerCase(query);
      }

      if (date) {
        const formattedDateRange = date?.map((d) => d.format('YYYY-MM-DD'));
        const [fromDate, toDate] = formattedDateRange;
        newParams.from = fromDate;
        newParams.to = toDate;
      }

      if (guests) {
        newParams.guests = guests;
      }

      setSearchParams(newParams);
    },
    [setSearchParams],
  );

  useEffect(() => {
    if (!expanded) return;

    const handleScrollOrClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        dispatch(setExpanded(false));
      }
    };

    const handleScroll = () => {
      dispatch(setExpanded(false));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('mousedown', handleScrollOrClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleScrollOrClickOutside);
    };
  }, [expanded, dispatch, containerRef]);

  // motion props
  const motionProps = useMemo(
    () => ({
      animate: {
        height: expanded ? '77px' : 0,
      },
      transition: {
        duration: 0.2,
        ease: SMOOTH,
      },
    }),
    [expanded],
  );

  const innerMotionProps = useMemo(
    () => ({
      initial: {
        opacity: 0,
      },
      animate: {
        opacity: expanded ? 1 : 0,
        translateY: expanded ? 75 : 0,
        scale: expanded ? 1 : 0.5,
        pointerEvents: expanded ? 'auto' : 'none',
      },
      transition: {
        duration: 0.2,
        ease: SMOOTH,
      },
    }),
    [expanded],
  );

  // form
  const formComponent = useMemo(
    () => (
      <Form form={form} onFinish={onFinish} initialValues={initialValues}>
        <motion.div {...motionProps} className='border-border-grey bg-bg-primary border-b'>
          <HeaderTabs />
          <motion.div
            {...innerMotionProps}
            className='border-border-grey bg-bg-primary shadow-theme hover:shadow-theme-hover active:shadow-theme-hover absolute top-0 left-1/2 !min-w-200 -translate-x-1/2 rounded-full border'
          >
            <Row className='flex items-center'>
              <Col className='cursor-pointer' onClick={handleSearchColClick}>
                <Flex
                  vertical
                  className='hover:bg-border-grey/50 active:bg-border-grey/50 !ml-1.5 !size-full rounded-full !py-2 !pr-4 !pl-8 duration-200'
                >
                  <Typography.Text className='!text-[13px]'>{t('where')}</Typography.Text>
                  <Form.Item name='query' className='!mb-0'>
                    <Input
                      ref={inputRef}
                      variant='borderless'
                      placeholder={t('search_destinations')}
                      allowClear
                      autoComplete='off'
                      className='placeholder:!text-text-secondary !max-w-[180px] border-none !p-0 !text-[15px] !font-bold hover:!outline-none focus:!shadow-none'
                    />
                  </Form.Item>
                </Flex>
              </Col>
              <Divider type='vertical' className='!mr-0.5 !ml-2 !h-10' />

              <Col className='cursor-pointer' onClick={handleDateColClick}>
                <Flex
                  vertical
                  className='hover:bg-border-grey/50 active:bg-border-grey/50 !size-full rounded-full !py-2 !pr-1 !pl-6 duration-200'
                >
                  <Flex gap={53}>
                    <Typography.Text className='!text-[13px]'>{t('check-in')}</Typography.Text>
                    <Typography.Text className='absolute left-34.5 !text-[13px]'>{t('check-out')}</Typography.Text>
                  </Flex>
                  <Row>
                    <MemoizedDatePicker open={open} onOpenChange={handleOpenChange} />
                  </Row>
                </Flex>
              </Col>
              <Divider type='vertical' className='!mx-0.5 !h-10' />
              <Col className='my-1 mr-1 flex cursor-pointer items-center' onClick={handleGuestSelect}>
                <Flex
                  align='center'
                  className='hover:bg-border-grey/50 active:bg-border-grey/50 !ml-0.5 !size-full rounded-full !py-2 !pl-6 duration-200'
                >
                  <Flex vertical className='w-[152px]'>
                    <Typography.Text className='!text-[13px]'>{t('guests')}</Typography.Text>
                    <MemoizedGuestInput inputNumberRef={inputNumberRef} form={form} />
                  </Flex>
                  <Button
                    htmlType='submit'
                    className='!mr-2 !size-13'
                    type='primary'
                    icon={<Icon icon='mdi:magnify' className='text-white' width={15} />}
                  />
                </Flex>
              </Col>
            </Row>
          </motion.div>
        </motion.div>
      </Form>
    ),
    [
      form,
      motionProps,
      innerMotionProps,
      handleSearchColClick,
      handleDateColClick,
      handleGuestSelect,
      handleOpenChange,
      onFinish,
      open,
      initialValues,
      i18n.language,
    ],
  );

  return formComponent;
}

export default memo(SearchBarExpanded);
