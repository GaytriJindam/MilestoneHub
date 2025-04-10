package com.web.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.web.model.PasswordResetToken;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Integer> {
	PasswordResetToken findByToken(String token);
}
