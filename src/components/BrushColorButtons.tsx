import { Stack, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { Canvas } from 'fabric/fabric-impl'
import { useEffect, useState } from 'react'

type BrushColorButtonsProps = {
	canvas: Canvas
	initialColor: string
}

const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'purple']

function BrushColorButtons(props: BrushColorButtonsProps) {
	const { canvas, initialColor } = props
	const [selectColor, setSelectColor] = useState(initialColor)

	// ブラシカラーの変更
	useEffect(() => {
		if (canvas !== undefined) canvas.freeDrawingBrush.color = selectColor
	}, [canvas, selectColor])

	const handleChangeColor = (
		_event: React.MouseEvent<HTMLElement>,
		value: string
	) => {
		setSelectColor(value)
	}

	return (
		<Stack spacing={2} direction="row" alignItems="center">
			<p> BrushColor: </p>
			<ToggleButtonGroup
				color="primary"
				value={selectColor}
				exclusive
				onChange={handleChangeColor}
			>
				{colors.map((color) => {
					return (
						<ToggleButton key={color} value={color} style={{ color: color }}>
							{color}
						</ToggleButton>
					)
				})}
			</ToggleButtonGroup>
		</Stack>
	)
}

export default BrushColorButtons
