package cz.melkamar.kotlin.controller

import cz.melkamar.kotlin.UserRepository
import cz.melkamar.kotlin.model.User
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.util.concurrent.atomic.AtomicLong
import javax.validation.Valid
import javax.validation.constraints.Email

class Response(val message: String)

@RestController
class UserController(val userRepository: UserRepository) {

    val counter = AtomicLong()

    @GetMapping("api/user")
    fun user() = userRepository.findAll()

    @PostMapping("api/user")
    fun userPost(@Valid @RequestBody user: User): ResponseEntity<Response> {
        userRepository.insert(user)
        return ResponseEntity.status(HttpStatus.OK).body(Response("ok"))
    }
}