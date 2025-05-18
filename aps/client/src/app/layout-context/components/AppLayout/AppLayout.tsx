import { PropsWithChildren } from 'react'
import './AppLayout.style.scss'
import HomeSvg from '../../../../assets/image/components/HomeSvg'
import VideoSvg from '../../../../assets/image/components/VideoSvg'
import ImageSvg from '../../../../assets/image/components/ImageSvg'
import ArticleSvg from '../../../../assets/image/components/ArticleSvg'
import AvatarSvg from '../../../../assets/image/components/AvatarSvg'

export default function AdminAppLayout({ children }: PropsWithChildren<{}>) {
  return (
    <>
      <div className="app-layout__top-nav vw-100 flex justify-between align-center">
        <nav className="app-layout__logo-section">
          <HomeSvg fill={'rgb(97, 97, 97)'} />
        </nav>

        <nav className="app-layout__center-nav flex justify-between align-center">
          {
            //LEFT SIDE NAV
          }
          <button className="raw-btn center-nav-button">
            <HomeSvg fill={'rgb(97, 97, 97)'} />
          </button>
          <button className="raw-btn center-nav-button">
            <VideoSvg fill={'rgb(97, 97, 97)'} />
          </button>
          <button className="raw-btn center-nav-button">
            <ImageSvg fill={'rgb(97, 97, 97)'} />
          </button>
          <button className="raw-btn center-nav-button">
            <ArticleSvg fill={'rgb(97, 97, 97)'} />
          </button>
        </nav>

        <nav>
          <AvatarSvg />
        </nav>
      </div>
    </>
  )
}
