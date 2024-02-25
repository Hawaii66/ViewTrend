export type Video = {
  id: number;
  refrence: string;
  title: string;
  description: string;
  image: string;
  publishDate: Date;
};

export type View = {
  id: number;
  video: number;
  count: number;
  time: Date;
};
