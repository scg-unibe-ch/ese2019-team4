export interface Post {
  // id should eventually be changed to number and be generated in the backend
  id: number;
  //src: string;
  author: string;
  title: string;
  body: string;
}
