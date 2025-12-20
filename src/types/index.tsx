
export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
  status: "publish" | "draft" | "blocked";
  topRate: boolean;
}

export type PostStatusType = "publish" | "draft" | "blocked" | "all";