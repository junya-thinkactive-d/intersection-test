import { AudioElement } from '@/components';
import { useCallback, useEffect, useRef, useState } from 'react'

export default function Home() {
  // テスト用音源
  const musicList = [
    {
      name: 'aaa',
      musicSrc:
        'https://depod-music.s3.ap-northeast-1.amazonaws.com/UQ6I5N4J.mp3',
    },
    {
      name: 'bbb',
      musicSrc:
        'https://depod-music.s3.ap-northeast-1.amazonaws.com/97TCZIL8.mp3',
    },
    {
      name: 'ccc',
      musicSrc:
        'https://depod-music.s3.ap-northeast-1.amazonaws.com/BXHOMS6G.mp3',
    },
  ];

  const [isPlay,setIsPlay] = useState<boolean>(false)

  const handlePlay = useCallback(()=>{
    setIsPlay(!isPlay)
  },[isPlay])

  const observer = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    if (observer.current) observer.current.disconnect()
    // @ts-ignore
    const audioElements = [...document.querySelectorAll('audio')] as HTMLAudioElement[]
    console.log(audioElements)
    observer.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          console.log("entry.intersectionRatio",entry.intersectionRatio)
          // @ts-ignore
          entry.target.intersectionRatio = entry.intersectionRatio
        }
  
        const mostVisible = audioElements.reduce((prev, current) => {
          // @ts-ignore
          if (current.intersectionRatio > (prev ? prev.intersectionRatio : 0)) {
            return current
          } else {
            return prev
          }
        }, null as HTMLAudioElement | null)

        console.log("mostVisible",mostVisible)

        if (mostVisible && mostVisible.paused && isPlay) {
          mostVisible.play()
        }
  
        audioElements.forEach((item) => {
          console.log("item",item)
          if (item !== mostVisible && !item.paused) {
            item.pause()
          }
        })
      },
      {
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      }
    )
    console.log("observer.current",observer.current)
  
    audioElements.forEach((item) => {
      observer.current?.observe(item)
    })
  
    return () => {
      audioElements.forEach((item) => {
        observer.current?.unobserve(item)
      })
    }
  }, [isPlay])

  return (
    <div className='h-screen overflow-auto snap-y snap-mandatory text-white bg-black'>
      <button className='px-4 py-2 bg-black text-white sticky top-0 z-50' onClick={handlePlay}>オートプレイ</button>
      {musicList.map((music, i) => (
        <AudioElement key={i} name={music.name} src={music.musicSrc} />
      ))}
    </div>
  );
}
