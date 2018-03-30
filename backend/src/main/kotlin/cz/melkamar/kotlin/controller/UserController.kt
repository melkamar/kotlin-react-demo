package cz.melkamar.kotlin.controller

import cz.melkamar.kotlin.UserRepository
import cz.melkamar.kotlin.model.User
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.util.concurrent.atomic.AtomicLong
import javax.servlet.http.HttpServletResponse
import javax.validation.Valid
import javax.validation.constraints.Email

class Response(val message: String)

@RestController
class UserController(val userRepository: UserRepository) {

    @CrossOrigin(origins = ["http://localhost:3000"])
    @GetMapping("")
    fun root(response: HttpServletResponse) {
        response.sendRedirect("/api/user")
    }

    @CrossOrigin(origins = ["http://localhost:3000"])
    @GetMapping("api/user")
    fun user() = userRepository.findAll()

    @CrossOrigin(origins = ["http://localhost:3000"])
    @PostMapping("api/user")
    fun userPost(@Valid @RequestBody user: User): ResponseEntity<Response> {
        userRepository.insert(user)
        return ResponseEntity.status(HttpStatus.OK).body(Response("ok"))
    }

    @CrossOrigin(origins = ["http://localhost:3000"])
    @DeleteMapping("api/user")
    fun userPost(@RequestParam email: String): ResponseEntity<Response> {
        userRepository.deleteById(email)
        return ResponseEntity.status(HttpStatus.OK).body(Response("ok"))
    }
}