import { useEffect, useState } from 'react'
import './App.css'
import { fabric } from 'fabric'
import { Canvas } from 'fabric/fabric-impl'
import { Container, Box, Stack, Slider } from '@mui/material'

function App() {
	const [brushwidth, setBrushWidth] = useState(25)
	const [fabricCanvas, setFabricCanvas] = useState<Canvas>()

	useEffect(() => {
		// キャンバスの初期化処理
		const canvas = new fabric.Canvas('fabric', {
			isDrawingMode: true, // 手書きモード
			width: 300,
			height: 300,
			// backgroundColor: '#80beaf',
			backgroundImage: 'https://placehold.jp/300x300.png',
		})
		setFabricCanvas(canvas)
	}, [])

	useEffect(() => {
		if (fabricCanvas !== undefined)
			fabricCanvas.freeDrawingBrush.width = brushwidth
	}, [fabricCanvas, brushwidth])

	return (
		<Container>
			<canvas id="fabric" />
			<Box sx={{ width: 500, margin: 'auto' }}>
				<Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
					<p>BrushWidth: </p>
					<Slider
						defaultValue={25}
						aria-label="Default"
						valueLabelDisplay="auto"
						min={1}
						max={50}
						onChange={(event, value) => setBrushWidth(value as number)}
					/>
				</Stack>
			</Box>
		</Container>
	)
}

export default App
