import './FabricCanvas.css'

type FabricCanvasProps = {
  id: string
}

export function FabricCanvas(props: FabricCanvasProps) {
  const { id } = props

  return (
    <div className="canvas-wrapper">
      <canvas id={id} />
    </div>
  )
}

export default FabricCanvas
