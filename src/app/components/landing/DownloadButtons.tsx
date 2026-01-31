import Link from 'next/link'
import AppStore from '@/app/components/svg/AppStore'
import GooglePlay from '@/app/components/svg/GooglePlay'

interface DownloadButtonsProps {
  appStoreUrl?: string
  playStoreUrl?: string
  variant?: 'primary' | 'secondary'
  className?: string
}

const DownloadButtons: React.FC<DownloadButtonsProps> = ({
  appStoreUrl,
  playStoreUrl,
  variant = 'primary',
  className = '',
}) => {
  const buttonClass =
    variant === 'primary'
      ? 'bg-nord-text-primary text-nord-surface hover:opacity-90'
      : 'bg-nord-highlight-2 text-nord-surface hover:bg-nord-highlight-3'

  return (
    <div className={`flex flex-wrap gap-4 justify-center ${className}`}>
      {appStoreUrl && (
        <Link
          href={appStoreUrl}
          target='_blank'
          rel='noopener noreferrer'
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${buttonClass}`}
        >
          <AppStore size={24} fill='currentColor' />
          <span>App Store</span>
        </Link>
      )}
      {playStoreUrl && (
        <Link
          href={playStoreUrl}
          target='_blank'
          rel='noopener noreferrer'
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${buttonClass}`}
        >
          <GooglePlay size={24} fill='currentColor' />
          <span>Google Play</span>
        </Link>
      )}
    </div>
  )
}

export default DownloadButtons
