
import { create, refresh, clear } from "~/server/utils/token"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

// методы

//Обновление токена

// Получение токена

// Обнуление токена

export default defineEventHandler((event) => {
    return {
      hello: 'world'
    }
})