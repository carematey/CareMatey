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
}
// FullButton is a React functional component(React.FC) that takes in FullButtonProps and returns a JSX.Element
// React.FC gives us access to children so we can pass in children to the component without having to define them in the props
const FullButton: React.FC<FullButtonProps> = (
  props,
  children
): JSX.Element => {
  // destructure the known props and spread the rest of the props to the Flex component
  const { topText, bottomText, icon, href, ...rest } = props;
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
