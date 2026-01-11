import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

type ZoomableImageProps = React.ImgHTMLAttributes<HTMLImageElement>

export function ZoomableImage(props: ZoomableImageProps) {
  return (
    <Zoom>
      <img {...props} />
    </Zoom>
  )
}
