import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import FullButton from '../components/FullButton'
import { Box, Stack, Wrap, Grid } from '@chakra-ui/react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
	return (
		<>
			<Box>
				<Grid templateColumns='repeat(2, 1fr)'>
					<FullButton
						bgColor={'green.300'}
						// topText='plant'
						// bottomText='BotHome'
						icon='plant'
						href='#'
					/>
					<FullButton
						bgColor={'orange.300'}
						topText='Dog House'
						bottomText='Enter if you dare'
						icon='dog'
						href='#'
					/>
				</Grid>
				<FullButton
					bgColor={'blue.300'}
					bottomText='Home'
					icon='house'
					href='#'
				/>
			</Box>
		</>
	)
}
