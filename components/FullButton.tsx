import React from 'react'
import {
	Center,
	Text,
	VStack,
	Square,
	GridItem,
	LinkBox,
	LinkOverlay,
	Heading,
} from '@chakra-ui/react'
import { FaCat, FaDog } from 'react-icons/fa'
import { GiHouse } from 'react-icons/gi'
import { RiPlantFill } from 'react-icons/ri'

type FullButtonProps = {
	bgColor: string
	topText?: string
	bottomText?: string
	icon?: string
	href?: string
}

const FullButton = ({
	bgColor,
	topText,
	bottomText,
	icon,
	href,
}: FullButtonProps) => {
	return (
		<LinkBox className='fullButton'>
			<GridItem bgColor={bgColor}>
				<Square>
					<Center h={'45vh'}>
						<VStack maxH={'99%'} p={3}>
							<Heading>{topText}</Heading>
							<div>
								{icon &&
									{
										house: <GiHouse className='fullButtonIcon' />,
										home: <GiHouse className='fullButtonIcon' />,
										plant: <RiPlantFill className='fullButtonIcon' />,
										cat: <FaCat className='fullButtonIcon' />,
										dog: <FaDog className='fullButtonIcon' />,
									}[icon]}
							</div>
							<Heading textAlign={'center'}>{bottomText}</Heading>
							<LinkOverlay href={href} />
						</VStack>
					</Center>
				</Square>
			</GridItem>
		</LinkBox>
	)
}

export default FullButton
