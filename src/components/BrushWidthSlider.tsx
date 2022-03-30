import { Stack, Slider } from '@mui/material'
import { Canvas } from 'fabric/fabric-impl'
import { useEffect, useState } from 'react'

type BrushWidthSliderProps = {
	canvas: Canvas
	initialWidth: number
	minWidth: number
	maxWidth: number
}

function BrushWidthSlider(props: BrushWidthSliderProps) {
	const { canvas, initialWidth, minWidth, maxWidth } = props
	const [brushwidth, setBrushWidth] = useState<number>(initialWidth)

	// ブラシサイズの変更
	useEffect(() => {
		if (canvas !== undefined) canvas.freeDrawingBrush.width = brushwidth
	}, [canvas, brushwidth])

	const handleChangeWidth = (_event: Event, value: number | number[]) => {
		if (typeof value === 'number') setBrushWidth(value)
	}

	return (
		<Stack spacing={2} direction="row" alignItems="center">
			<p> BrushWidth: </p>
			<Slider
				defaultValue={initialWidth}
				aria-label="Default"
				valueLabelDisplay="auto"
				min={minWidth}
				max={maxWidth}
				onChange={handleChangeWidth}
			/>
		</Stack>
	)
}

export default BrushWidthSlider
