package cz.melkamar.kotlin

import cz.melkamar.kotlin.model.User
import org.springframework.data.mongodb.repository.MongoRepository

interface UserRepository: MongoRepository<User, String>