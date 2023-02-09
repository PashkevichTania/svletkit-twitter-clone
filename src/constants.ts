export const CONST = {
  title: 'Twitttr',
  icon: '🦊'
}

export const QUERY_KEYS = {
  tweets: 'tweets',
  user: 'user'
}

export const ROUTES = {
  api: {
    comments: '/protected/api/comments',
    like: {
      comment: '/protected/api/like/comment',
      tweet: '/protected/api/like/tweet'
    },
    tweets: '/protected/api/tweets',
    user: '/protected/api/user'
  },
  pages: {
    home: '/protected/home/',
    tweets: '/protected/tweets/',
    about: '/protected/about/',
    profile: '/protected/profile',
    profileEdit: '/protected/profile/edit/',
    settings: {
      index: '/protected/settings'
    }
  }
}
