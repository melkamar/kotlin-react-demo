package cz.melkamar.kotlin.model

import org.springframework.data.annotation.Id
import javax.validation.constraints.Email
import javax.validation.constraints.Size

data class User(
        @get:Email @get:Id val email: String,
        @get:Size(min = 10) var username: String
)