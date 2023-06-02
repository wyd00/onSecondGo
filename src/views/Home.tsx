import React, { useEffect, useState } from 'react';
import { getSongListType, getTopPlaylist } from '@/service';
import { useRequest } from 'ahooks';

export default function Home() {
  // const [songListType, setSongListType] = useState<ISongListTypeResponse['sub']>([]);
  const [songListType, setSongListType] = useState<
    Awaited<ReturnType<typeof getSongListType>>['data']['sub']
  >([]);
  useEffect(() => {
    getSongListType()
      .then((res) => {
        setSongListType(res.data.sub);
      })
      .catch(() => {});
  }, []);
  const { data: topPlaylist } = useRequest(() => getTopPlaylist({ cat: '全部' }));
  return (
    <>
      <ul>
        {topPlaylist?.map((item) => (
          <li key={item.id}>{item.description}</li>
        ))}
      </ul>
      <ul>
        {songListType.map((item) => (
          <li key={item.name}>{item.name}</li>
        ))}
      </ul>
    </>
  );
}
