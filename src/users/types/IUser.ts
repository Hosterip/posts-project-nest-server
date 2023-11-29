import { IPost } from '../../posts/types/IPost';

export interface IUser {
  id: number;
  username: string;
  hash?: string;
  salt?: string;
  posts?: IPost[] | [];
}
