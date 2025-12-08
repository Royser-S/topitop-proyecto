package com.topitop.backend.repository.login;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.topitop.backend.entity.login.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long>{
	Optional<Usuario> findByEmail(String email);
}
