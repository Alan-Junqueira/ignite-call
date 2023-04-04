import { Adapter } from 'next-auth/adapters'
import { prisma } from '../prisma'

export function PrismaAdapter(): Adapter {
  return {
    async createUser(user) { },

    async getUser(id) {
      const user = await prisma.user.findFirstOrThrow({
        where: { id },
      })

      return {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email!,
        avatar_url: user.avatar_url!,
        emailVerified: null,
      }
    },
    async getUserByEmail(email) {
      const user = await prisma.user.findFirstOrThrow({
        where: { email },
      })

      return {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email!,
        avatar_url: user.avatar_url!,
        emailVerified: null,
      }
    },
    async getUserByAccount({ providerAccountId, provider }) {
      const { user } = await prisma.account.findUniqueOrThrow({
        where: {
          provider_provider_account_id: {
            provider,
            provider_account_id: providerAccountId,
          },
        },
        include: {
          user: true,
        },
      })

      return {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email!,
        avatar_url: user.avatar_url!,
        emailVerified: null,
      }
    },
    async updateUser(user) {
      const prismaUser = await prisma.user.update({
        where: {
          id: user.id!,
        },
        data: {
          name: user.name,
          email: user.email,
          avatar_url: user.avatar_url,
        },
      })

      return {
        id: prismaUser.id,
        name: prismaUser.name,
        username: prismaUser.username,
        email: prismaUser.email!,
        avatar_url: prismaUser.avatar_url!,
        emailVerified: null,
      }
    },
    async linkAccount(account) {
      const {
        provider,
        providerAccountId,
        type,
        userId,
        access_token,
        expires_at,
        id_token,
        refresh_token,
        scope,
        session_state,
        token_type,
      } = account

      await prisma.account.create({
        data: {
          user_id: userId,
          type,
          provider,
          provider_account_id: providerAccountId,
          refresh_token,
          access_token,
          expires_at,
          token_type,
          scope,
          id_token,
          session_state,
        },
      })
    },
    async createSession({ sessionToken, userId, expires }) {
      await prisma.session.create({
        data: {
          user_id: userId,
          expires,
          session_token: sessionToken,
        },
      })

      return {
        sessionToken,
        userId,
        expires,
      }
    },
    async getSessionAndUser(sessionToken) {
      const { user, ...session } = await prisma.session.findUniqueOrThrow({
        where: {
          session_token: sessionToken,
        },
        include: {
          user: true,
        },
      })
      return {
        session: {
          userId: session.user_id,
          expires: session.expires,
          sessionToken: session.session_token,
        },
        user: {
          id: user.id,
          name: user.name,
          username: user.username,
          email: user.email!,
          avatar_url: user.avatar_url!,
          emailVerified: null,
        },
      }
    },

    async updateSession({ sessionToken, userId, expires }) {
      const {
        expires: sessionExpires,
        session_token,
        user_id,
      } = await prisma.session.update({
        where: {
          session_token: sessionToken,
        },
        data: {
          expires,
          user_id: userId,
        },
      })

      return {
        expires: sessionExpires,
        sessionToken: session_token,
        userId: user_id,
      }
    },
  }
}
