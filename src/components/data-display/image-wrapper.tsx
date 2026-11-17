import type { ImgHTMLAttributes } from 'react'

import useTheme from '@/hooks/use-theme'

type ImageWrapperProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> & {
  src: string
  /** Swapped in when the dark theme is active — for logos that need contrast. */
  srcForDarkMode?: string
  alt: string
}

const ImageWrapper = ({
  src,
  srcForDarkMode,
  alt,
  loading = 'lazy',
  decoding = 'async',
  ...props
}: ImageWrapperProps) => {
  const { resolvedTheme } = useTheme()
  const finalSrc =
    resolvedTheme === 'dark' && srcForDarkMode ? srcForDarkMode : src

  return (
    <img src={finalSrc} alt={alt} loading={loading} decoding={decoding} {...props} />
  )
}

export default ImageWrapper
