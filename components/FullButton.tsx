import React from 'react';
import { Heading, Flex, ChakraProps } from '@chakra-ui/react';
import { FaCat, FaDog } from 'react-icons/fa';
import { GiHouse } from 'react-icons/gi';
import { RiPlantFill } from 'react-icons/ri';
import Link from 'next/link'; // use the link from next.js for its prefetching https://nextjs.org/docs/api-reference/next/link

// extend the props from chakra-ui to have access to all the props from chakra-ui
interface FullButtonProps extends ChakraProps {
  topText?: string;
  bottomText?: string;
  icon?: string;
  href?: string;
  children?: React.ReactNode;
}

// JSDoc for the component
/**
 * A full button component that takes in a top text, bottom text, icon, href, and children
 * @param {FullButtonProps} props - The props for the component
 * @param {string} [props.topText] - The top text for the button
 * @param {string} [props.bottomText] - The bottom text for the button
 * @param {string} [props.icon] - The icon for the button
 * @param {string} [props.href] - The href for the button
 * @param {React.ReactNode} [props.children] - The children for the button
 * @returns {JSX.Element} - The full button component
 * @example
 * <FullButton
 *  bgColor={'green.300'}
 * height='50vh'
 * topText='i'm above the icon'
 * bottomText='i'm below the icon'
 * icon='plant'
 * href='/plants'
 * >
 * <Text>This is a child</Text>
 * </FullButton>
 */
const FullButton: React.FC<FullButtonProps> = (props): JSX.Element => {
  const { topText, bottomText, icon, href, children, ...rest } = props;
  return (
    <Link href={href || '#'}>
      <Flex
        justifyContent={'center'}
        alignItems={'center'}
        width={'100%'}
        flexDir={'column'}
        {...rest}
      >
        {topText && <Heading>{topText}</Heading>}
        {icon
          ? {
              house: <GiHouse className='fullButtonIcon' />,
              home: <GiHouse className='fullButtonIcon' />,
              plant: <RiPlantFill className='fullButtonIcon' />,
              cat: <FaCat className='fullButtonIcon' />,
              dog: <FaDog className='fullButtonIcon' />,
            }[icon]
          : undefined}
        {children}
        {bottomText && <Heading textAlign={'center'}>{bottomText}</Heading>}
      </Flex>
    </Link>
  );
};

export default FullButton;
