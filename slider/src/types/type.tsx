export interface IImagesData {
  id: number,
  url: string,
  text: string
}

export type InitialStateType = {
  currentIndex: number,
  images: IImagesData[],
  isPags: boolean,
  isNavs: boolean,
  isLoop: boolean
}