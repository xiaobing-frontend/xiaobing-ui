import React, { FC, HTMLAttributes, useState } from 'react'
import classnames from 'classnames'
import { getPrefixCls } from '../_util'

interface BaseAudioProps {
  /** 设置audio的id */
  id: string
  /** 设置音乐源文件 */
  src: string
  className?: string
}

export type AudioProps = HTMLAttributes<HTMLSpanElement> & BaseAudioProps

const prefixCls = getPrefixCls('audio')
export const Audio: FC<AudioProps> = (props: AudioProps) => {
  const { id, src, className } = props
  const rateList = ['1.0', '1.25', '1.5', '2.0']
  const [playRate, setPlayRate] = useState(1.0)
  const [isPlay, setIsPlay] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(100)
  const [allTime, setAllTime] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [showVoiceProgress, setShowVoiceProgress] = useState(false)
  const [showPlayRate, setShowPlayRate] = useState(false)
  const classes = classnames(prefixCls, className)
  const formatSecond = (time: number) => {
    const second = Math.floor(time % 60)
    let minite = Math.floor(time / 60)
    return `${minite}:${second >= 10 ? second : `0${second}`}`
  }

  // 该视频已准备好开始播放
  const onCanPlay = () => {
    const { id } = props
    const audio = document.getElementById(`audio${id}`) as HTMLAudioElement
    setAllTime(audio.duration)
  }

  const playAudio = () => {
    const { id } = props
    const audio = document.getElementById(`audio${id}`) as HTMLAudioElement
    audio.play()
    setIsPlay(true)
  }

  const pauseAudio = () => {
    const { id } = props
    const audio = document.getElementById(`audio${id}`) as HTMLAudioElement
    audio.pause()
    setIsPlay(false)
  }

  const onMuteAudio = () => {
    const { id } = props
    const audio = document.getElementById(`audio${id}`) as HTMLAudioElement
    setIsMuted(!audio.muted)
    audio.muted = !audio.muted
  }

  const changeTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const { id } = props
    const audio = document.getElementById(`audio${id}`) as HTMLAudioElement
    setCurrentTime(Number(value))
    audio.currentTime = Number(value)
    if (Number(value) === audio.duration) {
      setIsPlay(false)
    }
  }

  // 当前播放位置改变时执行
  const onTimeUpdate = () => {
    const { id } = props
    const audio = document.getElementById(`audio${id}`) as HTMLAudioElement
    setCurrentTime(audio.currentTime)
    if (audio.currentTime === audio.duration) {
      setIsPlay(false)
    }
  }

  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const { id } = props
    const audio = document.getElementById(`audio${id}`) as HTMLAudioElement
    audio.volume = Number(value) / 100

    setVolume(Number(value))
    setIsMuted(!value)
  }

  // 倍速播放
  const changePlayRate = (num: number) => {
    const audio = document.getElementById(`audio${props.id}`) as HTMLAudioElement
    audio.playbackRate = num
    setPlayRate(num)
  }
  const showVoiceProgressFn = (action: boolean) => {
    if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
      return
    }
    setShowVoiceProgress(action)
  }
  const showPlayRateFn = (action: boolean) => {
    setShowPlayRate(action)
  }
  const togglePlayRate = () => {
    setShowPlayRate(!showPlayRate)
  }
  return (
    <div className={classes}>
      <audio
        id={`audio${id}`}
        src={src}
        preload={'auto'}
        onCanPlay={onCanPlay}
        onTimeUpdate={onTimeUpdate}
      >
        <track src={src} kind="captions" />
      </audio>

      {isPlay ? (
        <div onClick={pauseAudio} className="play-btn">
          <i className="iconfont">&#xe67a;</i>
        </div>
      ) : (
        <div onClick={playAudio} className="play-btn">
          <i className="iconfont">&#xe675;</i>
        </div>
      )}

      <div className="play-container">
        <span className="time">{formatSecond(currentTime) + '/' + formatSecond(allTime)}</span>
        <input
          className="time-progress"
          type="range"
          step="0.01"
          max={allTime}
          value={currentTime}
          onChange={changeTime}
        />
      </div>

      <div
        className="voice-wrapper"
        onMouseOver={() => showVoiceProgressFn(true)}
        onMouseOut={() => showVoiceProgressFn(false)}
      >
        <span className="voice" onClick={onMuteAudio}>
          {isMuted ? <i className="iconfont">&#xe691;</i> : <i className="iconfont">&#xe68f;</i>}
        </span>
        <input
          className={classnames('voice-progress', {
            hidden: !showVoiceProgress,
          })}
          type="range"
          onChange={changeVolume}
          value={isMuted ? 0 : volume}
        />
      </div>

      <div
        className="rate-wrapper"
        onMouseOver={() => showPlayRateFn(true)}
        onMouseOut={() => showPlayRateFn(false)}
      >
        {rateList && rateList.length > 0 && (
          <ul
            className={classnames({
              hidden: !showPlayRate,
            })}
          >
            {rateList.map(item => (
              <li
                key={item}
                className={classnames({
                  active: playRate == Number(item),
                })}
                onClick={() => changePlayRate(Number(item))}
              >
                {item}X
              </li>
            ))}
          </ul>
        )}
        <span onClick={() => togglePlayRate()}>倍速</span>
      </div>
    </div>
  )
}

export default Audio
