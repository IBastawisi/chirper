interface user {
  id: string,
  name: string,
  avatarURL: string,
  tweets: string[],
}

interface tweet {
  id: string,
  text: string,
  author: string,
  timestamp: number,
  likes: string[],
  replies: string[],
  replyingTo: string|null,
}